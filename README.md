
# Fenster‑AZ Konfigurator (Brand + Pricing)

**Clean‑Room** Beispiel ohne Code Dritter. Enthält: Next.js (App Router, TS), erweiterte Preisengine, Stripe Checkout.

## Schnellstart

1) Installieren:
```bash
npm install
```
2) `.env.local` anlegen (siehe unten).
3) Starten:
```bash
npm run dev
```
4) http://localhost:3000 öffnen

## Umgebungsvariablen (.env.local)

```
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

## Demo‑Kalkulation (kurz)
- Basis €/m²: PVC 240 · Aluminium 420 · Holz 460
- Profil: Standard ×1.00 · ThermoPlus ×1.12 · Premium ×1.22
- Öffnung: Festverglasung ×0.85 · Dreh‑Kipp ×1.10 · Stulp ×1.30
- Verglasung: 2‑fach ×1.00 · 3‑fach ×1.10
- Farbe: Weiß ×1.00 · RAL ×1.10 · Holzdekor ×1.18
- Sicherheit: Basis ×1.00 · RC1N ×1.06 · RC2N ×1.12
- Glas (pro m²): Warme Kante 12 € · Schallschutz 40 € · Sicherheitsglas 55 € · Sonnenschutz 45 €
- Stück: Falzlüfter 35 € · Insektenschutz 59 € · Rollladen 219 € · Kindersicherung 12 €
- Montage/Stk.: Keine 0 € · Standard 139 € · Premium 219 € · Altfenster‑Entsorgung 25 € (nur wenn Montage = Keine)
- Lieferung/Auftrag: Abholung 0 € · Hamburg 49 € · Zone 2 99 € (anteilig pro Stück)

## Hinweise
- Preise sind Platzhalter. Passen Sie `lib/pricing.ts` an (Material, Faktoren, Add-ons, Montage, Lieferung).
- Checkout nutzt Stripe Checkout‑Session in `/app/api/checkout/route.ts`.
- Branding/CI anpassbar in `app/globals.css` & `app/layout.tsx`.
