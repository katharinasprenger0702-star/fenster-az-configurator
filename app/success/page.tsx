'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    setSessionId(session);
  }, [searchParams]);

  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        {/* Success checkmark icon */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px auto',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '40px'
        }}>
          ✓
        </div>
        
        <h1 style={{ color: '#10b981', marginBottom: '16px' }}>Vielen Dank!</h1>
        <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.6' }}>
          Ihre Bestellung wurde erfolgreich aufgegeben und bezahlt.
        </p>
      </div>

      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h3 style={{ color: '#065f46', marginBottom: '16px' }}>Was passiert als nächstes?</h3>
        <ul style={{ 
          textAlign: 'left', 
          color: '#047857',
          lineHeight: '1.8',
          paddingLeft: '20px'
        }}>
          <li>Sie erhalten eine Bestätigungs-E-Mail mit allen Details Ihrer Bestellung</li>
          <li>Unser Team wird Ihre Konfiguration prüfen und sich bei Rückfragen melden</li>
          <li>Die Produktion beginnt nach der finalen Abstimmung</li>
          <li>Sie werden über den Liefertermin informiert</li>
        </ul>
      </div>

      {sessionId && (
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            <strong>Bestellnummer:</strong> {sessionId}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link 
          href="/fenster-konfigurator" 
          className="btn btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          Neue Konfiguration
        </Link>
        <Link 
          href="/" 
          className="btn"
          style={{ textDecoration: 'none' }}
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={
      <div className="card" style={{ textAlign: 'center' }}>
        <p>Lädt...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}