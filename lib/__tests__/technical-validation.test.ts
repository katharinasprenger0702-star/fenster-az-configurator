/**
 * Tests for DIN 18055 and a.R.d.T. technical validation
 */

import { validateTechnicalCompliance, getRecommendations } from '../technical-validation';
import type { Config } from '../pricing';

// Helper function to create a valid base configuration
function createBaseConfig(): Config {
  return {
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
    qty: 1,
  };
}

describe('DIN 18055 Technical Validation', () => {
  test('should validate a compliant configuration', () => {
    const config = createBaseConfig();
    const result = validateTechnicalCompliance(config);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.complianceInfo).toContain('✓ Konfiguration entspricht DIN 18055');
    expect(result.complianceInfo).toContain('✓ Konfiguration entspricht a.R.d.T.');
  });

  test('should reject width exceeding DIN 18055 limits for Dreh-Kipp', () => {
    const config = createBaseConfig();
    config.width_mm = 2000; // Exceeds 1600mm limit for Dreh-Kipp
    
    const result = validateTechnicalCompliance(config);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Maximale Breite für Dreh-Kipp links: 1600mm (DIN 18055)');
  });

  test('should reject height exceeding DIN 18055 limits for Dreh-Kipp', () => {
    const config = createBaseConfig();
    config.height_mm = 2800; // Exceeds 2400mm limit for Dreh-Kipp
    
    const result = validateTechnicalCompliance(config);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Maximale Höhe für Dreh-Kipp links: 2400mm (DIN 18055)');
  });

  test('should reject area exceeding DIN 18055 limits', () => {
    const config = createBaseConfig();
    config.width_mm = 1600; // At limit
    config.height_mm = 1800; // Total area = 2.88m² > 2.5m² limit
    
    const result = validateTechnicalCompliance(config);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Maximale Fläche für Dreh-Kipp links: 2.5m² (DIN 18055)');
  });

  test('should allow Festverglasung with larger dimensions', () => {
    const config = createBaseConfig();
    config.opening = 'Festverglasung';
    config.width_mm = 3000; // Allowed for Festverglasung
    config.height_mm = 2000;
    
    const result = validateTechnicalCompliance(config);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should validate material height limits', () => {
    const config = createBaseConfig();
    config.material = 'PVC';
    config.height_mm = 2800; // Exceeds PVC limit of 2500mm
    
    const result = validateTechnicalCompliance(config);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Maximale Höhe für PVC: 2500mm (a.R.d.T.)');
  });

  test('should provide security recommendations for large windows', () => {
    const config = createBaseConfig();
    config.width_mm = 1600;
    config.height_mm = 1600; // 2.56m² > 2.0m²
    config.security = 'Basis';
    
    const result = validateTechnicalCompliance(config);

    expect(result.warnings).toContain('Für große Flächen (>2m²) wird Sicherheitsglas empfohlen (a.R.d.T.)');
    expect(result.warnings).toContain('Bei großen öffenbaren Fenstern wird erhöhte Sicherheitsstufe empfohlen (a.R.d.T.)');
  });

  test('should provide profile recommendations for heavy glazing', () => {
    const config = createBaseConfig();
    config.glazing = '3-fach';
    config.material = 'PVC';
    config.profile = 'Standard';
    
    const result = validateTechnicalCompliance(config);

    expect(result.warnings).toContain('3-fach Verglasung mit PVC Standard-Profil - ThermoPlus empfohlen (a.R.d.T.)');
  });

  test('should provide maintenance warnings for wood windows', () => {
    const config = createBaseConfig();
    config.material = 'Holz';
    
    const result = validateTechnicalCompliance(config);

    expect(result.warnings).toContain('Holzfenster erfordern regelmäßige Wartung (a.R.d.T.)');
  });
});

describe('Technical Recommendations', () => {
  test('should recommend better profiles for large windows', () => {
    const config = createBaseConfig();
    config.width_mm = 1500;
    config.height_mm = 1500; // 2.25m² > 1.0m²
    config.profile = 'Standard';
    
    const recommendations = getRecommendations(config);

    expect(recommendations).toContain('Für bessere Energieeffizienz: ThermoPlus oder Premium Profil');
  });

  test('should recommend 3-fach glazing for non-wood materials', () => {
    const config = createBaseConfig();
    config.material = 'PVC';
    config.glazing = '2-fach';
    
    const recommendations = getRecommendations(config);

    expect(recommendations).toContain('Für optimale Wärmedämmung: 3-fach Verglasung');
  });

  test('should recommend security for doors', () => {
    const config = createBaseConfig();
    config.product = 'Türe';
    config.security = 'Basis';
    
    const recommendations = getRecommendations(config);

    expect(recommendations).toContain('Für Türen: RC1N oder RC2N Sicherheitsstufe');
  });

  test('should recommend warm edge with 3-fach glazing', () => {
    const config = createBaseConfig();
    config.glazing = '3-fach';
    config.warmEdge = false;
    
    const recommendations = getRecommendations(config);

    expect(recommendations).toContain('Mit 3-fach Verglasung: Warme Kante für bessere Energieeffizienz');
  });
});