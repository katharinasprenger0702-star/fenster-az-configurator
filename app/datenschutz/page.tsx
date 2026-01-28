
export const metadata = {
  title: 'Datenschutzerklärung – Fenstermann24',
  description: 'Informationen zur Verarbeitung Ihrer personenbezogenen Daten bei Fenstermann24.de.',
  robots: 'index, follow'
};

export default function Datenschutz() {
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
            Datenschutzerklärung
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten
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
          
          {/* Intro */}
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
              1. Datenschutz auf einen Blick
            </h2>
            <div style={{ 
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}>
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>
          </div>

          {/* Data Collection */}
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
              2. Datenerfassung auf dieser Website
            </h2>
            <div style={{ 
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}>
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </h3>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}>
                Wie erfassen wir Ihre Daten?
              </h3>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p>
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}>
                Wofür nutzen wir Ihre Daten?
              </h3>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
            </div>
          </div>

          {/* Rights */}
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
              3. Ihre Rechte
            </h2>
            <div style={{ 
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
              </p>
              <p>
                Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen.
              </p>
            </div>
          </div>

          {/* Cookies */}
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
              4. Cookies
            </h2>
            <div style={{ 
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
              </p>
            </div>
          </div>

          {/* Stripe Payment */}
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
              5. Zahlungsdienstleister
            </h2>
            <div style={{ 
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}>
                Stripe
              </h3>
              <p>
                Wir bieten die Möglichkeit, den Zahlungsvorgang über den Zahlungsdienstleister Stripe abzuwickeln. Anbieter ist Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.
              </p>
              <p>
                Wenn Sie sich für die Zahlung über Stripe entscheiden, werden die von Ihnen eingegebenen Zahlungsdaten an Stripe übermittelt. Die Weitergabe Ihrer Daten an Stripe erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur Erfüllung eines Vertrags).
              </p>
              <p>
                Details entnehmen Sie der Datenschutzerklärung von Stripe unter: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>https://stripe.com/de/privacy</a>
              </p>
            </div>
          </div>

          {/* Contact */}
          <div style={{
            background: '#eff6ff',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid #dbeafe',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1e40af',
              marginBottom: '16px'
            }}>
              Fragen zum Datenschutz?
            </h3>
            <p style={{
              color: '#1e40af',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
            </p>
            <a href="mailto:info@fenstermann24.de" style={{ 
              color: '#2563eb', 
              fontSize: '1.1rem',
              textDecoration: 'none', 
              fontWeight: '600' 
            }}>
              info@fenstermann24.de
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
