
'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import getStripe from '@/lib/stripeClient';
import { calculatePrice, configToLabel, type Config } from '@/lib/pricing';

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
    product: 'Fenster',
    width_mm: 1200,
    height_mm: 1200,
    material: 'PVC',
    profile: 'Standard',
    opening: 'Dreh-Kipp links',
    glazing: '2-fach',
    color: 'Weiß',
    handle: 'Standard',
    security: 'Basis',
    warmEdge: false,
    soundInsulation: false,
    safetyGlass: false,
    sunProtection: false,
    trickleVent: false,
    insectScreen: false,
    rollerShutter: false,
    childLock: false,
    montage: 'Keine',
    oldWindowDisposal: false,
    delivery: 'Abholung',
    qty: 1
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
          product_data: {
            name,
            description: 'Individuelle Konfiguration (inkl. MwSt.)'
          }
        }
      }],
      successUrl,
      cancelUrl,
      metadata: {
        config: JSON.stringify(form),
        label: name
      }
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    } else if (data?.id) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert('Checkout fehlgeschlagen.');
    }
  }

  function set<K extends keyof Config>(key: K, value: Config[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  const steps = ['Maße', 'Ausführung', 'Öffnung & Sicherheit', 'Glas & Farbe', 'Montage & Lieferung', 'Übersicht'];
  const [step, setStep] = useState(0);

  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <div className="stepper">
          {steps.map((s, i) => (
            <div key={s} className={["step", i===step && "active"].filter(Boolean).join(' ')}>{i+1}. {s}</div>
          ))}
        </div>

        {step === 0 && (
          <div className="grid">
            <div className="row">
              <div>
                <div className="label">Produkt</div>
                <select value={form.product} onChange={e => set('product', e.target.value as any)}>
                  <option>Fenster</option>
                  <option>Türe</option>
                </select>
              </div>
              <div>
                <div className="label">Menge</div>
                <input className="input" type="number" min={1} max={50} value={form.qty} onChange={e => set('qty', Number(e.target.value))}/>
              </div>
            </div>
            <div className="row">
              <div>
                <div className="label">Breite (mm)</div>
                <input className="input" type="number" min={400} max={3000} value={form.width_mm} onChange={e => set('width_mm', Number(e.target.value))}/>
              </div>
              <div>
                <div className="label">Höhe (mm)</div>
                <input className="input" type="number" min={400} max={3000} value={form.height_mm} onChange={e => set('height_mm', Number(e.target.value))}/>
              </div>
            </div>
            <div className="small">Zulässig: 400–3000 mm. Mindestflächen: Fenster 0,5 m², Türen 1,5 m² (für die Kalkulation).</div>
          </div>
        )}

        {step === 1 && (
          <div className="grid">
            <div className="row">
              <div>
                <div className="label">Material</div>
                <select value={form.material} onChange={e => set('material', e.target.value as any)}>
                  <option>PVC</option>
                  <option>Aluminium</option>
                  <option>Holz</option>
                </select>
              </div>
              <div>
                <div className="label">Profil</div>
                <select value={form.profile} onChange={e => set('profile', e.target.value as any)}>
                  <option>Standard</option>
                  <option>ThermoPlus</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid">
            <div className="row">
              <div>
                <div className="label">Öffnungsart</div>
                <select value={form.opening} onChange={e => set('opening', e.target.value as any)}>
                  <option>Festverglasung</option>
                  <option>Dreh-Kipp links</option>
                  <option>Dreh-Kipp rechts</option>
                  <option>Doppelflügelig (Stulp)</option>
                </select>
              </div>
              <div>
                <div className="label">Sicherheitsstufe</div>
                <select value={form.security} onChange={e => set('security', e.target.value as any)}>
                  <option>Basis</option>
                  <option>RC1N</option>
                  <option>RC2N</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <div className="label">Griff</div>
                <select value={form.handle} onChange={e => set('handle', e.target.value as any)}>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>
              <label style={{alignSelf:'end'}}>
                <input type="checkbox" checked={form.trickleVent} onChange={e => set('trickleVent', e.target.checked)}/> Falzlüfter
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid">
            <div className="row">
              <div>
                <div className="label">Verglasung</div>
                <select value={form.glazing} onChange={e => set('glazing', e.target.value as any)}>
                  <option>2-fach</option>
                  <option>3-fach</option>
                </select>
              </div>
              <div>
                <div className="label">Farbe</div>
                <select value={form.color} onChange={e => set('color', e.target.value as any)}>
                  <option>Weiß</option>
                  <option>RAL</option>
                  <option>Holzdekor</option>
                </select>
              </div>
            </div>
            <div className="row">
              <label><input type="checkbox" checked={form.warmEdge} onChange={e => set('warmEdge', e.target.checked)}/> Warme Kante</label>
              <label><input type="checkbox" checked={form.soundInsulation} onChange={e => set('soundInsulation', e.target.checked)}/> Schallschutzglas</label>
            </div>
            <div className="row">
              <label><input type="checkbox" checked={form.safetyGlass} onChange={e => set('safetyGlass', e.target.checked)}/> Sicherheitsglas (VSG/ESG)</label>
              <label><input type="checkbox" checked={form.sunProtection} onChange={e => set('sunProtection', e.target.checked)}/> Sonnenschutzglas</label>
            </div>
            <div className="row">
              <label><input type="checkbox" checked={form.insectScreen} onChange={e => set('insectScreen', e.target.checked)}/> Insektenschutz</label>
              <label><input type="checkbox" checked={form.rollerShutter} onChange={e => set('rollerShutter', e.target.checked)}/> Rollladen</label>
            </div>
            <div className="row">
              <label><input type="checkbox" checked={form.childLock} onChange={e => set('childLock', e.target.checked)}/> Kindersicherung</label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid">
            <div className="row">
              <div>
                <div className="label">Montagepaket</div>
                <select value={form.montage} onChange={e => set('montage', e.target.value as any)}>
                  <option>Keine</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>
              <label style={{alignSelf:'end'}}>
                <input type="checkbox" checked={form.oldWindowDisposal} onChange={e => set('oldWindowDisposal', e.target.checked)}/> Altfenster-Entsorgung (+25 € wenn Montage = Keine)
              </label>
            </div>
            <div>
              <div className="label">Lieferung</div>
              <select value={form.delivery} onChange={e => set('delivery', e.target.value as any)}>
                <option>Abholung</option>
                <option>Hamburg (Zone 1)</option>
                <option>Zone 2</option>
              </select>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="grid">
            <div className="summary">
              <table>
                <tbody>
                  <tr><th>Konfiguration</th><td>{configToLabel(form)}</td></tr>
                  <tr><th>Fläche (Kalkulation)</th><td>{breakdown.baseAreaM2.toFixed(2)} m²</td></tr>
                  <tr><th>Basispreis</th><td>{breakdown.basePrice.toFixed(2)} €</td></tr>
                  <tr><th>Faktoren</th><td>
                    Öffnung ×{breakdown.openingFactor.toFixed(2)}, Verglasung ×{breakdown.glazingFactor.toFixed(2)}, Farbe ×{breakdown.colorFactor.toFixed(2)}, Sicherheit ×{breakdown.securityFactor.toFixed(2)}
                  </td></tr>
                  {breakdown.perAreaAddons.map((o,i)=>(<tr key={'pa'+i}><th>{o.label}</th><td>{o.amount.toFixed(2)} €</td></tr>))}
                  {breakdown.perUnitAddons.map((o,i)=>(<tr key={'pu'+i}><th>{o.label}</th><td>{o.amount.toFixed(2)} €</td></tr>))}
                  <tr><th>Lieferung (anteilig)</th><td>{breakdown.deliveryPerUnit.toFixed(2)} €</td></tr>
                  <tr><th>Nettopreis / Stk.</th><td>{breakdown.netPerUnit.toFixed(2)} €</td></tr>
                  <tr><th>MwSt (19%) / Stk.</th><td>{breakdown.vatPerUnit.toFixed(2)} €</td></tr>
                  <tr><th>Brutto / Stk.</th><td>{breakdown.grossPerUnit.toFixed(2)} €</td></tr>
                  <tr><th>Gesamt (inkl. MwSt.)</th><td className="price">{breakdown.totalGross.toFixed(2)} €</td></tr>
                </tbody>
              </table>
            </div>
            <div className="small">Hinweis: Preise sind Demo-Werte. Echte Regeln können im Backend gepflegt werden (Rabatte, Staffeln, Montagezonen, Lieferkonditionen).</div>
          </div>
        )}

        <hr/>

        <div style={{display:'flex', gap:12, justifyContent:'space-between'}}>
          <button className="btn" onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}>Zurück</button>
          <div style={{display:'flex', gap:12}}>
            <div className="badge">Gesamt: {breakdown.totalGross.toFixed(2)} €</div>
            {step < 5 ? (
              <button className="btn" onClick={() => setStep(s => Math.min(5, s+1))} disabled={!valid}>Weiter</button>
            ) : (
              <button className="btn" onClick={checkout} disabled={!valid}>Zur Kasse</button>
            )}
          </div>
        </div>

        {!valid && <div className="small">Bitte prüfen Sie die Eingaben (Maße 400–3000 mm, Menge 1–50).</div>}
      </div>
    </div>
  );
}
