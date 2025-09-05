
import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Fenstermann24 – Online‑Konfigurator',
  description: 'Fenstermann24.de – eine Marke der AZ Fenster und Türen GmbH'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="header">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3" stroke="#0a6cf1" strokeWidth="2"/>
              <rect x="7" y="7" width="10" height="10" rx="1" ry="1" fill="#0a6cf1"/>
            </svg>
            <span>Fenstermann24 | Online‑Konfigurator</span>
          </div>
          <nav>
            <Link href="/" style={{marginRight:12}}>Start</Link>
            <Link href="/fenster-konfigurator" style={{marginRight:12}}>Konfigurator</Link>
            <Link href="/impressum">Impressum</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} Fenstermann24.de — eine Marke der AZ Fenster und Türen GmbH · <a href="/impressum">Impressum</a>
        </footer>
      </body>
    </html>
  );
}
