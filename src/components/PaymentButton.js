import React, { useState } from 'react';

export default function PaymentButton({ 
  customerEmail, 
  customerName,
  resumeType = 'professional' 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!customerEmail || !customerName) {
      setError('Please provide your name and email first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail,
          customerName,
          resumeType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {error && (
        <div style={{
          color: '#dc2626',
          background: '#fef2f2',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}
      
      <button
        onClick={handlePayment}
        disabled={loading || !customerEmail || !customerName}
        style={{
          backgroundColor: loading ? '#9ca3af' : '#2563eb',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '18px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          maxWidth: '300px'
        }}
      >
        {loading ? 'Processing...' : 'Pay $29.99 for Resume'}
      </button>
      
      <p style={{ 
        fontSize: '14px', 
        color: '#6b7280', 
        marginTop: '8px' 
      }}>
        Secure payment powered by Stripe
      </p>
    </div>
  );
          }
