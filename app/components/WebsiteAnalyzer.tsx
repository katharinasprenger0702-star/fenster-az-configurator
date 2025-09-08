'use client';

import { useState, useEffect } from 'react';

interface WebsiteAnalysis {
  url: string;
  timestamp: string;
  status?: string;
  error?: string;
  note?: string;
  analysis: {
    hasConstructionNotice: boolean;
    constructionIndicators: string[];
    constructionContext: Array<{ indicator: string; context: string }>;
    hasDisclaimer: boolean;
    disclaimerIndicators: string[];
    disclaimerContext: Array<{ indicator: string; context: string }>;
  };
}

export default function WebsiteAnalyzer() {
  const [analysis, setAnalysis] = useState<WebsiteAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkWebsite = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/website-check');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check website');
      }
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Auto-check on component mount
  useEffect(() => {
    checkWebsite();
  }, []);

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      margin: '32px 0'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1e293b',
          margin: 0
        }}>
          🔍 Website-Status Prüfung
        </h3>
        <button
          onClick={checkWebsite}
          disabled={loading}
          style={{
            background: loading ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          {loading ? 'Wird geprüft...' : 'Erneut prüfen'}
        </button>
      </div>

      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ color: '#dc2626', fontWeight: '600', marginBottom: '4px' }}>
            ❌ Fehler bei der Website-Prüfung
          </div>
          <div style={{ color: '#7f1d1d', fontSize: '0.875rem' }}>
            {error}
          </div>
        </div>
      )}

      {analysis && (
        <div>
          {analysis.status === 'fallback_demo' && (
            <div style={{
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ color: '#92400e', fontWeight: '600', marginBottom: '4px' }}>
                ℹ️ Demo-Modus
              </div>
              <div style={{ color: '#b45309', fontSize: '0.875rem' }}>
                {analysis.note}
              </div>
              {analysis.error && (
                <div style={{ color: '#92400e', fontSize: '0.8rem', marginTop: '8px', fontStyle: 'italic' }}>
                  Fehlerdetails: {analysis.error}
                </div>
              )}
            </div>
          )}

          <div style={{
            fontSize: '0.875rem',
            color: '#64748b',
            marginBottom: '16px'
          }}>
            Geprüfte URL: <strong>{analysis.url}</strong><br />
            Letzte Prüfung: {new Date(analysis.timestamp).toLocaleString('de-DE')}
            {analysis.status && (
              <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#6b7280' }}>
                (Status: {analysis.status})
              </span>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {/* Construction Notice Check */}
            <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '1.25rem', marginRight: '8px' }}>
                  {analysis.analysis.hasConstructionNotice ? '🚧' : '✅'}
                </span>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: 0
                }}>
                  Aufbau-Hinweis
                </h4>
              </div>
              
              <div style={{
                fontSize: '0.875rem',
                color: analysis.analysis.hasConstructionNotice ? '#dc2626' : '#059669',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {analysis.analysis.hasConstructionNotice 
                  ? 'Hinweis auf Aufbau gefunden' 
                  : 'Kein Aufbau-Hinweis gefunden'
                }
              </div>

              {analysis.analysis.constructionIndicators.length > 0 && (
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Gefundene Begriffe: {analysis.analysis.constructionIndicators.join(', ')}
                </div>
              )}
            </div>

            {/* Disclaimer Check */}
            <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '1.25rem', marginRight: '8px' }}>
                  {analysis.analysis.hasDisclaimer ? '⚠️' : '❌'}
                </span>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: 0
                }}>
                  Gewähr-Ausschluss
                </h4>
              </div>
              
              <div style={{
                fontSize: '0.875rem',
                color: analysis.analysis.hasDisclaimer ? '#dc2626' : '#64748b',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {analysis.analysis.hasDisclaimer 
                  ? 'Gewähr-Ausschluss gefunden' 
                  : 'Kein Gewähr-Ausschluss gefunden'
                }
              </div>

              {analysis.analysis.disclaimerIndicators.length > 0 && (
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Gefundene Begriffe: {analysis.analysis.disclaimerIndicators.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div style={{
            background: analysis.analysis.hasConstructionNotice && analysis.analysis.hasDisclaimer 
              ? '#fef3c7' : '#f0f9ff',
            border: `1px solid ${analysis.analysis.hasConstructionNotice && analysis.analysis.hasDisclaimer 
              ? '#fbbf24' : '#38bdf8'}`,
            borderRadius: '8px',
            padding: '16px',
            marginTop: '16px'
          }}>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '4px'
            }}>
              📋 Zusammenfassung:
            </div>
            <div style={{ fontSize: '0.875rem', color: '#475569' }}>
              {analysis.analysis.hasConstructionNotice && analysis.analysis.hasDisclaimer
                ? 'Die Website zeigt sowohl einen Hinweis auf den Aufbau als auch einen Gewähr-Ausschluss.'
                : analysis.analysis.hasConstructionNotice
                ? 'Die Website zeigt einen Hinweis auf den Aufbau, aber keinen expliziten Gewähr-Ausschluss.'
                : analysis.analysis.hasDisclaimer
                ? 'Die Website zeigt einen Gewähr-Ausschluss, aber keinen Hinweis auf den Aufbau.'
                : 'Die Website zeigt weder einen Hinweis auf den Aufbau noch einen Gewähr-Ausschluss.'
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}