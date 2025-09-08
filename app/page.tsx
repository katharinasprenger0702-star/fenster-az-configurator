import Link from "next/link";

export default function Home() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      {/* HERO */}
      <section className="card" style={{ padding: 32 }}>
        <p className="kicker">Fenstermann24.de · eine Marke der AZ Fenster und Türen GmbH</p>
        <h1 style={{ marginTop: 6 }}>Fenster & Türen direkt online konfigurieren</h1>
        <p style={{ maxWidth: 720 }}>
          Qualität vom Fachbetrieb: PVC, Aluminium und Holz – individuell nach Maß,
          mit sofortiger Preisberechnung. Lieferung & Montage auf Wunsch.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          <Link className="btn" href="/fenster-konfigurator">Jetzt konfigurieren</Link>
          <a className="btn btn-secondary" href="#vorteile">Unsere Vorteile</a>
          <a className="btn btn-secondary" href="tel:+49-[TELEFONNUMMER]">📞 Direkt anrufen</a>
          <a className="btn btn-secondary" href="mailto:info@fenstermann24.de">✉ E-Mail Kontakt</a>
        </div>

        <ul className="trust" aria-label="Vertrauen">
          <li>✓ Fachgerechte Montage</li>
          <li>✓ Faire Festpreise</li>
          <li>✓ Beratung durch Profis</li>
        </ul>
      </section>

      {/* PRODUKTTEASER */}
      <section className="card">
        <h2>Produkte</h2>
        <div className="tiles">
          <div className="tile">
            <div className="tile-icon">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                {/* Window frame */}
                <rect x="8" y="12" width="48" height="40" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
                {/* Window panes */}
                <rect x="10" y="14" width="22" height="18" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                <rect x="34" y="14" width="22" height="18" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                <rect x="10" y="34" width="22" height="16" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                <rect x="34" y="34" width="22" height="16" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                {/* Window handle */}
                <circle cx="28" cy="38" r="2" fill="currentColor"/>
                {/* Frame details */}
                <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="2"/>
                <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Fenster</h3>
            <p>Wärmedämmung, Schallschutz und Sicherheit – individuell nach Maß.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Fenster konfigurieren</Link>
          </div>
          <div className="tile">
            <div className="tile-icon">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                {/* Door frame */}
                <rect x="16" y="8" width="32" height="48" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
                {/* Door panels */}
                <rect x="18" y="12" width="28" height="16" rx="1" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                <rect x="18" y="32" width="28" height="20" rx="1" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                {/* Door handle */}
                <circle cx="40" cy="38" r="2" fill="currentColor"/>
                {/* Door lock */}
                <rect x="38" y="42" width="4" height="2" rx="1" fill="currentColor"/>
                {/* Decorative elements */}
                <line x1="20" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <line x1="20" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              </svg>
            </div>
            <h3>Haustüren</h3>
            <p>Starkes Design, hohe Sicherheit und Top-Energieeffizienz.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Türen konfigurieren</Link>
          </div>
          <div className="tile">
            <div className="tile-icon">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                {/* Service tools */}
                <rect x="12" y="20" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
                {/* Wrench */}
                <path d="M40 16 L52 28 L48 32 L44 28 L40 32 L36 28 L40 24 L36 20 Z" fill="currentColor"/>
                {/* Screwdriver */}
                <line x1="45" y1="40" x2="52" y2="47" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="45" cy="40" r="2" fill="currentColor"/>
                {/* Measurement ruler */}
                <line x1="16" y1="48" x2="32" y2="48" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="46" x2="16" y2="50" stroke="currentColor" strokeWidth="1"/>
                <line x1="20" y1="47" x2="20" y2="49" stroke="currentColor" strokeWidth="1"/>
                <line x1="24" y1="46" x2="24" y2="50" stroke="currentColor" strokeWidth="1"/>
                <line x1="28" y1="47" x2="28" y2="49" stroke="currentColor" strokeWidth="1"/>
                <line x1="32" y1="46" x2="32" y2="50" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
            <h3>Service</h3>
            <p>Aufmaß, Lieferung, Montage & Altfenster-Entsorgung – aus einer Hand.</p>
            <Link className="btn btn-outline" href="/impressum">Kontakt & Impressum</Link>
          </div>
        </div>
      </section>

      {/* VORTEILE */}
      <section id="vorteile" className="card">
        <h2>Warum Fenstermann24?</h2>
        <ul className="benefits">
          <li>
            <svg className="benefit-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#059669" strokeWidth="2" fill="#d1fae5"/>
              <path d="M12 6v6l4 2" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <strong>Transparente Preise:</strong> Sofort sehen, was es kostet.
            </div>
          </li>
          <li>
            <svg className="benefit-icon" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0369a1" strokeWidth="2" fill="#dbeafe"/>
              <path d="M9 12l2 2 4-4" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <strong>Individuelle Fertigung:</strong> Millimetergenau nach Ihrem Bedarf.
            </div>
          </li>
          <li>
            <svg className="benefit-icon" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" fill="#fee2e2"/>
            </svg>
            <div>
              <strong>Montage vom Profi:</strong> Eigene, geschulte Monteure.
            </div>
          </li>
          <li>
            <svg className="benefit-icon" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#7c3aed" strokeWidth="2" fill="#ede9fe"/>
              <circle cx="12" cy="10" r="3" stroke="#7c3aed" strokeWidth="2"/>
            </svg>
            <div>
              <strong>Regionale Nähe:</strong> Kurze Wege, schnelle Termine.
            </div>
          </li>
        </ul>
      </section>

      {/* CTA unten */}
      <section className="card" style={{ textAlign: "center" }}>
        <h2>Starten Sie jetzt mit Ihrer Konfiguration</h2>
        <Link className="btn" href="/fenster-konfigurator">Jetzt konfigurieren</Link>
        <p className="small">Unverbindlich & kostenlos – Angebot mit nur wenigen Klicks.</p>
      </section>
    </div>
  );
}

