import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccessibilityMenu from './components/AccessibilityMenu';

// Core Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Coming Soon Component
const ComingSoonPage = ({ feature, icon }) => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md mx-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{feature}</h1>
      <p className="text-xl text-orange-600 mb-4">Coming Soon!</p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We're working hard to bring you this feature. Stay tuned for updates!
      </p>
      <div className="space-y-3">
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => window.location.href = '/resume-payment'}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Create Professional Resume
        </button>
      </div>
    </div>
  </div>
);

// Lazy-loaded Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Finances = lazy(() => import('./pages/Finances'));

// Payment and Resume Pages
const Success = lazy(() => import('./pages/Success'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/jobs" element={<ComingSoonPage feature="Job Search" icon="🔍" />} />
              <Route path="/network" element={<ComingSoonPage feature="Professional Network" icon="🤝" />} />
              <Route path="/finances" element={<Finances />} />
              <Route path="/resume-payment" element={<PaymentPage />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
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
