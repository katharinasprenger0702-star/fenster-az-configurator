export type Material = 'PVC' | 'Aluminium' | 'Holz';
export type Glazing = '2-fach' | '3-fach';
export type Color = 'Weiß' | 'RAL' | 'Holzdekor';
export type Product = 'Fenster' | 'Balkontüren' | 'Schiebetüren' | 'Haustüren' | 'Rollladen';
export type Manufacturer = 'DRUTEX' | 'Eko-Okna' | 'Gabit' | 'Inotherm' | 'HOOPE' | 'Schüco';
export type OpeningType = string;
export type SecurityLevel = 'Basis' | 'RC1N' | 'RC2N';
export type Versand = 'Standard' | 'Premium' | 'Express';
export type Lieferzone = 'Abholung' | 'Hamburg (Zone 1)' | 'Zone 2';

// System types for different product categories
export type FensterSystem = 'Kunststoff' | 'Holz' | 'Aluminium' | 'Kunststoff-Aluminium';
export type TuerSystem = 'Kunststoff' | 'Holz' | 'Aluminium' | 'Kunststoff-Aluminium';
export type PSKTuerSystem = 'Kunststoff' | 'Holz' | 'Aluminium' | 'Kunststoff-Aluminium';
export type HebeschiebetuerSystem = 'Kunststoff' | 'Aluminium' | 'Kunststoff-Aluminium';
export type SchiebetuerSystem = PSKTuerSystem | HebeschiebetuerSystem;
export type BalkontuerSystem = 'Kunststoff' | 'Holz' | 'Aluminium' | 'Kunststoff-Aluminium';
export type RollladenSystem = 'Vorbau-Rollladen' | 'Aufsatz-Rollladen';
export type SystemType = FensterSystem | TuerSystem | SchiebetuerSystem | BalkontuerSystem | RollladenSystem;

export interface Config {
  product: Product;
  doorType?: 'PSK-Türen' | 'Hebeschiebetüren';
  system?: SystemType;
  serie?: 'Iglo 5' | 'Standard' | 'Premium';
  width_mm: number;
  height_mm: number;
  material: Material;
  profile: 'Standard' | 'ThermoPlus' | 'Premium';
  opening: OpeningType;
  glazing: Glazing;
  color: Color;
  handle: 'Standard' | 'Premium';
  security: SecurityLevel;
  warmEdge: boolean;
  soundInsulation: boolean;
  safetyGlass: boolean;
  sunProtection: boolean;
  trickleVent: boolean;
  insectScreen: boolean;
  childLock: boolean;
  versand: Versand;
  oldWindowDisposal: boolean;
  delivery: Lieferzone;
  qty: number;
  // Customer information
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerStreet: string;
  customerCity: string;
  customerZip: string;
  customerCountry: string;
}

export interface PriceBreakdown {
  baseAreaM2: number;
  basePrice: number;
  openingFactor: number;
  glazingFactor: number;
  colorFactor: number;
  securityFactor: number;
  perAreaAddons: { label: string; amount: number }[];
  perUnitAddons: { label: string; amount: number }[];
  deliveryPerUnit: number;
  netPerUnit: number;
  vatPerUnit: number;
  grossPerUnit: number;
  totalGross: number;
}

const BASE_PER_M2: Record<Material, number> = {
  PVC: 240,
  Aluminium: 420,
  Holz: 460
};

const PROFILE_FACTORS: Record<string, number> = {
  'Standard': 1.00,
  'ThermoPlus': 1.12,
  'Premium': 1.22
};

const OPENING_FACTORS: Record<OpeningType, number> = {
  'Festverglasung': 0.85,
  'Dreh-Kipp links': 1.10,
  'Dreh-Kipp rechts': 1.10,
  'Doppelflügelig (Stulp)': 1.30
};

const GLAZING_FACTORS: Record<Glazing, number> = {
  '2-fach': 1.00,
  '3-fach': 1.10
};

const COLOR_FACTORS: Record<Color, number> = {
  'Weiß': 1.00,
  'RAL': 1.10,
  'Holzdekor': 1.18
};

const SECURITY_FACTORS: Record<SecurityLevel, number> = {
  'Basis': 1.00,
  'RC1N': 1.06,
  'RC2N': 1.12
};

const HANDLE_SURCHARGE = {
  'Standard': 0,
  'Premium': 15,
};

const PER_AREA_ADDONS = {
  warmEdge: 12,
  soundInsulation: 40,
  safetyGlass: 55,
  sunProtection: 45
};

const PER_UNIT_ADDONS = {
  trickleVent: 35,
  insectScreen: 59,
  childLock: 12
};

const VERSAND_PER_UNIT: Record<Versand, number> = {
  'Standard': 89,
  'Premium': 149,
  'Express': 249
};

const DELIVERY_PER_ORDER: Record<Lieferzone, number> = {
  'Abholung': 0,
  'Hamburg (Zone 1)': 49,
  'Zone 2': 99
};

function minArea(product: Product) {
  return ['Balkontüren', 'Schiebetüren', 'Haustüren'].includes(product) ? 1.5 : 0.5;
}

export function mmToM2(w: number, h: number) {
  return (w / 1000) * (h / 1000);
}

export function calculatePrice(c: Config): PriceBreakdown {
  const areaRaw = mmToM2(c.width_mm, c.height_mm);
  const area = Math.max(minArea(c.product), areaRaw);

  const basePerM2 = BASE_PER_M2[c.material] * (PROFILE_FACTORS[c.profile] ?? 1);
  const openingFactor = OPENING_FACTORS[c.opening] ?? 1;
  const glazingFactor = GLAZING_FACTORS[c.glazing] ?? 1;
  const colorFactor = COLOR_FACTORS[c.color] ?? 1;
  const securityFactor = SECURITY_FACTORS[c.security] ?? 1;
  const handle = HANDLE_SURCHARGE[c.handle];

  const base = area * basePerM2 * openingFactor;
  const factored = base * glazingFactor * colorFactor * securityFactor;

  const perArea: { label: string; amount: number }[] = [];
  if (c.warmEdge) perArea.push({ label: 'Warme Kante', amount: PER_AREA_ADDONS.warmEdge * area });
  if (c.soundInsulation) perArea.push({ label: 'Schallschutzglas', amount: PER_AREA_ADDONS.soundInsulation * area });
  if (c.safetyGlass) perArea.push({ label: 'Sicherheitsglas (VSG/ESG)', amount: PER_AREA_ADDONS.safetyGlass * area });
  if (c.sunProtection) perArea.push({ label: 'Sonnenschutzglas', amount: PER_AREA_ADDONS.sunProtection * area });

  const perUnit: { label: string; amount: number }[] = [];
  if (c.trickleVent) perUnit.push({ label: 'Falzlüfter', amount: PER_UNIT_ADDONS.trickleVent });
  if (c.insectScreen) perUnit.push({ label: 'Insektenschutz', amount: PER_UNIT_ADDONS.insectScreen });
  if (c.childLock) perUnit.push({ label: 'Kindersicherung', amount: PER_UNIT_ADDONS.childLock });

  const versand = VERSAND_PER_UNIT[c.versand] + (c.oldWindowDisposal ? 25 : 0);
  const deliveryTotal = DELIVERY_PER_ORDER[c.delivery];
  const deliveryPerUnit = c.qty > 0 ? deliveryTotal / c.qty : 0;

  let netPerUnit = factored + handle + versand + perUnit.reduce((s,o)=>s+o.amount,0) + perArea.reduce((s,o)=>s+o.amount,0) + deliveryPerUnit;
  netPerUnit = Math.round(netPerUnit * 100) / 100;
  const vatPerUnit = Math.round(netPerUnit * 0.19 * 100) / 100;
  const grossPerUnit = Math.round((netPerUnit + vatPerUnit) * 100) / 100;
  const totalGross = Math.round(grossPerUnit * c.qty * 100) / 100;

  return {
    baseAreaM2: Math.round(area * 100) / 100,
    basePrice: Math.round(base * 100) / 100,
    openingFactor,
    glazingFactor,
    colorFactor,
    securityFactor,
    perAreaAddons: perArea,
    perUnitAddons: perUnit,
    deliveryPerUnit: Math.round(deliveryPerUnit * 100) / 100,
    netPerUnit, vatPerUnit, grossPerUnit, totalGross
  };
}

export function configToLabel(c: Config) {
  return `${c.product} ${c.width_mm}×${c.height_mm} mm, ${c.material} ${c.profile}, ${c.opening}, ${c.glazing} Verglasung, ${c.color}, Griff ${c.handle}, Sicherheit ${c.security}`;
}

// Helper function to get available system options for each product type
export function getSystemsForProduct(product: Product, doorType?: 'PSK-Türen' | 'Hebeschiebetüren'): SystemType[] {
  switch (product) {
    case 'Fenster':
      return ['Kunststoff', 'Holz', 'Aluminium', 'Kunststoff-Aluminium'];
    case 'Balkontüren':
      return ['Kunststoff', 'Holz', 'Aluminium', 'Kunststoff-Aluminium'];
    case 'Schiebetüren':
      if (doorType === 'PSK-Türen') {
        return ['Kunststoff', 'Holz', 'Aluminium', 'Kunststoff-Aluminium'];
      } else if (doorType === 'Hebeschiebetüren') {
        return ['Kunststoff', 'Aluminium', 'Kunststoff-Aluminium'];
      }
      // Default to Hebeschiebetüren systems if no door type selected
      return ['Kunststoff', 'Aluminium', 'Kunststoff-Aluminium'];
    case 'Haustüren':
      return ['Kunststoff', 'Holz', 'Aluminium', 'Kunststoff-Aluminium'];
    case 'Rollladen':
      return ['Vorbau-Rollladen', 'Aufsatz-Rollladen'];
    default:
      return ['Kunststoff', 'Holz', 'Aluminium', 'Kunststoff-Aluminium'];
  }
}

// Helper function to get default system for each product type
export function getDefaultSystemForProduct(product: Product, doorType?: 'PSK-Türen' | 'Hebeschiebetüren'): SystemType {
  const systems = getSystemsForProduct(product, doorType);
  return systems[0];
}