'use client';
import { useMemo, useState, useEffect } from 'react';
import { z } from 'zod';
import getStripe from '@/lib/stripeClient';
import { calculatePrice, configToLabel, type Config } from '@/lib/pricing';
import { validateTechnicalCompliance, getRecommendations, type ValidationResult } from '@/lib/technical-validation';
// Preis-Daten jetzt über index.ts (saubere zentrale Sammelstelle)
import {
  fensterPrices, balkontuerenPrices, schiebetuerenPrices, haustuerenPrices, sonstigesPrices
} from '@/index';
import { lookupPriceEURFrom } from '@/lookup';

const schema = z.object({
  product: z.enum(['Fenster', 'Türe']).default('Fenster'),
  width_mm: z.coerce.number().int().min(400).max(3000),
  height_mm: z.coerce.number().int().min(400).max(3000),
  material: z.enum(['PVC', 'Aluminium', 'Holz']).default('PVC'),
  profile: z.enum(['Standard', 'ThermoPlus', 'Premium']).default('Standard'),
  opening: z.enum(['Festverglasung','Dreh-Kipp links','Dreh-Kipp rechts','Doppelflügelig (Stulp)']).default('Dreh-Kipp links'),
  glazing: z.enum(['2-fach', '3-fach']).default('2-fach'),
  color: z.enum(['Weiß', 'RAL', 'Holzdekor']).default('Weiß'),
  handle: z.enum(['Standard', 'Premium']).default('Standard'),
  security: z.enum(['Basis', 'RC1N', 'RC2N']).default('Basis'),
  warmEdge: z.boolean().default(false),
  soundInsulation: z.boolean().default(false),
  safetyGlass: z.boolean().default(false),
  sunProtection: z.boolean().default(false),
  trickleVent: z.boolean().default(false),
  insectScreen: z.boolean().default(false),
  rollerShutter: z.boolean().default(false),
  oldWindowDisposal: z.boolean().default(false),
  delivery: z.enum(['Abholung','Hamburg (Zone 1)','Zone 2']).default('Abholung'),
  qty: z.coerce.number().int().min(1).max(50).default(1),
});

const steps = [
  'Maße',
  'Ausführung & Sicherheit',
  'Glas & Farbe',
  'Montage & Lieferung',
  'Übersicht',
];

function pickDatasetAndFilter(form: any) {
  const DATA = form.product === 'Fenster' ? fensterPrices : balkontuerenPrices;
  const filter: Record<string, string> = {};
  const opening = String(form.opening ?? '').toLowerCase();

  // Match the actual source_file patterns in the data
  if (opening.includes('fest')) filter.source_file = 'FEST';
  else if (opening.includes('dreh-kipp')) filter.source_file = 'DK + DR+DK'; // Match "FENSTER DK + DR+DK"
  else if (opening.includes('dreh')) filter.source_file = 'DREH';

  if (opening.includes('stulp'))
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'STULP';
  if (opening.includes('pfosten'))
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'PFOSTEN';
  
  return { DATA, filter };
}

export default function ConfiguratorPage() {
  const [form, setForm] = useState<Config>({
    product: 'Fenster', width_mm: 1200, height_mm: 1200,
    material: 'PVC', profile: 'Standard', opening: 'Dreh-Kipp links',
    glazing: '2-fach', color: 'Weiß', handle: 'Standard', security: 'Basis',
    warmEdge: false, soundInsulation: false, safetyGlass: false, sunProtection: false,
    trickleVent: false, insectScreen: false, rollerShutter: false, childLock: false,
    montage: 'Keine', oldWindowDisposal: false, delivery: 'Abholung', qty: 1
  });

  const parsed = schema.safeParse(form);
  const valid = parsed.success;
  const breakdown = useMemo(() => calculatePrice(form), [form]);
  const validation = useMemo(() => validateTechnicalCompliance(form), [form]);
  const recommendations = useMemo(() => getRecommendations(form), [form]);
  const [price, setPrice] = useState<{
    base_pln: number;
    eur_buy_net: number;
    eur_sell_net: number;
    eur_sell_gross: number;
  }>({ base_pln: 0, eur_buy_net: 0, eur_sell_net: 0, eur_sell_gross: 0 });

  useEffect(() => {
    const { DATA, filter } = pickDatasetAndFilter(form);
    (async () => {
      try {
        const res = await fetch('/api/price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            width_mm: form.width_mm,
            height_mm: form.height_mm,
            opening: form.opening,
            qty: form.qty,
            product: form.product,
            filter,
            DATA,
          }),
        });
        const data = await res.json();
        if (data?.price) {
          setPrice({
            base_pln: Number(data.price.base_pln ?? 0),
            eur_buy_net: Number(data.price.eur_buy_net ?? 0),
            eur_sell_net: Number(data.price.eur_sell_net ?? 0),
            eur_sell_gross: Number(data.price.eur_sell_gross ?? 0),
          });
        } else {
          setPrice({ base_pln: 0, eur_buy_net: 0, eur_sell_net: 0, eur_sell_gross: 0 });
        }
      } catch {
        setPrice({ base_pln: 0, eur_buy_net: 0, eur_sell_net: 0, eur_sell_gross: 0 });
      }
    })();
  }, [form]);

  async function checkout() {
    if (!valid) return;
    const stripe = await getStripe();
    const name = configToLabel(form);
    const successUrl = `${window.location.origin}/success`;
    const cancelUrl = `${window.location.origin}/cancel`;

    // Gesamtpreis (brutto) aus Lookup für Stripe berechnen
    const { DATA, filter } = pickDatasetAndFilter(form);
    const basePerUnit = lookupPriceEURFrom(DATA, form.width_mm, form.height_mm, filter) ?? 0;
    const qty = Number(form.qty ?? 1);
    const vat = 0.19;
    const totalForCheckout = (basePerUnit * qty) * (1 + vat);

    const payload = {
      lineItems: [{
        quantity: form.qty,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(totalForCheckout * 100),
          product_data: {
            name,
            description: 'Individuelle Konfiguration (inkl. MwSt.)'
          }
        },
      }],
      successUrl,
      cancelUrl,
      metadata: { config: JSON.stringify(form), label: name }
    };

    const res = await fetch('/api/price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        width_mm: form.width_mm,
        height_mm: form.height_mm,
        opening: form.opening,
      }),
    });
    const data = await res.json();

    // Netto-EUR-Preis aus der API
    const eurNet = data?.price?.eur_net ?? 0;
  }

  function setK<K extends keyof Config>(key: K, value: Config[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const [step, setStep] = useState(0);

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="card">
        {/* Stepper */}
        <div className="stepper">
          {steps.map((s, i) => (
            <div
              key={s}
              className={['step', i === step && 'active'].filter(Boolean).join(' ')}
              onClick={() => setStep(i)}
              style={{ cursor: 'pointer' }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Technical Validation Display */}
      {(validation.errors.length > 0 || validation.warnings.length > 0 || validation.complianceInfo.length > 0) && (
        <div className="card">
          <h3>Technische Prüfung (DIN 18055 / a.R.d.T.)</h3>
          
          {validation.errors.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#d32f2f', marginBottom: '8px' }}>⚠️ Technische Anforderungen nicht erfüllt:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#d32f2f' }}>
                {validation.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {validation.warnings.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#f57c00', marginBottom: '8px' }}>⚡ Hinweise zur Optimierung:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#f57c00' }}>
                {validation.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {validation.complianceInfo.length > 0 && validation.errors.length === 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#2e7d32', marginBottom: '8px' }}>✅ Technische Konformität:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#2e7d32' }}>
                {validation.complianceInfo.map((info, i) => (
                  <li key={i}>{info}</li>
                ))}
              </ul>
            </div>
          )}

          {recommendations.length > 0 && (
            <div>
              <h4 style={{ color: '#1976d2', marginBottom: '8px' }}>💡 Empfehlungen:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#1976d2' }}>
                {recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {/* === STEP 0: Maße === */}
      {step === 0 && (
        <div className="grid">
          {/* Visual Preview */}
          <div className="window-preview">
            <h4>Vorschau: {form.product} {form.opening}</h4>
            <div 
              className="preview-window"
              style={{
                width: Math.max(120, Math.min(200, form.width_mm / 10)),
                height: Math.max(100, Math.min(160, form.height_mm / 10))
              }}
            >
              <div className="window-frame vertical"></div>
              <div className="window-frame horizontal"></div>
              {form.opening.includes('Dreh') && <div className="window-handle"></div>}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              {form.width_mm} × {form.height_mm} mm | Material: {form.material}
            </div>
          </div>

          <div className="row">
            <div className="label">Produkttyp</div>
            <select
              value={form.product}
              onChange={e => setForm(prev => ({ ...prev, product: e.target.value as any }))}
              style={{
                borderColor: '#d1d5db'
              }}
            >
              <option value="Fenster">Fenster</option>
              <option value="Türe">Haustür</option>
            </select>
          </div>
          <div className="row">
            <div className="label">Breite (mm)</div>
            <input
              type="number"
              value={form.width_mm}
              min={400}
              max={3000}
              onChange={e => setForm(prev => ({ ...prev, width_mm: Number(e.target.value) }))}
              style={{
                borderColor: validation.errors.some(e => e.includes('Breite') || e.includes('Fläche')) ? '#d32f2f' : 
                            validation.warnings.some(w => w.includes('Breite') || w.includes('Fläche')) ? '#f57c00' : '#d1d5db'
              }}
            />
          </div>
          <div className="row">
            <div className="label">Höhe (mm)</div>
            <input
              type="number"
              value={form.height_mm}
              min={400}
              max={3000}
              onChange={e => setForm(prev => ({ ...prev, height_mm: Number(e.target.value) }))}
              style={{
                borderColor: validation.errors.some(e => e.includes('Höhe') || e.includes('Fläche')) ? '#d32f2f' : 
                            validation.warnings.some(w => w.includes('Höhe') || w.includes('Fläche')) ? '#f57c00' : '#d1d5db'
              }}
            />
          </div>
          <div className="row">
            <div className="label">Öffnungsart</div>
            <select
              value={form.opening}
              onChange={e => setForm(prev => ({ ...prev, opening: e.target.value as any }))}
              style={{
                borderColor: validation.errors.some(e => e.includes('Öffnung') || e.includes(form.opening)) ? '#d32f2f' : '#d1d5db'
              }}
            >
              <option>Dreh-Kipp links</option>
              <option>Dreh-Kipp rechts</option>
              <option>Doppelflügelig (Stulp)</option>
              <option>Festverglasung</option>
              <option>Dreh</option>
              <option>Kipp</option>
            </select>
          </div>
          <div className="row">
            <div className="label">Menge</div>
            <input
              type="number"
              value={form.qty}
              min={1}
              max={50}
              onChange={e => setForm(prev => ({ ...prev, qty: Number(e.target.value) }))}
            />
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
            <button 
              className="btn" 
              onClick={() => setStep(4)}
              disabled={validation.errors.length > 0}
              style={{
                opacity: validation.errors.length > 0 ? 0.5 : 1,
                cursor: validation.errors.length > 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {validation.errors.length > 0 ? 'Technische Anforderungen prüfen' : 'Zur Übersicht & Preis'}
            </button>
          </div>
        </div>
      )}

      {/* === STEP 1: Ausführung & Sicherheit === */}
      {step === 1 && (
        <div className="grid">
          {/* Material Selection with Visual Options */}
          <div>
            <div className="label">Material</div>
            <div className="material-selector">
              {['PVC', 'Aluminium', 'Holz'].map(material => (
                <div
                  key={material}
                  className={`material-option ${form.material === material ? 'selected' : ''}`}
                  onClick={() => setForm(p => ({ ...p, material: material as any }))}
                >
                  <div className={`material-icon material-${material.toLowerCase()}`}></div>
                  <div style={{ fontSize: '14px', fontWeight: form.material === material ? '600' : '400' }}>
                    {material}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Profil */}
          <div className="row">
            <div className="label">Profil</div>
            <select
              value={form.profile}
              onChange={e => setForm(p => ({ ...p, profile: e.target.value as any }))}
            >
              <option value="Standard">Standard</option>
              <option value="ThermoPlus">ThermoPlus</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          {/* Sicherheit */}
          <div className="row">
            <div className="label">Sicherheitsstufe</div>
            <select
              value={form.security}
              onChange={e => setForm(p => ({ ...p, security: e.target.value as any }))}
            >
              <option value="Basis">Basis</option>
              <option value="RC1N">RC1N</option>
              <option value="RC2N">RC2N</option>
            </select>
          </div>
          {/* Griff */}
          <div className="row">
            <div className="label">Griff</div>
            <select
              value={form.handle}
              onChange={e => setForm(p => ({ ...p, handle: e.target.value as any }))}
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          {/* Zusatzoptionen (Checkboxen) */}
          <div className="row">
            <div className="label">Warme Kante</div>
            <input
              type="checkbox"
              checked={form.warmEdge}
              onChange={e => setForm(p => ({ ...p, warmEdge: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Schallschutz</div>
            <input
              type="checkbox"
              checked={form.soundInsulation}
              onChange={e => setForm(p => ({ ...p, soundInsulation: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Sicherheitsglas</div>
            <input
              type="checkbox"
              checked={form.safetyGlass}
              onChange={e => setForm(p => ({ ...p, safetyGlass: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Sonnenschutz</div>
            <input
              type="checkbox"
              checked={form.sunProtection}
              onChange={e => setForm(p => ({ ...p, sunProtection: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Lüftungsschlitz (Trickle Vent)</div>
            <input
              type="checkbox"
              checked={form.trickleVent}
              onChange={e => setForm(p => ({ ...p, trickleVent: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Insektenschutz</div>
            <input
              type="checkbox"
              checked={form.insectScreen}
              onChange={e => setForm(p => ({ ...p, insectScreen: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Rollladen</div>
            <input
              type="checkbox"
              checked={form.rollerShutter}
              onChange={e => setForm(p => ({ ...p, rollerShutter: e.target.checked }))}
            />
          </div>
          <div className="row">
            <div className="label">Kindersicherung</div>
            <input
              type="checkbox"
              checked={form.childLock}
              onChange={e => setForm(p => ({ ...p, childLock: e.target.checked }))}
            />
          </div>
          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 12 }}>
            <button className="btn" onClick={() => setStep(0)}>Zurück</button>
            <button className="btn" onClick={() => setStep(2)}>Weiter</button>
          </div>
        </div>
      )}

      {/* === STEP 2: Glas & Farbe === */}
      {step === 2 && (
        <div className="grid">
          {/* Verglasung */}
          <div className="row">
            <div className="label">Verglasung</div>
            <select
              value={form.glazing}
              onChange={e => setForm(p => ({ ...p, glazing: e.target.value as any }))}
            >
              <option value="2-fach">2-fach</option>
              <option value="3-fach">3-fach</option>
            </select>
          </div>
          {/* Farbe */}
          <div className="row">
            <div className="label">Farbe</div>
            <select
              value={form.color}
              onChange={e => setForm(p => ({ ...p, color: e.target.value as any }))}
            >
              <option value="Weiß">Weiß</option>
              <option value="RAL">RAL</option>
              <option value="Holzdekor">Holzdekor</option>
            </select>
          </div>
          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 12 }}>
            <button className="btn" onClick={() => setStep(1)}>Zurück</button>
            <button className="btn" onClick={() => setStep(3)}>Weiter</button>
          </div>
        </div>
      )}

      {/* === STEP 3: Montage & Lieferung === */}
      {step === 3 && (
        <div className="grid">
          {/* Montagepaket */}
          <div className="row">
            <div className="label">Montagepaket</div>
            <select
              value={form.montage}
              onChange={e => setForm(p => ({ ...p, montage: e.target.value as any }))}
            >
              <option value="Keine">Keine</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          {/* Lieferung */}
          <div className="row">
            <div className="label">Lieferung</div>
            <select
              value={form.delivery}
              onChange={e => setForm(p => ({ ...p, delivery: e.target.value as any }))}
            >
              <option value="Abholung">Abholung</option>
              <option value="Hamburg (Zone 1)">Hamburg (Zone 1)</option>
              <option value="Zone 2">Zone 2</option>
            </select>
          </div>
          {/* Altfenster-Entsorgung */}
          <div className="row">
            <div className="label">Altfenster-Entsorgung</div>
            <label style={{ alignSelf: 'center' }}>
              <input
                type="checkbox"
                checked={form.oldWindowDisposal}
                onChange={e => setForm(p => ({ ...p, oldWindowDisposal: e.target.checked }))}
              />{' '}
              Altfenster entsorgen (+25 € wenn Montage gewählt)
            </label>
          </div>
          {/* Menge */}
          <div className="row">
            <div className="label">Menge</div>
            <input
              type="number"
              min={1}
              max={50}
              value={form.qty}
              onChange={e => setForm(p => ({ ...p, qty: Number(e.target.value || 1) }))}
            />
          </div>
          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 12 }}>
            <button className="btn" onClick={() => setStep(2)}>Zurück</button>
            <button className="btn" onClick={() => setStep(4)}>Weiter</button>
          </div>
        </div>
      )}

      {/* === STEP 4: Übersicht === */}
      {step === 4 && (
        <div className="grid" style={{ gap: 24 }}>
          {/* Technical Validation Summary */}
          <div className="card">
            <h3>Technische Konformitätsprüfung</h3>
            
            {validation.errors.length > 0 ? (
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#ffebee', border: '1px solid #e57373' }}>
                <h4 style={{ color: '#d32f2f', margin: '0 0 12px 0' }}>❌ Konfiguration nicht zulässig</h4>
                <p style={{ margin: '0 0 12px 0', color: '#d32f2f' }}>
                  Die aktuelle Konfiguration entspricht nicht den technischen Anforderungen nach DIN 18055 und a.R.d.T.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#d32f2f' }}>
                  {validation.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#e8f5e8', border: '1px solid #81c784' }}>
                <h4 style={{ color: '#2e7d32', margin: '0 0 12px 0' }}>✅ Technische Anforderungen erfüllt</h4>
                <p style={{ margin: '0 0 12px 0', color: '#2e7d32' }}>
                  Die Konfiguration entspricht DIN 18055 und den anerkannten Regeln der Technik (a.R.d.T.).
                </p>
                {validation.complianceInfo.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#2e7d32' }}>
                    {validation.complianceInfo.map((info, i) => (
                      <li key={i}>{info}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {validation.warnings.length > 0 && (
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#fff8e1', border: '1px solid #ffb74d', marginTop: '12px' }}>
                <h4 style={{ color: '#f57c00', margin: '0 0 8px 0' }}>⚠️ Optimierungshinweise</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#f57c00' }}>
                  {validation.warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {recommendations.length > 0 && (
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#e3f2fd', border: '1px solid #64b5f6', marginTop: '12px' }}>
                <h4 style={{ color: '#1976d2', margin: '0 0 8px 0' }}>💡 Empfehlungen</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#1976d2' }}>
                  {recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {price ? (
            <>
              <h3>Preisübersicht</h3>
              <table>
                <tbody>
                  <tr><th>Produkt</th><td>{form.product}</td></tr>
                  <tr><th>Öffnung</th><td>{form.opening}</td></tr>
                  <tr><th>Maße (B × H)</th><td>{form.width_mm} × {form.height_mm} mm</td></tr>
                  <tr><th>Menge</th><td>{form.qty}</td></tr>
                  <tr><th>Basispreis / Stück</th><td>{price.eur_sell_net.toFixed(2)} €</td></tr>
                  <tr><th>Netto gesamt</th><td>{(price.eur_sell_net * (form.qty ?? 1)).toFixed(2)} €</td></tr>
                  <tr><th>MwSt (19%)</th><td>{(price.eur_sell_net * (form.qty ?? 1) * 0.19).toFixed(2)} €</td></tr>
                  <tr><th>Gesamt (inkl. MwSt.)</th><td className="price">{(price.eur_sell_gross * (form.qty ?? 1)).toFixed(2)} €</td></tr>
                </tbody>
              </table>
            </>
          ) : (
            <p>Preis wird berechnet …</p>
          )}
        </div>
      )}
    </div>
  );
}
