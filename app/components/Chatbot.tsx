'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const PREDEFINED_RESPONSES = {
  greeting: "Hallo! Ich bin der Fenstermann24-Berater und helfe Ihnen gerne bei der Auswahl und Konfiguration Ihrer Fenster und Türen. Was kann ich für Sie tun?",
  fenster: "Ausgezeichnet! Bei Fenstern biete ich Ihnen eine professionelle Beratung: Für Energieeffizienz empfehle ich 3-fach Verglasung. Im Konfigurator können Sie Materialien vergleichen: Kunststoff (pflegeleicht), Aluminium (modern) oder Holz (natürlich). Soll ich Sie zum Konfigurator führen?",
  tueren: "Perfekte Wahl! Bei Haustüren ist Sicherheit wichtig: RC2-Standard ist empfehlenswert. Im Konfigurator achten Sie auf: Materialauswahl, Glaselemente und Sicherheitsausstattung. Möchten Sie dass ich Sie durch den Konfigurator führe?",
  preise: "Gerne erkläre ich Ihnen die Preisgestaltung: Im Konfigurator sehen Sie sofort alle Kosten transparent - ohne versteckte Gebühren. Tipp: Vergleichen Sie verschiedene Ausstattungen, um das beste Preis-Leistungs-Verhältnis zu finden.",
  kontakt: "Sie erreichen unser Beratungsteam unter [TELEFONNUMMER]. Aber lassen Sie mich Ihnen zuerst mit dem Konfigurator helfen - dort erhalten Sie bereits 80% aller Antworten sofort!",
  montage: "Unsere Montage-Profis sorgen für perfekten Einbau mit 5 Jahren Garantie. Tipp im Konfigurator: Wählen Sie 'Montage-Service' für automatische Terminplanung und kostenlose Altfenster-Entsorgung.",
  konfigurator_help: "Gerne helfe ich Ihnen beim Konfigurator! Schritt für Schritt: 1) Produkttyp wählen 2) Abmessungen eingeben 3) Material auswählen 4) Extras konfigurieren. Bei Fehlern erscheint ein roter Hinweis - beachten Sie diese für ein korrektes Angebot.",
  fehler: "Keine Sorge! Häufige Konfigurator-Fehler: Unrealistische Abmessungen (min. 40cm, max. 300cm), fehlende Pflichtangaben oder unpassende Kombinationen. Prüfen Sie die rot markierten Felder und folgen Sie den Hinweisen.",
  default: "Das ist eine sehr gute Frage! Als Ihr Fenstermann-Berater empfehle ich: Nutzen Sie den Konfigurator für Details oder rufen Sie uns an: [TELEFONNUMMER]. Ich helfe Ihnen gerne weiter!"
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
    
    if (message.includes('hallo') || message.includes('hi') || message.includes('guten tag')) {
      return PREDEFINED_RESPONSES.greeting;
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
    if (message.includes('montage') || message.includes('einbau') || message.includes('installation')) {
      return PREDEFINED_RESPONSES.montage;
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
                  border: message.isUser ? 'none' : '1px solid #e5e7eb'
                }}>
                  {message.text}
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
              placeholder="Fragen Sie den Fenstermann..."
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