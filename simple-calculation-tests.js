// Test the simple calculation system for all product types
const { calculatePrice } = require('./lib/pricing');

const testConfigurations = [
  // Fenster (Windows)
  {
    product: 'Fenster',
    system: 'IGLO 5',
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
  },
  // Balkontüren (Balcony doors)
  {
    product: 'Balkontüren',
    system: 'IGLO 5',
    width_mm: 1200,
    height_mm: 2000,
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
  },
  // Schiebetüren (Sliding doors)
  {
    product: 'Schiebetüren',
    system: 'IGLO 5',
    width_mm: 1500,
    height_mm: 2000,
    material: 'PVC',
    profile: 'Standard',
    opening: 'Schiebetür links',
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
  },
  // Haustüren (Front doors)
  {
    product: 'Haustüren',
    system: 'IGLO 5',
    width_mm: 1000,
    height_mm: 2100,
    material: 'PVC',
    profile: 'Standard',
    opening: 'Dreh links',
    glazing: '2-fach',
    color: 'Weiß',
    handle: 'Standard',
    security: 'RC2N',
    warmEdge: false,
    soundInsulation: false,
    safetyGlass: true,
    sunProtection: false,
    trickleVent: false,
    insectScreen: false,
    rollerShutter: false,
    childLock: false,
    montage: 'Standard',
    oldWindowDisposal: false,
    delivery: 'Hamburg (Zone 1)',
    qty: 1
  },
  // Rollladen (Shutters)
  {
    product: 'Rollladen',
    system: 'IGLO 5',
    width_mm: 1200,
    height_mm: 1200,
    material: 'PVC',
    profile: 'Standard',
    opening: 'Aufputz',
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
    rollerShutter: true,
    childLock: false,
    montage: 'Keine',
    oldWindowDisposal: false,
    delivery: 'Abholung',
    qty: 1
  },
  // Garagentore (Garage doors)
  {
    product: 'Garagentore',
    system: 'IGLO 5',
    width_mm: 2500,
    height_mm: 2000,
    material: 'PVC',
    profile: 'Standard',
    opening: 'Sektionaltor',
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
    montage: 'Standard',
    oldWindowDisposal: false,
    delivery: 'Abholung',
    qty: 1
  }
];

function testSimpleCalculation(config) {
  try {
    const breakdown = calculatePrice(config);
    return {
      product: config.product,
      success: true,
      calculation: breakdown,
      totalGross: breakdown.totalGross,
      netPerUnit: breakdown.netPerUnit,
      grossPerUnit: breakdown.grossPerUnit
    };
  } catch (error) {
    return {
      product: config.product,
      success: false,
      error: error.message
    };
  }
}

function runSimpleCalculationTests() {
  console.log('🧮 Testing simple price calculations for all product types...\n');
  
  const results = [];
  
  for (const config of testConfigurations) {
    console.log(`Testing ${config.product}...`);
    const result = testSimpleCalculation(config);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ ${result.product}: Calculation successful`);
      console.log(`   💰 Total: €${result.totalGross.toFixed(2)} (${config.qty} unit${config.qty > 1 ? 's' : ''})`);
      console.log(`   📝 Per unit: €${result.grossPerUnit.toFixed(2)} gross | €${result.netPerUnit.toFixed(2)} net`);
    } else {
      console.log(`❌ ${result.product}: ${result.error}`);
    }
    console.log('');
  }
  
  // Summary
  console.log('📊 Summary:');
  console.log(`Total products tested: ${results.length}`);
  console.log(`Successful calculations: ${results.filter(r => r.success).length}`);
  console.log(`Simple calculation working: ${results.filter(r => r.success).length === results.length ? '✅' : '❌'}`);
  
  return results;
}

runSimpleCalculationTests();