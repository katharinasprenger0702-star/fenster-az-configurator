export default function WebsiteAnalyzer() {
  return (
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
  );
}