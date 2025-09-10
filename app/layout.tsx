
import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Chatbot from './components/Chatbot';
import WebsiteAnalyzer from './components/WebsiteAnalyzer';
import Logo from './components/Logo';

export const metadata = {
  title: 'Fenstermann24 – Online‑Konfigurator',
  description: 'Fenstermann24.de – eine Marke der AZ Fenster und Türen GmbH. Fenster & Türen direkt online konfigurieren mit sofortiger Preisberechnung.',
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
          <Logo />
          <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/" style={{marginRight:8, fontWeight: 600}}>Start</Link>
            <Link href="/fenster-konfigurator" style={{marginRight:8, fontWeight: 600}}>Konfigurator</Link>
            <Link href="/referenzen" style={{marginRight:8, fontWeight: 600}}>Referenzen</Link>
            <Link href="/faq" style={{marginRight:8, fontWeight: 600}}>FAQ</Link>
            <Link href="/impressum" style={{ fontWeight: 600 }}>Impressum</Link>
          </nav>
        </header>
        
        {/* WEBSITE STATUS - Appears on all pages */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 60px'
        }}>
          <WebsiteAnalyzer />
        </div>
        
        <main className="container">{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} Fenstermann24.de — eine Marke der AZ Fenster und Türen GmbH · <a href="/impressum">Impressum</a>
        </footer>
        <Chatbot />
      </body>
    </html>
  );
}
