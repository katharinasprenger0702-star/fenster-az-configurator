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

        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <Link className="btn" href="/fenster-konfigurator">Jetzt konfigurieren</Link>
          <a className="btn btn-secondary" href="#vorteile">Unsere Vorteile</a>
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
            <h3>Fenster</h3>
            <p>Wärmedämmung, Schallschutz und Sicherheit – individuell nach Maß.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Fenster konfigurieren</Link>
          </div>
          <div className="tile">
            <h3>Haustüren</h3>
            <p>Starkes Design, hohe Sicherheit und Top-Energieeffizienz.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Türen konfigurieren</Link>
          </div>
          <div className="tile">
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
          <li><strong>Transparente Preise:</strong> Sofort sehen, was es kostet.</li>
          <li><strong>Individuelle Fertigung:</strong> Millimetergenau nach Ihrem Bedarf.</li>
          <li><strong>Montage vom Profi:</strong> Eigene, geschulte Monteure.</li>
          <li><strong>Regionale Nähe:</strong> Kurze Wege, schnelle Termine.</li>
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

