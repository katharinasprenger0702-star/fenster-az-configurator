import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import { berechneVKundEK } from '@/lib/preis-berechnung'; // <--- NEU

export type PriceRow = {
  cols: Record<string, string | number>;
  file: string;
  rowIndex: number;
};

function readAllPriceFiles(): PriceRow[] {
  const priceDir = path.join(process.cwd(), 'data', 'prices');
  const files = fs.readdirSync(priceDir).filter(f => f.endsWith('.xlsx'));
  const rows: PriceRow[] = [];
  for (const file of files) {
    const workbook = XLSX.readFile(path.join(priceDir, file));
    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const sheetRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      for (let i = 0; i < sheetRows.length; i++) {
        rows.push({
          cols: sheetRows[i] as Record<string, string | number>,
          file,
          rowIndex: i,
        });
      }
    }
  }
  return rows;
}

export async function POST(req: Request) {
  try {
    const criteria = await req.json();
    const rows = readAllPriceFiles();

    // Filterung und Auswahl des besten Eintrags
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

    // --- FLEXIBLE VK/EK-BERECHNUNG ---
    const rabatt = criteria.rabatt ?? 0.43;
    const wechselkurs = process.env.KURS_EUR_PLN ? Number(process.env.KURS_EUR_PLN) : 4.1894;
    const aufschlag = criteria.aufschlag ?? 1.0;
    const mwst = 0.19;

    const preis = berechneVKundEK({
      listenpreis_pln: basePln,
      rabatt,
      wechselkurs,
      aufschlag,
      mwst,
    });

    return NextResponse.json({
      match: best ?? null,
      price: preis,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}