import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccessibilityMenu from './components/AccessibilityMenu';
import ProfileHeader from './components/ProfileHeader';

// Core Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Coming Soon Component with Resume Builder Redirect
const ComingSoonPage = ({ feature, icon }) => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md mx-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{feature}</h1>
      <p className="text-xl text-orange-600 mb-4">Coming Soon!</p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We're working hard to bring you this feature. For now, let's focus on building your perfect resume!
      </p>
      <div className="space-y-3">
        <button
          onClick={() => window.location.href = '/resume-builder'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Build Your Resume Now
        </button>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => window.location.href = '/resume-builder'
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Get Professional Resume Service
        </button>
      </div>
    </div>
  </div>
);

// AI Assistant Wrapper that redirects to resume builder
const AIAssistantWrapper = () => {
  const [showRedirect, setShowRedirect] = useState(false);

  React.useEffect(() => {
    // Show redirect message after 3 seconds
    const timer = setTimeout(() => setShowRedirect(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader userName="Herbert Essien" userEmail="herb.essien@gmail.com" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {showRedirect && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Looking to improve your resume?
            </h2>
            <p className="text-blue-800 mb-4">
              Our specialized Resume AI Assistant can help you create the perfect resume tailored to any job posting!
            </p>
            <button
              onClick={() => window.location.href = '/resume-builder'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Resume Builder
            </button>
          </div>
        )}
        
        {/* Regular AI Assistant content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">AI Career Assistant</h1>
          <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              Hi! I'm your AI Career Assistant. I can help with job searching, salary negotiations, interview prep, and career planning. 
              <div className="mt-2 text-sm text-blue-600">
                For resume updates and improvements, I recommend using our specialized Resume Builder!
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button 
              onClick={() => window.location.href = '/resume-builder'}
              className="bg-blue-100 text-blue-800 p-3 rounded-lg hover:bg-blue-200 text-sm font-medium"
            >
              Build/Update Resume
            </button>
            <button className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 text-sm font-medium">
              Job Search Tips
            </button>
            <button className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 text-sm font-medium">
              Salary Negotiation
            </button>
            <button className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 text-sm font-medium">
              Interview Prep
            </button>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask me about your career..."
              className="flex-1 p-3 border rounded-lg"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Finances Component
const EnhancedFinances = () => (
  <div className="min-h-screen bg-gray-50">
    <ProfileHeader userName="Herbert Essien" userEmail="herb.essien@gmail.com" />
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LaunchpadPoint Finances</h1>
          <p className="text-lg text-gray-600">Track your career investment and resume service costs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Resume Services</h3>
            <div className="text-2xl font-bold text-blue-600 mb-1">$29.99</div>
            <p className="text-sm text-blue-700">Professional Resume Package</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Career Investment</h3>
            <div className="text-2xl font-bold text-green-600 mb-1">$150.00</div>
            <p className="text-sm text-green-700">Total career development spend</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">ROI Potential</h3>
            <div className="text-2xl font-bold text-purple-600 mb-1">2,000%</div>
            <p className="text-sm text-purple-700">Avg. salary increase with professional resume</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.href = '/resume-builder'}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Invest in Your Career - Build Resume Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Lazy-loaded Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Success = lazy(() => import('./pages/Success'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // REMOVED THE PROBLEMATIC useEffect THAT WAS CAUSING 405 ERROR

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Skip Navigation for Accessibility */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:no-underline"
        >
          Skip to main content
        </a>

        <Suspense fallback={<LoadingSpinner />}>
          <main id="main-content" role="main">
            <AccessibilityMenu />
            <Routes>
              <Route path="/" element={<LandingPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
              <Route path="/dashboard" element={
                <>
                  <ProfileHeader userName="Herbert Essien" userEmail="herb.essien@gmail.com" />
                  <Dashboard />
                </>
              } />
              <Route path="/ai-assistant" element={<AIAssistantWrapper />} />
              <Route path="/jobs" element={<ComingSoonPage feature="Job Search" icon="🔍" />} />
              <Route path="/network" element={<ComingSoonPage feature="Professional Network" icon="🤝" />} />
              <Route path="/finances" element={<EnhancedFinances />} />
              <Route path="/resume-payment" element={
                <>
                  <ProfileHeader userName="Herbert Essien" userEmail="herb.essien@gmail.com" />
                  <PaymentPage />
                </>
              } />
              <Route path="/resume-builder" element={
                <>
                  <ProfileHeader userName="Herbert Essien" userEmail="herb.essien@gmail.com" />
                  <ResumeBuilder />
                </>
              } />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <p className="text-gray-600 dark:text-gray-400">Page not found</p>
                    <button
                      onClick={() => window.location.href = '/'} 
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Go Home
                    </button>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
