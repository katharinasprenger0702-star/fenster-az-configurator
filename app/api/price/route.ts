import { NextRequest } from "next/server";
import pricesDataJson from "@/preise_kompakt.json";

// Typisierung fix: String-Key-Objekt
const pricesData: Record<string, number[][]> = pricesDataJson;

/**
 * Preis-Suchfunktion für JSON-Struktur wie preise_kompakt.json
 * @param product Produktname (String, exakt wie JSON-Key)
 * @param width Breite (Number)
 * @param height Höhe (Number)
 * @returns Preis (Number) | null
 */
function findPrice(product: string, width: number, height: number): number | null {
  const entries = pricesData[product];
  if (!entries) return null;
  // Finde das passende Tupel [width, height, price]
  const match = entries.find(([w, h]) => Number(w) === Number(width) && Number(h) === Number(height));
  return match ? match[2] : null;
}

export async function POST(request: NextRequest) {
  const { product, width_mm, height_mm } = await request.json();

  // Robust: Optionale Normalisierung des Produkt-Namens
  const prodKey = Object.keys(pricesData).find(
    key => key.trim().toLowerCase() === product.trim().toLowerCase()
  );
  const priceNet = prodKey ? findPrice(prodKey, width_mm, height_mm) : null;

  let response = { price: null };
  if (priceNet !== null) {
    const priceGross = Math.round(priceNet * 1.19 * 100) / 100;
    response.price = {
      net: priceNet,
      gross: priceGross,
      currency: "EUR"
    };
  }

  return Response.json(response);
}