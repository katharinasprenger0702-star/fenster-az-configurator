export default function Versand() {
  return (
    <div style={{ 
      background: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <section style={{ 
        padding: '80px 60px 60px 60px', 
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        textAlign: 'center',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}>
            Versand & Lieferung
          </h1>
          <p style={{ 
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Schnell, sicher und zuverlässig – Ihre neuen Fenster und Türen kommen professionell verpackt direkt zu Ihnen.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ 
        padding: '60px 60px 80px 60px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto'
        }}>
          
          {/* Shipping Options Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            
            {/* Standard Versand */}
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                fontSize: '2rem',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                🚚
              </div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Standard Versand
              </h3>
              <div style={{ 
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#374151'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Kosten:</strong> 89€ pauschal
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Lieferzeit:</strong> 3-5 Werktage
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Lieferort:</strong> Bordsteinkante
                </div>
                <div>
                  <strong>Ideal für:</strong> Einzelfenster, kleinere Aufträge
                </div>
              </div>
            </div>

            {/* Premium Versand */}
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '12px',
              border: '2px solid #2563eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#2563eb',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                Empfohlen
              </div>
              <div style={{ 
                fontSize: '2rem',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                🏆
              </div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Premium Versand
              </h3>
              <div style={{ 
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#374151'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Kosten:</strong> 149€ pauschal
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Lieferzeit:</strong> 1-2 Werktage
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Lieferort:</strong> Gewünschter Raum
                </div>
                <div>
                  <strong>Service:</strong> Anlieferung + Auspacken + Entsorgung
                </div>
              </div>
            </div>

            {/* Kostenfreier Versand */}
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid #10b981',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                fontSize: '2rem',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                🎁
              </div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Kostenfreier Versand
              </h3>
              <div style={{ 
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#374151'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Kosten:</strong> 0€
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Bedingung:</strong> Ab 10 Fenstern
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Lieferzeit:</strong> 5-7 Werktage
                </div>
                <div>
                  <strong>Ideal für:</strong> Große Projekte, Sanierungen
                </div>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div style={{
            background: '#f8fafc',
            padding: '48px',
            borderRadius: '12px',
            marginBottom: '48px'
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Unser Versand-Service
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>Sichere Verpackung</h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Professionelle Schutzverpackung verhindert Transportschäden und sorgt für sichere Ankunft.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📱</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>Sendungsverfolgung</h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Sie erhalten eine Trackingnummer und können jederzeit den Lieferstatus verfolgen.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏰</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>Terminabsprache</h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Wir stimmen den Liefertermin mit Ihnen ab, damit Sie flexibel planen können.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛡️</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>Versicherung</h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Vollständige Transportversicherung schützt Sie vor eventuellen Schäden.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Areas */}
          <div style={{
            background: 'white',
            padding: '48px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px'
            }}>
              Liefergebiete
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px auto'
            }}>
              Wir liefern deutschlandweit und in angrenzende EU-Länder. Spezielle Konditionen für gewerbliche Kunden.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🇩🇪</div>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Deutschland</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Flächendeckend</p>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🇦🇹</div>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Österreich</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Auf Anfrage</p>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🇨🇭</div>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Schweiz</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Auf Anfrage</p>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🇪🇺</div>
                <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>EU-Länder</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Spezialversand</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}