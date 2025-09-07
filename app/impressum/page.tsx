
export default function Impressum() {
  return (
    <div className="card">
      <h1>Impressum</h1>
      <p><strong>Fenstermann24.de</strong> – eine Marke der <strong>AZ Fenster und Türen GmbH</strong></p>
      
      <h2>Kontakt</h2>
      <p>
        <strong>AZ Fenster und Türen GmbH</strong><br />
        Musterstraße 123<br />
        12345 Musterstadt<br />
        Deutschland
      </p>
      
      <p>
        <strong>Telefon:</strong> +49 (0) 123 456789<br />
        <strong>E-Mail:</strong> <a href="mailto:info@fenstermann24.de" className="btn btn-outline" style={{display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none'}}>
          📧 info@fenstermann24.de
        </a>
      </p>
      
      <p>
        <strong>Geschäftsführer:</strong> Max Mustermann<br />
        <strong>Handelsregister:</strong> HRB 12345, Amtsgericht Musterstadt<br />
        <strong>USt-IdNr.:</strong> DE123456789
      </p>
      
      <p>Datenschutzhinweis: Bei aktivierter Online-Zahlung werden Zahlungsdaten durch Stripe verarbeitet. Details siehe Datenschutzerklärung.</p>
    </div>
  );
}
