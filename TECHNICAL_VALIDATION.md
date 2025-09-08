# Technische Validierung nach DIN 18055 und a.R.d.T.

## Übersicht

Der Fenstermann24-Konfigurator implementiert eine umfassende technische Validierung nach DIN 18055 (Deutsche Norm für Fenster und Türen) und den anerkannten Regeln der Technik (a.R.d.T.).

**Erweiterte EN-Standards für Haustüren:**
- **EN 1627-1630**: Einbruchhemmung - Widerstandsklassen RC1N bis RC6
- **EN 12207**: Luftdurchlässigkeit - Klassen AE bis A4  
- **EN 12208**: Schlagregenbeständigkeit - Klassen RE bis 9A
- **EN 12210**: Widerstandsfähigkeit gegen Windlast
- **EN 14351-1**: Leistungserklärung für Fenster und Türen
- **DIN 18040**: Barrierefreies Bauen - Zugänglichkeit
- **DIN 4108**: Wärmeschutz und Energieeinsparung
- **DIN 4109**: Schallschutz im Hochbau

## Implementierte Standards

### DIN 18055 - Fenster und Türen
- **Dimensionsbegrenzungen** je nach Öffnungsart
- **Maximale Flächengrößen** für verschiedene Fenstertypen
- **Gewichtsbeschränkungen** für öffenbare Fenster
- **Strukturelle Anforderungen** basierend auf Material und Konstruktion

### Anerkannte Regeln der Technik (a.R.d.T.)
- **Materialkompetenz**: Höhen- und Flächenbeschränkungen je Material
- **Sicherheitsanforderungen**: RC-Klassen für verschiedene Anwendungen
- **Technische Kompatibilität**: Optimale Kombinationen von Profil, Verglasung und Material
- **Wartungshinweise**: Besondere Anforderungen für Holzfenster

### EN 1627-1630 - Einbruchhemmung (Neu für Türen)
- **RC1N**: Grundschutz gegen körperliche Gewalt (Obergeschosse)
- **RC2N**: Schutz gegen einfache Werkzeuge (Einfamilienhäuser EG)
- **RC2**: Wie RC2N plus verstärkte Verglasung
- **RC3**: Schutz gegen Brecheisen und Kuhfuß (Gewerbe)
- **RC4**: Schutz gegen Sägewerkzeuge (Hochwertige Objekte)

### EN 12207 - Luftdurchlässigkeit (Neu für Türen)
- **A1**: ≤ 50 m³/(h·m²) - Grundanforderung Wohngebäude
- **A2**: ≤ 27 m³/(h·m²) - Erhöhte Anforderung (empfohlen)
- **A3**: ≤ 9 m³/(h·m²) - Passivhaus-Standard
- **A4**: ≤ 3 m³/(h·m²) - Höchste Energieeffizienz

### EN 12208 - Schlagregenbeständigkeit (Neu für Türen)
- **3A**: 250 Pa - Standard für Haustüren (empfohlen)
- **4A**: 300 Pa - Erhöhte Exposition
- **5A**: 450 Pa - Sehr hohe Exposition

### DIN 18040 - Barrierefreiheit (Neu für Türen)
- **Lichte Türbreite**: ≥ 850mm erforderlich
- **Schwellenhöhe**: ≤ 25mm maximum
- **Bewegungsfläche**: 1200×1200mm vor der Tür

### DIN 4108 - Wärmeschutz (Erweitert für Türen)
- **U-Wert Türen**: ≤ 1,8 W/(m²·K) Mindestanforderung
- **Empfohlen**: ≤ 1,3 W/(m²·K) für Energieeffizienz

### DIN 4109 - Schallschutz (Erweitert für Türen)
- **Rw-Wert**: ≥ 32 dB Mindestanforderung
- **Empfohlen**: ≥ 37 dB für erhöhten Komfort

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

### Empfehlungssystem
```typescript
getRecommendations(config: Config): string[]
```

- **Energieeffizienz**: Profile und Verglasung
- **Sicherheit**: RC-Klassen für verschiedene Anwendungen
- **Wartung**: Materialspezifische Hinweise
- **Optimierung**: Technische Verbesserungen

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
- a.R.d.T.-Regeln basierend auf Industriestandards
- Umfassende Test-Coverage für alle Validierungsszenarien

### Benutzervalidierung
- Echtzeit-Feedback verhindert ungültige Konfigurationen
- Klare Fehlermeldungen mit konkreten Grenzwerten
- Proaktive Empfehlungen für optimale Konfigurationen