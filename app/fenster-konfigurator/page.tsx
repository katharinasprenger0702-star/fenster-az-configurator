'use client';
import { useMemo, useState, useEffect } from 'react';
import { z } from 'zod';
import getStripe from '@/lib/stripeClient';
import { calculatePrice, configToLabel, type Config, getSystemsForProduct, getDefaultSystemForProduct } from '@/lib/pricing';
import { validateTechnicalCompliance, getRecommendations, type ValidationResult } from '@/lib/technical-validation';
// Preis-Daten jetzt über index.ts (saubere zentrale Sammelstelle)
import {
  fensterPrices, balkontuerenPrices, schiebetuerenPrices, haustuerenPrices, sonstigesPrices
} from '@/index';
import { lookupPriceEURFrom } from '@/lookup';

const schema = z.object({
  product: z.enum(['Fenster', 'Balkontüren', 'Schiebetüren', 'Haustüren', 'Rollladen']).default('Fenster'),
  doorType: z.enum(['PSK-Türen', 'Hebeschiebetüren']).optional(),
  // System uses z.string() because valid values are dynamically determined by getSystemsForProduct()
  system: z.string().optional(),
  serie: z.enum(['Iglo 5', 'Standard', 'Premium']).optional(),
  width_mm: z.coerce.number().int().min(400).max(6000),
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
  // Customer information
  customerFirstName: z.string().min(1, 'Vorname ist erforderlich').default(''),
  customerLastName: z.string().min(1, 'Nachname ist erforderlich').default(''),
  customerEmail: z.string().email('Gültige E-Mail-Adresse erforderlich').default(''),
  customerPhone: z.string().min(1, 'Telefonnummer ist erforderlich').default(''),
  customerStreet: z.string().min(1, 'Straße ist erforderlich').default(''),
  customerCity: z.string().min(1, 'Stadt ist erforderlich').default(''),
  customerZip: z.string().min(1, 'PLZ ist erforderlich').default(''),
  customerCountry: z.string().default('Deutschland'),
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
      return ['Vorbaurollladen', 'Aufsatzrollladen'];
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
    product: 'Fenster', system: 'Kunststofffenster', serie: 'Iglo 5', width_mm: 1200, height_mm: 1200,
    material: 'PVC', profile: 'Standard', opening: 'Dreh-Kipp links',
    glazing: '2-fach', color: 'Weiß', handle: 'Standard', security: 'Basis',
    warmEdge: false, soundInsulation: false, safetyGlass: false, sunProtection: false,
    trickleVent: false, insectScreen: false, childLock: false,
    versand: 'Standard', oldWindowDisposal: false,
    delivery: 'Abholung', qty: 1,
    // Customer information defaults
    customerFirstName: '', customerLastName: '', customerEmail: '', customerPhone: '',
    customerStreet: '', customerCity: '', customerZip: '', customerCountry: 'Deutschland'
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
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showCustomerDataModal, setShowCustomerDataModal] = useState(false);

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
            DATA: DATA,
            filter: filter,
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

  // Function to handle initial checkout click - checks if customer data is complete
  function handleCheckoutClick() {
    // Check if customer data is complete
    const customerDataValid = parsed.success && 
      form.customerFirstName && 
      form.customerLastName && 
      form.customerEmail && 
      form.customerPhone && 
      form.customerStreet && 
      form.customerCity && 
      form.customerZip;

    if (customerDataValid) {
      // Customer data is complete, proceed directly to checkout
      checkout();
    } else {
      // Customer data is incomplete, show modal
      setShowCustomerDataModal(true);
    }
  }

  // Function to handle customer data form submission
  function handleCustomerDataSubmit() {
    const customerDataValid = parsed.success && 
      form.customerFirstName && 
      form.customerLastName && 
      form.customerEmail && 
      form.customerPhone && 
      form.customerStreet && 
      form.customerCity && 
      form.customerZip;

    if (customerDataValid) {
      setShowCustomerDataModal(false);
      checkout();
    }
  }

  async function checkout() {
    if (!valid) return;
    
    setIsCheckoutLoading(true);
    setCheckoutError(null);
    
    try {
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
        customer_email: form.customerEmail,
        billing_address_collection: 'required',
        metadata: { 
          config: JSON.stringify(form), 
          label: name,
          customerName: `${form.customerFirstName} ${form.customerLastName}`,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          customerAddress: `${form.customerStreet}, ${form.customerZip} ${form.customerCity}, ${form.customerCountry}`
        }
      };

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const checkoutData = await checkoutRes.json();
      
      if (checkoutData.error) {
        throw new Error(checkoutData.error);
      }
      
      if (checkoutData.sessionId) {
        const result = await stripe?.redirectToCheckout({
          sessionId: checkoutData.sessionId,
        });
        
        if (result?.error) {
          throw new Error(result.error.message || 'Stripe checkout error');
        }
      } else {
        throw new Error('No session ID received from checkout API');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error instanceof Error ? error.message : 'Ein Fehler ist beim Checkout aufgetreten');
    } finally {
      setIsCheckoutLoading(false);
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
              {['Fenster', 'Balkontüren', 'Schiebetüren', 'Haustüren', 'Rollladen'].map(product => (
                <div
                  key={product}
                  className={['product-option', form.product === product && 'selected'].filter(Boolean).join(' ')}
                  onClick={() => {
                    setK('product', product as any);
                    // Set default door type for Schiebetüren, clear it for other products
                    if (product === 'Schiebetüren' && !form.doorType) {
                      setK('doorType', 'Hebeschiebetüren');
                    } else if (product !== 'Schiebetüren' && form.doorType) {
                      setK('doorType', undefined);
                    }
                    // Update system when product changes
                    const doorTypeForSystem = product === 'Schiebetüren' ? (form.doorType || 'Hebeschiebetüren') : undefined;
                    const newDefaultSystem = getDefaultSystemForProduct(product as any, doorTypeForSystem);
                    setK('system', newDefaultSystem);
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
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{product}</div>
                </div>
              ))}
            </div>

            {/* Door Type Selection for Schiebetüren */}
            {form.product === 'Schiebetüren' && (
              <div style={{ marginTop: '24px' }}>
                <h3>Türtyp auswählen</h3>
                <div className="grid" style={{ gap: 16 }}>
                  {(['PSK-Türen', 'Hebeschiebetüren'] as const).map(doorType => (
                    <div
                      key={doorType}
                      className={['door-type-option', form.doorType === doorType && 'selected'].filter(Boolean).join(' ')}
                      onClick={() => {
                        setK('doorType', doorType);
                        // Reset system when door type changes to ensure valid selection
                        const availableSystems = getSystemsForProduct(form.product, doorType);
                        if (form.system && !availableSystems.includes(form.system)) {
                          setK('system', availableSystems[0]);
                        }
                      }}
                      style={{
                        padding: '16px',
                        border: form.doorType === doorType ? '2px solid #007bff' : '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{doorType}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Selection */}
            <div style={{ marginTop: '24px' }}>
              <h3>Material</h3>
              <div className="grid" style={{ gap: 16 }}>
                {getSystemsForProduct(form.product, form.doorType).map(system => (
                  <div
                    key={system}
                    className={['system-option', form.system === system && 'selected'].filter(Boolean).join(' ')}
                    onClick={() => {
                      setK('system', system);
                      // Set default serie when switching to Kunststofffenster, reset when switching away
                      if (system === 'Kunststofffenster' && !form.serie) {
                        setK('serie', 'Iglo 5');
                      } else if (system !== 'Kunststofffenster') {
                        setK('serie', undefined);
                      }
                    }}
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

            {/* Serie Selection for Kunststofffenster */}
            {form.system === 'Kunststofffenster' && (
              <div style={{ marginTop: '24px' }}>
                <h3>Serie auswählen</h3>
                <div className="grid" style={{ gap: 16 }}>
                  {(['Iglo 5', 'Standard', 'Premium'] as const).map(serie => (
                    <div
                      key={serie}
                      className={['serie-option', form.serie === serie && 'selected'].filter(Boolean).join(' ')}
                      onClick={() => setK('serie', serie)}
                      style={{
                        padding: '16px',
                        border: form.serie === serie ? '2px solid #007bff' : '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{serie}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            
            {/* Real-time dimension validation feedback */}
            {validation.errors.length > 0 && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#991b1b'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                  ⚠️ Dimensionsprobleme erkannt:
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.5' }}>
                  {validation.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* === STEP 2: Ausführung & Sicherheit === */}
        {step === 2 && (
          <div>
            <h2>Ausführung & Sicherheit</h2>
            {/* Regular window/door options */}
            <div>
                <div className="grid" style={{ gap: 16 }}>
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
                {form.serie && <div><strong>Serie:</strong> {form.serie}</div>}
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

            {/* Customer Information Display */}
            <div style={{ marginBottom: '24px' }}>
              <h3>Kundendaten</h3>
              <div className="config-summary" style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div><strong>Name:</strong> {form.customerFirstName} {form.customerLastName}</div>
                <div><strong>E-Mail:</strong> {form.customerEmail}</div>
                <div><strong>Telefon:</strong> {form.customerPhone}</div>
                <div><strong>Adresse:</strong> {form.customerStreet}, {form.customerZip} {form.customerCity}, {form.customerCountry}</div>
              </div>
            </div>

            {/* Price Display */}
            <div style={{ marginBottom: '24px' }}>
              <h3>Preisberechnung</h3>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: form.product === 'Fenster' ? '2px solid #007bff' : '2px solid #28a745'
              }}>
                {/* For windows (Fenster), only show database price */}
                {form.product === 'Fenster' ? (
                  <>
                    {/* Database Price for Windows */}
                    {price.eur_sell_gross > 0 ? (
                      <div>
                        <h4 style={{ margin: '0 0 8px 0', color: '#007bff' }}>Datenbank-Preis:</h4>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                          {(price.eur_sell_gross * form.qty).toFixed(2)} €
                          <span style={{ fontSize: '14px', fontWeight: 'normal', marginLeft: '8px' }}>
                            (inkl. MwSt., {form.qty} Stück)
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', color: '#6c757d', marginTop: '4px' }}>
                          Einzelpreis: {price.eur_sell_gross.toFixed(2)} € brutto | {price.eur_sell_net.toFixed(2)} € netto
                        </div>
                      </div>
                    ) : (
                      <div style={{ 
                        fontSize: '14px',
                        color: '#6c757d'
                      }}>
                        <span>📋 Für eine detaillierte Preisberechnung kontaktieren Sie uns.</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* For all other products, show both calculation methods */}
                    {/* Simple Calculation Price */}
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#28a745' }}>Standard-Kalkulation:</h4>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
                        {breakdown.totalGross.toFixed(2)} € 
                        <span style={{ fontSize: '14px', fontWeight: 'normal', marginLeft: '8px' }}>
                          (inkl. MwSt., {form.qty} Stück)
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#6c757d', marginTop: '4px' }}>
                        Einzelpreis: {breakdown.grossPerUnit.toFixed(2)} € brutto | {breakdown.netPerUnit.toFixed(2)} € netto
                      </div>
                    </div>

                    {/* Data-Based Price (if available) */}
                    {price.eur_sell_gross > 0 && (
                      <div style={{ 
                        paddingTop: '16px', 
                        borderTop: '1px solid #dee2e6',
                        marginTop: '16px'
                      }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#007bff' }}>Datenbank-Preis:</h4>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                          {(price.eur_sell_gross * form.qty).toFixed(2)} €
                          <span style={{ fontSize: '14px', fontWeight: 'normal', marginLeft: '8px' }}>
                            (inkl. MwSt., {form.qty} Stück)
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', color: '#6c757d', marginTop: '4px' }}>
                          Einzelpreis: {price.eur_sell_gross.toFixed(2)} € brutto | {price.eur_sell_net.toFixed(2)} € netto
                        </div>
                      </div>
                    )}

                    {/* Show message if no data-based price available */}
                    {price.eur_sell_gross === 0 && (
                      <div style={{ 
                        paddingTop: '16px', 
                        borderTop: '1px solid #dee2e6',
                        marginTop: '16px',
                        fontSize: '14px',
                        color: '#6c757d'
                      }}>
                        <span>📋 Für eine detaillierte Preisberechnung kontaktieren Sie uns.</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Technical Validation - Show all errors prominently */}
            {validation.errors.length > 0 && (
              <div style={{
                padding: '16px',
                backgroundColor: '#fee2e2',
                border: '2px solid #dc2626',
                borderRadius: '8px',
                marginTop: '16px'
              }}>
                <div style={{ 
                  fontWeight: '600', 
                  fontSize: '16px',
                  color: '#991b1b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>🚫</span>
                  <span>Technische Fehler - Konfiguration nicht zulässig</span>
                </div>
                <ul style={{ 
                  margin: '0', 
                  paddingLeft: '24px',
                  color: '#991b1b',
                  lineHeight: '1.6'
                }}>
                  {validation.errors.map((error, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{error}</li>
                  ))}
                </ul>
                <div style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#7f1d1d'
                }}>
                  💡 Bitte passen Sie die Maße, das Material oder die Öffnungsart an, um fortzufahren.
                </div>
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

            {checkoutError && (
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                borderRadius: '6px',
                border: '1px solid #f5c6cb'
              }}>
                <strong>Fehler beim Checkout:</strong> {checkoutError}
              </div>
            )}

            {/* Show checkout button if basic configuration is complete (excluding customer data) AND no validation errors */}
            {(parsed.success || (!parsed.success && parsed.error?.issues.every(issue => 
              issue.path.some(p => typeof p === 'string' && p.startsWith('customer'))
            ))) && validation.errors.length === 0 ? (
              <button
                onClick={handleCheckoutClick}
                disabled={isCheckoutLoading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: isCheckoutLoading ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: isCheckoutLoading ? 'not-allowed' : 'pointer',
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isCheckoutLoading && (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                )}
                {isCheckoutLoading ? 'Wird geladen...' : 'Jetzt bestellen'}
              </button>
            ) : validation.errors.length > 0 ? (
              <div style={{
                padding: '12px 24px',
                backgroundColor: '#fecaca',
                color: '#991b1b',
                border: '2px solid #dc2626',
                borderRadius: '6px',
                fontSize: '16px',
                marginTop: '16px',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                ⛔ Bestellung nicht möglich - Bitte korrigieren Sie die technischen Fehler
              </div>
            ) : null}
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

      {/* Customer Data Modal */}
      {showCustomerDataModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Kundendaten eingeben</h2>
              <button
                onClick={() => setShowCustomerDataModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3>Ihre Kontaktdaten</h3>
              <div className="grid" style={{ gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div>
                  <label htmlFor="modalCustomerFirstName">Vorname *</label>
                  <input
                    id="modalCustomerFirstName"
                    type="text"
                    value={form.customerFirstName}
                    onChange={(e) => setK('customerFirstName', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="Ihr Vorname"
                  />
                </div>
                <div>
                  <label htmlFor="modalCustomerLastName">Nachname *</label>
                  <input
                    id="modalCustomerLastName"
                    type="text"
                    value={form.customerLastName}
                    onChange={(e) => setK('customerLastName', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="Ihr Nachname"
                  />
                </div>
                <div>
                  <label htmlFor="modalCustomerEmail">E-Mail *</label>
                  <input
                    id="modalCustomerEmail"
                    type="email"
                    value={form.customerEmail}
                    onChange={(e) => setK('customerEmail', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>
                <div>
                  <label htmlFor="modalCustomerPhone">Telefon *</label>
                  <input
                    id="modalCustomerPhone"
                    type="tel"
                    value={form.customerPhone}
                    onChange={(e) => setK('customerPhone', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              <h3 style={{ marginTop: '24px' }}>Rechnungsadresse</h3>
              <div className="grid" style={{ gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="modalCustomerStreet">Straße und Hausnummer *</label>
                  <input
                    id="modalCustomerStreet"
                    type="text"
                    value={form.customerStreet}
                    onChange={(e) => setK('customerStreet', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="Musterstraße 123"
                  />
                </div>
                <div>
                  <label htmlFor="modalCustomerZip">PLZ *</label>
                  <input
                    id="modalCustomerZip"
                    type="text"
                    value={form.customerZip}
                    onChange={(e) => setK('customerZip', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <label htmlFor="modalCustomerCity">Stadt *</label>
                  <input
                    id="modalCustomerCity"
                    type="text"
                    value={form.customerCity}
                    onChange={(e) => setK('customerCity', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="Musterstadt"
                  />
                </div>
                <div>
                  <label htmlFor="modalCustomerCountry">Land</label>
                  <select
                    id="modalCustomerCountry"
                    value={form.customerCountry}
                    onChange={(e) => setK('customerCountry', e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="Deutschland">Deutschland</option>
                    <option value="Österreich">Österreich</option>
                    <option value="Schweiz">Schweiz</option>
                  </select>
                </div>
              </div>

              {!parsed.success && (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  backgroundColor: '#f8d7da', 
                  color: '#721c24', 
                  borderRadius: '6px',
                  border: '1px solid #f5c6cb'
                }}>
                  <strong>Bitte korrigieren Sie folgende Fehler:</strong>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                    {parsed.error?.issues
                      .filter(issue => issue.path.some(p => typeof p === 'string' && p.startsWith('customer')))
                      .map((issue, i) => (
                        <li key={i}>{issue.message}</li>
                      ))}
                  </ul>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowCustomerDataModal(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleCustomerDataSubmit}
                  disabled={isCheckoutLoading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: isCheckoutLoading ? '#6c757d' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isCheckoutLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isCheckoutLoading && (
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                  )}
                  {isCheckoutLoading ? 'Wird geladen...' : 'Zur Bezahlung'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}