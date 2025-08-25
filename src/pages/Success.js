import React from 'react';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-6">🎉</div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase! We'll get started on your professional resume right away.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            What happens next?
          </h3>
          <ul className="text-green-700 space-y-2 text-left">
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              Confirmation email sent
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              We'll contact you within 24 hours
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              Resume completed in 48 hours
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              2 free revisions included
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
          
          <button
            onClick={() => window.open('mailto:support@launchpadpoint.com', '_blank')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Contact Support
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Questions? Email us at support@launchpadpoint.com
        </p>
      </div>
    </div>
  );
}
