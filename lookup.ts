/** Shared lookup that finds nearest price in a given dataset. */
import type { PriceRow } from "./prices.types";

const WIDTH_KEYS = ['breite','width','szer','szerokość','szerokosc','w'];
const HEIGHT_KEYS = ['höhe','hoehe','height','wys','wysokość','wysokosc','h'];

function parseNum(x?: string): number | null {
  if (x === undefined || x === null) return null;
  const v = Number(String(x).replace(',', '.').trim());
  return Number.isFinite(v) ? v : null;
}

function findCol(cols: string[], keys: string[]) {
  const low = cols.map(c => c.toLowerCase());
  const idx = low.findIndex(c => keys.some(k => c.includes(k)));
  return idx >= 0 ? cols[idx] : null;
}

/** Lookup in a given dataset */
export function lookupPriceEURFrom(
  DATA: PriceRow[],
  widthMm: number,
  heightMm: number,
  filter: Record<string,string> = {}
): number | null {
  if (!DATA.length) return null;
  const cols = Object.keys(DATA[0]);
  const wCol = findCol(cols, WIDTH_KEYS);
  const hCol = findCol(cols, HEIGHT_KEYS);
  if (!wCol || !hCol) return null;

  const pool = DATA.filter(r =>
    Object.entries(filter).every(([k,v]) => String((r as any)[k] ?? '').toLowerCase().includes(v.toLowerCase()))
  );

  let best: {row: PriceRow; dist: number} | null = null;
  for (const row of (pool.length ? pool : DATA)) {
    const w = parseNum((row as any)[wCol]);
    const h = parseNum((row as any)[hCol]);
    const p = typeof row.price_eur === 'number' ? row.price_eur : parseNum(String((row as any).price_eur ?? ''));
    if (w == null || h == null || p == null) continue;
    const dist = Math.abs(w - widthMm) + Math.abs(h - heightMm);
    if (!best || dist < best.dist) best = { row, dist };
  }
  return best ? (best.row.price_eur as number) : null;
}
