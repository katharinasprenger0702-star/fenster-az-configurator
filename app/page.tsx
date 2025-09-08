import Link from "next/link";

export default function Home() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      {/* HERO */}
      <section className="card" style={{ 
        padding: 48, 
        background: 'linear-gradient(135deg, #0a6cf1 0%, #0e7ef5 50%, #3b82f6 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="kicker" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 12 }}>
            Fenstermann24.de · eine Marke der AZ Fenster und Türen GmbH
          </p>
          <h1 style={{ 
            marginTop: 6, 
            color: 'white',
            background: 'none',
            WebkitBackgroundClip: 'unset',
            WebkitTextFillColor: 'unset',
            backgroundClip: 'unset',
            fontSize: '3.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Fenster & Türen direkt online konfigurieren
          </h1>
          <p style={{ 
            maxWidth: 720, 
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.95)',
            margin: '0 auto 32px auto',
            lineHeight: 1.6
          }}>
            Qualität vom Fachbetrieb: PVC, Aluminium und Holz – individuell nach Maß,
            mit sofortiger Preisberechnung. Lieferung & Montage auf Wunsch.
          </p>

          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn" href="/fenster-konfigurator" style={{
              background: 'white',
              color: '#0a6cf1',
              fontSize: '1.1rem',
              padding: '16px 32px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}>
              Jetzt konfigurieren
            </Link>
            <a className="btn btn-secondary" href="#vorteile" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              Unsere Vorteile
            </a>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <a className="btn btn-secondary" href="tel:+49-[TELEFONNUMMER]" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.95rem'
            }}>
              📞 Direkt anrufen
            </a>
            <a className="btn btn-secondary" href="mailto:info@fenstermann24.de" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.95rem'
            }}>
              ✉ E-Mail Kontakt
            </a>
          </div>

          <ul className="trust" aria-label="Vertrauen" style={{ 
            justifyContent: 'center',
            marginTop: 32
          }}>
            <li style={{ color: 'rgba(255,255,255,0.95)' }}>✓ Fachgerechte Montage</li>
            <li style={{ color: 'rgba(255,255,255,0.95)' }}>✓ Faire Festpreise</li>
            <li style={{ color: 'rgba(255,255,255,0.95)' }}>✓ Beratung durch Profis</li>
          </ul>
        </div>
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

