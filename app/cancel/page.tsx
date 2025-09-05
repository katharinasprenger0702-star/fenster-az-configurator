
import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="card">
      <h1>Bestellung abgebrochen</h1>
      <p>Sie wurden zur Seite zurückgeleitet. Ihre Konfiguration bleibt erhalten.</p>
      <Link className="btn" href="/configurator">Zurück zum Konfigurator</Link>
    </div>
  );
}
