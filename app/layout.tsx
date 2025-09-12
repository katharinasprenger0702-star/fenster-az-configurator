
import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Chatbot from './components/Chatbot';

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
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              {/* Modern window frame with rounded corners */}
              <rect x="6" y="6" width="36" height="36" rx="8" ry="8" stroke="url(#modernFrameGradient)" strokeWidth="3" fill="url(#modernBackgroundGradient)"/>
              
              {/* Modern glass panes */}
              <rect x="9" y="9" width="15" height="15" rx="3" fill="url(#modernGlassGradient)" opacity="0.6"/>
              <rect x="27" y="9" width="15" height="15" rx="3" fill="url(#modernGlassGradient)" opacity="0.6"/>
              <rect x="9" y="27" width="15" height="15" rx="3" fill="url(#modernGlassGradient)" opacity="0.6"/>
              <rect x="27" y="27" width="15" height="15" rx="3" fill="url(#modernGlassGradient)" opacity="0.6"/>
              
              {/* Sleek window dividers */}
              <rect x="23" y="9" width="2" height="33" rx="1" fill="url(#modernDividerGradient)"/>
              <rect x="9" y="23" width="33" height="2" rx="1" fill="url(#modernDividerGradient)"/>
              
              {/* Modern handle accent */}
              <circle cx="38" cy="18" r="2.5" fill="url(#modernAccentGradient)"/>
              <rect x="35" y="16.5" width="6" height="3" rx="1.5" fill="url(#modernAccentGradient)" opacity="0.8"/>
              
              {/* Company branding "F24" with modern typography */}
              <text x="24" y="31" textAnchor="middle" fontSize="7" fontWeight="700" fill="url(#modernTextGradient)" letterSpacing="0.5px">F24</text>
              
              <defs>
                <linearGradient id="modernFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
                <linearGradient id="modernBackgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="modernGlassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dbeafe"/>
                  <stop offset="50%" stopColor="#bfdbfe"/>
                  <stop offset="100%" stopColor="#93c5fd"/>
                </linearGradient>
                <linearGradient id="modernDividerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569"/>
                  <stop offset="100%" stopColor="#64748b"/>
                </linearGradient>
                <linearGradient id="modernAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626"/>
                  <stop offset="100%" stopColor="#f97316"/>
                </linearGradient>
                <linearGradient id="modernTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a"/>
                  <stop offset="100%" stopColor="#2563eb"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{ color: '#2563eb', fontWeight: '600', fontSize: '18px' }}>Fenstermann24 | Online‑Konfigurator</span>
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
