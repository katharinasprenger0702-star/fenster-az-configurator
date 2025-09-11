
import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Chatbot from './components/Chatbot';

export const metadata = {
  title: 'Fenstermann24 – Professioneller Fensterversand deutschlandweit',
  description: 'Fenstermann24.de – Zertifizierter Meisterbetrieb für Premium Fenster & Türen. Deutschlandweiter Versand, kostenfreie Lieferung ab 10 Fenstern, Online-Konfigurator mit sofortiger Preisberechnung.',
  keywords: 'Fensterversand, Fenster online kaufen, Türen Versand, Premium Fenster, Meisterbetrieb, deutschlandweite Lieferung, Konfigurator, AZ Fenster',
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
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              {/* Window frame with modern design */}
              <rect x="4" y="8" width="40" height="32" rx="4" ry="4" stroke="url(#windowGradient)" strokeWidth="2.5" fill="none"/>
              <rect x="6" y="10" width="36" height="28" rx="2" ry="2" fill="url(#glassGradient)" opacity="0.3"/>
              
              {/* Window cross bars */}
              <line x1="24" y1="10" x2="24" y2="38" stroke="url(#frameGradient)" strokeWidth="2"/>
              <line x1="6" y1="24" x2="42" y2="24" stroke="url(#frameGradient)" strokeWidth="2"/>
              
              {/* Window handle */}
              <circle cx="36" cy="30" r="2" fill="url(#handleGradient)"/>
              <rect x="34" y="29" width="4" height="2" rx="1" fill="url(#handleGradient)"/>
              
              {/* Company initial "F" */}
              <text x="24" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="url(#textGradient)">F24</text>
              
              <defs>
                <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bfdbfe"/>
                  <stop offset="100%" stopColor="#93c5fd"/>
                </linearGradient>
                <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151"/>
                  <stop offset="100%" stopColor="#6b7280"/>
                </linearGradient>
                <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626"/>
                  <stop offset="100%" stopColor="#ef4444"/>
                </linearGradient>
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{ color: '#2563eb' }}>Fenstermann24 | Online‑Konfigurator</span>
          </div>
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
          © {new Date().getFullYear()} Fenstermann24.de — eine Marke der AZ Fenster und Türen GmbH · <a href="/impressum">Impressum</a>
        </footer>
        <Chatbot />
      </body>
    </html>
  );
}
