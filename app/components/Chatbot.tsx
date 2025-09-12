'use client';

import { useState, useEffect } from 'react';
import { validateTechnicalCompliance, getRecommendations, type ValidationResult } from '@/lib/technical-validation';
import type { Config } from '@/lib/pricing';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MeasurementMatch {
  width: number;
  height: number;
  unit: string;
  originalText: string;
}

/**
 * Extract measurements from user text using regex patterns
 */
function extractMeasurements(text: string): MeasurementMatch[] {
  const measurements: MeasurementMatch[] = [];
  
  // Patterns for different measurement formats
  const patterns = [
    // mm format: "300mm x 200mm", "300 mm x 200 mm"
    /(\d+)\s*mm\s*[x×]\s*(\d+)\s*mm/gi,
    // cm format: "30cm x 20cm", "30 cm x 20 cm" 
    /(\d+)\s*cm\s*[x×]\s*(\d+)\s*cm/gi,
    // m format: "1.2m x 1.5m", "1,2m x 1,5m"
    /(\d+[.,]\d+)\s*m\s*[x×]\s*(\d+[.,]\d+)\s*m/gi,
    // Mixed formats: "120cm x 1.5m"
    /(\d+)\s*cm\s*[x×]\s*(\d+[.,]\d+)\s*m/gi,
    /(\d+[.,]\d+)\s*m\s*[x×]\s*(\d+)\s*cm/gi
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      let width = parseFloat(match[1].replace(',', '.'));
      let height = parseFloat(match[2].replace(',', '.'));
      
      // Convert to mm for standardization
      if (text.includes('cm')) {
        if (match[1].includes('.') || match[1].includes(',')) {
          // Already in m, convert to mm
          width = width * 1000;
        } else {
          // In cm, convert to mm
          width = width * 10;
        }
        
        if (match[2].includes('.') || match[2].includes(',')) {
          height = height * 1000;
        } else {
          height = height * 10;
        }
      } else if (text.includes('m')) {
        width = width * 1000;
        height = height * 1000;
      }
      
      measurements.push({
        width: Math.round(width),
        height: Math.round(height),
        unit: 'mm',
        originalText: match[0]
      });
    }
  });

  return measurements;
}

/**
 * Validate measurements and provide technical guidance
 */
function validateMeasurementsAndProvideGuidance(measurements: MeasurementMatch[], userMessage: string): string {
  if (measurements.length === 0) {
    return '';
  }

  // Determine product type from user message
  let productType = 'Fenster'; // Default
  const message = userMessage.toLowerCase();
  
  if (message.includes('tür') || message.includes('haustür')) {
    productType = 'Haustüren';
  } else if (message.includes('balkontür')) {
    productType = 'Balkontüren';
  } else if (message.includes('schiebetür')) {
    productType = 'Schiebetüren';
  }

  // Determine opening type (simplified)
  let openingType = 'Dreh-Kipp links';
  if (productType === 'Haustüren') {
    openingType = '1-flügelig';
  }

  const measurement = measurements[0]; // Use first measurement found
  
  // Create a basic config for validation
  const config: Config = {
    product: productType as any,
    system: 'IGLO 5',
    width_mm: measurement.width,
    height_mm: measurement.height,
    material: 'PVC',
    profile: 'Standard',
    opening: openingType,
    glazing: '2-fach',
    color: 'Weiß',
    handle: 'Standard',
    security: 'Basis',
    warmEdge: false,
    soundInsulation: false,
    safetyGlass: false,
    sunProtection: false,
    trickleVent: false,
    insectScreen: false,
    childLock: false,
    versand: 'Standard',
    oldWindowDisposal: false,
    delivery: 'Abholung',
    qty: 1
  };

  // Validate the configuration
  const validation = validateTechnicalCompliance(config);
  const recommendations = getRecommendations(config);

  // Build response based on validation results
  let response = `🔍 **Technische Prüfung Ihrer Maße (${measurement.originalText}):**\n\n`;
  
  if (validation.isValid) {
    response += `✅ **Technisch zulässig!** Ihre Maße entsprechen den deutschen Normen.\n\n`;
    if (validation.complianceInfo.length > 0) {
      response += validation.complianceInfo.join('\n') + '\n\n';
    }
  } else {
    response += `❌ **Technische Anforderungen nicht erfüllt:**\n`;
    validation.errors.forEach(error => {
      response += `• ${error}\n`;
    });
    response += '\n';
  }

  if (validation.warnings.length > 0) {
    response += `⚠️ **Wichtige Hinweise:**\n`;
    validation.warnings.forEach(warning => {
      response += `• ${warning}\n`;
    });
    response += '\n';
  }

  if (recommendations.length > 0) {
    response += `💡 **Empfehlungen:**\n`;
    recommendations.slice(0, 3).forEach(rec => { // Limit to 3 recommendations
      response += `• ${rec}\n`;
    });
    response += '\n';
  }

  response += `🎯 **Nächste Schritte:** Besuchen Sie unseren [Konfigurator](/fenster-konfigurator) für eine detaillierte Konfiguration mit allen technischen Details.`;

  return response;
}

const PREDEFINED_RESPONSES = {
  greeting: "Hallo! Ich bin der Fenstermann24-Berater und helfe Ihnen gerne bei der Auswahl und Konfiguration Ihrer Fenster und Türen. Was kann ich für Sie tun?",
  fenster: "Ausgezeichnet! Bei Fenstern biete ich Ihnen eine professionelle Beratung: Für Energieeffizienz empfehle ich 3-fach Verglasung. Im Konfigurator können Sie Materialien vergleichen: Kunststoff (pflegeleicht), Aluminium (modern) oder Holz (natürlich). Soll ich Sie zum Konfigurator führen?",
  tueren: "Perfekte Wahl! Bei Haustüren ist Sicherheit wichtig: RC2-Standard ist empfehlenswert. Im Konfigurator achten Sie auf: Materialauswahl, Glaselemente und Sicherheitsausstattung. Möchten Sie dass ich Sie durch den Konfigurator führe?",
  preise: "Gerne erkläre ich Ihnen die Preisgestaltung: Im Konfigurator sehen Sie sofort alle Kosten transparent - ohne versteckte Gebühren. Tipp: Vergleichen Sie verschiedene Ausstattungen, um das beste Preis-Leistungs-Verhältnis zu finden.",
  kontakt: "Sie erreichen unser Beratungsteam unter +49 (0) 40 123 456 789. Aber lassen Sie mich Ihnen zuerst mit dem Konfigurator helfen - dort erhalten Sie bereits 80% aller Antworten sofort!",
  versand: "Wir bieten verschiedene Versandoptionen: Standard (89€, 3-5 Werktage), Premium (149€, 1-2 Werktage) und Express (249€, 24h). Im Konfigurator können Sie die passende Option auswählen.",
  konfigurator_help: "Gerne helfe ich Ihnen beim Konfigurator! Schritt für Schritt: 1) Produkttyp wählen 2) Abmessungen eingeben 3) Material auswählen 4) Extras konfigurieren. Bei Fehlern erscheint ein roter Hinweis - beachten Sie diese für ein korrektes Angebot.",
  fehler: "Keine Sorge! Häufige Konfigurator-Fehler: Unrealistische Abmessungen (min. 40cm, max. 300cm), fehlende Pflichtangaben oder unpassende Kombinationen. Prüfen Sie die rot markierten Felder und folgen Sie den Hinweisen.",
  technical_validation: "🔧 **Technische Validierung:** Ich prüfe alle Maße automatisch gegen DIN 18055 und andere deutsche Normen. Bei Abweichungen erhalten Sie sofort konkrete Hinweise zu den technischen Anforderungen und Grenzwerten.",
  default: "Das ist eine sehr gute Frage! Als Ihr Fenstermann24-Berater empfehle ich: Nutzen Sie den Konfigurator für Details oder rufen Sie uns an: +49 (0) 40 123 456 789. Ich helfe Ihnen gerne weiter!"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: PREDEFINED_RESPONSES.greeting,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Animation effect for the Fenstermann character
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000); // Animate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // First, check for measurements in the user message
    const measurements = extractMeasurements(userMessage);
    if (measurements.length > 0) {
      const technicalGuidance = validateMeasurementsAndProvideGuidance(measurements, userMessage);
      if (technicalGuidance) {
        return technicalGuidance;
      }
    }
    
    // Standard response logic
    if (message.includes('hallo') || message.includes('hi') || message.includes('guten tag')) {
      return PREDEFINED_RESPONSES.greeting;
    }
    if (message.includes('maß') || message.includes('messen') || message.includes('abmess') || message.includes('dimension')) {
      return PREDEFINED_RESPONSES.technical_validation;
    }
    if (message.includes('fehler') || message.includes('problem') || message.includes('funktioniert nicht')) {
      return PREDEFINED_RESPONSES.fehler;
    }
    if (message.includes('konfigurator') || message.includes('hilfe') || message.includes('anleitung')) {
      return PREDEFINED_RESPONSES.konfigurator_help;
    }
    if (message.includes('fenster')) {
      return PREDEFINED_RESPONSES.fenster;
    }
    if (message.includes('tür') || message.includes('haustür') || message.includes('türen')) {
      return PREDEFINED_RESPONSES.tueren;
    }
    if (message.includes('preis') || message.includes('kosten') || message.includes('euro') || message.includes('€')) {
      return PREDEFINED_RESPONSES.preise;
    }
    if (message.includes('kontakt') || message.includes('telefon') || message.includes('anrufen')) {
      return PREDEFINED_RESPONSES.kontakt;
    }
    if (message.includes('versand') || message.includes('lieferung') || message.includes('transport')) {
      return PREDEFINED_RESPONSES.versand;
    }
    
    return PREDEFINED_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getResponse(inputText),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Animated Fenstermann Character Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '80px',
          height: '80px',
          cursor: 'pointer',
          zIndex: 1000,
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          transition: 'all 0.3s ease'
        }}
        title="Fenstermann24 Berater"
      >
        {/* Character Base */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(145deg, #f0f8ff, #e6f3ff)',
          borderRadius: '50%',
          border: '3px solid #2563eb',
          boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isAnimating ? 'translateY(-2px)' : 'translateY(0px)',
          transition: 'transform 0.6s ease-in-out'
        }}>
          
          {/* Fenstermann Character */}
          <div style={{
            fontSize: '32px',
            transform: isAnimating ? 'rotate(5deg)' : 'rotate(-5deg)',
            transition: 'transform 0.6s ease-in-out'
          }}>
            🏠
          </div>
          
          {/* Professional Hat */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px'
          }}>
            🎩
          </div>
          
          {/* Tools Badge */}
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            fontSize: '12px',
            background: '#2563eb',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🔧
          </div>
          
          {/* Speech Bubble Indicator */}
          {!isOpen && (
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-5px',
              background: '#10b981',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              animation: isAnimating ? 'pulse 1.5s infinite' : 'none'
            }}>
              💬
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '120px',
          right: '24px',
          width: '380px',
          height: '520px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          border: '2px solid #e5e7eb',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header with Fenstermann */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            color: 'white',
            padding: '20px',
            borderRadius: '18px 18px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '24px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🏠
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '18px' }}>
                Fenstermann24 Berater
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Ihr persönlicher Fenster- & Türenexperte
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: '#fafbfc'
          }}>
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                {!message.isUser && (
                  <div style={{
                    fontSize: '20px',
                    marginTop: '4px'
                  }}>
                    🏠
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: message.isUser ? '#2563eb' : 'white',
                  color: message.isUser ? 'white' : '#374151',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  boxShadow: message.isUser ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
                  border: message.isUser ? 'none' : '1px solid #e5e7eb',
                  whiteSpace: 'pre-wrap'
                }}>
                  {/* Simple markdown-like formatting for bot messages */}
                  {message.isUser ? message.text : (
                    <div dangerouslySetInnerHTML={{
                      __html: message.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/• /g, '• ')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #2563eb; text-decoration: underline;">$1</a>')
                        .replace(/\n/g, '<br/>')
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid #e5e7eb',
            background: 'white',
            display: 'flex',
            gap: '12px'
          }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Fragen Sie den Fenstermann24-Berater..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                background: '#fafbfc'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                minWidth: '50px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.transform = 'translateY(0px)'}
            >
              ↗
            </button>
          </div>
        </div>
      )}

      {/* Add CSS animation keyframes */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
}