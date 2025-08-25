import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton';

export default function PaymentPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Resume Creation
            </h1>
            <p className="text-xl text-gray-600">
              Get a professionally crafted resume that gets you hired
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              What You Get - $29.99
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                ATS-optimized professional resume
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Industry-specific keywords
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Cover letter template
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                48-hour delivery
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                2 revisions included
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <PaymentButton
            customerName={customerName}
            customerEmail={customerEmail}
            resumeType="professional"
          />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Secure 256-bit SSL encryption • Money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
                  }
