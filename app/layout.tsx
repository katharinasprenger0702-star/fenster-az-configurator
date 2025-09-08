
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
            
copilot/fix-dd77b6f1-92a1-45ad-a530-f1ffda84c1d2
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3" stroke="url(#gradient)" strokeWidth="2"/>
              <rect x="7" y="7" width="10" height="10" rx="1" ry="1" fill="url(#gradient)"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0a6cf1"/>
                  <stop offset="100%" stopColor="#0e7ef5"/>
                </linearGradient>
              </defs>
 main
            </svg>
            <span>Fenstermann24 | Online‑Konfigurator</span>
          </div>
          <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/" style={{marginRight:8, fontWeight: 600}}>Start</Link>
            <Link href="/fenster-konfigurator" style={{marginRight:8, fontWeight: 600}}>Konfigurator</Link>
            <Link href="/impressum" style={{ fontWeight: 600 }}>Impressum</Link>
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
