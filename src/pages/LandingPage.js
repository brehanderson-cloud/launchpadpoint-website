import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ toggleTheme, darkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">LaunchpadPoint</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your Career with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            LaunchpadPoint combines artificial intelligence, comprehensive accessibility, 
            and professional networking to accelerate your career development journey.
          </p>
          
          {/* Updated CTA Buttons - Resume Builder Primary */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/payment')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Create Professional Resume
              <span className="block text-sm font-normal mt-1 opacity-90">$29.99 • Instant Access</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/ai-assistant')}
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Try AI Assistant
            </button>
          </div>
        </div>
        
        {/* Feature Cards - Updated with Resume Builder Highlight */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border-2 border-red-200 dark:border-red-800">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl">
              📄
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white text-red-600 dark:text-red-400">AI Resume Builder</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Create tailored, professional resumes that match job requirements</p>
            <button 
              onClick={() => navigate('/payment')}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
            >
              Build Now → $29.99
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl">
              🎯
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Job Matching</h3>
            <p className="text-gray-600 dark:text-gray-400">Find relevant opportunities that align with your skills</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl">
              ♿
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Accessibility First</h3>
            <p className="text-gray-600 dark:text-gray-400">WCAG 2.1 AA compliant with 15+ accessibility features</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl">
              🌐
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Professional Network</h3>
            <p className="text-gray-600 dark:text-gray-400">Connect with mentors, peers, and industry leaders</p>
          </div>
        </div>

        {/* Value Proposition Section - New */}
        <div className="mt-20 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our Resume Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2 dark:text-white">Job-Tailored</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">AI analyzes job descriptions and customizes your resume</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2 dark:text-white">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Professional resume ready in minutes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-semibold mb-2 dark:text-white">ATS Optimized</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Passes Applicant Tracking Systems</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold mb-2 dark:text-white">Unlimited Edits</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Refine and update as many times as needed</p>
            </div>
          </div>
          <div className="mt-8">
            <button 
              onClick={() => navigate('/payment')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Get Your Professional Resume
              <span className="block text-sm font-normal mt-1 opacity-90">One-time payment • Lifetime access</span>
            </button>
          </div>
        </div>

        {/* Stats Section - Updated */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Resumes Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">92%</div>
              <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600 dark:text-gray-400">AI Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
