import { NextRequest } from "next/server";
import pricesDataJson from "@/preise_kompakt.json";

// Typisierung für Preis-Antwort
type PriceInfo = {
  net: number;
  gross: number;
  currency: string;
};

type PriceResponse = {
  price: PriceInfo | null;
};

const pricesData: Record<string, number[][]> = pricesDataJson;

function findPrice(product: string, width: number, height: number): number | null {
  const entries = pricesData[product];
  if (!entries) return null;
  const match = entries.find(([w, h]) => Number(w) === Number(width) && Number(h) === Number(height));
  return match ? match[2] : null;
}

export async function POST(request: NextRequest) {
  const { product, width_mm, height_mm } = await request.json();

  const prodKey = Object.keys(pricesData).find(
    key => key.trim().toLowerCase() === product.trim().toLowerCase()
  );
  const priceNet = prodKey ? findPrice(prodKey, width_mm, height_mm) : null;

  let response: PriceResponse;
  if (priceNet !== null) {
    const priceGross = Math.round(priceNet * 1.19 * 100) / 100;
    response = {
      price: {
        net: priceNet,
        gross: priceGross,
        currency: "EUR",
      },
    };
  } else {
    response = { price: null };
  }

  return Response.json(response);
}