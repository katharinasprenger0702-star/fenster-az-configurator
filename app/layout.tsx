
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
              {/* Window frame */}
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2" stroke="#0a6cf1" strokeWidth="1.5" fill="none"/>
              {/* Window cross dividers */}
              <line x1="12" y1="2" x2="12" y2="22" stroke="#0a6cf1" strokeWidth="1.5"/>
              <line x1="2" y1="12" x2="22" y2="12" stroke="#0a6cf1" strokeWidth="1.5"/>
              {/* Window panes with subtle fill */}
              <rect x="3" y="3" width="8" height="8" fill="#0a6cf1" fillOpacity="0.1"/>
              <rect x="13" y="3" width="8" height="8" fill="#0a6cf1" fillOpacity="0.1"/>
              <rect x="3" y="13" width="8" height="8" fill="#0a6cf1" fillOpacity="0.1"/>
              <rect x="13" y="13" width="8" height="8" fill="#0a6cf1" fillOpacity="0.1"/>
              {/* Window handles */}
              <circle cx="19" cy="9" r="1" fill="#0a6cf1"/>
              <circle cx="19" cy="15" r="1" fill="#0a6cf1"/>
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
