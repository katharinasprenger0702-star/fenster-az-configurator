import Link from "next/link";

export default function Home() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      {/* HERO */}
      <section className="card" style={{ 
        padding: '80px 60px', 
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0891b2 25%, #0d9488 50%, #059669 75%, #047857 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <p className="kicker" style={{ 
            color: 'rgba(255,255,255,0.95)', 
            marginBottom: 20,
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Fenstermann24.de · eine Marke der AZ Fenster und Türen GmbH
          </p>
          <h1 style={{ 
            marginTop: 8, 
            color: 'white',
            background: 'none',
            WebkitBackgroundClip: 'unset',
            WebkitTextFillColor: 'unset',
            backgroundClip: 'unset',
            fontSize: '4rem',
            fontWeight: '900',
            lineHeight: '1.1',
            textShadow: '0 4px 8px rgba(0,0,0,0.2)',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Fenster & Türen direkt online konfigurieren
          </h1>
          <p style={{ 
            maxWidth: 800, 
            fontSize: '1.35rem',
            color: 'rgba(255,255,255,0.95)',
            margin: '0 auto 48px auto',
            lineHeight: 1.7,
            fontWeight: '400'
          }}>
            Qualität vom Fachbetrieb: PVC, Aluminium und Holz – individuell nach Maß,
            mit sofortiger Preisberechnung. Lieferung & Montage auf Wunsch.
          </p>

          <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn" href="/fenster-konfigurator" style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#0ea5e9',
              fontSize: '1.2rem',
              padding: '20px 40px',
              fontWeight: '800',
              borderRadius: '16px',
              boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
              border: 'none'
            }}>
              🚀 Jetzt konfigurieren
            </Link>
            <a className="btn btn-secondary" href="#vorteile" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(20px)',
              fontSize: '1.1rem',
              padding: '20px 32px',
              fontWeight: '700'
            }}>
              ✨ Unsere Vorteile
            </a>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", justifyContent: "center" }}>
            <a className="btn btn-secondary" href="tel:+49-[TELEFONNUMMER]" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              fontSize: '1rem',
              padding: '14px 24px'
            }}>
              📞 Direkt anrufen
            </a>
            <a className="btn btn-secondary" href="mailto:info@fenstermann24.de" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              fontSize: '1rem',
              padding: '14px 24px'
            }}>
              ✉ E-Mail Kontakt
            </a>
          </div>

          <ul className="trust" aria-label="Vertrauen" style={{ 
            justifyContent: 'center',
            marginTop: 48,
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: 0,
            margin: '48px 0 0 0'
          }}>
            <li style={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✓</span> Fachgerechte Montage
            </li>
            <li style={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✓</span> Faire Festpreise
            </li>
            <li style={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✓</span> Beratung durch Profis
            </li>
          </ul>
        </div>
      </section>

      {/* PRODUKTTEASER */}
      <section className="card">
        <h2>Produkte</h2>
        <div className="tiles">
          <div className="tile">
            <div className="tile-icon">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                {/* 3D Window frame with depth */}
                <rect x="6" y="10" width="52" height="44" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.15)"/>
                <rect x="8" y="12" width="48" height="40" rx="2" fill="rgba(255,255,255,0.25)"/>
                
                {/* Glass panes with 3D effect */}
                <rect x="10" y="14" width="21" height="17" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <rect x="33" y="14" width="21" height="17" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <rect x="10" y="33" width="21" height="17" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <rect x="33" y="33" width="21" height="17" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                
                {/* Window cross bars with shadow */}
                <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="3"/>
                <line x1="10" y1="31" x2="54" y2="31" stroke="currentColor" strokeWidth="3"/>
                
                {/* 3D Window handle */}
                <circle cx="46" cy="42" r="3" fill="currentColor" opacity="0.9"/>
                <rect x="40" y="40" width="8" height="4" rx="2" fill="currentColor" opacity="0.8"/>
                
                {/* Reflection effects */}
                <path d="M12 16 L18 16 L15 25 L12 25 Z" fill="rgba(255,255,255,0.6)" opacity="0.7"/>
                <path d="M35 16 L41 16 L38 25 L35 25 Z" fill="rgba(255,255,255,0.6)" opacity="0.7"/>
              </svg>
            </div>
            <h3>Fenster</h3>
            <p>Wärmedämmung, Schallschutz und Sicherheit – individuell nach Maß.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Fenster konfigurieren</Link>
          </div>
          <div className="tile">
            <div className="tile-icon">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                {/* 3D Door frame */}
                <rect x="8" y="6" width="48" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.15)"/>
                <rect x="10" y="8" width="44" height="48" rx="2" fill="rgba(255,255,255,0.25)"/>
                
                {/* Door panels with 3D depth */}
                <rect x="12" y="12" width="18" height="40" rx="2" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <rect x="32" y="12" width="18" height="40" rx="2" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                
                {/* Door details */}
                <rect x="14" y="16" width="14" height="8" rx="1" fill="rgba(255,255,255,0.3)"/>
                <rect x="34" y="16" width="14" height="8" rx="1" fill="rgba(255,255,255,0.3)"/>
                <rect x="14" y="28" width="14" height="20" rx="1" fill="rgba(255,255,255,0.3)"/>
                <rect x="34" y="28" width="14" height="20" rx="1" fill="rgba(255,255,255,0.3)"/>
                
                {/* Door handles */}
                <circle cx="26" cy="34" r="2.5" fill="currentColor"/>
                <circle cx="36" cy="34" r="2.5" fill="currentColor"/>
                
                {/* Glass panels in doors */}
                <rect x="16" y="18" width="10" height="6" fill="rgba(255,255,255,0.6)" opacity="0.8"/>
                <rect x="36" y="18" width="10" height="6" fill="rgba(255,255,255,0.6)" opacity="0.8"/>
                
                {/* 3D shadow effect */}
                <path d="M54 10 L58 14 L58 58 L54 54 Z" fill="currentColor" opacity="0.2"/>
                <path d="M10 54 L54 54 L58 58 L14 58 Z" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
            <h3>Haustüren</h3>
            <p>Starkes Design, hohe Sicherheit und Top-Energieeffizienz.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Türen konfigurieren</Link>
          </div>
          <div className="tile">
            <div className="tile-icon">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                {/* Service tools in 3D */}
                <rect x="8" y="20" width="48" height="24" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.2)"/>
                
                {/* Measuring tool */}
                <rect x="12" y="8" width="4" height="48" rx="2" fill="currentColor" opacity="0.9"/>
                <rect x="20" y="8" width="4" height="48" rx="2" fill="currentColor" opacity="0.9"/>
                <rect x="48" y="8" width="4" height="48" rx="2" fill="currentColor" opacity="0.9"/>
                
                {/* Measurement marks */}
                <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="28" x2="20" y2="28" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="44" x2="20" y2="44" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="52" x2="24" y2="52" stroke="currentColor" strokeWidth="2"/>
                
                {/* Service badge */}
                <circle cx="40" cy="32" r="12" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="2"/>
                <path d="M34 32 L38 36 L46 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* 3D depth lines */}
                <line x1="56" y1="20" x2="60" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <line x1="56" y1="44" x2="60" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <line x1="8" y1="44" x2="4" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
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
      <section className="card" style={{ 
        textAlign: "center",
        background: 'linear-gradient(135deg, rgba(14,165,233,0.05) 0%, rgba(13,148,136,0.05) 50%, rgba(5,150,105,0.05) 100%)',
        border: '2px solid rgba(14,165,233,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.03) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            fontSize: '2.75rem',
            fontWeight: '900',
            background: 'var(--hero-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '24px'
          }}>
            Starten Sie jetzt mit Ihrer Konfiguration
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--gray-600)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Unverbindlich & kostenlos – Angebot mit nur wenigen Klicks.
          </p>
          <Link className="btn" href="/fenster-konfigurator" style={{
            fontSize: '1.2rem',
            padding: '20px 48px',
            background: 'var(--hero-gradient)',
            boxShadow: '0 16px 32px rgba(14,165,233,0.3)'
          }}>
            🎯 Jetzt konfigurieren
          </Link>
        </div>
      </section>
    </div>
  );
}

