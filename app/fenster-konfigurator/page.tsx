
'use client';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import getStripe from '@/lib/stripeClient';
import { calculatePrice, configToLabel, type Config } from '@/lib/pricing';
// +++ NEU: Preisdaten & Lookup +++
import { lookupPriceEURFrom } from '@/lookup'; 
import fensterPrices from '@/groups/fenster.data'; 
import balkontuerenPrices from '@/groups/balkontueren.data';

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
  security: z.enum(['Basis','RC1N','RC2N']).default('Basis'),
  warmEdge: z.boolean().default(false),
  soundInsulation: z.boolean().default(false),
  safetyGlass: z.boolean().default(false),
  sunProtection: z.boolean().default(false),
  trickleVent: z.boolean().default(false),
  insectScreen: z.boolean().default(false),
  rollerShutter: z.boolean().default(false),
  childLock: z.boolean().default(false),
  montage: z.enum(['Keine','Standard','Premium']).default('Keine'),
  oldWindowDisposal: z.boolean().default(false),
  delivery: z.enum(['Abholung','Hamburg (Zone 1)','Zone 2']).default('Abholung'),
  qty: z.coerce.number().int().min(1).max(50).default(1)
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

  async function checkout() {
    if (!valid) return;
    const stripe = await getStripe();
    const name = configToLabel(form);
    const successUrl = `${window.location.origin}/success`;
    const cancelUrl = `${window.location.origin}/cancel`;
    const payload = {
      lineItems: [{
        quantity: form.qty,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(breakdown.grossPerUnit * 100),
          product_data: { name, description: 'Individuelle Konfiguration (inkl. MwSt.)' }
        }
      }],
      successUrl, cancelUrl,
      metadata: { config: JSON.stringify(form), label: name }
    };
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else if (data?.id) await stripe.redirectToCheckout({ sessionId: data.id });
    else alert('Checkout fehlgeschlagen.');
    function pickDatasetAndFilter(form: any) {
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
  }

  function set<K extends keyof Config>(key: K, value: Config[K]) { setForm(prev => ({ ...prev, [key]: value })); }
  const steps = ['Maße','Ausführung','Öffnung & Sicherheit','Glas & Farbe','Montage & Lieferung','Übersicht'];
  const [step, setStep] = useState(0);

  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <div className="stepper">{steps.map((s,i)=>(<div key={s} className={["step", i===step && "active"].filter(Boolean).join(' ')}>{i+1}. {s}</div>))}</div>
        {step===0&&(<div className="grid">
          <div className="row">
            <div><div className="label">Produkt</div>
              <select value={form.product} onChange={e=>set('product', e.target.value as any)}><option>Fenster</option><option>Türe</option></select>
            </div>
            <div><div className="label">Menge</div>
              <input className="input" type="number" min={1} max={50} value={form.qty} onChange={e=>set('qty', Number(e.target.value))}/>
            </div>
          </div>
          <div className="row">
            <div><div className="label">Breite (mm)</div><input className="input" type="number" min={400} max={3000} value={form.width_mm} onChange={e=>set('width_mm', Number(e.target.value))}/></div>
            <div><div className="label">Höhe (mm)</div><input className="input" type="number" min={400} max={3000} value={form.height_mm} onChange={e=>set('height_mm', Number(e.target.value))}/></div>
          </div>
          <div className="small">Zulässig: 400–3000 mm. Mindestflächen: Fenster 0,5 m², Türen 1,5 m².</div>
        </div>)}
        {step===1&&(<div className="grid"><div className="row">
          <div><div className="label">Material</div><select value={form.material} onChange={e=>set('material', e.target.value as any)}><option>PVC</option><option>Aluminium</option><option>Holz</option></select></div>
          <div><div className="label">Profil</div><select value={form.profile} onChange={e=>set('profile', e.target.value as any)}><option>Standard</option><option>ThermoPlus</option><option>Premium</option></select></div>
        </div></div>)}
        {step===2&&(<div className="grid">
          <div className="row">
            <div><div className="label">Öffnungsart</div><select value={form.opening} onChange={e=>set('opening', e.target.value as any)}>
              <option>Festverglasung</option><option>Dreh-Kipp links</option><option>Dreh-Kipp rechts</option><option>Doppelflügelig (Stulp)</option>
            </select></div>
            <div><div className="label">Sicherheitsstufe</div><select value={form.security} onChange={e=>set('security', e.target.value as any)}>
              <option>Basis</option><option>RC1N</option><option>RC2N</option>
            </select></div>
          </div>
          <div className="row">
            <div><div className="label">Griff</div><select value={form.handle} onChange={e=>set('handle', e.target.value as any)}><option>Standard</option><option>Premium</option></select></div>
            <label style={{alignSelf:'end'}}><input type="checkbox" checked={form.trickleVent} onChange={e=>set('trickleVent', e.target.checked)}/> Falzlüfter</label>
          </div>
        </div>)}
        {step===3&&(<div className="grid">
          <div className="row">
            <div><div className="label">Verglasung</div><select value={form.glazing} onChange={e=>set('glazing', e.target.value as any)}><option>2-fach</option><option>3-fach</option></select></div>
            <div><div className="label">Farbe</div><select value={form.color} onChange={e=>set('color', e.target.value as any)}><option>Weiß</option><option>RAL</option><option>Holzdekor</option></select></div>
          </div>
          <div className="row">
            <label><input type="checkbox" checked={form.warmEdge} onChange={e=>set('warmEdge', e.target.checked)}/> Warme Kante</label>
            <label><input type="checkbox" checked={form.soundInsulation} onChange={e=>set('soundInsulation', e.target.checked)}/> Schallschutzglas</label>
          </div>
          <div className="row">
            <label><input type="checkbox" checked={form.safetyGlass} onChange={e=>set('safetyGlass', e.target.checked)}/> Sicherheitsglas (VSG/ESG)</label>
            <label><input type="checkbox" checked={form.sunProtection} onChange={e=>set('sunProtection', e.target.checked)}/> Sonnenschutzglas</label>
          </div>
          <div className="row">
            <label><input type="checkbox" checked={form.insectScreen} onChange={e=>set('insectScreen', e.target.checked)}/> Insektenschutz</label>
            <label><input type="checkbox" checked={form.rollerShutter} onChange={e=>set('rollerShutter', e.target.checked)}/> Rollladen</label>
          </div>
          <div className="row">
            <label><input type="checkbox" checked={form.childLock} onChange={e=>set('childLock', e.target.checked)}/> Kindersicherung</label>
          </div>
        </div>)}
        {step===4&&(<div className="grid">
          <div className="row">
            <div><div className="label">Montagepaket</div><select value={form.montage} onChange={e=>set('montage', e.target.value as any)}><option>Keine</option><option>Standard</option><option>Premium</option></select></div>
{/* ==== BEGIN: echter Preis-Lookup aus Preistabellen ==== */}
{(() => {
  // Basispreis pro Stück aus den Preistabellen (EUR, Netto)
  const basePerUnit =
    lookupPriceEURFrom(
      fensterPrices,
      form.width_mm,          // Breite in mm
      form.height_mm,         // Höhe in mm
      {
        // Optional enger filtern, falls du willst:
        // source_file: 'IGLO 5 - FENSTER DK + DR+DK.xlsx',
        // sheet: 'DK',
        // Profil: form.profile,
        // Öffnung: form.opening,
        // Material: form.material,
      }
    ) ?? 0;
{step === 4 && (
  <div className="grid">
    {(() => {
      const { DATA, filter } = pickDatasetAndFilter(form);

      const basePerUnit =
        lookupPriceEURFrom(DATA, form.width_mm, form.height_mm, filter) ?? 0;

      const qty = Number(form.qty ?? 1);
      const netTotal = basePerUnit * qty;
      const vat = netTotal * 0.19;
      const grossTotal = netTotal + vat;

      return (
        <>
          <h3>Übersicht</h3>
          <table>
            <tbody>
              <tr><th>Produkt</th><td>{form.product}</td></tr>
              <tr><th>Öffnung</th><td>{form.opening}</td></tr>
              <tr><th>Maße (B × H)</th><td>{form.width_mm} × {form.height_mm} mm</td></tr>
              <tr><th>Menge</th><td>{qty}</td></tr>
              <tr><th>Basispreis / Stück</th><td>{basePerUnit.toFixed(2)} €</td></tr>
              <tr><th>Netto gesamt</th><td>{netTotal.toFixed(2)} €</td></tr>
              <tr><th>MwSt (19%)</th><td>{vat.toFixed(2)} €</td></tr>
              <tr><th>Gesamt (inkl. MwSt.)</th><td className="price">{grossTotal.toFixed(2)} €</td></tr>
            </tbody>
          </table>
        </>
      );
    })()}
  </div>
)}
  return (
    <>
      <tr>
        <th>Basispreis / Stk.</th>
        <td>{basePerUnit.toFixed(2)} €</td>
      </tr>
      <tr>
        <th>Menge</th>
        <td>{qty}</td>
      </tr>
      <tr>
        <th>Netto gesamt</th>
        <td>{netTotal.toFixed(2)} €</td>
      </tr>
      <tr>
        <th>MwSt (19%)</th>
        <td>{vat.toFixed(2)} €</td>
      </tr>
      <tr>
        <th>Gesamt (inkl. MwSt.)</th>
        <td className="price">{grossTotal.toFixed(2)} €</td>
      </tr>
    </>
  );
})()}
{/* ==== END: echter Preis-Lookup aus Preistabellen ==== */}

          <button className="btn" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}>Zurück</button>
          <div style={{display:'flex', gap:12}}>
            <div className="badge">Gesamt: {breakdown.totalGross.toFixed(2)} €</div>
            {step<5?(<button className="btn" onClick={()=>setStep(s=>Math.min(5,s+1))} disabled={!valid}>Weiter</button>):(<button className="btn" onClick={checkout} disabled={!valid}>Zur Kasse</button>)}
          </div>
        </div>
        {!valid && <div className="small">Bitte prüfen Sie die Eingaben (Maße 400–3000 mm, Menge 1–50).</div>}
      </div>
    </div>
  );
}
