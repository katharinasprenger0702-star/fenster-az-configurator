# Deployment Guide für Fenstermann24.de

## Übersicht
Diese Next.js-Anwendung ist bereit für die Bereitstellung unter der Domain www.fenstermann24.de.

## Aktuelle Konfiguration

### Produktionsbuild
```bash
npm run build
npm start
```

### Deployment-Konfiguration
- **Framework**: Next.js 14.2.5
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Start Command**: `npm start`

### Vercel Deployment (empfohlen)
Die Anwendung ist für Vercel optimiert (siehe `vercel.json`):
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

### Domain-Konfiguration
Für www.fenstermann24.de:
1. Domain in Vercel oder anderem Provider konfigurieren
2. DNS-Einstellungen anpassen
3. SSL-Zertifikat automatisch generiert

### SEO & Metadata
✅ Optimierte Metadaten für Suchmaschinen
✅ Responsive Viewport-Konfiguration
✅ Strukturierte Daten für bessere Indexierung

### Performance
✅ Static Site Generation (SSG) für bessere Performance
✅ Code-Splitting und Optimierung
✅ Komprimierte Assets

## Bereitstellung prüfen
Nach dem Deployment auf www.fenstermann24.de sollten folgende Elemente sichtbar sein:
- Modernes Design mit Gradient-Hero-Section
- Professionelle Produktkarten
- Funktionsfähiger Konfigurator
- Responsive Design auf allen Geräten