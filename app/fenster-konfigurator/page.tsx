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
  manufacturer: z.enum(['DRUTEX', 'Eko-Okna', 'Gabit', 'Inotherm', 'HOOPE', 'Schüco']).default('DRUTEX'),
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
  rollerShutter: z.boolean().default(false),
  oldWindowDisposal: z.boolean().default(false),
  delivery: z.enum(['Abholung','Hamburg (Zone 1)','Zone 2']).default('Abholung'),
  qty: z.coerce.number().int().min(1).max(50).default(1),
});

const steps = [
  'Produktauswahl',
  'Hersteller',
  'Maße',
  'Ausführung & Sicherheit',
  'Glas & Farbe',
  'Montage & Lieferung',
  'Übersicht',
];

function getOpeningTypesForProduct(product: string): string[] {
  switch (product) {
    case 'Fenster':
      return ['Dreh-Kipp links', 'Dreh-Kipp rechts', 'Festverglast', 'Drehflügel links', 'Drehflügel rechts'];
    case 'Balkontüren':
      return ['Dreh-Kipp links', 'Dreh-Kipp rechts', 'Schiebetür links', 'Schiebetür rechts'];
    case 'Schiebetüren':
      return ['Parallel-Schiebe-Kipp', 'Hebe-Schiebetür', '2-flüglig', '3-flüglig'];
    case 'Haustüren':
      return ['Anschlag links', 'Anschlag rechts', 'Doppelflügel', 'Seitenteil links', 'Seitenteil rechts'];
    case 'Rollladen':
      return ['Aufputz', 'Unterputz', 'Vorbaurollladen', 'Aufsatzrollladen'];
    case 'Garagentore':
      return ['Sektionaltor', 'Schwingtor', 'Rolltor', 'Flügeltor'];
    default:
      return ['Standard'];
  }
}

function pickDatasetAndFilter(form: any) {
  let DATA;
  
  // Choose price dataset
  switch (form.product) {
    case 'Balkontüren': DATA = balkontuerenPrices; break;
    case 'Schiebetüren': DATA = schiebetuerenPrices; break; 
    case 'Haustüren': DATA = haustuerenPrices; break;
    default: DATA = fensterPrices; break; // Fenster, Rollladen, Garagentore use fensterPrices
  }

  // Build filter
  let filter: any = { opening: form.opening };
  
  if (form.manufacturer !== 'DRUTEX') {
    // For other manufacturers, fallback to DRUTEX pricing data
    // This will be replaced with manufacturer-specific data as it becomes available
    console.warn(`Using DRUTEX pricing for ${form.manufacturer} - manufacturer-specific pricing to be added`);
  }
  
  return { DATA, filter };
}

export default function ConfiguratorPage() {
  const [form, setForm] = useState<Config>({
    product: 'Fenster', manufacturer: 'DRUTEX', system: 'IGLO 5', width_mm: 1200, height_mm: 1200,
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
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Only calculate prices for DRUTEX Fenster combinations
    if (form.product !== 'Fenster' || form.manufacturer !== 'DRUTEX') {
      setPrice({ base_pln: 0, eur_buy_net: 0, eur_sell_net: 0, eur_sell_gross: 0 });
      return;
    }

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
            manufacturer: form.manufacturer,
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
      <div>
        <h1>Fenster Konfigurator</h1>
        <p>Step: {step + 1} of {steps.length}</p>
        <p>Current step: {steps[step]}</p>
        <div>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Zurück
          </button>
          <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}