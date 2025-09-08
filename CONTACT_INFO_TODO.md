# Kontaktdaten-Integration für Fenstermann24.de

## Aufgabe
Die Kontaktdaten (E-Mail, Telefon, Homepage) von https://www.fenster-az.de/ sollen für www.fenstermann24.de übernommen werden.

## Status
✅ **Impressum-Seite strukturiert** - Die Seite `/impressum` wurde mit der korrekten rechtlichen Struktur nach deutschem Recht erstellt.

## Nächste Schritte
1. **Kontaktdaten von fenster-az.de abrufen:**
   - Besuchen Sie https://www.fenster-az.de/impressum
   - Notieren Sie die folgenden Informationen:
     - Telefonnummer
     - E-Mail-Adresse
     - Vollständige Firmenadresse
     - Geschäftsführer/Vertretungsberechtigte Person
     - Handelsregister-Daten (Amtsgericht, HRB-Nummer)
     - USt-IdNr.

2. **Platzhalter in der Impressum-Seite ersetzen:**
   - Datei: `app/impressum/page.tsx`
   - Ersetzen Sie alle Platzhalter in eckigen Klammern `[...]` mit den echten Daten

## Platzhalter-Liste
- `[Straße und Hausnummer]` → Echte Adresse
- `[PLZ Ort]` → Echte PLZ und Ort
- `[TELEFONNUMMER]` → Echte Telefonnummer (Format: +49...)
  - **Hinweis**: Dieser Platzhalter wird sowohl im Impressum als auch im neuen "Direkt anrufen" Button auf der Homepage verwendet
- `[EMAIL]` → Echte E-Mail-Adresse
- `[Geschäftsführer/Vertretungsberechtigte Person]` → Name der verantwortlichen Person
- `[Amtsgericht]` → Zuständiges Amtsgericht
- `[HRB-Nummer]` → Handelsregister-Nummer
- `[USt-IdNr.]` → Umsatzsteuer-Identifikationsnummer
- `[Name]` → Name für Inhaltsverantwortung
- `[Adresse]` → Adresse für Inhaltsverantwortung

## Zusätzliche Hinweise
- Die Homepage-Verlinkung zu www.fenster-az.de ist bereits implementiert
- Telefon- und E-Mail-Links sind als klickbare Links (tel: und mailto:) implementiert
- Die Struktur folgt den deutschen Impressumspflichten nach § 5 TMG