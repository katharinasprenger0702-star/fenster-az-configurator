'use client';

import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const PREDEFINED_RESPONSES = {
  greeting: "Hallo! Ich bin Ihr virtueller Assistent für Fenstermann24. Wie kann ich Ihnen heute helfen?",
  fenster: "Gerne helfe ich Ihnen bei Fenstern! Wir bieten Kunststoff-, Aluminium- und Holzfenster mit bester Wärmedämmung. Möchten Sie direkt zum Konfigurator?",
  tueren: "Unsere Haustüren bieten RC2-Sicherheit und modernes Design. Soll ich Sie zum Konfigurator weiterleiten?",
  preise: "Alle Preise werden transparent in unserem Online-Konfigurator angezeigt. Dort erhalten Sie sofort ein individuelles Angebot ohne versteckte Kosten.",
  kontakt: "Sie erreichen uns telefonisch unter [TELEFONNUMMER] oder nutzen Sie unseren Konfigurator für eine erste Beratung.",
  montage: "Wir bieten professionelle Montage durch geschulte Fachkräfte mit Garantie und kostenloser Entsorgung alter Fenster/Türen.",
  default: "Das ist eine interessante Frage! Für detaillierte Informationen empfehle ich Ihnen unseren Konfigurator oder rufen Sie uns direkt an: [TELEFONNUMMER]"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: PREDEFINED_RESPONSES.greeting,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hallo') || message.includes('hi') || message.includes('guten tag')) {
      return PREDEFINED_RESPONSES.greeting;
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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
        }}
        title="Chat öffnen"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e5e7eb',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: '#2563eb',
            color: 'white',
            padding: '16px',
            borderRadius: '16px 16px 0 0'
          }}>
            <div style={{ fontWeight: '600', fontSize: '16px' }}>
              Fenstermann24 Chat
            </div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>
              Wir helfen Ihnen gerne weiter
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: message.isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  background: message.isUser ? '#2563eb' : '#f3f4f6',
                  color: message.isUser ? 'white' : '#374151',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ihre Nachricht..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
}