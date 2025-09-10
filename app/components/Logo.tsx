import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ 
  width = 40, 
  height = 40, 
  showText = true,
  className = ""
}: LogoProps) {
  return (
    <div className={`logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 48 48" 
        fill="none" 
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Modern building/house silhouette representing the company */}
        <rect x="8" y="20" width="32" height="20" rx="2" fill="url(#buildingGradient)"/>
        
        {/* Windows - representing the core business */}
        <rect x="12" y="24" width="6" height="8" rx="1" fill="url(#windowGradient)" stroke="#ffffff" strokeWidth="0.5"/>
        <rect x="21" y="24" width="6" height="8" rx="1" fill="url(#windowGradient)" stroke="#ffffff" strokeWidth="0.5"/>
        <rect x="30" y="24" width="6" height="8" rx="1" fill="url(#windowGradient)" stroke="#ffffff" strokeWidth="0.5"/>
        
        {/* Door */}
        <rect x="18" y="32" width="5" height="8" rx="1" fill="url(#doorGradient)"/>
        <circle cx="21.5" cy="36" r="0.5" fill="#ffffff"/>
        
        {/* Roof with chimney */}
        <path d="M6 20 L24 8 L42 20 L40 20 L24 10 L8 20 Z" fill="url(#roofGradient)"/>
        <rect x="32" y="12" width="3" height="6" rx="0.5" fill="url(#chimneyGradient)"/>
        
        {/* Company initial in a professional badge */}
        <circle cx="38" cy="14" r="6" fill="url(#badgeGradient)" stroke="#ffffff" strokeWidth="1"/>
        <text x="38" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff">F24</text>
        
        {/* Professional touch - small quality indicator */}
        <circle cx="10" cy="14" r="2" fill="url(#qualityGradient)"/>
        <path d="M9 14 L9.5 15 L11 13.5" stroke="#ffffff" strokeWidth="0.5" fill="none"/>
        
        <defs>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af"/>
            <stop offset="50%" stopColor="#2563eb"/>
            <stop offset="100%" stopColor="#3b82f6"/>
          </linearGradient>
          
          <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe"/>
            <stop offset="100%" stopColor="#dbeafe"/>
          </linearGradient>
          
          <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
          
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626"/>
            <stop offset="50%" stopColor="#ef4444"/>
            <stop offset="100%" stopColor="#f87171"/>
          </linearGradient>
          
          <linearGradient id="chimneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7280"/>
            <stop offset="100%" stopColor="#9ca3af"/>
          </linearGradient>
          
          <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669"/>
            <stop offset="100%" stopColor="#10b981"/>
          </linearGradient>
          
          <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <span style={{ 
          color: '#2563eb', 
          fontWeight: '700',
          fontSize: '18px',
          letterSpacing: '-0.025em'
        }}>
          Fenstermann24 | Online‑Konfigurator
        </span>
      )}
    </div>
  );
}