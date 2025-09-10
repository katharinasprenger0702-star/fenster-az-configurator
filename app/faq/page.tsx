export default function FAQ() {
  return (
    <div style={{ background: '#ffffff' }}>
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
            Häufige Fragen
          </h1>
          <p style={{ 
            fontSize: '1.25rem',
            color: '#6b7280',
            lineHeight: '1.7'
          }}>
            Die wichtigsten Antworten zu Ihrem Fenster- und Türenprojekt.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ 
        padding: '80px 60px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid',
            gap: '24px'
          }}>
            {/* FAQ 1 */}
            <div style={{
              background: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Wie lange dauert die Lieferung und Montage?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Nach Auftragsbestätigung beträgt die Lieferzeit 3-4 Wochen. 
                Die Montage erfolgt durch unser eigenes Fachpersonal und dauert 
                je nach Umfang 1-3 Tage.
              </p>
            </div>

            {/* FAQ 2 */}
            <div style={{
              background: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Welche Garantie bieten Sie auf Ihre Produkte?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Die Garantie auf unsere Fenster und Türen wird direkt vom Hersteller gewährt. 
                Die Herstellergarantie auf Profile beträgt bis zu 10 Jahre, 
                auf die Montage gewähren wir 2 Jahre.
              </p>
            </div>

            {/* FAQ 3 */}
            <div style={{
              background: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Sind die Preise im Konfigurator verbindlich?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Ja, die angezeigten Preise sind Festpreise inklusive Mehrwertsteuer. 
                Nach dem kostenlosen Aufmaß erhalten Sie ein verbindliches Angebot 
                ohne Nachverhandlung.
              </p>
            </div>

            {/* FAQ 4 */}
            <div style={{
              background: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Können Sie auch Sondermaße und individuelle Formen fertigen?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Selbstverständlich! Wir fertigen alle Fenster und Türen individuell 
                nach Ihren Maßen. Auch Rundbögen, Dreiecke und andere Sonderformen 
                sind möglich.
              </p>
            </div>

            {/* FAQ 5 */}
            <div style={{
              background: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Was ist bei der Entsorgung der alten Fenster enthalten?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Die fachgerechte Demontage und Entsorgung Ihrer alten Fenster und Türen 
                ist im Service enthalten. Wir entsorgen umweltgerecht und kostenfrei 
                für Sie.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}