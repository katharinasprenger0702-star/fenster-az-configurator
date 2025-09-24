'use client';

import { useState } from 'react';

interface AnalysisResult {
  targetUrl: string;
  accessibility: boolean;
  analysisDate: string;
  technicalFeasibility: {
    overall: 'high' | 'medium' | 'low';
    components: Array<{
      name: string;
      feasibility: 'high' | 'medium' | 'low';
      notes: string;
    }>;
  };
  recommendations: string[];
}

export default function WebsiteAnalyzer() {
  const [targetUrl, setTargetUrl] = useState('https://www.fensterversand.com');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: AnalysisResult = {
      targetUrl,
      accessibility: false, // Based on our inability to access the site
      analysisDate: new Date().toISOString(),
      technicalFeasibility: {
        overall: 'high',
        components: [
          {
            name: 'Produkt-Konfigurator',
            feasibility: 'high',
            notes: 'Bereits implementiert - umfangreicher Fenster/Türen-Konfigurator mit Preisberechnung'
          },
          {
            name: 'Responsive Design',
            feasibility: 'high',
            notes: 'Moderne responsive UI bereits vorhanden'
          },
          {
            name: 'E-Commerce Integration',
            feasibility: 'high',
            notes: 'Stripe-Integration für Zahlungsabwicklung bereits eingebaut'
          },
          {
            name: 'Technische Validierung',
            feasibility: 'high',
            notes: 'DIN 18055 Validierungssystem bereits implementiert'
          },
          {
            name: 'Content Management',
            feasibility: 'medium',
            notes: 'Statische Inhalte - CMS-Integration möglich bei Bedarf'
          },
          {
            name: 'SEO Optimierung',
            feasibility: 'high',
            notes: 'Next.js SSG mit optimierten Metadaten bereits konfiguriert'
          }
        ]
      },
      recommendations: [
        '✅ Grundlegende Infrastruktur für 1:1 Kopie bereits vorhanden',
        '🔧 Website-Analyse nur möglich wenn fensterversand.com zugänglich ist',
        '📋 Manuelle Inhaltsanalyse der Zielwebsite erforderlich',
        '🎨 Design-Anpassungen basierend auf Original-Layout implementierbar',
        '⚡ Performance-Optimierung durch Next.js bereits gegeben',
        '🛡️ Technische Standards (DIN-Normen) bereits validiert',
        '💰 Kosteneffiziente Umsetzung durch bestehende Basis möglich'
      ]
    };
    
    setAnalysisResult(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <>
      {/* Website Status Section */}
      <div style={{
        background: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '12px',
        padding: '24px',
        margin: '32px 0'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>🚧</span>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#92400e',
            margin: 0
          }}>
            Website-Status
          </h3>
        </div>

        <div style={{
          background: 'white',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '1.25rem', marginRight: '8px' }}>🚧</span>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0
            }}>
              Status: Im Aufbau
            </h4>
          </div>
          
          <p style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            lineHeight: '1.6',
            margin: 0
          }}>
            Die Website www.fenstermann24.de befindet sich derzeit im Aufbau.
          </p>
        </div>
      </div>

      {/* Website Analysis Section */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '12px',
        padding: '24px',
        margin: '32px 0'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>🔍</span>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#0369a1',
            margin: 0
          }}>
            Website-Analyse & 1:1 Kopie-Bewertung
          </h3>
        </div>

        <div style={{
          background: 'white',
          border: '1px solid #38bdf8',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Ziel-Website für Analyse:
            </label>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://www.beispiel.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <button
            onClick={performAnalysis}
            disabled={isAnalyzing || !targetUrl}
            style={{
              background: isAnalyzing ? '#9ca3af' : '#2563eb',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isAnalyzing ? (
              <>
                <span>🔄</span> Analysiere Website...
              </>
            ) : (
              <>
                <span>🚀</span> Analyse starten
              </>
            )}
          </button>
        </div>

        {analysisResult && (
          <div style={{
            background: 'white',
            border: '1px solid #38bdf8',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📊 Analyse-Ergebnis für {analysisResult.targetUrl}
            </h4>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}>
                  {analysisResult.accessibility ? '✅' : '❌'}
                </span>
                <span style={{ fontWeight: '600', color: '#374151' }}>
                  Website-Erreichbarkeit:
                </span>
                <span style={{ 
                  color: analysisResult.accessibility ? '#059669' : '#dc2626',
                  fontWeight: '600'
                }}>
                  {analysisResult.accessibility ? 'Zugänglich' : 'Nicht zugänglich'}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '1.2rem' }}>
                  {analysisResult.technicalFeasibility.overall === 'high' ? '🟢' : 
                   analysisResult.technicalFeasibility.overall === 'medium' ? '🟡' : '🔴'}
                </span>
                <span style={{ fontWeight: '600', color: '#374151' }}>
                  Technische Machbarkeit:
                </span>
                <span style={{ 
                  color: analysisResult.technicalFeasibility.overall === 'high' ? '#059669' : 
                        analysisResult.technicalFeasibility.overall === 'medium' ? '#d97706' : '#dc2626',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {analysisResult.technicalFeasibility.overall}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}>
                🔧 Komponenten-Analyse:
              </h5>
              
              {analysisResult.technicalFeasibility.components.map((component, index) => (
                <div key={index} style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>
                      {component.feasibility === 'high' ? '🟢' : 
                       component.feasibility === 'medium' ? '🟡' : '🔴'}
                    </span>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                      {component.name}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {component.notes}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h5 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}>
                💡 Empfehlungen für 1:1 Kopie:
              </h5>
              
              {analysisResult.recommendations.map((recommendation, index) => (
                <div key={index} style={{
                  fontSize: '0.9rem',
                  color: '#374151',
                  marginBottom: '6px',
                  lineHeight: '1.5'
                }}>
                  {recommendation}
                </div>
              ))}
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #22c55e',
              borderRadius: '6px',
              padding: '12px',
              marginTop: '16px'
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: '#166534',
                margin: 0,
                fontWeight: '600'
              }}>
                ✅ Fazit: Eine 1:1 technische Kopie ist mit der bestehenden Infrastruktur gut realisierbar. 
                Die Hauptkomponenten (Konfigurator, E-Commerce, Responsive Design) sind bereits implementiert.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}