import { NextRequest } from "next/server";
import { lookupPriceEURFrom } from "@/lookup";
import type { PriceRow } from "@/prices.types";

// Typisierung für Preis-Antwort
type PriceInfo = {
  base_pln: number;
  eur_buy_net: number;
  eur_sell_net: number;
  eur_sell_gross: number;
};

type PriceResponse = {
  price: PriceInfo | null;
};

export async function POST(request: NextRequest) {
  const { width_mm, height_mm, DATA, filter } = await request.json();

  if (!DATA || !Array.isArray(DATA)) {
    return Response.json({ price: null });
  }

  // Simplified approach: Find a row that matches our criteria
  let priceEUR: number | null = null;
  
  // First, try to find rows that match the filter
  let filteredData = DATA;
  if (filter && filter.source_file) {
    filteredData = DATA.filter(row => 
      row.source_file && 
      String(row.source_file).toLowerCase().includes(filter.source_file.toLowerCase())
    );
  }
  
  // Look for exact height match first
  const heightMatches = filteredData.filter(row => 
    row['Unnamed: 2'] === String(height_mm) && 
    row.price_eur !== undefined && 
    row.price_eur !== null
  );
  
  if (heightMatches.length > 0) {
    // Take the first match
    priceEUR = heightMatches[0].price_eur;
  } else {
    // Fallback: just find any row with a price in the filtered data
    const anyWithPrice = filteredData.find(row => 
      row.price_eur !== undefined && 
      row.price_eur !== null && 
      row.price_eur > 0
    );
    if (anyWithPrice) {
      priceEUR = anyWithPrice.price_eur;
    }
  }

  let response: PriceResponse;
  if (priceEUR !== null && priceEUR > 0) {
    // Convert EUR price to PLN (assuming exchange rate)
    const exchangeRate = 4.2; // Example rate, should be configurable
    const basePLN = Math.round(priceEUR * exchangeRate * 100) / 100;
    
    // Calculate final prices with markup
    const markup = 1.4; // 40% markup
    const sellNet = Math.round(priceEUR * markup * 100) / 100;
    const sellGross = Math.round(sellNet * 1.19 * 100) / 100; // 19% VAT
    
    response = {
      price: {
        base_pln: basePLN,
        eur_buy_net: priceEUR,
        eur_sell_net: sellNet,
        eur_sell_gross: sellGross,
      },
    };
  } else {
    response = { price: null };
  }

  return Response.json(response);
}