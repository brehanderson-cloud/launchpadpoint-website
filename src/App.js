import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
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
      background: 'linear-gradient(135deg, #0b1426 0%, #1e293b 50%, #0b1426 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header with Version 5 Logo */}
      <header style={{
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #374151',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        padding: '16px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 16px', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
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
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>LaunchPad Point</div>
            <div style={{ fontSize: '14px', color: '#60A5FA' }}>www.launchpadpoint.com</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        {/* Launch My Resume Button */}
        <div style={{
          background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
          color: 'white',
          padding: '20px 40px',
          borderRadius: '50px',
          display: 'inline-block',
          marginBottom: '40px',
          fontSize: '36px',
          fontWeight: 'bold',
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
        }}>
          Launch My Resume 🚀
        </div>

        {/* Mission Briefing */}
        <div style={{
          background: 'transparent',
          border: '3px solid #64748B',
          borderRadius: '30px',
          padding: '20px 40px',
          display: 'inline-block',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>Mission Briefing</h2>
        </div>

        {/* Feature Line */}
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto 60px',
          fontSize: '20px',
          color: '#CBD5E1'
        }}>
          🎯 Free Launch Sequence • 3 Strategic Questions • ⭐ AI-Powered Resume Engine
        </div>

        <h2 style={{ fontSize: '42px', marginBottom: '40px' }}>Mission Control Features</h2>

        {/* AI Resume Engine Card */}
        <div style={{
          background: '#1e293b',
          border: '3px solid #3B82F6',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          maxWidth: '1000px',
          margin: '0 auto 30px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🤖</div>
          <h3 style={{ fontSize: '28px', color: '#60A5FA', marginBottom: '20px' }}>AI Resume Engine</h3>
          <p style={{ color: '#CBD5E1', fontSize: '18px', lineHeight: '1.7' }}>
            Our advanced AI analyzes your career story and launches it into professional 
            orbit with industry-specific keywords and achievement-focused language that 
            hiring managers can't ignore.
          </p>
        </div>

        {/* ATS Technology Card */}
        <div style={{
          background: '#1e293b',
          border: '3px solid #10B981',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '60px',
          maxWidth: '1000px',
          margin: '0 auto 60px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
          <h3 style={{ fontSize: '28px', color: '#34D399', marginBottom: '20px' }}>ATS Breakthrough Technology</h3>
          <p style={{ color: '#CBD5E1', fontSize: '18px', lineHeight: '1.7' }}>
            Navigate through Applicant Tracking Systems like a skilled pilot. Our 
            formatting ensures your resume reaches human eyes, not digital dead ends.
          </p>
        </div>

        {/* Questions Interface */}
        {!showModal && (
          <div style={{
            background: 'rgba(30, 41, 59, 0.7)',
            border: '2px solid #64748B',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '30px' }}>Begin Your Launch Sequence:</h3>
            
            <p style={{ color: '#CBD5E1', marginBottom: '20px', fontSize: '20px' }}>
              {questions[currentQuestion]}
            </p>
            
            <input
              type="text"
              placeholder="Enter your answer..."
              style={{
                width: '100%',
                padding: '16px',
                background: '#374151',
                border: '2px solid #64748B',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                marginBottom: '20px',
                outline: 'none'
              }}
            />

            <button
              onClick={handleQuestionSubmit}
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                color: 'white',
                padding: '16px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              {currentQuestion < 2 ? 'Next Question' : 'Launch My Career'}
            </button>
            
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>
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
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#1e293b',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            border: '2px solid #64748B'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
                Ready to Launch Your Career?
              </h2>
              <p style={{ color: '#CBD5E1' }}>Join the career launch sequence</p>
            </div>
            
            <input
              type="email"
              placeholder="Enter your email to join the mission"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                background: '#374151',
                border: '2px solid #64748B',
                borderRadius: '10px',
                color: 'white',
                marginBottom: '20px',
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
                padding: '15px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🚀 Launch My Career Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
