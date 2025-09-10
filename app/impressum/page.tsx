
export default function Impressum() {
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
            marginBottom: '16px',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}>
            Impressum
          </h1>
          <p style={{ 
            fontSize: '1.1rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Rechtliche Angaben zur AZ Fenster und Türen GmbH
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ 
        padding: '60px 60px 80px 60px'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto'
        }}>
          
          {/* Company Information */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
              borderBottom: '2px solid #2563eb',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>
              Angaben gemäß § 5 TMG
            </h2>
            <div style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#111827' }}>Fenstermann24.de</strong> – eine Marke der
              </p>
              <p style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#2563eb',
                marginBottom: '20px'
              }}>
                AZ Fenster und Türen GmbH
              </p>
              <div style={{
                background: '#f9fafb',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                [Straße und Hausnummer]<br />
                [PLZ Ort]<br />
                Deutschland
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px',
              borderBottom: '2px solid #2563eb',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>
              Kontakt
            </h2>
            <div style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <strong>📞 Telefon:</strong> <a href="tel:[TELEFONNUMMER]" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>[TELEFONNUMMER]</a>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>✉️ E-Mail:</strong> <a href="mailto:[EMAIL]" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>[EMAIL]</a>
              </div>
              <div>
                <strong>🌐 Internet:</strong> <a href="https://www.fenster-az.de" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>www.fenster-az.de</a>
              </div>
            </div>
          </div>

          {/* Grid for remaining sections */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            
            {/* Management */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Vertreten durch
              </h2>
              <div style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                color: '#374151',
                fontSize: '1rem'
              }}>
                [Geschäftsführer/Vertretungsberechtigte Person]
              </div>
            </div>

            {/* Registry */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Registereintrag
              </h2>
              <div style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                color: '#374151',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                Eintragung im Handelsregister.<br />
                Registergericht: [Amtsgericht]<br />
                Registernummer: [HRB-Nummer]
              </div>
            </div>

            {/* Tax ID */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Umsatzsteuer-ID
              </h2>
              <div style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                color: '#374151',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong>[USt-IdNr.]</strong>
              </div>
            </div>

            {/* Content Responsibility */}
            <div style={{
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                color: '#374151',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                [Name]<br />
                [Adresse]
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '20px',
              borderBottom: '2px solid #2563eb',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>
              Datenschutz
            </h2>
            <div style={{
              background: '#eff6ff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #dbeafe',
              color: '#1e40af',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              <strong>🔒 Sichere Zahlungsabwicklung:</strong><br />
              Bei aktivierter Online-Zahlung werden Zahlungsdaten durch Stripe verarbeitet. Details siehe Datenschutzerklärung.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
