// app/api/price/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'; 
import fs from 'fs'; 
import path from 'path'; 
import * as XLSX from 'xlsx';

type PriceRow = {
  source_file: string;
  sheet: string;
  rowIndex: number;
  cols: Record<string, string | number | null>;
};

function readWorkbookAbs(absFile: string): PriceRow[] {
  const buf = fs.readFileSync(absFile);
  const wb = XLSX.read(buf, { type: 'buffer' });
  const rows: PriceRow[] = [];
  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const aoa = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: null });
    aoa.forEach((obj, idx) => {
      rows.push({
        source_file: path.basename(absFile),
        sheet: sheetName,
        rowIndex: idx,
        cols: obj,
      });
    });
  }
  return rows;
}

function readAllPriceFiles(): PriceRow[] {
  const root = process.cwd();
  const rawDir = path.join(root, 'raw-prices');
  if (!fs.existsSync(rawDir)) return [];
  const files = fs.readdirSync(rawDir)
    .filter(f => f.toLowerCase().endsWith('.xlsx'));
  let all: PriceRow[] = [];
  for (const f of files) {
    const abs = path.join(rawDir, f);
    try {
      all = all.concat(readWorkbookAbs(abs));
    } catch (err) {
      console.error('Fehler beim Lesen', f, err);
    }
  }
  return all;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileFilter = url.searchParams.get('file');
    const sheetFilter = url.searchParams.get('sheet');
    let rows = readAllPriceFiles();
    if (fileFilter) {
      rows = rows.filter(r => r.source_file === fileFilter);
    }
    if (sheetFilter) {
      rows = rows.filter(r => r.sheet === sheetFilter);
    }
    return NextResponse.json({ count: rows.length, rows });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const criteria = await req.json();
    const rows = readAllPriceFiles();

    const width = Number(criteria.width_mm);
    const height = Number(criteria.height_mm);
    const opening = String(criteria.opening ?? '').toLowerCase();

    const keysLC = (r: PriceRow) => Object.keys(r.cols).map(k => k.toLowerCase());
    let candidates: PriceRow[] = rows;

    const openingKey = rows.length > 0 ? keysLC(rows[0]).find(k =>
      k.includes('öffnung') || k.includes('öffnungs') || k.includes('oeffnung') ||
      k.includes('oeffnungs') || k.includes('öffnungstyp') || k.includes('öffnungsart') ||
      k.includes('open') || k.includes('system') || k.includes('öffnung / system')
    ) : null;
    if (openingKey) {
      candidates = rows.filter(r =>
        String(r.cols[openingKey] ?? '').toLowerCase().includes(opening)
      );
    }

    function getNum(r: PriceRow, nameVariants: string[]): number | null {
      for (const n of nameVariants) {
        const key = Object.keys(r.cols).find(k => k.toLowerCase() === n);
        if (key && r.cols[key] != null && !isNaN(Number(r.cols[key]))) {
          return Number(r.cols[key]) as number;
        }
      }
      return null;
    }

    const widthKeys  = ['breite', 'b', 'mm_breite', 'b_mm', 'breite_mm', 'breite (mm)', 'b (mm)', 'b(mm)'];
    const heightKeys = ['höhe', 'hoehe', 'h', 'mm_höhe', 'mm_hoehe', 'h_mm', 'höhe_mm', 'höhe (mm)', 'h (mm)', 'h(mm)'];

    const scored = candidates.map(r => {
      const w = getNum(r, widthKeys);
      const h = getNum(r, heightKeys);
      const dw = w != null && !isNaN(width) ? Math.abs(w - width) : 0;
      const dh = h != null && !isNaN(height) ? Math.abs(h - height) : 0;
      return { r, score: dw + dh };
    });

    scored.sort((a, b) => a.score - b.score);
    const best = scored.length > 0 ? scored[0].r : null;

    const priceKey = best && Object.keys(best.cols).find(k => {
      const kk = k.toLowerCase();
      return kk.includes('preis') || kk.includes('pln') || kk.includes('netto');
    });

    let basePln = (best && priceKey) ? Number((best.cols as any)[priceKey]) : NaN;
    if (isNaN(basePln)) basePln = NaN;

    const discounted = basePln * (1 - 0.43);
    const eurBuyNet = discounted / 4.1894;
    const eurSellNet = eurBuyNet * 2;
    const eurSellGross = eurSellNet * (1 + 0.19);

    return NextResponse.json({
      match: best ?? null,
      price: {
        base_pln: basePln,
        eur_buy_net: eurBuyNet,
        eur_sell_net: eurSellNet,
        eur_sell_gross: eurSellGross
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}