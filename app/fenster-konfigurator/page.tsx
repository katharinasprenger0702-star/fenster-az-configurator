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
  product: z.enum(['Fenster', 'Balkontüren', 'Schiebetüren', 'Haustüren', 'Rollladen', 'Garagentore']).default('Fenster'),
  system: z.enum(['IGLO 5', 'Standard', 'Premium']).default('IGLO 5').optional(),
  width_mm: z.coerce.number().int().min(400).max(3000),
  height_mm: z.coerce.number().int().min(400).max(3000),
  material: z.enum(['PVC', 'Aluminium', 'Holz']).default('PVC'),
  profile: z.enum(['Standard', 'ThermoPlus', 'Premium']).default('Standard'),
  opening: z.string().default('Dreh-Kipp links'),
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
  childLock: z.boolean().default(false),
  versand: z.enum(['Standard', 'Premium', 'Express']).default('Standard'),
  oldWindowDisposal: z.boolean().default(false),
  delivery: z.enum(['Abholung','Hamburg (Zone 1)','Zone 2']).default('Abholung'),
  qty: z.coerce.number().int().min(1).max(50).default(1),
});

const steps = [
  'Produktauswahl',
  'Maße',
  'Ausführung & Sicherheit',
  'Glas & Farbe',
  'Versand & Lieferung',
  'Übersicht',
];

function getOpeningTypesForProduct(product: string): string[] {
  switch (product) {
    case 'Fenster':
      return ['Fest', 'Dreh-Kipp links', 'Dreh-Kipp rechts', 'Dreh links', 'Dreh rechts', 'Kipp'];
    case 'Balkontüren':
      return ['Dreh-Kipp links', 'Dreh-Kipp rechts', 'Dreh links', 'Dreh rechts'];
    case 'Schiebetüren':
      return ['Schiebetür links', 'Schiebetür rechts'];
    case 'Haustüren':
      return ['Dreh links', 'Dreh rechts'];
    case 'Rollladen':
      return ['Aufputz', 'Unterputz', 'Vorbaurollladen', 'Aufsatzrollladen'];
    case 'Garagentore':
      return ['Sektionaltor', 'Schwingtor', 'Rolltor', 'Flügeltor'];
    default:
      return ['Dreh-Kipp links'];
  }
}

function pickDatasetAndFilter(form: any) {
  let DATA: any;

  // Choose dataset based on product type
  switch (form.product) {
    case 'Fenster':
      DATA = fensterPrices;
      break;
    case 'Balkontüren':
      DATA = balkontuerenPrices;
      break;
    case 'Schiebetüren':
      DATA = schiebetuerenPrices;
      break;
    case 'Haustüren':
      DATA = haustuerenPrices;
      break;
    case 'Rollladen':
      // For now, use a subset of fenster pricing for rollladen
      DATA = fensterPrices;
      break;
    case 'Garagentore':
      // For now, use haustuer pricing as basis for garage doors
      DATA = haustuerenPrices;
      break;
    default:
      DATA = fensterPrices;
  }
  
  const filter: Record<string, string> = {};
  const opening = String(form.opening ?? '').toLowerCase();

  // Match the actual source_file patterns in the data
  if (opening.includes('fest')) filter.source_file = 'FEST';
  else if (opening.includes('dreh-kipp')) filter.source_file = 'DK + DR+DK'; // Match "FENSTER DK + DR+DK"
  else if (opening.includes('dreh')) filter.source_file = 'DREH';
  else if (opening.includes('schiebe')) filter.source_file = 'SCHIEBE';

  if (form.profile === 'ThermoPlus' || form.profile === 'Premium')
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'PFOSTEN';
  
  return { DATA, filter };
}

export default function ConfiguratorPage() {
  const [form, setForm] = useState<Config>({
    product: 'Fenster', system: 'IGLO 5', width_mm: 1200, height_mm: 1200,
    material: 'PVC', profile: 'Standard', opening: 'Dreh-Kipp links',
    glazing: '2-fach', color: 'Weiß', handle: 'Standard', security: 'Basis',
    warmEdge: false, soundInsulation: false, safetyGlass: false, sunProtection: false,
    trickleVent: false, insectScreen: false, childLock: false,
    versand: 'Standard', oldWindowDisposal: false,
    delivery: 'Abholung', qty: 1
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
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Calculate prices for all supported products
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
            material: form.material,
            profile: form.profile,
            glazing: form.glazing
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

    const checkoutRes = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const checkoutData = await checkoutRes.json();
    
    if (checkoutData.sessionId) {
      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutData.sessionId,
      });
      
      if (result?.error) {
        console.error('Stripe checkout error:', result.error);
      }
    }
  }

  function setK<K extends keyof Config>(key: K, value: Config[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

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

        {/* === STEP 0: Produktauswahl === */}
        {step === 0 && (
          <div>
            <h2>Produkt auswählen</h2>
            <div className="grid" style={{ gap: 16 }}>
              {['Fenster', 'Balkontüren', 'Schiebetüren', 'Haustüren', 'Rollladen', 'Garagentore'].map(product => (
                <div
                  key={product}
                  className={['product-option', form.product === product && 'selected'].filter(Boolean).join(' ')}
                  onClick={() => {
                    setK('product', product as any);
                    // Update opening type when product changes
                    const openingTypes = getOpeningTypesForProduct(product);
                    if (!openingTypes.includes(form.opening)) {
                      setK('opening', openingTypes[0]);
                    }
                  }}
                  style={{
                    padding: '16px',
                    border: form.product === product ? '2px solid #007bff' : '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {product === 'Fenster' && '🪟'}
                    {product === 'Balkontüren' && '🚪'}
                    {product === 'Schiebetüren' && '🚪'}
                    {product === 'Haustüren' && '🚪'}
                    {product === 'Rollladen' && '🪟'}
                    {product === 'Garagentore' && '🚪'}
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{product}</div>
                </div>
              ))}
            </div>

            {/* System Selection */}
            <div style={{ marginTop: '24px' }}>
              <h3>System auswählen</h3>
              <div className="grid" style={{ gap: 16 }}>
                {['IGLO 5', 'Standard', 'Premium'].map(system => (
                  <div
                    key={system}
                    className={['system-option', form.system === system && 'selected'].filter(Boolean).join(' ')}
                    onClick={() => setK('system', system as any)}
                    style={{
                      padding: '16px',
                      border: form.system === system ? '2px solid #007bff' : '1px solid #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>{system}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === STEP 1: Maße === */}
        {step === 1 && (
          <div>
            <h2>Abmessungen eingeben</h2>
            <div className="grid" style={{ gap: 16 }}>
              <div>
                <label htmlFor="width">Breite (mm)</label>
                <input
                  id="width"
                  type="number"
                  value={form.width_mm}
                  onChange={(e) => setK('width_mm', Number(e.target.value))}
                  min="400"
                  max="3000"
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="height">Höhe (mm)</label>
                <input
                  id="height"
                  type="number"
                  value={form.height_mm}
                  onChange={(e) => setK('height_mm', Number(e.target.value))}
                  min="400"
                  max="3000"
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="opening">Öffnungsart</label>
                <select
                  id="opening"
                  value={form.opening}
                  onChange={(e) => setK('opening', e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  {getOpeningTypesForProduct(form.product).map(opening => (
                    <option key={opening} value={opening}>{opening}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="qty">Anzahl</label>
                <input
                  id="qty"
                  type="number"
                  value={form.qty}
                  onChange={(e) => setK('qty', Number(e.target.value))}
                  min="1"
                  max="50"
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* === STEP 2: Ausführung & Sicherheit === */}
        {step === 2 && (
          <div>
            <h2>Ausführung & Sicherheit</h2>
            <div className="grid" style={{ gap: 16 }}>
              <div>
                <label htmlFor="material">Material</label>
                <select
                  id="material"
                  value={form.material}
                  onChange={(e) => setK('material', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="PVC">PVC</option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Holz">Holz</option>
                </select>
              </div>
              <div>
                <label htmlFor="profile">Profil</label>
                <select
                  id="profile"
                  value={form.profile}
                  onChange={(e) => setK('profile', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="Standard">Standard</option>
                  <option value="ThermoPlus">ThermoPlus</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div>
                <label htmlFor="handle">Griff</label>
                <select
                  id="handle"
                  value={form.handle}
                  onChange={(e) => setK('handle', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div>
                <label htmlFor="security">Sicherheit</label>
                <select
                  id="security"
                  value={form.security}
                  onChange={(e) => setK('security', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="Basis">Basis</option>
                  <option value="RC1N">RC1N</option>
                  <option value="RC2N">RC2N</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3>Zusatzleistungen</h3>
              <div className="grid" style={{ gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.trickleVent}
                    onChange={(e) => setK('trickleVent', e.target.checked)}
                  />
                  Lüftungsschlitze
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.insectScreen}
                    onChange={(e) => setK('insectScreen', e.target.checked)}
                  />
                  Insektenschutz
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.oldWindowDisposal}
                    onChange={(e) => setK('oldWindowDisposal', e.target.checked)}
                  />
                  Entsorgung der alten Fenster
                </label>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 3: Glas & Farbe === */}
        {step === 3 && (
          <div>
            <h2>Glas & Farbe</h2>
            <div className="grid" style={{ gap: 16 }}>
              <div>
                <label htmlFor="glazing">Verglasung</label>
                <select
                  id="glazing"
                  value={form.glazing}
                  onChange={(e) => setK('glazing', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="2-fach">2-fach</option>
                  <option value="3-fach">3-fach</option>
                </select>
              </div>
              <div>
                <label htmlFor="color">Farbe</label>
                <select
                  id="color"
                  value={form.color}
                  onChange={(e) => setK('color', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="Weiß">Weiß</option>
                  <option value="RAL">RAL</option>
                  <option value="Holzdekor">Holzdekor</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3>Glasoptionen</h3>
              <div className="grid" style={{ gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.warmEdge}
                    onChange={(e) => setK('warmEdge', e.target.checked)}
                  />
                  Warme Kante
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.soundInsulation}
                    onChange={(e) => setK('soundInsulation', e.target.checked)}
                  />
                  Schallschutz
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.safetyGlass}
                    onChange={(e) => setK('safetyGlass', e.target.checked)}
                  />
                  Sicherheitsglas
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={form.sunProtection}
                    onChange={(e) => setK('sunProtection', e.target.checked)}
                  />
                  Sonnenschutz
                </label>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 4: Versand & Lieferung === */}
        {step === 4 && (
          <div>
            <h2>Versand & Lieferung</h2>
            <div className="grid" style={{ gap: 16 }}>
              <div>
                <label htmlFor="versand">Versandoption</label>
                <select
                  id="versand"
                  value={form.versand}
                  onChange={(e) => setK('versand', e.target.value as any)}
                  disabled={form.delivery === 'Abholung'}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    marginTop: '4px',
                    backgroundColor: form.delivery === 'Abholung' ? '#f5f5f5' : 'white',
                    color: form.delivery === 'Abholung' ? '#999' : 'black',
                    cursor: form.delivery === 'Abholung' ? 'not-allowed' : 'pointer'
                  }}
                >
                  <option value="Standard">Standard Versand (89€, 3-5 Werktage)</option>
                  <option value="Premium">Premium Versand (149€, 1-2 Werktage)</option>
                  <option value="Express">Express Versand (249€, 24h)</option>
                </select>
              </div>
              <div>
                <label htmlFor="delivery">Lieferung</label>
                <select
                  id="delivery"
                  value={form.delivery}
                  onChange={(e) => setK('delivery', e.target.value as any)}
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                >
                  <option value="Abholung">Abholung</option>
                  <option value="Hamburg (Zone 1)">Hamburg (Zone 1)</option>
                  <option value="Zone 2">Zone 2</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 5: Übersicht === */}
        {step === 5 && (
          <div>
            <h2>Übersicht</h2>
            <div style={{ marginBottom: '24px' }}>
              <h3>Ihre Konfiguration</h3>
              <div className="config-summary" style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div><strong>Produkt:</strong> {form.product}</div>
                {form.system && <div><strong>System:</strong> {form.system}</div>}
                <div><strong>Abmessungen:</strong> {form.width_mm} × {form.height_mm} mm</div>
                <div><strong>Material:</strong> {form.material}</div>
                <div><strong>Profil:</strong> {form.profile}</div>
                <div><strong>Öffnungsart:</strong> {form.opening}</div>
                <div><strong>Verglasung:</strong> {form.glazing}</div>
                <div><strong>Farbe:</strong> {form.color}</div>
                <div><strong>Griff:</strong> {form.handle}</div>
                <div><strong>Sicherheit:</strong> {form.security}</div>
                <div><strong>Anzahl:</strong> {form.qty}</div>
                {form.delivery !== 'Abholung' && <div><strong>Versand:</strong> {form.versand}</div>}
                <div><strong>Lieferung:</strong> {form.delivery}</div>
              </div>
            </div>

            {/* Technical Validation - Background Display (only critical errors shown prominently) */}
            {validation.errors.length > 0 && (
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#f6f2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#dc2626'
              }}>
                <span style={{ fontWeight: '500' }}>⚠️ Technische Anforderungen nicht erfüllt</span>
                <span style={{ marginLeft: '8px', opacity: 0.8 }}>(Details in der Übersicht)</span>
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

            {valid && (
              <button
                onClick={checkout}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginTop: '16px'
                }}
              >
                Jetzt bestellen
              </button>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: step === 0 ? '#ccc' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: step === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Zurück
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            style={{
              padding: '8px 16px',
              backgroundColor: step === steps.length - 1 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Weiter
          </button>
        </div>
      </div>


    </div>
  );
}