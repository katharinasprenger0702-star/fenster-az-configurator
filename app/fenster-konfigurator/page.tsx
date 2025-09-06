'use client';
import { useMemo, useState, useEffect } from 'react'; 
import { z } from 'zod'; 
import getStripe from '@/lib/stripeClient'; 
import { calculatePrice, configToLabel, type Config } from '@/lib/pricing';
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
// --- Preis aus /api/price laden (Excel-Tabellen) --- 
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
const totalForCheckout = (() => {
  const { DATA, filter } = pickDatasetAndFilter(form);
  const basePerUnit = lookupPriceEURFrom(DATA, form.width_mm, form.height_mm, filter) ?? 0;
  const qty = Number(form.qty ?? 1);
  const vat = 0.19;
  return (basePerUnit * qty) * (1 + vat);
})();

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
    // später kannst du hier weitere Kriterien anhängen
  }),
});
const data = await res.json();

// Netto-EUR-Preis aus der API
const eurNet = data?.price?.eur_net ?? 0;

  const filter: Record<string, string> = {};
  const opening = String(form.opening ?? '').toLowerCase();

  if (opening.includes('fest')) filter.source_file = 'FEST';
  else if (opening.includes('dreh-kipp')) filter.source_file = 'DREH KIPP';
  else if (opening.includes('dreh')) filter.source_file = 'DREH';

  if (opening.includes('stulp'))
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'STULP';
  if (opening.includes('pfosten'))
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'PFOSTEN';

  return { DATA, filter };
}
  }

  function setK<K extends keyof Config>(key: K, value: Config[K]) {
  setForm((prev) => ({ ...prev, [key]: value })); }

/* Schritt-Navigation */
const steps = [
  'Maße',
  'Ausführung & Sicherheit',
  'Glas & Farbe',
  'Montage & Lieferung',
  'Übersicht',
];
const [step, setStep] = useState(0);

/* Wählt Datensatz & Filter passend zu den Formularwerten */ function pickDatasetAndFilter(form: any) {
  const DATA = form.product === 'Fenster' ? fensterPrices : balkontuerenPrices;

  const filter: Record<string, string> = {};
  const opening = String(form.opening ?? '').toLowerCase();

  if (opening.includes('fest')) filter.source_file = 'FEST';
  else if (opening.includes('dreh-kipp')) filter.source_file = 'DREH KIPP';
  else if (opening.includes('dreh')) filter.source_file = 'DREH';

  if (opening.includes('stulp'))
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'STULP';
  if (opening.includes('pfosten'))
    filter.source_file = (filter.source_file ? filter.source_file + ' ' : '') + 'PFOSTEN';
return { DATA, filter };
}
  <div className="grid" style={{ gap: 24 }}>
    <div className="card">
      {/* Stepper */}
      <div className="stepper">
        {steps.map((s, i) => (
          <div key={i} className={['step', i === step && 'active'].filter(Boolean).join(' ')}>
            {s}
          </div>
        ))}
      </div>
    </div>
   </div>
  );
     {/* === STEP 0: Maße === */}
{step === 0 && (
  <div className="grid">
    <div className="row">
      <div className="label">Breite (mm)</div>
      <input
        type="number"
        value={form.width_mm}
        min={400}
        max={3000}
        onChange={e => setForm(prev => ({ ...prev, width_mm: Number(e.target.value) }))}
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
      />
    </div>
    <div className="row">
      <div className="label">Öffnungsart</div>
      <select
        value={form.opening}
        onChange={e => setForm(prev => ({ ...prev, opening: e.target.value as any }))}
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
      <button className="btn" onClick={() => setStep(4)}>Zur Übersicht & Preis</button>
    </div>
  </div>
)}

     {/* === STEP 1: Ausführung & Sicherheit === */} 
{step === 1 && (
  <div className="grid">
    {/* Material */}
    <div className="row">
      <div className="label">Material</div>
      <select
        value={form.material}
        onChange={e => setForm(p => ({ ...p, material: e.target.value as any }))}
      >
        <option value="PVC">PVC</option>
        <option value="Aluminium">Aluminium</option>
        <option value="Holz">Holz</option>
      </select>
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
    { /* (optional) Menge – wenn du sie nicht im Überblick möchtest */}
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

  {/* === STEP 4: Übersicht & Preis === */} 
{step === 4 && (
  <div className="grid" style={{ gap: 24 }}>
    {price ? (
      <>
        <h3>Übersicht</h3>
        <table>
          <tbody>
            <tr><th>Produkt</th><td>{form.product}</td></tr>
            <tr><th>Öffnung</th><td>{form.opening}</td></tr>
            <tr><th>Maße (B × H)</th><td>{form.width_mm} × {form.height_mm} mm</td></tr>
            <tr><th>Menge</th><td>{form.qty}</td></tr>

        <tr><th>Basispreis / Stück</th><td>{basePerUnit.toFixed(2)} €</td></tr>
 <tr><th>Netto gesamt</th><td>{netTotal.toFixed(2)} €</td></tr>
 <tr><th>MwSt (19%)</th><td>{vat.toFixed(2)} €</td></tr>
 <tr><th>Gesamt (inkl. MwSt.)</th><td className="price">{grossTotal.toFixed(2)} €</td></tr>

              <th>Gesamt (inkl. MwSt.)</th>
              <td className="price">{price.gross.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>
      </>
    ) : (
      <p>Preis wird berechnet…</p>
    )}
  </div>
)}

