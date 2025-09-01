import React from 'react';

export default function PaymentButton({ 
  customerEmail, 
  customerName 
}) {
  const handlePayment = () => {
    if (!customerEmail || !customerName) {
      alert('Please provide your name and email first');
      return;
    }

    window.location.href = 'https://buy.stripe.com/test_fZu28t93caXj2TcejDe3e00';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handlePayment}
        disabled={!customerEmail || !customerName}
        style={{
          backgroundColor: !customerEmail || !customerName ? '#9ca3af' : '#2563eb',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '18px',
          fontWeight: '600',
          cursor: !customerEmail || !customerName ? 'not-allowed' : 'pointer',
          width: '100%',
          maxWidth: '300px'
        }}
      >
        Pay $29.99 for Resume
      </button>
    </div>
  );
}
