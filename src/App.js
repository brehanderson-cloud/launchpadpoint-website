import React, { useState, useEffect } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    moment: '',
    approach: '',
    uniqueness: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('launchpadAnswers');
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem('launchpadAnswers', JSON.stringify(answers));
  }, [answers]);

  const questions = [
    {
      id: 'moment',
      text: "Think of a moment when someone genuinely thanked you or told you that you made a difference in their life or work. What happened?",
      placeholder: "Take your time... describe that moment when you felt truly valued..."
    },
    {
      id: 'approach',
      text: "What do you think it was about your approach that made such an impact?",
      placeholder: "What was special about how you handled that situation?"
    },
    {
      id: 'uniqueness',
      text: "Why do you believe you were able to help in a way that others might not have been able to?",
      placeholder: "What unique qualities or perspective did you bring?"
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowPreview(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuestions = () => {
    setCurrentQuestion(0);
    setShowPreview(false);
    setAnswers({ moment: '', approach: '', uniqueness: '' });
  };

  const generatePreview = () => {
    const name = "Your Name";
    
    return `${name}
Professional Summary

${answers.approach ? `I am known for my ${answers.approach.toLowerCase()}. ` : ''}${answers.moment ? `My colleagues value my ability to ${answers.moment.toLowerCase().includes('help') ? 'provide meaningful support' : 'make a positive impact'}. ` : ''}${answers.uniqueness ? `What sets me apart is ${answers.uniqueness.toLowerCase()}.` : ''}

Experience
• Successfully delivered impactful results in collaborative environments
• Recognized for ${answers.approach || 'exceptional problem-solving abilities'}
• Demonstrated unique ability to ${answers.uniqueness || 'connect with and support others'}

Education
• [Your Education Details]

This is just the beginning of your story...`;
  };

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Animated Header */}
      <div style={{
        background: 'linear-gradient(45deg, #059669, #10b981, #34d399)',
        backgroundSize: '200% 200%',
        animation: 'gradient 3s ease infinite',
        borderRadius: '20px',
        padding: '30px 20px',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>
          {`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            .rocket {
              font-size: clamp(40px, 8vw, 80px);
              animation: bounce 2s infinite;
              display: inline-block;
              filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3));
            }
            .sparkle {
              position: absolute;
              color: #fbbf24;
              animation: pulse 1.5s infinite;
            }
          `}
        </style>
        
        {/* Decorative sparkles */}
        <div className="sparkle" style={{ top: '20px', left: '10%', fontSize: '20px' }}>✨</div>
        <div className="sparkle" style={{ top: '15px', right: '15%', fontSize: '16px', animationDelay: '0.5s' }}>⭐</div>
        <div className="sparkle" style={{ bottom: '20px', left: '20%', fontSize: '18px', animationDelay: '1s' }}>💫</div>
        <div className="sparkle" style={{ bottom: '25px', right: '10%', fontSize: '22px', animationDelay: '1.5s' }}>✨</div>

        <div className="rocket">🚀</div>
        <h1 style={{
          color: 'white',
          fontSize: 'clamp(24px, 6vw, 48px)',
          marginBottom: '10px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          letterSpacing: '2px'
        }}>
          LAUNCHPADPOINT
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 4vw, 24px)',
          color: '#f0f9ff',
          marginBottom: '0',
          fontWeight: '500',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          The Launchpad for Your Career
        </p>
      </div>

      {/* Motivational CTA Button */}
      <div style={{ marginBottom: '40px', padding: '0 10px' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: 'linear-gradient(45deg, #059669, #10b981)',
            color: 'white',
            padding: 'clamp(15px, 4vw, 20px) clamp(20px, 6vw, 40px)',
            fontSize: 'clamp(18px, 4vw, 28px)',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.4)',
            transition: 'all 0.3s ease',
            marginBottom: '15px',
            width: '100%',
            maxWidth: '500px',
            display: 'block',
            margin: '0 auto 15px auto'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 25px rgba(5, 150, 105, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 20px rgba(5, 150, 105, 0.4)';
          }}
        >
          Let's Help the World See Your Potential ✨
        </button>
        <p style={{ 
          fontSize: 'clamp(14px, 3vw, 16px)', 
          color: '#6b7280',
          fontStyle: 'italic',
          margin: '0'
        }}>
          Start with 3 simple questions - see your story come to life
        </p>
      </div>

      {/* Mobile-Friendly Pricing Tiers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 10px'
      }}>
        {/* Basic Tier */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px 20px',
          borderRadius: '15px',
          border: '3px solid #059669',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #059669, #10b981)'
          }} />
          
          <h3 style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151'
          }}>Basic</h3>
          <p style={{
            fontSize: 'clamp(28px, 6vw, 36px)',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '15px'
          }}>$19<span style={{ fontSize: '18px', color: '#6b7280' }}>/mo</span></p>
          <p style={{
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#6b7280',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>Essential resume foundation</p>
          <ul style={{
            textAlign: 'left',
            fontSize: 'clamp(12px, 3vw, 14px)',
            marginBottom: '25px',
            paddingLeft: '20px',
            lineHeight: '1.6'
          }}>
            <li style={{ marginBottom: '8px' }}>✅ Name & Contact Info</li>
            <li style={{ marginBottom: '8px' }}>✅ Education Section</li>
            <li style={{ marginBottom: '8px' }}>✅ Basic Work History</li>
            <li style={{ marginBottom: '8px' }}>✅ Dyslexia-friendly fonts</li>
          </ul>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(45deg, #059669, #10b981)',
              color: 'white',
              padding: '15px 20px',
              border: 'none',
              borderRadius: '10px',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.3s ease'
            }}
          >
            Start Your Story 🌱
          </button>
        </div>

        {/* Best Tier */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px 20px',
          borderRadius: '15px',
          border: '3px solid #f59e0b',
          boxShadow: '0 12px 35px rgba(245, 158, 11, 0.2)',
          position: 'relative',
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.02) translateY(-5px)';
          e.target.style.boxShadow = '0 20px 45px rgba(245, 158, 11, 0.25)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1.02) translateY(0)';
          e.target.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.2)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
          }} />
          
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)'
          }}>
            ⭐ MOST POPULAR ⭐
          </div>
          
          <h3 style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151',
            marginTop: '15px'
          }}>Best</h3>
          <p style={{
            fontSize: 'clamp(28px, 6vw, 36px)',
            fontWeight: 'bold',
            color: '#f59e0b',
            marginBottom: '15px'
          }}>$39<span style={{ fontSize: '18px', color: '#6b7280' }}>/mo</span></p>
          <p style={{
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#6b7280',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>Your story with summary</p>
          <ul style={{
            textAlign: 'left',
            fontSize: 'clamp(12px, 3vw, 14px)',
            marginBottom: '25px',
            paddingLeft: '20px',
            lineHeight: '1.6'
          }}>
            <li style={{ marginBottom: '8px' }}>✅ Everything in Basic</li>
            <li style={{ marginBottom: '8px' }}>✅ Professional Summary</li>
            <li style={{ marginBottom: '8px' }}>✅ Skills & Achievements</li>
            <li style={{ marginBottom: '8px' }}>✅ Cover Letter Template</li>
          </ul>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
              color: 'white',
              padding: '15px 20px',
              border: 'none',
              borderRadius: '10px',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.3s ease'
            }}
          >
            Tell Your Story 🌟
          </button>
        </div>

        {/* Immaculate Tier */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px 20px',
          borderRadius: '15px',
          border: '3px solid #7c3aed',
          boxShadow: '0 8px 25px rgba(124, 58, 237, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.1)';
        }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #7c3aed, #a855f7)'
          }} />
          
          <h3 style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151'
          }}>Immaculate</h3>
          <p style={{
            fontSize: 'clamp(28px, 6vw, 36px)',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '15px'
          }}>$49<span style={{ fontSize: '18px', color: '#6b7280' }}>/mo</span></p>
          <p style={{
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#6b7280',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>Complete career narrative</p>
          <ul style={{
            textAlign: 'left',
            fontSize: 'clamp(12px, 3vw, 14px)',
            marginBottom: '25px',
            paddingLeft: '20px',
            lineHeight: '1.6'
          }}>
            <li style={{ marginBottom: '8px' }}>✅ Everything in Best</li>
            <li style={{ marginBottom: '8px' }}>✅ Full Story Development</li>
            <li style={{ marginBottom: '8px' }}>✅ Job Description Matching</li>
            <li style={{ marginBottom: '8px' }}>✅ Document Uploads</li>
            <li style={{ marginBottom: '8px' }}>✅ LinkedIn Optimization</li>
          </ul>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(45deg, #7c3aed, #a855f7)',
              color: 'white',
              padding: '15px 20px',
              border: 'none',
              borderRadius: '10px',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.3s ease'
            }}
          >
            Master Your Story 👑
          </button>
        </div>
      </div>

      {/* Mobile-Optimized Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '10px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: 'clamp(20px, 5vw, 40px)',
            maxWidth: '95vw',
            width: '100%',
            maxHeight: '95vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'linear-gradient(45deg, #ef4444, #f87171)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
              }}
            >
              ×
            </button>

            {!showPreview ? (
              <>
                {/* Question Progress */}
                <div style={{ marginBottom: '30px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: 'clamp(10px, 3vw, 15px)',
                          height: 'clamp(10px, 3vw, 15px)',
                          borderRadius: '50%',
                          backgroundColor: index <= currentQuestion ? '#059669' : '#d1d5db',
                          margin: '0 8px',
                          transition: 'all 0.3s ease',
                          boxShadow: index <= currentQuestion ? '0 0 10px rgba(5, 150, 105, 0.5)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: 'clamp(12px, 3vw, 14px)' }}>
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>

                <h2 style={{
                  fontSize: 'clamp(18px, 4vw, 24px)',
                  marginBottom: '25px',
                  color: '#374151',
                  lineHeight: '1.4'
                }}>
                  {questions[currentQuestion].text}
                </h2>

                <textarea
                  value={answers[questions[currentQuestion].id]}
                  onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                  placeholder={questions[currentQuestion].placeholder}
                  style={{
                    width: '100%',
                    minHeight: 'clamp(100px, 20vh, 150px)',
                    padding: '15px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    resize: 'vertical',
                    fontFamily: dyslexiaFont ? 'OpenDyslexic, Arial, sans-serif' : 'Arial, sans-serif',
                    backgroundColor: dyslexiaFont ? '#fffef7' : 'white',
                    lineHeight: dyslexiaFont ? '1.8' : '1.5',
                    letterSpacing: dyslexiaFont ? '0.5px' : 'normal',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#059669'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />

                {/* Dyslexia Font Toggle */}
                <div style={{ margin: '20px 0', textAlign: 'left' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    fontSize: 'clamp(12px, 3vw, 14px)'
                  }}>
                    <input
                      type="checkbox"
                      checked={dyslexiaFont}
                      onChange={(e) => setDyslexiaFont(e.target.checked)}
                      style={{ 
                        marginRight: '10px',
                        transform: 'scale(1.2)'
                      }}
                    />
                    <span style={{ color: '#6b7280' }}>
                      Use dyslexia-friendly font
                    </span>
                  </label>
                </div>

                {/* Mobile-Optimized Navigation */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '30px',
                  gap: '15px'
                }}>
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    style={{
                      padding: 'clamp(10px, 3vw, 15px) clamp(15px, 4vw, 25px)',
                      backgroundColor: currentQuestion === 0 ? '#f3f4f6' : '#6b7280',
                      color: currentQuestion === 0 ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                      fontSize: 'clamp(12px, 3vw, 16px)',
                      flex: '1'
                    }}
                  >
                    Previous
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={!answers[questions[currentQuestion].id].trim()}
                    style={{
                      padding: 'clamp(10px, 3vw, 15px) clamp(15px, 4vw, 25px)',
                      background: answers[questions[currentQuestion].id].trim() 
                        ? 'linear-gradient(45deg, #059669, #10b981)' 
                        : '#f3f4f6',
                      color: answers[questions[currentQuestion].id].trim() ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: answers[questions[currentQuestion].id].trim() ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      fontSize: 'clamp(12px, 3vw, 16px)',
                      flex: '1'
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? 'See My Story ✨' : 'Next'}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mobile-Optimized Preview */}
                <h2 style={{
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  marginBottom: '20px',
                  color: '#059669',
                  textAlign: 'center'
                }}>
                  Here's a glimpse of your story...
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  {/* Dyslexia friendly view */}
                  <div>
                    <h3 style={{ 
                      fontSize: 'clamp(14px, 3vw, 18px)', 
                      marginBottom: '15px', 
                      color: '#6b7280' 
                    }}>
                      Dyslexia-Friendly View
                    </h3>
                    <div style={{
                      backgroundColor: '#fffef7',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #fef3c7',
                      fontFamily: 'OpenDyslexic, Arial, sans-serif',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      lineHeight: '1.8',
                      letterSpacing: '0.5px',
                      whiteSpace: 'pre-line'
                    }}>
                      <strong>Your Moment:</strong><br/>
                      {answers.moment}

                      <br/><br/><strong>Your Approach:</strong><br/>
                      {answers.approach}

                      <br/><br/><strong>Your Uniqueness:</strong><br/>
                      {answers.uniqueness}
                    </div>
                  </div>

                  {/* Professional format */}
                  <div>
                    <h3 style={{ 
                      fontSize: 'clamp(14px, 3vw, 18px)', 
                      marginBottom: '15px', 
                      color: '#6b7280' 
                    }}>
                      Professional Resume Preview
                    </h3>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: 'clamp(10px, 2.5vw, 12px)',
                      lineHeight: '1.4',
                      whiteSpace: 'pre-line',
                      fontFamily: 'Times, serif'
                    }}>
                      {generatePreview()}
                    </div>
                  </div>
                </div>

                {/* Upgrade Message */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  border: '2px solid #fbbf24'
                }}>
                  <p style={{ 
                    fontSize: 'clamp(14px, 3vw, 16px)', 
                    color: '#92400e', 
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>
                    🌟 This is just the beginning!
                  </p>
                  <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#a16207' }}>
                    With our paid tiers, we'll help you craft a complete, compelling narrative that showcases your full potential.
                  </p>
                </div>

                {/* Mobile-Optimized Action Buttons */}
                <div style={{
                  display: 'flex',
                  flexDirection: window.innerWidth > 480 ? 'row' : 'column',
                  gap: '15px',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={resetQuestions}
                    style={{
                      padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      flex: window.innerWidth > 480 ? '1' : 'none'
                    }}
                  >
                    Start Over
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowModal(false);
                      alert('Ready to unlock your full story! Choose your tier above and we\'ll help you create an amazing resume.');
                    }}
                    style={{
                      padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                      background: 'linear-gradient(45deg, #059669, #10b981)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: 'clamp(12px, 3vw, 16px)',
                      fontWeight: 'bold',
                      flex: window.innerWidth > 480 ? '2' : 'none'
                    }}
                  >
                    Unlock My Full Story 🚀
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
