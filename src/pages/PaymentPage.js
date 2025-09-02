import React from 'react';

const PaymentButton = ({ customerName, customerEmail, resumeType }) => {
  const handlePayment = async () => {
    // Validate required fields
    if (!customerName || !customerEmail) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      // Call your payment API endpoint
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          resumeType,
          amount: 2999, // $29.99 in cents
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Redirect to payment processor (Stripe, PayPal, etc.)
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          alert('Payment processing error. Please try again.');
        }
      } else {
        alert('Error processing payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!customerName || !customerEmail}
      className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
        !customerName || !customerEmail
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
      }`}
    >
      {!customerName || !customerEmail 
        ? 'Please fill in all fields' 
        : 'Pay $29.99 - Get My Professional Resume'
      }
    </button>
  );
};

export default PaymentButton;
