export default function Referenzen() {
  return (
    <div style={{ background: '#ffffff' }}>
      {/* Header Section */}
      <section style={{ 
        padding: '80px 60px 60px 60px', 
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Company Experience Section */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '24px'
              }}>
                25+ Jahre Erfahrung, 1000+ zufriedene Kunden
              </h1>
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

          {/* Testimonials Header */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '3rem',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '16px',
              color: '#111827',
              letterSpacing: '-0.02em'
            }}>
              Was unsere Kunden sagen
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: '#6b7280',
              lineHeight: '1.7'
            }}>
              Über 1000 zufriedene Kunden vertrauen auf unsere Qualität und Service.
            </p>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                  "Top Service! Von der Online-Konfiguration bis zur Montage war alles perfekt organisiert. 
                  Sehr empfehlenswert!"
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
                  "Faire Preise, transparente Kommunikation und handwerklich einwandfreie Arbeit. 
                  Gerne wieder!"
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

            {/* Additional Testimonials */}
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
                  "Kompetente Beratung und hochwertige Produkte. Die Montage verlief reibungslos 
                  und das Ergebnis übertrifft unsere Erwartungen."
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
                  <div style={{ fontWeight: '600', color: '#111827' }}>Familie Müller</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Berlin</div>
                </div>
              </div>
            </div>

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
                  "Pünktlich, sauber und professionell. Von der ersten Beratung bis zur Endabnahme 
                  haben wir uns bestens betreut gefühlt."
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
                  <div style={{ fontWeight: '600', color: '#111827' }}>Herr Wagner</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Stuttgart</div>
                </div>
              </div>
            </div>

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
                  "Ausgezeichnete Qualität und Service! Die neuen Fenster haben unsere Heizkosten 
                  merklich reduziert. Vielen Dank für die professionelle Umsetzung."
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
                  <div style={{ fontWeight: '600', color: '#111827' }}>Familie Bauer</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Köln</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}