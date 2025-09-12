'use client';

import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        {/* Cancel icon */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px auto',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '40px'
        }}>
          ✕
        </div>
        
        <h1 style={{ color: '#dc2626', marginBottom: '16px' }}>Bestellung abgebrochen</h1>
        <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.6' }}>
          Sie haben den Bestellvorgang abgebrochen. Keine Sorge - Ihre Konfiguration ist noch verfügbar.
        </p>
      </div>

      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h3 style={{ color: '#991b1b', marginBottom: '16px' }}>Haben Sie Fragen?</h3>
        <p style={{ color: '#7f1d1d', lineHeight: '1.6', marginBottom: '16px' }}>
          Falls Sie Probleme beim Bestellvorgang hatten oder Unterstützung benötigen, 
          kontaktieren Sie uns gerne:
        </p>
        <div style={{ color: '#7f1d1d' }}>
          <p><strong>Telefon:</strong> +49 (0) 123 456 789</p>
          <p><strong>E-Mail:</strong> info@fenstermann24.de</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link 
          href="/fenster-konfigurator" 
          className="btn"
          style={{ textDecoration: 'none' }}
        >
          Zurück zum Konfigurator
        </Link>
        <Link 
          href="/" 
          className="btn btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}