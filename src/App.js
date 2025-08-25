import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentStep, setCurrentStep] = useState('email');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  const questions = [
    "What's your current role?",
    "What industry are you in?", 
    "What's your biggest career challenge?"
  ];

  const handleQuestionSubmit = () => {
    if (currentQuestion < 2) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: 'white'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #374151',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px', display: 'flex', alignItems: 'center' }}>
          {/* Version 5 Logo */}
          <div style={{
            background: '#0f172a',
            borderRadius: '8px',
            padding: '8px 16px',
            marginRight: '12px'
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
              <polygon points="16,4 24,24 16,20 8,24" fill="url(#logoGrad)"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>LaunchPad Point</div>
            <div style={{ fontSize: '14px', color: '#60A5FA' }}>www.launchpadpoint.com</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ textAlign: 'center', padding: '64px 16px' }}>
        {/* Hero Buttons */}
        <div style={{
          background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '24px',
          display: 'inline-block',
          marginBottom: '32px',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          Launch My Resume 🚀
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '2px solid #64748B',
          borderRadius: '24px',
          padding: '24px 32px',
          display: 'inline-block',
          marginBottom: '48px'
        }}>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Mission Briefing</h2>
        </div>

        {/* Features */}
        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '48px' }}>
          <p style={{ fontSize: '18px', color: '#CBD5E1', marginBottom: '24px' }}>
            🎯 Free Launch Sequence • 3 Strategic Questions • ⭐ AI-Powered Resume Engine
          </p>
        </div>

        <h2 style={{ fontSize: '36px', marginBottom: '32px' }}>Mission Control Features</h2>

        {/* Feature Cards */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '48px' }}>
          {/* AI Resume Engine */}
          <div style={{
            background: '#1e293b',
            border: '2px solid #3B82F6',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontSize: '24px', color: '#60A5FA', marginBottom: '16px' }}>AI Resume Engine</h3>
            <p style={{ color: '#CBD5E1', fontSize: '18px', lineHeight: '1.6' }}>
              Our advanced AI analyzes your career story and launches it into professional orbit with industry-specific keywords and achievement-focused language that hiring managers can't ignore.
            </p>
          </div>

          {/* ATS Technology */}
          <div style={{
            background: '#1e293b',
            border: '2px solid #10B981',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <h3 style={{ fontSize: '24px', color: '#34D399', marginBottom: '16px' }}>ATS Breakthrough Technology</h3>
            <p style={{ color: '#CBD5E1', fontSize: '18px', lineHeight: '1.6' }}>
              Navigate through Applicant Tracking Systems like a skilled pilot. Our formatting ensures your resume reaches human eyes, not digital dead ends.
            </p>
          </div>

          {/* Career Mapping */}
          <div style={{
            background: '#1e293b',
            border: '2px solid #8B5CF6',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '48px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
            <h3 style={{ fontSize: '24px', color: '#A78BFA', marginBottom: '16px' }}>Career Trajectory Mapping</h3>
            <p style={{ color: '#CBD5E1', fontSize: '18px', lineHeight: '1.6' }}>
              Chart your professional course with precision navigation. Get strategic mission planning for your next career advancement.
            </p>
          </div>
        </div>

        {/* Questions Section */}
        {!showModal && (
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid #64748B',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Begin Your Launch Sequence:</h3>
            
            <p style={{ color: '#CBD5E1', marginBottom: '16px', fontSize: '18px' }}>
              {questions[currentQuestion]}
            </p>
            
            <input
              type="text"
              placeholder="Enter your answer..."
              style={{
                width: '100%',
                padding: '12px',
                background: '#374151',
                border: '1px solid #64748B',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                marginBottom: '16px'
              }}
            />

            <button
              onClick={handleQuestionSubmit}
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {currentQuestion < 2 ? 'Next Question' : 'Launch My Career'}
            </button>
            
            <p style={{ color: '#94A3B8', marginTop: '16px', fontSize: '14px' }}>
              Question <span style={{ color: '#60A5FA', fontWeight: 'bold' }}>{currentQuestion + 1}</span>/3
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '16px'
        }}>
          <div style={{
            background: '#1e293b',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            border: '1px solid #64748B'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                background: '#374151',
                borderRadius: '12px',
                padding: '12px 24px',
                margin: '0 auto 16px',
                display: 'inline-block'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" style={{ marginRight: '12px' }}>
                    <defs>
                      <linearGradient id="modalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                    </defs>
                    <polygon points="16,4 24,24 16,20 8,24" fill="url(#modalGrad)"/>
                  </svg>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>LaunchPad Point</span>
                </div>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                Ready to Launch Your Career?
              </h2>
              <p style={{ color: '#CBD5E1' }}>Join the career launch sequence</p>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid #3B82F6',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '16px'
              }}>
                <h3 style={{ color: '#93C5FD', marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
                  Mission Package Includes:
                </h3>
                <ul style={{ color: '#BFDBFE', fontSize: '14px', listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '8px' }}>🚀 Unlimited career questions</li>
                  <li style={{ marginBottom: '8px' }}>🤖 AI-powered resume engine</li>
                  <li style={{ marginBottom: '8px' }}>🎯 ATS breakthrough technology</li>
                  <li style={{ marginBottom: '8px' }}>📊 Career trajectory mapping</li>
                  <li>📡 Weekly mission updates</li>
                </ul>
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="Enter your email to join the mission"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#374151',
                  border: '1px solid #64748B',
                  borderRadius: '8px',
                  color: 'white',
                  marginBottom: '16px',
                  fontSize: '16px'
                }}
              />
              <button
                onClick={() => {
                  alert('Welcome to the mission!');
                  setShowModal(false);
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                🚀 Launch My Career Mission
              </button>
            </div>
            
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Continue with free sequence
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: '#1e293b',
        borderTop: '1px solid #374151',
        padding: '48px 16px',
        marginTop: '64px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              background: '#0f172a',
              borderRadius: '8px',
              padding: '8px 16px',
              marginRight: '12px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                </defs>
                <polygon points="12,3 18,18 12,15 6,18" fill="url(#footerGrad)"/>
              </svg>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>LaunchPad Point</div>
          </div>
          <div style={{ color: '#60A5FA', fontWeight: '500', marginBottom: '8px' }}>
            www.launchpadpoint.com
          </div>
          <p style={{ color: '#94A3B8' }}>Your Career Launch Platform</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
