/**
 * Technical validation module for DIN 18055 and anerkannte Regeln der Technik (a.R.d.T.)
 * Implements German building standards for window and door configuration
 * 
 * Supported Standards:
 * - DIN 18055: Windows and doors dimensional limits
 * - DIN 18273: Security requirements for doors and windows against burglary
 * - EN 1627-1630: Burglar resistance classes (RC1N-RC6)
 * - EN 12207: Air permeability classification
 * - EN 12208: Watertightness classification  
 * - EN 12210: Wind load resistance classification
 * - DIN 18040: Barrier-free construction (accessibility)
 * - DIN 4108: Thermal insulation and energy economy
 * - DIN 4109: Sound insulation in buildings
 * - EN 14351-1: Windows and doors performance characteristics
 */

import type { Config, OpeningType, Material, SecurityLevel } from './pricing';

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  complianceInfo: string[];
}

export interface DIN18055Limits {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  maxArea: number;
  maxWeightPerM2?: number;
}

export interface ENStandardsCompliance {
  airPermeability?: string; // EN 12207 classes: AE, A1-A4
  watertightness?: string;  // EN 12208 classes: RE, 1A-9A
  windLoadResistance?: string; // EN 12210 classes: C1-C5, B1-B5, A1-A3
  thermalTransmittance?: number; // U-value W/(m²·K)
  acousticRating?: number; // Rw dB according to DIN 4109
}

export interface DoorAccessibilityRequirements {
  minClearWidth: number; // DIN 18040: 850mm for accessible doors
  maxThreshold: number;  // DIN 18040: max 25mm threshold
  minManeuveringSpace: number; // DIN 18040: min 1200mm x 1200mm
}

export interface SecurityClassification {
  rcClass: string; // EN 1627-1630: RC1N, RC2N, RC2, RC3, RC4, RC5, RC6
  description: string;
  minAttackTime: number; // minutes
  applications: string[];
}

/**
 * DIN 18055 dimensional limits for different opening types
 * Based on German standard for windows and doors
 */
const DIN_18055_LIMITS: Record<string, DIN18055Limits> = {
  'Festverglasung': {
    minWidth: 300,
    maxWidth: 4000,
    minHeight: 300,
    maxHeight: 3000,
    maxArea: 6.0, // m²
  },
  'Dreh-Kipp links': {
    minWidth: 400,
    maxWidth: 1600,
    minHeight: 500,
    maxHeight: 2400,
    maxArea: 2.5, // m²
    maxWeightPerM2: 80, // kg/m²
  },
  'Dreh-Kipp rechts': {
    minWidth: 400,
    maxWidth: 1600,
    minHeight: 500,
    maxHeight: 2400,
    maxArea: 2.5, // m²
    maxWeightPerM2: 80, // kg/m²
  },
  'Doppelflügelig (Stulp)': {
    minWidth: 800,
    maxWidth: 3000,
    minHeight: 500,
    maxHeight: 2400,
    maxArea: 4.0, // m²
    maxWeightPerM2: 70, // kg/m²
  },
  'Dreh': {
    minWidth: 600,
    maxWidth: 1200,
    minHeight: 1700,
    maxHeight: 2500,
    maxArea: 3.0, // m²
    maxWeightPerM2: 80, // kg/m²
  },
  'Kipp': {
    minWidth: 400,
    maxWidth: 1600,
    minHeight: 500,
    maxHeight: 2400,
    maxArea: 2.5, // m²
    maxWeightPerM2: 80, // kg/m²
  },
  'Dreh-Kipp': {
    minWidth: 400,
    maxWidth: 1200,
    minHeight: 1700,
    maxHeight: 2500,
    maxArea: 3.0, // m²
    maxWeightPerM2: 80, // kg/m²
  },
  'Dreh + Dreh-Kipp (Pfosten)': {
    minWidth: 1100,
    maxWidth: 2300,
    minHeight: 1700,
    maxHeight: 2500,
    maxArea: 5.0, // m²
    maxWeightPerM2: 70, // kg/m²
  },
  'Dreh + Dreh-Kipp (Stulp)': {
    minWidth: 1100,
    maxWidth: 2300,
    minHeight: 1700,
    maxHeight: 2500,
    maxArea: 5.0, // m²
    maxWeightPerM2: 70, // kg/m²
  },
  'Schiebetür F+KS': {
    minWidth: 1500,
    maxWidth: 3000,
    minHeight: 1700,
    maxHeight: 2400,
    maxArea: 6.0, // m²
    maxWeightPerM2: 60, // kg/m²
  },
  'Schiebetür FF+KS': {
    minWidth: 1500,
    maxWidth: 3000,
    minHeight: 1700,
    maxHeight: 2400,
    maxArea: 6.0, // m²
    maxWeightPerM2: 60, // kg/m²
  },
  'Schiebetür KS': {
    minWidth: 900,
    maxWidth: 1500,
    minHeight: 1700,
    maxHeight: 2400,
    maxArea: 3.5, // m²
    maxWeightPerM2: 60, // kg/m²
  },
  'Schiebetür Stulp KS+KS': {
    minWidth: 1500,
    maxWidth: 3000,
    minHeight: 1700,
    maxHeight: 2400,
    maxArea: 6.0, // m²
    maxWeightPerM2: 60, // kg/m²
  },
  '1-flügelig': {
    minWidth: 800,
    maxWidth: 1200,
    minHeight: 1900,
    maxHeight: 2400,
    maxArea: 2.8, // m²
    maxWeightPerM2: 100, // kg/m²
  },
  '2-flügelig': {
    minWidth: 1100,
    maxWidth: 2400,
    minHeight: 1900,
    maxHeight: 2400,
    maxArea: 5.5, // m²
    maxWeightPerM2: 90, // kg/m²
  },
};

/**
 * EN 1627-1630 Security classifications with detailed specifications
 * Burglar resistance classes for doors and windows
 */
const EN_SECURITY_CLASSIFICATIONS: Record<SecurityLevel | 'RC2' | 'RC3' | 'RC4', SecurityClassification> = {
  'Basis': {
    rcClass: 'Basis',
    description: 'Grundsicherheit ohne spezifische Widerstandsklasse',
    minAttackTime: 0,
    applications: ['Obergeschosse', 'Niedrigrisikogebiete']
  },
  'RC1N': {
    rcClass: 'RC1N',
    description: 'Grundschutz gegen körperliche Gewalt (ohne Werkzeuge)',
    minAttackTime: 0,
    applications: ['Obergeschosse', 'Bereiche mit geringem Einbruchsrisiko']
  },
  'RC2N': {
    rcClass: 'RC2N',
    description: 'Schutz gegen einfache Werkzeuge (Schraubendreher, Zangen)',
    minAttackTime: 3,
    applications: ['Einfamilienhäuser EG', 'Wohnungen bis 3. OG']
  },
  'RC2': {
    rcClass: 'RC2',
    description: 'Wie RC2N plus Verglasung mit Angriffshemmung',
    minAttackTime: 3,
    applications: ['Einfamilienhäuser', 'Gewerbeobjekte niedriger Gefährdung']
  },
  'RC3': {
    rcClass: 'RC3',
    description: 'Schutz gegen zusätzliche Werkzeuge (Brecheisen, Kuhfuß)',
    minAttackTime: 5,
    applications: ['Gewerbeobjekte', 'Einfamilienhäuser in Risikogebieten']
  },
  'RC4': {
    rcClass: 'RC4',
    description: 'Schutz gegen Sägewerkzeuge, Schlagaxt, Hammer und Meißel',
    minAttackTime: 10,
    applications: ['Hochwertige Objekte', 'Geschäfte', 'Bürogebäude']
  }
};

/**
 * EN 12207 Air permeability classification for doors and windows
 */
const EN_12207_AIR_PERMEABILITY = {
  classes: ['AE', 'A1', 'A2', 'A3', 'A4'],
  requirements: {
    'AE': { maxPermeability: 'Keine Anforderung', description: 'Nur für Prüfzwecke' },
    'A1': { maxPermeability: '50 m³/(h·m²)', description: 'Grundanforderung für Wohngebäude' },
    'A2': { maxPermeability: '27 m³/(h·m²)', description: 'Erhöhte Anforderung' },
    'A3': { maxPermeability: '9 m³/(h·m²)', description: 'Hohe Anforderung für Passivhäuser' },
    'A4': { maxPermeability: '3 m³/(h·m²)', description: 'Höchste Anforderung' }
  }
};

/**
 * EN 12208 Watertightness classification
 */
const EN_12208_WATERTIGHTNESS = {
  classes: ['RE', '1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A'],
  requirements: {
    'RE': { pressure: 0, description: 'Keine Anforderung' },
    '1A': { pressure: 150, description: 'Grundanforderung (150 Pa)' },
    '2A': { pressure: 200, description: 'Standard (200 Pa)' },
    '3A': { pressure: 250, description: 'Erhöht (250 Pa)' },
    '4A': { pressure: 300, description: 'Hoch (300 Pa)' },
    '5A': { pressure: 450, description: 'Sehr hoch (450 Pa)' },
    '6A': { pressure: 600, description: 'Extrem hoch (600 Pa)' }
  }
};

/**
 * EN 12210 Wind load resistance classification
 */
const EN_12210_WIND_LOAD = {
  deflectionClasses: ['C1', 'C2', 'C3', 'C4', 'C5'],
  pressureClasses: ['B1', 'B2', 'B3', 'B4', 'B5'],
  safetyClasses: ['A1', 'A2', 'A3']
};

/**
 * DIN 18040 Accessibility requirements for doors
 */
const DIN_18040_ACCESSIBILITY: DoorAccessibilityRequirements = {
  minClearWidth: 850,      // mm - clear door width
  maxThreshold: 25,        // mm - maximum threshold height
  minManeuveringSpace: 1200 // mm - minimum maneuvering space
};

/**
 * DIN 4108 Thermal insulation requirements
 */
const DIN_4108_THERMAL = {
  doors: {
    maxUValue: 1.8,  // W/(m²·K) for entrance doors
    recommendedUValue: 1.3  // W/(m²·K) recommended for energy efficiency
  }
};

/**
 * DIN 4109 Sound insulation requirements
 */
const DIN_4109_ACOUSTIC = {
  doors: {
    minRw: 32,      // dB minimum for entrance doors
    recommendedRw: 37  // dB recommended for enhanced acoustic comfort
  }
};

/**
 * Security requirements based on a.R.d.T. for different applications
 */
const SECURITY_REQUIREMENTS = {
  groundFloor: {
    minLevel: 'RC1N' as SecurityLevel,
    recommendation: 'RC2N' as SecurityLevel,
  },
  terrace: {
    minLevel: 'RC1N' as SecurityLevel,
    recommendation: 'RC2N' as SecurityLevel,
  },
  upperFloors: {
    minLevel: 'Basis' as SecurityLevel,
    recommendation: 'RC1N' as SecurityLevel,
  },
};

/**
 * Material compatibility matrix based on a.R.d.T.
 */
const MATERIAL_COMPATIBILITY = {
  PVC: {
    maxHeight: 2500, // mm
    maxArea: 3.0, // m²
    recommendedProfiles: ['Standard', 'ThermoPlus', 'Premium'],
    maintenanceRequired: false,
  },
  Aluminium: {
    maxHeight: 3000, // mm
    maxArea: 6.0, // m²
    recommendedProfiles: ['ThermoPlus', 'Premium'],
    maintenanceRequired: false,
  },
  Holz: {
    maxHeight: 2400, // mm
    maxArea: 2.8, // m²
    recommendedProfiles: ['Standard', 'Premium'],
    maintenanceRequired: true,
  },
};

/**
 * Calculate window area in square meters
 */
function calculateArea(width_mm: number, height_mm: number): number {
  return (width_mm / 1000) * (height_mm / 1000);
}

/**
 * Calculate window weight per square meter based on configuration
 */
function calculateWeightPerM2(config: Config): number {
  let baseWeight = 25; // kg/m² base weight

  // Material factor
  switch (config.material) {
    case 'PVC':
      baseWeight += 5;
      break;
    case 'Aluminium':
      baseWeight += 8;
      break;
    case 'Holz':
      baseWeight += 12;
      break;
  }

  // Glazing factor
  if (config.glazing === '3-fach') {
    baseWeight += 15;
  } else {
    baseWeight += 10;
  }

  // Security factor
  switch (config.security) {
    case 'RC1N':
      baseWeight += 5;
      break;
    case 'RC2N':
      baseWeight += 10;
      break;
  }

  // Additional features
  if (config.safetyGlass) baseWeight += 8;
  if (config.soundInsulation) baseWeight += 5;

  return baseWeight;
}

/**
 * Validate window dimensions against DIN 18055
 */
function validateDIN18055Dimensions(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const limits = DIN_18055_LIMITS[config.opening];
  const area = calculateArea(config.width_mm, config.height_mm);
  const errors: string[] = [];
  const warnings: string[] = [];

  // If limits are not defined for this opening type, use default limits
  if (!limits) {
    warnings.push(`Technische Limits für Öffnungsart "${config.opening}" nicht definiert`);
    return { isValid: true, errors, warnings };
  }

  // Check minimum dimensions
  if (config.width_mm < limits.minWidth) {
    errors.push(`Mindestbreite für ${config.opening}: ${limits.minWidth}mm (DIN 18055)`);
  }
  if (config.height_mm < limits.minHeight) {
    errors.push(`Mindesthöhe für ${config.opening}: ${limits.minHeight}mm (DIN 18055)`);
  }

  // Check maximum dimensions
  if (config.width_mm > limits.maxWidth) {
    errors.push(`Maximale Breite für ${config.opening}: ${limits.maxWidth}mm (DIN 18055)`);
  }
  if (config.height_mm > limits.maxHeight) {
    errors.push(`Maximale Höhe für ${config.opening}: ${limits.maxHeight}mm (DIN 18055)`);
  }

  // Check maximum area
  if (area > limits.maxArea) {
    errors.push(`Maximale Fläche für ${config.opening}: ${limits.maxArea}m² (DIN 18055)`);
  }

  // Check weight limits for opening windows
  if (limits.maxWeightPerM2) {
    const weightPerM2 = calculateWeightPerM2(config);
    if (weightPerM2 > limits.maxWeightPerM2) {
      errors.push(`Maximales Gewicht pro m² für ${config.opening}: ${limits.maxWeightPerM2}kg/m² (DIN 18055)`);
    } else if (weightPerM2 > limits.maxWeightPerM2 * 0.9) {
      warnings.push(`Gewicht nähert sich der Grenze von ${limits.maxWeightPerM2}kg/m² (DIN 18055)`);
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate material compatibility based on a.R.d.T.
 */
function validateMaterialCompatibility(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const materialLimits = MATERIAL_COMPATIBILITY[config.material];
  const area = calculateArea(config.width_mm, config.height_mm);
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check height limits for material
  if (config.height_mm > materialLimits.maxHeight) {
    errors.push(`Maximale Höhe für ${config.material}: ${materialLimits.maxHeight}mm (a.R.d.T.)`);
  }

  // Check area limits for material
  if (area > materialLimits.maxArea) {
    errors.push(`Maximale Fläche für ${config.material}: ${materialLimits.maxArea}m² (a.R.d.T.)`);
  }

  // Check profile compatibility
  if (!materialLimits.recommendedProfiles.includes(config.profile)) {
    warnings.push(`Profil ${config.profile} nicht optimal für ${config.material} (a.R.d.T.)`);
  }

  // Special warnings for wood
  if (config.material === 'Holz' && materialLimits.maintenanceRequired) {
    warnings.push('Holzfenster erfordern regelmäßige Wartung (a.R.d.T.)');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate security requirements based on a.R.d.T.
 */
function validateSecurityRequirements(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // For ground floor and terrace doors, recommend higher security
  if (['Balkontüren', 'Schiebetüren', 'Haustüren'].includes(config.product)) {
    if (config.security === 'Basis') {
      warnings.push('Für Türen wird mindestens RC1N Sicherheitsstufe empfohlen (a.R.d.T.)');
    }
  }

  // For large windows, recommend security glass
  const area = calculateArea(config.width_mm, config.height_mm);
  if (area > 2.0 && !config.safetyGlass) {
    warnings.push('Für große Flächen (>2m²) wird Sicherheitsglas empfohlen (a.R.d.T.)');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate technical combinations based on a.R.d.T.
 */
function validateTechnicalCombinations(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Heavy glazing with lightweight materials
  if (config.glazing === '3-fach' && config.material === 'PVC' && config.profile === 'Standard') {
    warnings.push('3-fach Verglasung mit PVC Standard-Profil - ThermoPlus empfohlen (a.R.d.T.)');
  }

  // Large openings with basic security
  const area = calculateArea(config.width_mm, config.height_mm);
  if (area > 1.5 && config.opening.includes('Dreh-Kipp') && config.security === 'Basis') {
    warnings.push('Bei großen öffenbaren Fenstern wird erhöhte Sicherheitsstufe empfohlen (a.R.d.T.)');
  }

  // Sound insulation without appropriate glazing
  if (config.soundInsulation && config.glazing === '2-fach') {
    warnings.push('Für optimalen Schallschutz wird 3-fach Verglasung empfohlen (a.R.d.T.)');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 1627-1630 security requirements for doors (DIN 18273)
 */
function validateDoorSecurityEN1627(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product !== 'Haustüren') {
    return { isValid: true, errors, warnings };
  }

  const securityClass = EN_SECURITY_CLASSIFICATIONS[config.security];
  
  // Validate security level for doors
  if (config.security === 'Basis') {
    warnings.push('Haustüren ohne Widerstandsklasse entsprechen nicht EN 1627-1630 (Einbruchschutz)');
    warnings.push('Empfehlung: Mindestens RC1N für Obergeschosse, RC2N für Erdgeschoss');
  }

  // Check if security level is appropriate for door application
  if (config.security === 'RC1N') {
    warnings.push('RC1N für Haustüren: Nur für Obergeschosse oder niedrige Risikobereiche geeignet');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 12207 air permeability requirements
 */
function validateAirPermeabilityEN12207(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product === 'Haustüren') {
    // For doors, recommend A2 or higher for energy efficiency
    if (!config.warmEdge && config.glazing === '3-fach') {
      warnings.push('Für Energieeffizienz: Warme Kante empfohlen (verbessert Luftdichtheit nach EN 12207)');
    }
    
    // Provide air permeability guidance
    warnings.push('Haustüren sollten mindestens Klasse A2 (≤ 27 m³/(h·m²)) nach EN 12207 erreichen');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 12208 watertightness requirements
 */
function validateWatertightnessEN12208(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product === 'Haustüren') {
    // Standard recommendation for doors
    warnings.push('Haustüren sollten mindestens Klasse 3A (250 Pa) nach EN 12208 (Schlagregenprüfung) erfüllen');
    
    // Material-specific recommendations
    if (config.material === 'Holz') {
      warnings.push('Holztüren: Besondere Aufmerksamkeit auf Dichtungen (EN 12208 Schlagregenbeständigkeit)');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate DIN 18040 accessibility requirements for doors
 */
function validateAccessibilityDIN18040(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product === 'Haustüren') {
    // Check clear width for accessibility
    const clearWidth = config.width_mm - 100; // Approximate clear width (door frame reduction)
    
    if (clearWidth < DIN_18040_ACCESSIBILITY.minClearWidth) {
      warnings.push(`Barrierefreiheit (DIN 18040): Lichte Türbreite sollte ≥ ${DIN_18040_ACCESSIBILITY.minClearWidth}mm sein (aktuell ca. ${clearWidth}mm)`);
    }

    // Provide accessibility guidance
    warnings.push('Für Barrierefreiheit nach DIN 18040: Schwelle max. 25mm, Bewegungsfläche 1200×1200mm vorsehen');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate DIN 4108 thermal insulation requirements
 */
function validateThermalPerformanceDIN4108(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product === 'Haustüren') {
    // Estimate U-value based on configuration
    let estimatedUValue = 2.0; // Base U-value for standard door
    
    if (config.profile === 'ThermoPlus') estimatedUValue *= 0.85;
    if (config.profile === 'Premium') estimatedUValue *= 0.75;
    if (config.glazing === '3-fach') estimatedUValue *= 0.8;
    if (config.warmEdge) estimatedUValue *= 0.95;

    if (estimatedUValue > DIN_4108_THERMAL.doors.maxUValue) {
      warnings.push(`Wärmedämmung (DIN 4108): U-Wert sollte ≤ ${DIN_4108_THERMAL.doors.maxUValue} W/(m²·K) sein (geschätzt: ${estimatedUValue.toFixed(2)})`);
    }

    if (estimatedUValue > DIN_4108_THERMAL.doors.recommendedUValue) {
      warnings.push(`Empfehlung: U-Wert ≤ ${DIN_4108_THERMAL.doors.recommendedUValue} W/(m²·K) für bessere Energieeffizienz`);
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate DIN 4109 acoustic performance requirements
 */
function validateAcousticPerformanceDIN4109(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product === 'Haustüren') {
    let estimatedRw = 30; // Base acoustic rating

    if (config.soundInsulation) estimatedRw += 5;
    if (config.glazing === '3-fach') estimatedRw += 3;
    if (config.safetyGlass) estimatedRw += 2;
    if (config.material === 'Holz') estimatedRw += 2;

    if (estimatedRw < DIN_4109_ACOUSTIC.doors.minRw) {
      warnings.push(`Schallschutz (DIN 4109): Bewertetes Schalldämm-Maß sollte ≥ ${DIN_4109_ACOUSTIC.doors.minRw} dB sein (geschätzt: ${estimatedRw} dB)`);
    }

    if (estimatedRw < DIN_4109_ACOUSTIC.doors.recommendedRw) {
      warnings.push(`Empfehlung: Rw ≥ ${DIN_4109_ACOUSTIC.doors.recommendedRw} dB für erhöhten Schallschutz (Schallschutzglas aktivieren)`);
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 14351-1 performance characteristics
 */
function validatePerformanceEN14351(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.product === 'Haustüren') {
    // EN 14351-1 requires declaration of essential characteristics
    const characteristics = [
      'Widerstandsfähigkeit gegen Windlast (EN 12210)',
      'Schlagregenbeständigkeit (EN 12208)', 
      'Luftdurchlässigkeit (EN 12207)',
      'Wärmedurchgangskoeffizient (EN ISO 10077)',
      'Schalldämmung (EN ISO 10140)'
    ];

    warnings.push('EN 14351-1 erfordert Leistungserklärung für: ' + characteristics.join(', '));
    
    if (config.security !== 'Basis') {
      warnings.push(`Einbruchhemmung nach EN 1627-1630 (${config.security}) ist Teil der Leistungserklärung`);
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Main validation function that checks all DIN 18055 and a.R.d.T. requirements
 * Enhanced with comprehensive EN standards for doors
 */
export function validateTechnicalCompliance(config: Config): ValidationResult {
  const dimensionCheck = validateDIN18055Dimensions(config);
  const materialCheck = validateMaterialCompatibility(config);
  const securityCheck = validateSecurityRequirements(config);
  const combinationCheck = validateTechnicalCombinations(config);
  
  // New EN and DIN standard validations for doors
  const doorSecurityCheck = validateDoorSecurityEN1627(config);
  const airPermeabilityCheck = validateAirPermeabilityEN12207(config);
  const watertightnessCheck = validateWatertightnessEN12208(config);
  const accessibilityCheck = validateAccessibilityDIN18040(config);
  const thermalCheck = validateThermalPerformanceDIN4108(config);
  const acousticCheck = validateAcousticPerformanceDIN4109(config);
  const performanceCheck = validatePerformanceEN14351(config);

  const allErrors = [
    ...dimensionCheck.errors,
    ...materialCheck.errors,
    ...securityCheck.errors,
    ...combinationCheck.errors,
    ...doorSecurityCheck.errors,
    ...airPermeabilityCheck.errors,
    ...watertightnessCheck.errors,
    ...accessibilityCheck.errors,
    ...thermalCheck.errors,
    ...acousticCheck.errors,
    ...performanceCheck.errors,
  ];

  const allWarnings = [
    ...dimensionCheck.warnings,
    ...materialCheck.warnings,
    ...securityCheck.warnings,
    ...combinationCheck.warnings,
    ...doorSecurityCheck.warnings,
    ...airPermeabilityCheck.warnings,
    ...watertightnessCheck.warnings,
    ...accessibilityCheck.warnings,
    ...thermalCheck.warnings,
    ...acousticCheck.warnings,
    ...performanceCheck.warnings,
  ];

  // Generate compliance information (DIN/EN standards should only appear in error messages)
  const complianceInfo: string[] = [];
  
  if (allErrors.length === 0) {
    complianceInfo.push('✓ Konfiguration ist technisch zulässig');
    
    // Add specific compliance notes without referencing standards
    const area = calculateArea(config.width_mm, config.height_mm);
    const limits = DIN_18055_LIMITS[config.opening];
    
    if (limits) {
      complianceInfo.push(`✓ Flächennutzung: ${area.toFixed(2)}m² / ${limits.maxArea}m² erlaubt`);
      
      if (limits.maxWeightPerM2) {
        const weight = calculateWeightPerM2(config);
        complianceInfo.push(`✓ Gewicht: ${weight.toFixed(1)}kg/m² / ${limits.maxWeightPerM2}kg/m² erlaubt`);
      }
    } else {
      complianceInfo.push(`✓ Flächennutzung: ${area.toFixed(2)}m²`);
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    complianceInfo,
  };
}

/**
 * Get recommended configurations based on a.R.d.T. and EN standards
 * Enhanced with door-specific recommendations
 */
export function getRecommendations(config: Config): string[] {
  const recommendations: string[] = [];
  const area = calculateArea(config.width_mm, config.height_mm);

  // Energy efficiency recommendations
  if (config.profile === 'Standard' && area > 1.0) {
    recommendations.push('Für bessere Energieeffizienz: ThermoPlus oder Premium Profil');
  }

  if (config.glazing === '2-fach' && config.material !== 'Holz') {
    recommendations.push('Für optimale Wärmedämmung: 3-fach Verglasung');
  }

  // Security recommendations
  if (
    config.security === 'Basis' &&
    (config.product === 'Haustüren' || ['Balkontüren', 'Schiebetüren', 'Haustüren'].includes(config.product))
) {
    recommendations.push('Für Türen: RC1N oder RC2N Sicherheitsstufe (EN 1627-1630)'); 
  } 
  if (config.security === 'Basis' && config.product === 'Haustüren') {
    recommendations.push('Für Türen: RC1N oder RC2N Sicherheitsstufe (EN 1627-1630)');
  }

  // Door-specific recommendations
  if (config.product === 'Haustüren') {
    recommendations.push('Haustüren: Leistungserklärung nach EN 14351-1 beachten');
    
    if (config.security === 'RC1N') {
      recommendations.push('RC1N nur für Obergeschosse - für EG RC2N empfohlen');
    }
    
    if (!config.warmEdge) {
      recommendations.push('Warme Kante für bessere Energieeffizienz und Luftdichtheit');
    }
    
    if (!config.soundInsulation) {
      recommendations.push('Schallschutzglas für bessere Akustikwerte (DIN 4109)');
    }
    
    if (config.width_mm < 950) {
      recommendations.push('Für Barrierefreiheit (DIN 18040): Türbreite ≥ 950mm empfohlen');
    }
  }

  // Maintenance recommendations
  if (config.material === 'Holz') {
    if (config.product === 'Haustüren') {
      recommendations.push('Holztüren: Regelmäßige Wartung alle 2-3 Jahre, besonders Dichtungen (EN 12208)');
    } else {
      recommendations.push('Holzfenster: Regelmäßige Wartung alle 2-3 Jahre erforderlich');
    }
  }

  // Feature recommendations
  if (!config.warmEdge && config.glazing === '3-fach') {
    recommendations.push('Mit 3-fach Verglasung: Warme Kante für bessere Energieeffizienz');
  }

  return recommendations;
}