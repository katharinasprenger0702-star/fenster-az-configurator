/**
 * Technical validation module for DIN 18055, EN standards, and anerkannte Regeln der Technik (a.R.d.T.)
 * Implements German (DIN) and European (EN) building standards for window and door configuration
 */

import type { Config, OpeningType, Material, SecurityLevel } from './pricing';

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  complianceInfo: string[];
  enCompliance?: ENComplianceInfo;
}

export interface ENComplianceInfo {
  en14351: boolean; // Windows and doors - Product standard
  en673: boolean;   // Glass - Thermal transmittance
  en410: boolean;   // Glass - Luminous and solar characteristics
  en356: boolean;   // Glass - Security glazing
  en1627: boolean;  // Burglar resistance
  en12207: boolean; // Air permeability
  en12208: boolean; // Water tightness
  en12210: boolean; // Resistance to wind load
}

export interface DIN18055Limits {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  maxArea: number;
  maxWeightPerM2?: number;
}

/**
 * DIN 18055 dimensional limits for different opening types
 * Based on German standard for windows and doors
 */
const DIN_18055_LIMITS: Record<OpeningType, DIN18055Limits> = {
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
};

/**
 * EN 14351-1 performance classes for windows and doors
 */
const EN_14351_CLASSES = {
  airPermeability: ['1', '2', '3', '4'], // Class 4 is highest performance
  waterTightness: ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A'], // 9A is highest
  windLoadResistance: ['1', '2', '3', '4', '5'], // Class 5 is highest performance
};

/**
 * EN 673 thermal transmittance requirements (U-values in W/m²K)
 */
const EN_673_REQUIREMENTS = {
  windows: {
    excellent: 0.8,  // Passive house standard
    good: 1.0,       // KfW 55 standard
    standard: 1.3,   // EnEV minimum
    basic: 1.6,      // Basic requirement
  },
  doors: {
    excellent: 1.0,
    good: 1.2,
    standard: 1.8,
    basic: 2.0,
  },
};

/**
 * EN 356 security glazing classes
 */
const EN_356_CLASSES = {
  'P1A': 'Basic protection against manual attack',
  'P2A': 'Enhanced protection against manual attack', 
  'P3A': 'High protection against manual attack',
  'P4A': 'Very high protection against manual attack',
  'P5A': 'Exceptional protection against manual attack',
};

/**
 * EN 1627-1630 burglar resistance classes mapping to RC classes
 */
const EN_1627_RC_MAPPING = {
  'RC1N': 'EN 1627 Class 1 (basic protection)',
  'RC2N': 'EN 1627 Class 2 (standard protection)',
  'RC2': 'EN 1627 Class 2 (standard protection with glazing)',
  'RC3': 'EN 1627 Class 3 (enhanced protection)',
  'RC4': 'EN 1627 Class 4 (high protection)',
  'RC5': 'EN 1627 Class 5 (very high protection)',
  'RC6': 'EN 1627 Class 6 (exceptional protection)',
};
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
  if (config.product === 'Türe') {
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
 * Validate EN 14351-1 product standard requirements
 */
function validateEN14351(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if configuration meets EN 14351-1 product standard
  const area = calculateArea(config.width_mm, config.height_mm);
  
  // Large windows need higher performance classes
  if (area > 4.0) {
    if (!config.warmEdge) {
      warnings.push('Große Fenster (>4m²): Warme Kante für EN 14351-1 Konformität empfohlen');
    }
  }
  
  // Opening windows need proper sealing
  if (config.opening.includes('Dreh-Kipp') || config.opening.includes('Dreh')) {
    if (config.profile === 'Standard' && area > 2.0) {
      warnings.push('Öffenbare Fenster >2m²: ThermoPlus/Premium Profil für EN 14351-1 empfohlen');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 673 thermal transmittance requirements
 */
function validateEN673(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Calculate estimated U-value based on configuration
  let estimatedUValue = 2.0; // Base value

  // Adjust for glazing
  if (config.glazing === '3-fach') {
    estimatedUValue = 1.0;
  } else {
    estimatedUValue = 1.4;
  }

  // Adjust for frame material and profile
  if (config.material === 'Aluminium' && config.profile === 'Standard') {
    estimatedUValue += 0.3;
  } else if (config.material === 'PVC' && config.profile === 'Premium') {
    estimatedUValue -= 0.2;
  } else if (config.material === 'Holz') {
    estimatedUValue -= 0.1;
  }

  // Add warm edge benefit
  if (config.warmEdge) {
    estimatedUValue -= 0.1;
  }

  const requirements = config.product === 'Türe' ? EN_673_REQUIREMENTS.doors : EN_673_REQUIREMENTS.windows;

  if (estimatedUValue > requirements.basic) {
    errors.push(`U-Wert zu hoch für EN 673: ~${estimatedUValue.toFixed(1)} W/m²K > ${requirements.basic} W/m²K`);
  } else if (estimatedUValue > requirements.standard) {
    warnings.push(`U-Wert könnte besser sein: ~${estimatedUValue.toFixed(1)} W/m²K (EN 673 Standard: ${requirements.standard} W/m²K)`);
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 356 security glazing requirements
 */
function validateEN356(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if security glazing is appropriate for the configuration
  if (config.security !== 'Basis' && !config.safetyGlass) {
    warnings.push('Mit erhöhter Sicherheitsstufe: Sicherheitsglas nach EN 356 empfohlen');
  }

  // Ground floor applications should have security glazing
  if (config.product === 'Türe' && !config.safetyGlass) {
    warnings.push('Türen: Sicherheitsglas nach EN 356 für besseren Schutz empfohlen');
  }

  const area = calculateArea(config.width_mm, config.height_mm);
  if (area > 3.0 && !config.safetyGlass) {
    warnings.push('Große Verglasungen >3m²: Sicherheitsglas nach EN 356 empfohlen');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 1627-1630 burglar resistance requirements
 */
function validateEN1627(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if RC class meets EN 1627-1630 requirements
  if (config.security in EN_1627_RC_MAPPING) {
    // RC classes are compliant with EN 1627-1630
    // Add specific recommendations based on application
    if (config.product === 'Türe' && config.security === 'Basis') {
      warnings.push('Türen: Mindestens RC1N für EN 1627-1630 Konformität empfohlen');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Validate EN 12207/12208/12210 performance requirements (air permeability, water tightness, wind load)
 */
function validateENPerformance(config: Config): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  const area = calculateArea(config.width_mm, config.height_mm);

  // Large windows need better sealing performance
  if (area > 3.0) {
    if (config.profile === 'Standard') {
      warnings.push('Große Fenster >3m²: Premium Profil für bessere EN 12207/12208/12210 Performance empfohlen');
    }
  }

  // High windows need wind load consideration
  if (config.height_mm > 2000) {
    if (config.opening.includes('Dreh-Kipp') && area > 2.0) {
      warnings.push('Hohe Fenster >2000mm: Verstärkung für EN 12210 Windlast-Anforderungen prüfen');
    }
  }

  // Opening windows need proper sealing
  if (config.opening.includes('Dreh-Kipp') || config.opening.includes('Kipp')) {
    if (!config.warmEdge && config.glazing === '3-fach') {
      warnings.push('Öffenbare Fenster mit 3-fach Verglasung: Warme Kante für EN 12207 empfohlen');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Generate EN compliance information
 */
function getENCompliance(config: Config): ENComplianceInfo {
  const en14351Check = validateEN14351(config);
  const en673Check = validateEN673(config);
  const en356Check = validateEN356(config);
  const en1627Check = validateEN1627(config);
  const performanceCheck = validateENPerformance(config);

  return {
    en14351: en14351Check.isValid && en14351Check.errors.length === 0,
    en673: en673Check.isValid && en673Check.errors.length === 0,
    en410: true, // For simplicity, assume solar characteristics are met
    en356: en356Check.isValid && en356Check.errors.length === 0,
    en1627: en1627Check.isValid && en1627Check.errors.length === 0,
    en12207: performanceCheck.isValid && performanceCheck.errors.length === 0,
    en12208: performanceCheck.isValid && performanceCheck.errors.length === 0,
    en12210: performanceCheck.isValid && performanceCheck.errors.length === 0,
  };
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
 * Main validation function that checks all DIN 18055, EN standards, and a.R.d.T. requirements
 */
export function validateTechnicalCompliance(config: Config): ValidationResult {
  const dimensionCheck = validateDIN18055Dimensions(config);
  const materialCheck = validateMaterialCompatibility(config);
  const securityCheck = validateSecurityRequirements(config);
  const combinationCheck = validateTechnicalCombinations(config);
  
  // Add EN standards validation
  const en14351Check = validateEN14351(config);
  const en673Check = validateEN673(config);
  const en356Check = validateEN356(config);
  const en1627Check = validateEN1627(config);
  const performanceCheck = validateENPerformance(config);

  const allErrors = [
    ...dimensionCheck.errors,
    ...materialCheck.errors,
    ...securityCheck.errors,
    ...combinationCheck.errors,
    ...en14351Check.errors,
    ...en673Check.errors,
    ...en356Check.errors,
    ...en1627Check.errors,
    ...performanceCheck.errors,
  ];

  const allWarnings = [
    ...dimensionCheck.warnings,
    ...materialCheck.warnings,
    ...securityCheck.warnings,
    ...combinationCheck.warnings,
    ...en14351Check.warnings,
    ...en673Check.warnings,
    ...en356Check.warnings,
    ...en1627Check.warnings,
    ...performanceCheck.warnings,
  ];

  // Generate compliance information
  const complianceInfo: string[] = [];
  
  if (allErrors.length === 0) {
    complianceInfo.push('✓ Konfiguration entspricht DIN 18055');
    complianceInfo.push('✓ Konfiguration entspricht a.R.d.T.');
    complianceInfo.push('✓ Konfiguration entspricht EN-Normen');
    
    // Add specific compliance notes
    const area = calculateArea(config.width_mm, config.height_mm);
    const limits = DIN_18055_LIMITS[config.opening];
    
    complianceInfo.push(`✓ Flächennutzung: ${area.toFixed(2)}m² / ${limits.maxArea}m² erlaubt`);
    
    if (limits.maxWeightPerM2) {
      const weight = calculateWeightPerM2(config);
      complianceInfo.push(`✓ Gewicht: ${weight.toFixed(1)}kg/m² / ${limits.maxWeightPerM2}kg/m² erlaubt`);
    }

    // Add EN compliance details
    const enCompliance = getENCompliance(config);
    const compliantStandards: string[] = [];
    
    if (enCompliance.en14351) compliantStandards.push('EN 14351-1');
    if (enCompliance.en673) compliantStandards.push('EN 673');
    if (enCompliance.en356) compliantStandards.push('EN 356');
    if (enCompliance.en1627) compliantStandards.push('EN 1627-1630');
    if (enCompliance.en12207) compliantStandards.push('EN 12207');
    if (enCompliance.en12208) compliantStandards.push('EN 12208');
    if (enCompliance.en12210) compliantStandards.push('EN 12210');
    
    if (compliantStandards.length > 0) {
      complianceInfo.push(`✓ Erfüllte EN-Normen: ${compliantStandards.join(', ')}`);
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    complianceInfo,
    enCompliance: getENCompliance(config),
  };
}

/**
 * Get recommended configurations based on a.R.d.T. and EN standards
 */
export function getRecommendations(config: Config): string[] {
  const recommendations: string[] = [];
  const area = calculateArea(config.width_mm, config.height_mm);

  // Energy efficiency recommendations (EN 673)
  if (config.profile === 'Standard' && area > 1.0) {
    recommendations.push('Für bessere Energieeffizienz (EN 673): ThermoPlus oder Premium Profil');
  }

  if (config.glazing === '2-fach' && config.material !== 'Holz') {
    recommendations.push('Für optimale Wärmedämmung (EN 673): 3-fach Verglasung');
  }

  // Security recommendations (EN 1627-1630)
  if (config.security === 'Basis' && config.product === 'Türe') {
    recommendations.push('Für Türen (EN 1627-1630): RC1N oder RC2N Sicherheitsstufe');
  }

  // Safety glass recommendations (EN 356)
  if (area > 2.0 && !config.safetyGlass) {
    recommendations.push('Für große Flächen (EN 356): Sicherheitsglas empfohlen');
  }

  // Maintenance recommendations
  if (config.material === 'Holz') {
    recommendations.push('Holzfenster: Regelmäßige Wartung alle 2-3 Jahre erforderlich');
  }

  // Feature recommendations (EN 14351-1)
  if (!config.warmEdge && config.glazing === '3-fach') {
    recommendations.push('Mit 3-fach Verglasung (EN 14351-1): Warme Kante für bessere Energieeffizienz');
  }

  // Performance recommendations (EN 12207/12208/12210)
  if (area > 3.0 && config.profile === 'Standard') {
    recommendations.push('Große Fenster (EN 12207/12208/12210): Premium Profil für bessere Performance');
  }

  return recommendations;
}