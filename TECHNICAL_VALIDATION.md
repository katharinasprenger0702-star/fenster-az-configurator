# Technische Validierung nach DIN 18055, EN-Normen und a.R.d.T.

## Übersicht

Der Fenstermann24-Konfigurator implementiert eine umfassende technische Validierung nach DIN 18055 (Deutsche Norm für Fenster und Türen), relevanten EN-Normen (Europäische Normen) und den anerkannten Regeln der Technik (a.R.d.T.).

## Implementierte Standards

### DIN 18055 - Fenster und Türen
- **Dimensionsbegrenzungen** je nach Öffnungsart
- **Maximale Flächengrößen** für verschiedene Fenstertypen
- **Gewichtsbeschränkungen** für öffenbare Fenster
- **Strukturelle Anforderungen** basierend auf Material und Konstruktion

### EN-Normen (Europäische Normen)
- **EN 14351-1**: Fenster und Türen - Produktnorm
- **EN 673**: Glas im Bauwesen - Bestimmung des Wärmedurchgangskoeffizienten
- **EN 410**: Glas im Bauwesen - Bestimmung der lichttechnischen und strahlungsphysikalischen Kenngrößen
- **EN 356**: Glas im Bauwesen - Sicherheitsglas
- **EN 1627-1630**: Einbruchhemmung - Anforderungen und Klassifizierung
- **EN 12207**: Luftdurchlässigkeit
- **EN 12208**: Schlagregendichtheit
- **EN 12210**: Widerstand gegen Windlast

### Anerkannte Regeln der Technik (a.R.d.T.)
- **Materialkompetenz**: Höhen- und Flächenbeschränkungen je Material
- **Sicherheitsanforderungen**: RC-Klassen für verschiedene Anwendungen
- **Technische Kompatibilität**: Optimale Kombinationen von Profil, Verglasung und Material
- **Wartungshinweise**: Besondere Anforderungen für Holzfenster

## Validierungsregeln

### Öffnungsartspezifische Limits (DIN 18055)

| Öffnungsart | Min. Breite | Max. Breite | Min. Höhe | Max. Höhe | Max. Fläche | Max. Gewicht |
|-------------|-------------|-------------|-----------|-----------|-------------|--------------|
| Festverglasung | 300mm | 4000mm | 300mm | 3000mm | 6.0m² | - |
| Dreh-Kipp | 400mm | 1600mm | 500mm | 2400mm | 2.5m² | 80kg/m² |
| Doppelflügelig | 800mm | 3000mm | 500mm | 2400mm | 4.0m² | 70kg/m² |

### Materialspezifische Beschränkungen (a.R.d.T.)

| Material | Max. Höhe | Max. Fläche | Empfohlene Profile | Besonderheiten |
|----------|-----------|-------------|-------------------|----------------|
| PVC | 2500mm | 3.0m² | Standard, ThermoPlus, Premium | - |
| Aluminium | 3000mm | 6.0m² | ThermoPlus, Premium | Höhere Tragfähigkeit |
| Holz | 2400mm | 2.8m² | Standard, Premium | Wartung erforderlich |

## Benutzerführung

### Echtzeit-Validierung
- **Sofortige Feedback** bei Eingabe ungültiger Werte
- **Farbkodierte Eingabefelder**: Rot für Fehler, Orange für Warnungen
- **Deaktivierung** des Weiter-Buttons bei technischen Fehlern

### Compliance-Anzeige
- **Technische Konformität**: Grüne Checkmarks für erfüllte Standards
- **Optimierungshinweise**: Orange Warnungen für suboptimale Konfigurationen
- **Empfehlungen**: Blaue Hinweise für Verbesserungen

### Übersichtsseite
- **Detaillierte Konformitätsprüfung** mit allen technischen Details
- **Klare Darstellung** von erfüllten und nicht erfüllten Anforderungen
- **Specific Compliance-Metriken** (Flächennutzung, Gewicht, etc.)

## Technische Implementation

### Validierungslogik
```typescript
validateTechnicalCompliance(config: Config): ValidationResult
```

- **Dimensionsprüfung**: Gegen DIN 18055-Limits
- **Materialkompatibilität**: Technische Machbarkeit
- **Sicherheitsvalidierung**: RC-Klassen und Anwendungsbereich
- **Kombinationsprüfung**: Optimale technische Paarungen
- **EN-Normen-Prüfung**: Europäische Standards für Fenster und Glas
- **Wärmedämmung**: EN 673 Wärmedurchgangskoeffizienten
- **Sicherheitsglas**: EN 356 Klassifizierung
- **Performance**: EN 12207/12208/12210 Dichtheit und Windlast

### Empfehlungssystem
```typescript
getRecommendations(config: Config): string[]
```

- **Energieeffizienz**: Profile und Verglasung (EN 673)
- **Sicherheit**: RC-Klassen für verschiedene Anwendungen (EN 1627-1630)
- **Wartung**: Materialspezifische Hinweise
- **Optimierung**: Technische Verbesserungen nach EN-Standards

## Compliance-Features

### Fehlerbehandlung
- ❌ **Harte Fehler**: Verhindern das Fortfahren (DIN 18055-Verletzungen)
- ⚠️ **Warnungen**: Erlauben Fortfahren mit Hinweisen (a.R.d.T.-Optimierungen)
- 💡 **Empfehlungen**: Proaktive Verbesserungsvorschläge

### Benutzerfreundlichkeit
- **Deutsche Sprache**: Alle Meldungen in verständlichem Deutsch
- **Klare Kategorisierung**: Technische Anforderungen vs. Empfehlungen
- **Visuelle Hervorhebung**: Farbkodierung und Icons für schnelle Erkennung

## Qualitätssicherung

### Technische Validierung
- Alle DIN 18055-Grenzwerte implementiert
- Alle relevanten EN-Normen für Fenster und Glas berücksichtigt
- a.R.d.T.-Regeln basierend auf Industriestandards
- Umfassende Test-Coverage für alle Validierungsszenarien

### Benutzervalidierung
- Echtzeit-Feedback verhindert ungültige Konfigurationen
- Klare Fehlermeldungen mit konkreten Grenzwerten
- Proaktive Empfehlungen für optimale Konfigurationen
- Transparente Anzeige der erfüllten DIN- und EN-Standards