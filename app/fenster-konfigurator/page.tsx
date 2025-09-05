
'use client';
export { default as fensterPrices } from "./groups/fenster.data"; 
export { default as balkontuerenPrices } from "./groups/balkontueren.data"; 
export { default as schiebetuerenPrices } from "./groups/schiebetueren.data"; 
export { default as haustuerenPrices } from "./groups/haustueren.data";
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

return (
  <div className="grid" style={{ gap: 24 }}>
    <div className="card">
      {/* Stepper */}
      <div className="stepper">
        {steps.map((s, i) => (
          <div
            key={s}
            className={['step', i === step && 'active'].filter(Boolean).join(' ')}
          >
            {s}
          </div>
        ))}
      </div>

      {/* === STEP 0: Maße === */}
      {step === 0 && (
        <div className="grid">
          {/* ... dein bestehendes Formular für Maße bleibt hier ... */}
        </div>
      )}

      {/* === STEP 1: Ausführung & Sicherheit === */}
      {step === 1 && (
        <div className="grid">
          {/* ... dein bestehendes Formular für Ausführung & Sicherheit ... */}
        </div>
      )}

      {/* === STEP 2: Glas & Farbe === */}
      {step === 2 && (
        <div className="grid">
          {/* ... dein bestehendes Formular für Glas & Farbe ... */}
        </div>
      )}

      {/* === STEP 3: Montage & Lieferung === */}
      {step === 3 && (
        <div className="grid">
          {/* ... dein bestehendes Formular für Montage & Lieferung ... */}
        </div>
      )}

      {/* === STEP 4: Übersicht & Preis === */}
      {step === 4 && (
        <div className="grid">
          {(() => {
            const { DATA, filter } = pickDatasetAndFilter(form);

            // Basispreis pro Stück (EUR, Netto) aus den Preistabellen
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
    </div>
  </div>
);
/* <— Wichtig: Danach kommt nichts mehr, nächste Zeile schließt die Komponente: */ 
}
