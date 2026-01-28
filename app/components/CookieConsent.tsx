'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    try {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch (e) {
      // LocalStorage not available, show banner
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted');
    } catch (e) {
      // LocalStorage not available, ignore
    }
    setShowBanner(false);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem('cookieConsent', 'declined');
    } catch (e) {
      // LocalStorage not available, ignore
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid #e5e7eb',
      padding: '24px',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 400px' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            🍪 Cookie-Hinweis
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            lineHeight: '1.6',
            margin: 0
          }}>
            Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu. Weitere Informationen finden Sie in unserer{' '}
            <a href="/datenschutz" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
              Datenschutzerklärung
            </a>.
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={declineCookies}
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#6b7280',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.background = '#f9fafb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.background = '#f9fafb';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            Ablehnen
          </button>
          
          <button
            onClick={acceptCookies}
            style={{
              padding: '12px 32px',
              fontSize: '0.95rem',
              fontWeight: '700',
              color: 'white',
              background: 'linear-gradient(135deg, #0a6cf1 0%, #0e7ef5 50%, #3b82f6 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(10, 108, 241, 0.3)',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(10, 108, 241, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 108, 241, 0.3)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(10, 108, 241, 0.4)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 108, 241, 0.3)';
            }}
          >
            Akzeptieren
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
