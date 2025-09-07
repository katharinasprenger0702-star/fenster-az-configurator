import { NextRequest } from "next/server";
import pricesData from "@/preise_kompakt.json";

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
  const price = prodKey ? findPrice(prodKey, width_mm, height_mm) : null;

  return Response.json({
    price: price !== null ? price : null
  });
}