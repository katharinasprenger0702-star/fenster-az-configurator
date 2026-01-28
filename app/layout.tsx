
import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Chatbot from './components/Chatbot';
import CookieConsent from './components/CookieConsent';
import Logo from './components/Logo';

export const metadata = {
  title: 'Fenstermann24 – Online‑Konfigurator',
  description: 'Fenstermann24.de – Fenster & Türen direkt online konfigurieren mit sofortiger Preisberechnung.',
  keywords: 'Fenster, Türen, Haustüren, PVC, Aluminium, Holz, Konfigurator, Preiskalkulator, AZ Fenster',
  robots: 'index, follow'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="header">
          <Link href="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo variant="full" width={200} height={60} />
          </Link>
          <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/" style={{marginRight:8, fontWeight: 600}}>Start</Link>
            <Link href="/fenster-konfigurator" style={{marginRight:8, fontWeight: 600}}>Konfigurator</Link>
            <Link href="/referenzen" style={{marginRight:8, fontWeight: 600}}>Referenzen</Link>
            <Link href="/faq" style={{marginRight:8, fontWeight: 600}}>FAQ</Link>
            <Link href="/impressum" style={{ fontWeight: 600 }}>Impressum</Link>
          </nav>
        </header>
        

        
        <main className="container">{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} Fenstermann24.de · <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a>
        </footer>
        <Chatbot />
        <CookieConsent />
      </body>
    </html>
  );
}
