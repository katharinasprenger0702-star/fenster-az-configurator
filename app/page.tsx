
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <div className="kicker">Fenster‑AZ</div>
        <h1>Fenster & Türen online konfigurieren</h1>
        <p>Erstellen Sie Ihr individuelles Angebot bei Fenster‑AZ — mit sofortiger Preisberechnung und Zahlung (Stripe Checkout). Saubere Eigenentwicklung, kein Fremdcode.</p>
        <Link className="btn" href="/configurator">Jetzt starten</Link>
      </div>
      <div className="card">
        <h3>Funktionsumfang</h3>
        <ul>
          <li>Mehrstufiger Konfigurator (Maße, Material/Profil, Öffnung/Sicherheit, Glas/Farbe, Montage/Lieferung)</li>
          <li>Preisengine (€/m² + Faktoren + Add-ons + MwSt.)</li>
          <li>Checkout via Stripe</li>
          <li>Übersicht mit detaillierter Kalkulation</li>
        </ul>
      </div>
    </div>
  );
}
