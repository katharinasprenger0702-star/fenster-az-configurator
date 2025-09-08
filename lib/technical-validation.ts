/**
 * Technical validation module for DIN 18055 and anerkannte Regeln der Technik (a.R.d.T.)
 * Implements German building standards for window and door configuration
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
 * Main validation function that checks all DIN 18055 and a.R.d.T. requirements
 */
export function validateTechnicalCompliance(config: Config): ValidationResult {
  const dimensionCheck = validateDIN18055Dimensions(config);
  const materialCheck = validateMaterialCompatibility(config);
  const securityCheck = validateSecurityRequirements(config);
  const combinationCheck = validateTechnicalCombinations(config);

  const allErrors = [
    ...dimensionCheck.errors,
    ...materialCheck.errors,
    ...securityCheck.errors,
    ...combinationCheck.errors,
  ];

  const allWarnings = [
    ...dimensionCheck.warnings,
    ...materialCheck.warnings,
    ...securityCheck.warnings,
    ...combinationCheck.warnings,
  ];

  // Generate compliance information
  const complianceInfo: string[] = [];
  
  if (allErrors.length === 0) {
    complianceInfo.push('✓ Konfiguration entspricht DIN 18055');
    complianceInfo.push('✓ Konfiguration entspricht a.R.d.T.');
    
    // Add specific compliance notes
    const area = calculateArea(config.width_mm, config.height_mm);
    const limits = DIN_18055_LIMITS[config.opening];
    
    complianceInfo.push(`✓ Flächennutzung: ${area.toFixed(2)}m² / ${limits.maxArea}m² erlaubt`);
    
    if (limits.maxWeightPerM2) {
      const weight = calculateWeightPerM2(config);
      complianceInfo.push(`✓ Gewicht: ${weight.toFixed(1)}kg/m² / ${limits.maxWeightPerM2}kg/m² erlaubt`);
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
 * Get recommended configurations based on a.R.d.T.
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
  if (config.security === 'Basis' && config.product === 'Türe') {
    recommendations.push('Für Türen: RC1N oder RC2N Sicherheitsstufe');
  }

  // Maintenance recommendations
  if (config.material === 'Holz') {
    recommendations.push('Holzfenster: Regelmäßige Wartung alle 2-3 Jahre erforderlich');
  }

  // Feature recommendations
  if (!config.warmEdge && config.glazing === '3-fach') {
    recommendations.push('Mit 3-fach Verglasung: Warme Kante für bessere Energieeffizienz');
  }

  return recommendations;
}