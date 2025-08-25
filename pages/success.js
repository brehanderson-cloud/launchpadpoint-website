export default function Success() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f9ff'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🎉</div>
        
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#059669', 
          marginBottom: '16px' 
        }}>
          Payment Successful!
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#6b7280', 
          marginBottom: '32px'
        }}>
          Thank you! We'll start working on your professional resume immediately.
        </p>

        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{ color: '#059669', marginBottom: '16px' }}>What's Next?</h3>
          <ul style={{ 
            color: '#065f46', 
            textAlign: 'left',
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{ marginBottom: '8px' }}>✓ Confirmation email sent</li>
            <li style={{ marginBottom: '8px' }}>✓ We'll contact you within 24 hours</li>
            <li style={{ marginBottom: '8px' }}>✓ Resume completed in 3-5 business days</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
