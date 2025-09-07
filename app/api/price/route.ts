import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import csvParse from "csv-parse/lib/sync";

/**
 * Robuste Preis-Suchfunktion für das Backend.
 * Vergleicht Werte aus Request und CSV (Produkt, Breite, Höhe).
 */
function calcPrice(prices: any[], product: string, width: number | string, height: number | string) {
  function normalize(val: any) {
    return String(val).trim().toLowerCase();
  }
  const candidates = prices.filter(row =>
    normalize(row.product) === normalize(product) &&
    Number(row.width_mm) === Number(width) &&
    Number(row.height_mm) === Number(height)
  );
  if (candidates.length === 0) return undefined;
  if (candidates.length > 1) {
    console.warn("Mehrere Preistreffer gefunden:", candidates);
  }
  return Number(candidates[0].vk_brutto_eur);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { product, width_mm, height_mm } = body;

  // Passe den Pfad ggf. an!
  const filePath = path.join(process.cwd(), "data", "preise_min.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const prices = csvParse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ",",
  });

  const price = calcPrice(prices, product, width_mm, height_mm);

  return Response.json({
    price: price !== undefined ? price : null
  });
}