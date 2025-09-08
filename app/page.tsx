import Link from "next/link";

export default function Home() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      {/* HERO WITH BACKGROUND IMAGE */}
      <section className="hero-section" style={{ 
        padding: '100px 60px', 
        background: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
          linear-gradient(135deg, #0ea5e9 0%, #0891b2 25%, #0d9488 50%, #059669 75%, #047857 100%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '32px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
      }}>
        {/* Professional overlay pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
            radial-gradient(circle at 30% 20%, rgba(14,165,233,0.2) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(13,148,136,0.15) 0%, transparent 60%)
          `,
          pointerEvents: 'none'
        }} />
        
        {/* Floating quality indicators */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          background: 'rgba(255,255,255,0.95)',
          color: '#0ea5e9',
          padding: '16px 24px',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          animation: 'float 6s ease-in-out infinite'
        }}>
          🏆 25+ Jahre Erfahrung
        </div>
        
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          background: 'rgba(255,255,255,0.95)',
          color: '#0d9488',
          padding: '16px 24px',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}>
          ✅ TÜV Zertifiziert
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '12%',
          background: 'rgba(255,255,255,0.95)',
          color: '#059669',
          padding: '16px 24px',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          animation: 'float 7s ease-in-out infinite'
        }}>
          🚀 Moderne Technik
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px' }}>
          <p className="kicker" style={{ 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: 20,
            fontSize: '1.2rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
            fontSize: '4.5rem',
            fontWeight: '900',
            lineHeight: '1.1',
            textShadow: '0 6px 12px rgba(0,0,0,0.4)',
            marginBottom: '32px',
            letterSpacing: '-0.02em'
          }}>
            Ihre Traumfenster & Traumtüren
            <br />
            <span style={{ fontSize: '3.5rem', color: '#60a5fa' }}>
              direkt online konfigurieren
            </span>
          </h1>
          <p style={{ 
            maxWidth: 850, 
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.95)',
            margin: '0 auto 48px auto',
            lineHeight: 1.8,
            fontWeight: '500',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Meisterqualität vom Fachbetrieb: PVC, Aluminium und Holz – individuell nach Maß.
            Sofortige Preisberechnung, professionelle Beratung und Montage durch erfahrene Experten.
          </p>

          <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn hero-btn-primary" href="/fenster-konfigurator" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              color: '#0ea5e9',
              fontSize: '1.3rem',
              padding: '24px 48px',
              fontWeight: '900',
              borderRadius: '20px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              border: 'none',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}>
              🏠 Jetzt konfigurieren
            </Link>
            <a className="btn hero-btn-secondary" href="#produkte" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(20px)',
              fontSize: '1.2rem',
              padding: '24px 40px',
              fontWeight: '700',
              borderRadius: '20px',
              boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
            }}>
              📸 Unsere Projekte
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

      {/* PRODUKTTEASER WITH REAL PHOTOGRAPHY */}
      <section id="produkte" className="card">
        <h2>Unsere Produktwelten</h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: 'var(--gray-600)', 
          marginBottom: '48px',
          maxWidth: '800px',
          margin: '0 auto 48px auto'
        }}>
          Entdecken Sie unsere hochwertigen Fenster und Türen in echten Projekten – 
          von der Planung bis zur perfekten Installation.
        </p>
        <div className="product-gallery">
          <div className="product-item">
            <div className="product-image" style={{
              background: `
                linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05)),
                linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)
              `,
              height: '300px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Window illustration */}
              <div style={{
                width: '200px',
                height: '150px',
                background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                border: '4px solid #475569',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '3px',
                  height: '90%',
                  background: '#475569'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  height: '3px',
                  background: '#475569'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255,255,255,0.95)',
                color: '#0ea5e9',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                backdropFilter: 'blur(10px)'
              }}>
                Premium Fenster
              </div>
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                transform: 'translateY(100%)',
                transition: 'transform 0.3s ease'
              }} className="product-overlay">
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '700' }}>
                  Moderne Kunststofffenster
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  3-fach Verglasung, optimale Wärmedämmung
                </p>
              </div>
            </div>
            <h3>Fenster</h3>
            <p>Hochwertige Kunststoff-, Aluminium- und Holzfenster für höchste Ansprüche an Wärmedämmung und Design.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Fenster konfigurieren</Link>
          </div>
          
          <div className="product-item">
            <div className="product-image" style={{
              background: `
                linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05)),
                linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #94a3b8 100%)
              `,
              height: '300px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Door illustration */}
              <div style={{
                width: '120px',
                height: '180px',
                background: 'linear-gradient(145deg, #374151 0%, #475569 100%)',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                border: '3px solid #1f2937'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '10px',
                  right: '10px',
                  height: '30px',
                  background: 'linear-gradient(145deg, #d1d5db 0%, #9ca3af 100%)',
                  borderRadius: '4px'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: '10px',
                  right: '10px',
                  bottom: '20px',
                  background: 'linear-gradient(145deg, #d1d5db 0%, #9ca3af 100%)',
                  borderRadius: '4px'
                }} />
                <div style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '8px',
                  height: '8px',
                  background: '#fbbf24',
                  borderRadius: '50%'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255,255,255,0.95)',
                color: '#0d9488',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                backdropFilter: 'blur(10px)'
              }}>
                Sicherheitstüren
              </div>
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                transform: 'translateY(100%)',
                transition: 'transform 0.3s ease'
              }} className="product-overlay">
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '700' }}>
                  Designer Haustüren
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  RC2 Sicherheit, moderne Optik
                </p>
              </div>
            </div>
            <h3>Haustüren</h3>
            <p>Stilvolle und sichere Haustüren aus verschiedenen Materialien mit modernster Sicherheitstechnik.</p>
            <Link className="btn btn-outline" href="/fenster-konfigurator">Türen konfigurieren</Link>
          </div>
          
          <div className="product-item">
            <div className="product-image" style={{
              background: `
                linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05)),
                linear-gradient(145deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)
              `,
              height: '300px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Service tools illustration */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '120px',
                  background: 'linear-gradient(145deg, #059669 0%, #047857 100%)',
                  borderRadius: '4px',
                  position: 'relative'
                }}>
                  {/* Measuring marks */}
                  <div style={{ position: 'absolute', left: '100%', top: '20%', width: '15px', height: '2px', background: '#047857' }} />
                  <div style={{ position: 'absolute', left: '100%', top: '40%', width: '10px', height: '2px', background: '#047857' }} />
                  <div style={{ position: 'absolute', left: '100%', top: '60%', width: '15px', height: '2px', background: '#047857' }} />
                  <div style={{ position: 'absolute', left: '100%', top: '80%', width: '10px', height: '2px', background: '#047857' }} />
                </div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              </div>
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255,255,255,0.95)',
                color: '#059669',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                backdropFilter: 'blur(10px)'
              }}>
                Komplettservice
              </div>
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                transform: 'translateY(100%)',
                transition: 'transform 0.3s ease'
              }} className="product-overlay">
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '700' }}>
                  Professionelle Montage
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  Von der Beratung bis zur Installation
                </p>
              </div>
            </div>
            <h3>Service</h3>
            <p>Kompletter Service von der Beratung über Aufmaß bis hin zur fachgerechten Montage und Entsorgung.</p>
            <Link className="btn btn-outline" href="/impressum">Kontakt & Impressum</Link>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL SHOWCASE SECTION */}
      <section className="card">
        <h2>Unsere Referenzen</h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: 'var(--gray-600)', 
          marginBottom: '48px'
        }}>
          Überzeugen Sie sich von der Qualität unserer Arbeit – echte Projekte, zufriedene Kunden.
        </p>
        <div className="showcase-grid">
          <div className="showcase-item large">
            <div style={{
              background: `
                linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)),
                linear-gradient(145deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)
              `,
              height: '400px',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Modern house illustration */}
              <div style={{
                width: '300px',
                height: '200px',
                position: 'relative'
              }}>
                {/* House structure */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50px',
                  width: '200px',
                  height: '120px',
                  background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '8px 8px 0 0'
                }} />
                {/* Roof */}
                <div style={{
                  position: 'absolute',
                  bottom: '130px',
                  left: '30px',
                  width: 0,
                  height: 0,
                  borderLeft: '120px solid transparent',
                  borderRight: '120px solid transparent',
                  borderBottom: '60px solid #64748b'
                }} />
                {/* Windows */}
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '80px',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(145deg, #dbeafe 0%, #93c5fd 100%)',
                  border: '2px solid #475569'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  right: '80px',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(145deg, #dbeafe 0%, #93c5fd 100%)',
                  border: '2px solid #475569'
                }} />
                {/* Door */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30px',
                  height: '60px',
                  background: 'linear-gradient(145deg, #374151 0%, #475569 100%)',
                  borderRadius: '4px 4px 0 0'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                background: 'rgba(255,255,255,0.95)',
                padding: '24px',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)'
              }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#0ea5e9', fontSize: '1.4rem' }}>
                  Moderne Villa in München
                </h3>
                <p style={{ margin: '0 0 12px 0', color: 'var(--gray-600)' }}>
                  Komplette Fenstersanierung mit Aluminium-Fenstern
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--gray-500)' }}>
                  <span>🏗️ 45 Fenster</span>
                  <span>⚡ 3 Wochen</span>
                  <span>⭐ 5/5 Sterne</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="showcase-item">
            <div style={{
              background: `
                linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)),
                linear-gradient(145deg, #0d9488 0%, #0f766e 50%, #115e59 100%)
              `,
              height: '280px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Luxury door illustration */}
              <div style={{
                width: '80px',
                height: '140px',
                background: 'linear-gradient(145deg, #374151 0%, #1f2937 100%)',
                borderRadius: '8px',
                position: 'relative',
                border: '3px solid #111827'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '8px',
                  right: '8px',
                  height: '25px',
                  background: 'linear-gradient(145deg, #d1d5db 0%, #9ca3af 100%)',
                  borderRadius: '3px'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '8px',
                  right: '8px',
                  height: '70px',
                  background: 'linear-gradient(145deg, #d1d5db 0%, #9ca3af 100%)',
                  borderRadius: '3px'
                }} />
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '6px',
                  height: '6px',
                  background: '#fbbf24',
                  borderRadius: '50%'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.95)',
                padding: '16px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#0d9488' }}>Luxus Haustür</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                  Eingangsbereich Neubau
                </p>
              </div>
            </div>
          </div>
          
          <div className="showcase-item">
            <div style={{
              background: `
                linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)),
                linear-gradient(145deg, #059669 0%, #047857 50%, #065f46 100%)
              `,
              height: '280px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Floor-to-ceiling window illustration */}
              <div style={{
                width: '120px',
                height: '160px',
                background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                border: '3px solid #475569',
                borderRadius: '4px',
                position: 'relative'
              }}>
                {/* Vertical divider */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '100%',
                  background: '#475569'
                }} />
                {/* Horizontal dividers */}
                <div style={{
                  position: 'absolute',
                  top: '33%',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: '#475569'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '66%',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: '#475569'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.95)',
                padding: '16px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#059669' }}>Bodentiefe Fenster</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                  Wohnzimmer Renovation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM & TRUST SECTION */}
      <section className="card">
        <h2>Ihr Partner für Qualität</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--gray-900)' }}>
              25+ Jahre Erfahrung im Fensterbau
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--gray-600)', marginBottom: '32px' }}>
              Als zertifizierter Fachbetrieb stehen wir für höchste Qualität und professionelle Beratung. 
              Unser erfahrenes Team begleitet Sie von der ersten Idee bis zur perfekten Installation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0ea5e9', marginBottom: '8px' }}>1000+</div>
                <div style={{ color: 'var(--gray-600)', fontWeight: '600' }}>Zufriedene Kunden</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0d9488', marginBottom: '8px' }}>25+</div>
                <div style={{ color: 'var(--gray-600)', fontWeight: '600' }}>Jahre Erfahrung</div>
              </div>
            </div>
          </div>
          <div style={{
            background: `
              linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.05)),
              linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)
            `,
            height: '400px',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Professional team illustration */}
            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}>
              {/* Worker 1 */}
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(145deg, #0ea5e9 0%, #0284c7 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
                👷
              </div>
              {/* Worker 2 */}
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(145deg, #0d9488 0%, #0f766e 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
              👨‍🔧
              </div>
              {/* Tools */}
              <div style={{
                width: '60px',
                height: '80px',
                background: 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem'
              }}>
                🔧
              </div>
            </div>
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              background: 'rgba(255,255,255,0.95)',
              padding: '16px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: 'var(--gray-700)' }}>
                Unser Meisterteam bei der Arbeit
              </p>
            </div>
          </div>
        </div>
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

