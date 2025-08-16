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
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: '#059669',
        fontSize: '48px',
        marginBottom: '20px'
      }}>
        🚀 LAUNCHPADPOINT
      </h1>
      <p style={{
        fontSize: '24px',
        color: '#374151',
        marginBottom: '30px'
      }}>
        The Launchpad for Your Career
      </p>

      {/* New Motivational CTA Button */}
      <div style={{ marginBottom: '50px' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '20px 40px',
            fontSize: '28px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.4)',
            transition: 'all 0.3s ease',
            marginBottom: '15px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
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
          fontSize: '16px', 
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          Start with 3 simple questions - see your story come to life
        </p>
      </div>

      {/* Updated Pricing Tiers */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Basic Tier */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #059669',
          width: '200px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151'
          }}>Basic</h3>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '15px'
          }}>$19/mo</p>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '20px'
          }}>Essential resume foundation</p>
          <ul style={{
            textAlign: 'left',
            fontSize: '14px',
            marginBottom: '25px',
            paddingLeft: '20px'
          }}>
            <li>Name & Contact Info</li>
            <li>Education Section</li>
            <li>Basic Work History</li>
            <li>Dyslexia-friendly fonts</li>
          </ul>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Start Your Story
          </button>
        </div>

        {/* Best Tier */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #f59e0b',
          width: '200px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          transition: 'transform 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            MOST POPULAR
          </div>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151'
          }}>Best</h3>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '15px'
          }}>$39/mo</p>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '20px'
          }}>Your story with summary</p>
          <ul style={{
            textAlign: 'left',
            fontSize: '14px',
            marginBottom: '25px',
            paddingLeft: '20px'
          }}>
            <li>Everything in Basic</li>
            <li>Professional Summary</li>
            <li>Skills & Achievements</li>
            <li>Cover Letter Template</li>
          </ul>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Tell Your Story
          </button>
        </div>

        {/* Immaculate Tier */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #059669',
          width: '200px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#374151'
          }}>Immaculate</h3>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '15px'
          }}>$49/mo</p>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '20px'
          }}>Complete career narrative</p>
          <ul style={{
            textAlign: 'left',
            fontSize: '14px',
            marginBottom: '25px',
            paddingLeft: '20px'
          }}>
            <li>Everything in Best</li>
            <li>Full Story Development</li>
            <li>Job Description Matching</li>
            <li>Document Uploads</li>
            <li>LinkedIn Optimization</li>
          </ul>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Master Your Story
          </button>
        </div>
      </div>

      {/* Modal for Questions */}
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
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6b7280'
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
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: index <= currentQuestion ? '#059669' : '#d1d5db',
                          margin: '0 5px',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>

                <h2 style={{
                  fontSize: '24px',
                  marginBottom: '30px',
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
                    minHeight: '120px',
                    padding: '20px',
                    fontSize: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    resize: 'vertical',
                    fontFamily: dyslexiaFont ? 'OpenDyslexic, Arial, sans-serif' : 'Arial, sans-serif',
                    backgroundColor: dyslexiaFont ? '#fffef7' : 'white',
                    lineHeight: dyslexiaFont ? '1.8' : '1.5',
                    letterSpacing: dyslexiaFont ? '0.5px' : 'normal',
                    boxSizing: 'border-box'
                  }}
                />

                {/* Dyslexia Font Toggle */}
                <div style={{ margin: '20px 0', textAlign: 'left' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={dyslexiaFont}
                      onChange={(e) => setDyslexiaFont(e.target.checked)}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      Use dyslexia-friendly font
                    </span>
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '30px'
                }}>
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: currentQuestion === 0 ? '#f3f4f6' : '#6b7280',
                      color: currentQuestion === 0 ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={!answers[questions[currentQuestion].id].trim()}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: answers[questions[currentQuestion].id].trim() ? '#059669' : '#f3f4f6',
                      color: answers[questions[currentQuestion].id].trim() ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: answers[questions[currentQuestion].id].trim() ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold'
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? 'See My Story' : 'Next'}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Preview Screen */}
                <h2 style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  color: '#059669',
                  textAlign: 'center'
                }}>
                  Here's a glimpse of your story...
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  marginBottom: '30px'
                }}>
                  {/* Left side - Dyslexia friendly */}
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#6b7280' }}>
                      Dyslexia-Friendly View
                    </h3>
                    <div style={{
                      backgroundColor: '#fffef7',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '2px solid #fef3c7',
                      fontFamily: 'OpenDyslexic, Arial, sans-serif',
                      fontSize: '14px',
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

                  {/* Right side - Professional format */}
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#6b7280' }}>
                      Professional Resume Preview
                    </h3>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '12px',
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
                  backgroundColor: '#fef3c7',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '30px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '16px', color: '#92400e', marginBottom: '10px' }}>
                    🌟 <strong>This is just the beginning!</strong>
                  </p>
                  <p style={{ fontSize: '14px', color: '#a16207' }}>
                    With our paid tiers, we'll help you craft a complete, compelling narrative that showcases your full potential.
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={resetQuestions}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
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
                      padding: '12px 30px',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold'
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
