import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Core Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy-loaded Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const JobSearch = lazy(() => import('./pages/JobSearch'));
const Network = lazy(() => import('./pages/Network'));
const Finances = lazy(() => import('./pages/Finances'));

// New Payment Pages
const Success = lazy(() => import('./pages/Success'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));

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
            <Routes>
              <Route path="/" element={<LandingPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/network" element={<Network />} />
              <Route path="/finances" element={<Finances />} />
              <Route path="/resume-payment" element={<PaymentPage />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <p className="text-gray-600 dark:text-gray-400">Page not found</p>
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
