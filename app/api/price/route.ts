// app/api/price/route.ts
// Liest ALLE .xlsx aus /raw-prices, parst die Tabellen und gibt normalisierte Zeilen zurück.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'; 
import fs from 'fs'; 
import path from 'path'; 
import * as XLSX from 'xlsx';
/** Ein normalisierter Preisdatensatz (du kannst Felder später erweitern) */ 
type PriceRow = {
  source_file: string;   // Dateiname (z.B. "IGLO 5 - DREH-KIPP.xlsx")
  sheet: string;         // Tabellenblatt
  rowIndex: number;      // 0-basierter Zeilenindex im Blatt
  // Rohspalten -> wir serialisieren jede Zeile als Key/Value (Spaltenname -> Wert)
  cols: Record<string, string | number | null>; 
};
/** Liest eine einzelne Excel-Datei und gibt alle Zeilen aller Blätter normalisiert zurück */ function readWorkbookAbs(absFile: string): PriceRow[] {
  const buf = fs.readFileSync(absFile);
  const wb = XLSX.read(buf, { type: 'buffer' });
  const rows: PriceRow[] = [];
  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    // array of objects, keys = Spaltenüberschriften der ersten Zeile
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
/** Liest alle .xlsx aus /raw-prices (Projektwurzel) */ 
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
/**
 * GET: gibt alle normalisierten Zeilen zurück (für Debug/Import in die App)
 * Optional: ?file=… filtert auf einen bestimmten Dateinamen (exakter Match, inkl. Endung)
 *           ?sheet=… filtert auf ein Tabellenblatt
 */
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
/**
 * POST: (optional) Preis-Lookup.
 * Erwartet JSON-Body mit Kriterien (z.B. width_mm, height_mm, opening, usw.)
 * und gibt die beste Zeile + Preis zurück. Diese Logik kannst du später feinjustieren.
 */
export async function POST(req: Request) {
  try {
    const criteria = await req.json(); // { width_mm, height_mm, opening, ... }
    const rows = readAllPriceFiles();

    // Beispielhafte, einfache Matching-Strategie – bitte an eure Spalten anpassen!
    // Wir suchen z.B. nach Spalten "Breite", "Höhe", "Öffnung" (oder ähnlich).
    const width = Number(criteria.width_mm);
    const height = Number(criteria.height_mm);
    const opening = String(criteria.opening ?? '').toLowerCase();
    // 1) Kandidaten mit Öffnungsart (wenn es eine Öffnungs-Spalte gibt)
    let candidates = rows.filter(r => {
      const keys = Object.keys(r.cols).map(k => k.toLowerCase());
      const openingKey = keys.find(k => k.includes('öffnung') || k.includes('oeffnung') || k.includes('öffnungart') || k.includes('open'));
      if (!openingKey) return true; // keine Spalte => nicht filtern
      const val = String(r.cols[openingKey] ?? '').toLowerCase();
      return val.includes(opening) || opening === '';
    });
    // 2) Nächster Nachbar per Breite/Höhe (wenn diese Spalten vorhanden sind)
    function getNum(r: PriceRow, nameVariants: string[]): number | null {
      for (const n of nameVariants) {
        const key = Object.keys(r.cols).find(k => k.toLowerCase() === n);
        if (key && r.cols[key] != null && !isNaN(Number(r.cols[key]))) return Number(r.cols[key]);
      }
      return null;
    }
    const widthKeys = ['breite', 'b', 'width', 'mm_breite', 'b_mm'];
    const heightKeys = ['höhe', 'hoehe', 'h', 'height', 'mm_höhe', 'mm_hoehe', 'h_mm'];
    // Distanzfunktion (kleinste Abweichung)
    candidates = candidates
      .map(r => {
        const w = getNum(r, widthKeys);
        const h = getNum(r, heightKeys);
        const dw = w != null && !isNaN(width) ? Math.abs(w - width) : 0;
        const dh = h != null && !isNaN(height) ? Math.abs(h - height) : 0;
        return { r, score: dw + dh };
      })
      .sort((a, b) => a.score - b.score)
      .map(x => x.r);
    const best = candidates[0];
    // Preisfeld erraten (du kannst hier hart die Spaltennamen setzen)
    const priceKey =
      best && Object.keys(best.cols).find(k =>
        k.toLowerCase().includes('preis') ||
        k.toLowerCase().includes('pln') ||
        k.toLowerCase().includes('netto')
      );
    let basePln = best && priceKey ? Number(best.cols[priceKey]) : NaN;
    if (!isNaN(basePln)) {
      // Deine Formel: Preis (PLN) -> Rabatt 43% -> / 4,1894 -> EUR
      const discounted = basePln * (1 - 0.43);
      const eur = discounted / 4.1894;
      return NextResponse.json({
        match: best,
        price: {
          base_pln: basePln,
          eur_net: eur,
        },
      });
    }
    return NextResponse.json({ match: best ?? null, price: null });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}

