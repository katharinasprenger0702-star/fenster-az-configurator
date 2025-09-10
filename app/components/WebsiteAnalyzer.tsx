'use client';

import { useState } from 'react';

interface AnalysisResult {
  url: string;
  feasible: boolean;
  technicalFactors: {
    framework: string;
    complexity: 'Low' | 'Medium' | 'High';
    customComponents: number;
    externalDependencies: string[];
    estimatedEffort: string;
  };
  challenges: string[];
  recommendations: string[];
  timestamp: string;
}

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState('https://www.meinfenster24.de/');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const analyzeWebsite = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis - in a real implementation, this would make API calls
    // to analyze the website structure, technologies used, etc.
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result: AnalysisResult = {
      url,
      feasible: true,
      technicalFactors: {
        framework: 'React/Next.js (detected)',
        complexity: 'Medium',
        customComponents: 15,
        externalDependencies: ['Stripe', 'Analytics', 'Font libraries'],
        estimatedEffort: '4-6 Wochen'
      },
      challenges: [
        'Komplexe Produktkonfigurator-Logik',
        'Preisberechnungs-Engine',
        'Integration von Zahlungssystemen',
        'Responsive Design für alle Gerätegrößen'
      ],
      recommendations: [
        'Modulare Architektur für bessere Wartbarkeit',
        'API-First Ansatz für Flexibilität',
        'Verwendung bestehender UI-Komponenten',
        'Schrittweise Migration empfohlen'
      ],
      timestamp: new Date().toLocaleString('de-DE')
    };
    
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
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
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>🔍</span>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#0c4a6e',
          margin: 0
        }}>
          Website-Analyse für 1:1 Kopie
        </h3>
      </div>

      <div style={{
        background: 'white',
        border: '1px solid #38bdf8',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Zu analysierende Website:
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com"
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            />
            <button
              onClick={analyzeWebsite}
              disabled={isAnalyzing || !url}
              style={{
                padding: '12px 24px',
                background: isAnalyzing ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer'
              }}
            >
              {isAnalyzing ? 'Analysiere...' : 'Analysieren'}
            </button>
          </div>
        </div>
      </div>

      {analysis && (
        <div style={{
          background: 'white',
          border: '1px solid #38bdf8',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ 
              fontSize: '1.2rem', 
              marginRight: '8px',
              color: analysis.feasible ? '#10b981' : '#ef4444'
            }}>
              {analysis.feasible ? '✅' : '❌'}
            </span>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0
            }}>
              Ergebnis: 1:1 Kopie {analysis.feasible ? 'möglich' : 'nicht empfohlen'}
            </h4>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              📊 Technische Faktoren:
            </h5>
            <div style={{
              background: '#f9fafb',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <div style={{ marginBottom: '4px' }}>
                <strong>Framework:</strong> {analysis.technicalFactors.framework}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Komplexität:</strong> {analysis.technicalFactors.complexity}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Custom Components:</strong> ~{analysis.technicalFactors.customComponents}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Externe Abhängigkeiten:</strong> {analysis.technicalFactors.externalDependencies.join(', ')}
              </div>
              <div>
                <strong>Geschätzter Aufwand:</strong> {analysis.technicalFactors.estimatedEffort}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              ⚠️ Herausforderungen:
            </h5>
            <ul style={{
              background: '#fef2f2',
              padding: '12px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              color: '#7f1d1d',
              margin: 0
            }}>
              {analysis.challenges.map((challenge, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              💡 Empfehlungen:
            </h5>
            <ul style={{
              background: '#f0fdf4',
              padding: '12px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              color: '#14532d',
              margin: 0
            }}>
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>{recommendation}</li>
              ))}
            </ul>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: '#6b7280',
            textAlign: 'right'
          }}>
            Analyse durchgeführt am: {analysis.timestamp}
          </div>
        </div>
      )}
    </div>
  );
}