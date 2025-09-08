import Link from "next/link";
import WebsiteAnalyzer from "./components/WebsiteAnalyzer";

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
            color: '#111827',
            letterSpacing: '-0.03em'
          }}>
            Fenster & Türen nach Maß
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
            <a href="tel:+49-[TELEFONNUMMER]" style={{
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

          {/* Real photo placeholder - Premium window installation */}
          <div style={{
            width: '100%',
            height: '400px',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
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
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏠</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                Premium Fensterinstallation
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Hochwertige Referenzprojekte unserer Kunden
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WEBSITE STATUS CHECK SECTION */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '2rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Website-Status Überprüfung
          </h2>
          <p style={{ 
            fontSize: '1rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Automatische Prüfung der Website www.fenstermann24.de auf Aufbau-Hinweise und Gewähr-Ausschlüsse.
          </p>
        </div>
        <WebsiteAnalyzer />
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
                Kompletter Service von der Beratung über Aufmaß 
                bis zur fachgerechten Montage.
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

      {/* CUSTOMER TESTIMONIALS */}
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
              Was unsere Kunden sagen
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Über 1000 zufriedene Kunden vertrauen auf unsere Qualität und Service.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Testimonial 1 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  color: '#fbbf24', 
                  fontSize: '1.5rem',
                  marginBottom: '12px'
                }}>
                  ★★★★★
                </div>
                <p style={{ 
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  "Sehr professionelle Beratung und perfekte Montage. 
                  Die neuen Fenster sehen fantastisch aus und dämmen deutlich besser."
                </p>
              </div>
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#e5e7eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  👤
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>Familie Schmidt</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>München</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  color: '#fbbf24', 
                  fontSize: '1.5rem',
                  marginBottom: '12px'
                }}>
                  ★★★★★
                </div>
                <p style={{ 
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  "Top Service! Von der Online-Konfiguration bis zur Montage 
                  war alles perfekt organisiert. Sehr empfehlenswert!"
                </p>
              </div>
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#e5e7eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  👤
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>Hr. Müller</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Hamburg</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  color: '#fbbf24', 
                  fontSize: '1.5rem',
                  marginBottom: '12px'
                }}>
                  ★★★★★
                </div>
                <p style={{ 
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  "Faire Preise, transparente Kommunikation und handwerklich 
                  einwandfreie Arbeit. Gerne wieder!"
                </p>
              </div>
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#e5e7eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  👤
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>Fr. Weber</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Frankfurt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY INFO & TRUST */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '24px'
              }}>
                25+ Jahre Erfahrung, 1000+ zufriedene Kunden
              </h2>
              <p style={{ 
                fontSize: '1.1rem',
                color: '#6b7280',
                lineHeight: '1.7',
                marginBottom: '32px'
              }}>
                Als zertifizierter Meisterbetrieb stehen wir für höchste Qualität und 
                Zuverlässigkeit. Von der ersten Beratung bis zur finalen Montage – 
                wir begleiten Sie professionell durch Ihr Projekt.
              </p>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                marginBottom: '32px'
              }}>
                <div style={{ 
                  textAlign: 'center',
                  padding: '24px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ 
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#2563eb',
                    marginBottom: '8px'
                  }}>
                    1000+
                  </div>
                  <div style={{ 
                    color: '#6b7280',
                    fontWeight: '600'
                  }}>
                    Projekte
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  padding: '24px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ 
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#2563eb',
                    marginBottom: '8px'
                  }}>
                    25+
                  </div>
                  <div style={{ 
                    color: '#6b7280',
                    fontWeight: '600'
                  }}>
                    Jahre
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontWeight: '600', color: '#374151' }}>TÜV zertifiziert</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontWeight: '600', color: '#374151' }}>Meisterbetrieb</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontWeight: '600', color: '#374151' }}>RAL Gütezeichen</span>
                </div>
              </div>
            </div>

            {/* Company photo placeholder */}
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
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👥</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  Unser erfahrenes Team
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  Meister und Fachkräfte bei der Arbeit
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
                Eigene, geschulte Monteure. Fachgerechte Installation 
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
            <a href="tel:+49-[TELEFONNUMMER]" style={{
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

