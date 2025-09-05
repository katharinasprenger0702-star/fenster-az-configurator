
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <div className="kicker">Fenstermann24.de · eine Marke der AZ Fenster und Türen GmbH</div>
        <h1>Fenster & Türen online konfigurieren</h1>
        <p>Erstellen Sie Ihr individuelles Angebot mit sofortiger Preisberechnung. Eigene Entwicklung, keine Fremdquellen.</p>
        <Link className="btn" href="/configurator">Jetzt starten</Link>
      </div>
      <div className="card">
        <h3>Leistungsumfang</h3>
        <ul>
          <li>Mehrstufiger Konfigurator (Maße, Material/Profil, Öffnung/Sicherheit, Glas/Farbe, Montage/Lieferung)</li>
          <li>Preisengine (€/m² + Faktoren + Add-ons + MwSt.)</li>
          <li>Checkout via Stripe (optional aktivierbar)</li>
          <li>Übersicht mit detaillierter Kalkulation</li>
        </ul>
      </div>
    </div>
  );
}
