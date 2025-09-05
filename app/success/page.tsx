
export default function Success() {
  return (
    <div className="card">
      <h1>Vielen Dank!</h1>
      <p>Ihre Zahlung war erfolgreich. Sie erhalten in Kürze eine Bestätigung per E-Mail.</p>
      <p className="small">Tipp: Nutzen Sie Stripe‑Webhooks, um automatisch Aufträge im ERP/CRM anzulegen.</p>
    </div>
  );
}
