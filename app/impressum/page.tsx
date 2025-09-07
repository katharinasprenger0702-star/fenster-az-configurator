
export default function Impressum() {
  return (
    <div className="card">
      <h1>Impressum</h1>
      
      <section style={{ marginBottom: 24 }}>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p><strong>Fenstermann24.de</strong> – eine Marke der</p>
        <p><strong>AZ Fenster und Türen GmbH</strong></p>
        <p>
          [Straße und Hausnummer]<br />
          [PLZ Ort]<br />
          Deutschland
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Kontakt</h2>
        <p>
          <strong>Telefon:</strong> <a href="tel:[TELEFONNUMMER]">[TELEFONNUMMER]</a><br />
          <strong>E-Mail:</strong> <a href="mailto:[EMAIL]">[EMAIL]</a><br />
          <strong>Internet:</strong> <a href="https://www.fenster-az.de" target="_blank" rel="noopener noreferrer">www.fenster-az.de</a>
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Vertreten durch</h2>
        <p>[Geschäftsführer/Vertretungsberechtigte Person]</p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Registereintrag</h2>
        <p>
          Eintragung im Handelsregister.<br />
          Registergericht: [Amtsgericht]<br />
          Registernummer: [HRB-Nummer]
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          [USt-IdNr.]
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [Name]<br />
          [Adresse]
        </p>
      </section>

      <section>
        <h2>Datenschutz</h2>
        <p>Bei aktivierter Online-Zahlung werden Zahlungsdaten durch Stripe verarbeitet. Details siehe Datenschutzerklärung.</p>
      </section>

      <hr style={{ margin: '32px 0' }} />
      
      <section>
        <h3>Hinweis für die Implementierung</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', background: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
          <strong>Zu ergänzende Daten von fenster-az.de:</strong><br />
          Bitte die Kontaktdaten (E-Mail, Telefon) und vollständigen Firmenangaben aus dem Original-Impressum von 
          <a href="https://www.fenster-az.de" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '4px' }}>www.fenster-az.de</a> übernehmen
          und die Platzhalter [in eckigen Klammern] entsprechend ersetzen.
        </p>
      </section>
    </div>
  );
}
