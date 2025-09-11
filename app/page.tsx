import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: '#ffffff' }}>
      {/* CLEAN HERO SECTION */}
      <section style={{ 
        padding: '120px 60px 80px 60px', 
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(37, 99, 235, 0.05)',
            color: '#1e40af',
            display: 'inline-block',
            padding: '8px 20px',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '32px',
            border: '1px solid rgba(37, 99, 235, 0.15)'
          }}>
            Fenstermann24.de · Ihr Partner für Qualität seit 25+ Jahren
          </div>
          
          <h1 style={{ 
            fontSize: '4rem',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.03em'
          }}>
            <span style={{ color: '#000000' }}>Fenster & Türen nach Maß</span>
            <br />
            <span style={{ color: '#2563eb' }}>direkt online konfigurieren</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto 48px auto',
            lineHeight: '1.7'
          }}>
            Höchste Qualität vom deutschen Meisterbetrieb. Individuelle Fertigung,
            transparente Preise und fachgerechte Montage – alles aus einer Hand.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: '64px' }}>
            <Link className="btn" href="/fenster-konfigurator" style={{
              background: '#2563eb',
              color: 'white',
              fontSize: '1.1rem',
              padding: '18px 36px',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.2s ease'
            }}>
              Jetzt konfigurieren
            </Link>
            <a href="tel:+49-40-123456789" style={{
              background: 'white',
              color: '#374151',
              fontSize: '1.1rem',
              padding: '18px 36px',
              fontWeight: '600',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}>
              📞 Beratung anrufen
            </a>
          </div>


        </div>
      </section>

      {/* HOW IT WORKS PROCESS */}
      <section style={{ 
        padding: '80px 60px',
        background: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '16px'
            }}>
              So einfach geht's
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Von der ersten Konfiguration bis zur professionellen Montage – 
              in nur wenigen Schritten zu Ihren neuen Fenstern und Türen.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px'
          }}>
            {/* Step 1 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
              }}>
                1
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Selbst ausmessen
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Mit unserer Anleitung messen Sie einfach und präzise selbst aus. 
                Schritt-für-Schritt Hilfe inklusive.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
              }}>
                2
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Online Konfigurieren
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Wählen Sie Material, Größe, Farbe und alle Extras. 
                Sofortige Preisberechnung inklusive.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
              }}>
                3
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Individuelle Fertigung
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Millimetergenaue Produktion in unserer eigenen Manufaktur. 
                Höchste Qualität garantiert.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
              }}>
                4
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Profi-Montage
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Fachgerechte Installation durch unsere qualifizierten Montagepartner. 
                Inklusive Entsorgung der alten Fenster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & BENEFITS BAR */}
      <section style={{ 
        padding: '40px 60px',
        background: '#1e40af',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚚</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Kostenlose Lieferung</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Ab 10 Fenstern deutschlandweit</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚡</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Express-Fertigung</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Lieferung in nur 3-4 Wochen</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛡️</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Herstellergarantie</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Vollumfänglicher Schutz</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💰</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Bestpreis-Garantie</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Faire Preise, keine Nachverhandlung</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔧</div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Profi-Montage</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Qualifizierte Montagepartner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLEAN PRODUCTS SECTION */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Unsere Produkte
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Hochwertige Fenster und Türen in Meisterqualität – 
            individuell gefertigt nach Ihren Wünschen.
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {/* Fenster */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Photo placeholder */}
            <div style={{
              height: '250px',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🪟</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Premium Fenster</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Fenster
              </h3>
              <p style={{ 
                color: '#6b7280',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                Moderne Kunststoff-, Aluminium- und Holzfenster 
                mit bester Wärmedämmung und Sicherheit.
              </p>
              <Link href="/fenster-konfigurator" style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                Fenster konfigurieren
              </Link>
            </div>
          </div>

          {/* Türen */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Photo placeholder */}
            <div style={{
              height: '250px',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🚪</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Designer Haustüren</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Haustüren
              </h3>
              <p style={{ 
                color: '#6b7280',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                Sichere und stilvolle Haustüren mit RC2-Sicherheit 
                und modernem Design.
              </p>
              <Link href="/fenster-konfigurator" style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                Türen konfigurieren
              </Link>
            </div>
          </div>

          {/* Rolladen */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Photo placeholder */}
            <div style={{
              height: '250px',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎛️</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Premium Rolladen</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Rolladen
              </h3>
              <p style={{ 
                color: '#6b7280',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                Moderne Rolladen für optimalen Sonnenschutz, Sicherheit 
                und Energieeffizienz - manuell oder elektrisch.
              </p>
              <Link href="/fenster-konfigurator" style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                Rolladen konfigurieren
              </Link>
            </div>
          </div>

          {/* Garagentor */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Photo placeholder */}
            <div style={{
              height: '250px',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏠</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Hochwertige Garagentore</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Garagentor
              </h3>
              <p style={{ 
                color: '#6b7280',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                Sichere und langlebige Garagentore in verschiedenen Ausführungen - 
                Sektionaltor, Schwingtor oder Rolltor.
              </p>
              <Link href="/fenster-konfigurator" style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                Garagentor konfigurieren
              </Link>
            </div>
          </div>

          {/* Service */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Photo placeholder */}
            <div style={{
              height: '250px',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🔧</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Professionelle Montage</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Service
              </h3>
              <p style={{ 
                color: '#6b7280',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                Kompletter Service von der Beratung bis zur fachgerechten Montage.
              </p>
              <Link href="/impressum" style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS & TECHNOLOGY */}
      <section style={{ 
        padding: '80px 60px',
        background: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Premium Materialien & Technologie
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Modernste Materialien und bewährte Technologien für beste Wärmedämmung, 
              Sicherheit und Langlebigkeit.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* PVC Material */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}>
                🏗️
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Premium PVC-Profile
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                6-Kammer-Profiltechnik mit bis zu 84mm Bautiefe. 
                Optimale Wärmedämmung und Stabilität.
              </p>
              <ul style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                paddingLeft: '16px'
              }}>
                <li>Uw-Wert bis 0,74 W/(m²K)</li>
                <li>RAL-gütegesichert</li>
                <li>100% recyclebar</li>
              </ul>
            </div>

            {/* Glazing Technology */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}>
                🔷
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Hochleistungsglas
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                3-fach Verglasung mit Edelgas-Füllung und warmer Kante 
                für maximale Energieeffizienz.
              </p>
              <ul style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                paddingLeft: '16px'
              }}>
                <li>Ug-Wert bis 0,5 W/(m²K)</li>
                <li>Schallschutz bis 45 dB</li>
                <li>Optional: Einbruchschutz P4A</li>
              </ul>
            </div>

            {/* Hardware & Security */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}>
                🔐
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Sicherheitstechnik
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                Hochwertige Beschläge und Sicherheitstechnik für 
                optimalen Einbruchschutz nach DIN-Norm.
              </p>
              <ul style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                paddingLeft: '16px'
              }}>
                <li>RC2-Sicherheit verfügbar</li>
                <li>Pilzkopfverriegelung</li>
                <li>Sicherheitsglas P4A</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Unser Servicegebiet
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Wir sind deutschlandweit für Sie da – mit Montage-Service 
              und kostenfreier Lieferung ab 10 Fenstern.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '64px',
            alignItems: 'center'
          }}>
            {/* Service info */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '24px'
              }}>
                Deutschlandweiter Service
              </h3>
              
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  Kostenlose Lieferung:
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Ab 10 Fenstern liefern wir deutschlandweit kostenfrei bis zur Bordsteinkante.
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  Montage-Service:
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Für unseren Montageservice greifen wir auf unser flächendeckendes Netzwerk 
                  an qualifizierten Montagepartnern zurück. Wir arbeiten mit Monteuren in ganz Deutschland zusammen.
                </p>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  Messanleitung:
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Detaillierte Anleitung zum Messen für den Kunden. 
                  Einfach und präzise selbst ausmessen.
                </p>
              </div>

              <div style={{ 
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontWeight: '600', color: '#374151' }}>Qualifizierte Partner</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontWeight: '600', color: '#374151' }}>Kostenfreie Lieferung</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontWeight: '600', color: '#374151' }}>Deutschlandweit</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{
              height: '400px',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🗺️</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  Deutschland-Karte
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  Unser Servicegebiet im Überblick
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ 
        padding: '80px 60px',
        background: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Warum Fenstermann24?
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Diese Vorteile machen uns zu Ihrem idealen Partner für Fenster und Türen.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {/* Advantage 1 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: '1.5rem'
              }}>
                💰
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Transparente Preise
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Sofort sehen, was es kostet. Keine versteckten Kosten, 
                faire Festpreise ohne Überraschungen.
              </p>
            </div>

            {/* Advantage 2 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: '1.5rem'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Individuelle Fertigung
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Millimetergenau nach Ihrem Bedarf. Jedes Fenster 
                und jede Tür wird exakt für Sie gefertigt.
              </p>
            </div>

            {/* Advantage 3 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: '1.5rem'
              }}>
                🔧
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Montage vom Profi
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Qualifizierte Montagepartner in ganz Deutschland. Fachgerechte Installation 
                mit Garantie und professioneller Entsorgung.
              </p>
            </div>

            {/* Advantage 4 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#eff6ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: '1.5rem'
              }}>
                📱
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Online Konfigurator
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Einfach online konfigurieren und Preis berechnen. 
                Schnell, unkompliziert und jederzeit verfügbar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.75rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Starten Sie jetzt Ihr Projekt
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Konfigurieren Sie Ihre Wunschfenster und -türen online. 
            Kostenlos, unverbindlich und in nur wenigen Minuten.
          </p>
          
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/fenster-konfigurator" style={{
              background: '#2563eb',
              color: 'white',
              fontSize: '1.2rem',
              padding: '20px 40px',
              fontWeight: '700',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'inline-block'
            }}>
              🚀 Jetzt konfigurieren
            </Link>
            <a href="tel:+49-40-123456789" style={{
              background: 'white',
              color: '#374151',
              fontSize: '1.2rem',
              padding: '20px 40px',
              fontWeight: '700',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'inline-block'
            }}>
              📞 Beratung anrufen
            </a>
          </div>
          
          <p style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            marginTop: '24px'
          }}>
            Unverbindlich & kostenlos – Angebot mit nur wenigen Klicks
          </p>
        </div>
      </section>
    </div>
  );
}

