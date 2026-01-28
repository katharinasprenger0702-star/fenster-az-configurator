'use client';

import { useState } from 'react';

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0d9488 50%, #059669 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.5s ease-in'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        maxWidth: '600px'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '48px' }}>
          <svg width="120" height="120" viewBox="0 0 48 48" fill="none" aria-label="Fenstermann24 Logo">
            {/* Modern window frame with rounded corners */}
            <rect x="6" y="6" width="36" height="36" rx="8" ry="8" stroke="white" strokeWidth="3" fill="rgba(255,255,255,0.1)"/>
            
            {/* Modern glass panes */}
            <rect x="9" y="9" width="15" height="15" rx="3" fill="rgba(255,255,255,0.3)" opacity="0.6"/>
            <rect x="27" y="9" width="15" height="15" rx="3" fill="rgba(255,255,255,0.3)" opacity="0.6"/>
            <rect x="9" y="27" width="15" height="15" rx="3" fill="rgba(255,255,255,0.3)" opacity="0.6"/>
            <rect x="27" y="27" width="15" height="15" rx="3" fill="rgba(255,255,255,0.3)" opacity="0.6"/>
            
            {/* Sleek window dividers */}
            <rect x="23" y="9" width="2" height="33" rx="1" fill="rgba(255,255,255,0.8)"/>
            <rect x="9" y="23" width="33" height="2" rx="1" fill="rgba(255,255,255,0.8)"/>
            
            {/* Modern handle accent */}
            <circle cx="38" cy="18" r="2.5" fill="#f59e0b"/>
            <rect x="35" y="16.5" width="6" height="3" rx="1.5" fill="#f59e0b" opacity="0.8"/>
            
            {/* Company branding "F24" */}
            <text x="24" y="31" textAnchor="middle" fontSize="7" fontWeight="700" fill="white" letterSpacing="0.5px">F24</text>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          color: 'white',
          marginBottom: '24px',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          textShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          Site in Progress
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.5rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '48px',
          fontWeight: '600',
          textShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          Neugierig?
        </p>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          style={{
            padding: '18px 48px',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#0d9488',
            background: 'white',
            border: 'none',
            borderRadius: '100px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            letterSpacing: '0.025em'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
          }}
        >
          Zur Seite
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
