import React, { useState, useEffect } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentStep, setCurrentStep] = useState('email'); // email -> questions -> preview -> payment
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [answers, setAnswers] = useState({
    moment: '',
    approach: '',
    uniqueness: ''
  });
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [selectedTier, setSelectedTier] = useState('basic');
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('launchpadAnswers');
    const savedUsers = localStorage.getItem('launchpadUsers');
    const savedTransactions = localStorage.getItem('launchpadTransactions');
    
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('launchpadAnswers', JSON.stringify(answers));
    localStorage.setItem('launchpadUsers', JSON.stringify(users));
    localStorage.setItem('launchpadTransactions', JSON.stringify(transactions));
  }, [answers, users, transactions]);

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

  const tiers = {
    basic: { name: 'Basic', price: 19, color: '#059669' },
    best: { name: 'Best', price: 39, color: '#f59e0b' },
    immaculate: { name: 'Immaculate', price: 49, color: '#7c3aed' }
  };

  // AI Resume Generation Functions
  const detectIndustry = (answers) => {
    const combinedText = Object.values(answers).join(' ').toLowerCase();
    
    if (combinedText.includes('patient') || combinedText.includes('medical') || combinedText.includes('healthcare') || combinedText.includes('clinical')) {
      return 'healthcare';
    } else if (combinedText.includes('recruit') || combinedText.includes('hiring') || combinedText.includes('candidate') || combinedText.includes('hr')) {
      return 'recruiting';
    } else if (combinedText.includes('aviation') || combinedText.includes('airport') || combinedText.includes('aircraft') || combinedText.includes('flight')) {
      return 'aviation';
    } else if (combinedText.includes('teach') || combinedText.includes('student') || combinedText.includes('education') || combinedText.includes('classroom')) {
      return 'education';
    } else if (combinedText.includes('sales') || combinedText.includes('customer') || combinedText.includes('client') || combinedText.includes('revenue')) {
      return 'sales';
    } else if (combinedText.includes('software') || combinedText.includes('code') || combinedText.includes('developer') || combinedText.includes('technical')) {
      return 'technology';
    }
    return 'general';
  };

  const generateProfessionalSummary = (answers, industry, tier) => {
    const { moment, approach, uniqueness } = answers;
    
    const industryKeywords = {
      healthcare: 'patient care excellence, clinical outcomes, healthcare delivery',
      recruiting: 'talent acquisition, candidate experience, organizational growth',
      aviation: 'operational safety, regulatory compliance, industry standards',
      education: 'student success, learning outcomes, educational excellence',
      sales: 'revenue generation, client relationships, market expansion',
      technology: 'innovative solutions, technical excellence, user experience',
      general: 'operational excellence, stakeholder satisfaction, process improvement'
    };

    const keywords = industryKeywords[industry] || industryKeywords.general;

    if (tier === 'basic' || tier === 'preview') {
      return `Professional with demonstrated ability to deliver meaningful results. Known for ${approach && approach.length > 10 ? approach.toLowerCase() : 'strong problem-solving skills'} and commitment to ${keywords.split(',')[0]}.`;
    } else if (tier === 'best') {
      return `Results-driven professional with proven track record of making significant impact through ${approach && approach.length > 10 ? approach.toLowerCase() : 'innovative approaches'}. Recognized for ability to ${moment && moment.length > 20 ? 'deliver exceptional outcomes that exceed expectations' : 'create positive change in challenging environments'}. Specializes in ${keywords} with focus on ${uniqueness && uniqueness.length > 10 ? uniqueness.toLowerCase() : 'collaborative problem-solving and continuous improvement'}.`;
    } else {
      return `Highly accomplished professional with extensive experience driving ${keywords}. Distinguished by ${uniqueness && uniqueness.length > 15 ? uniqueness.toLowerCase() : 'unique perspective and innovative problem-solving approach'}. Proven ability to ${moment && moment.length > 25 ? 'consistently deliver transformative results that create lasting positive impact' : 'exceed performance expectations while building strong stakeholder relationships'}.`;
    }
  };

  const generateFullResume = (tier) => {
    const industry = detectIndustry(answers);
    const summary = generateProfessionalSummary(answers, industry, tier);
    
    const name = userEmail ? userEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Your Name";
    const contact = `${name} | ${userEmail || 'your.email@example.com'} | (555) 123-4567`;

    if (tier === 'basic' || tier === 'preview') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE SKILLS
• Problem Solving & Analysis
• Team Collaboration
• Communication Excellence
• Attention to Detail
• Process Improvement

EXPERIENCE
Recent Position | Company Name
• Successfully contributed to team objectives and organizational goals
• Recognized for professional excellence and positive impact
• Applied unique skills to support project success

EDUCATION
[Your Degree] | [University Name]
[Graduation Year]`;
    } else if (tier === 'best') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
• Strategic Problem Solving  • Team Leadership  • Process Optimization
• Communication Excellence  • Data Analysis  • Project Management

PROFESSIONAL EXPERIENCE
Recent Position | Company Name | [Start Date] - Present
• Successfully delivered exceptional results through innovative problem-solving
• Gained recognition for outstanding contribution to organizational success
• Leveraged distinctive skills to optimize operations and support development
• Maintained focus on continuous improvement and professional relationships

Previous Position | Previous Company | [Start Date] - [End Date]
• [Additional experience details would be added based on your background]

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• [Relevant coursework, honors, or achievements]

ADDITIONAL QUALIFICATIONS
• [Certifications relevant to your field]
• [Professional development activities]`;
    } else {
      return `${name}
${contact}
LinkedIn: [Your LinkedIn Profile] | Portfolio: [Your Website]

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
Technical Excellence        Process Optimization        Strategic Leadership
Problem Solving            Team Collaboration          Innovation Management

PROFESSIONAL EXPERIENCE
Senior Position | Company Name | [Start Date] - Present
• Spearheaded initiatives resulting in measurable improvements through strategic leadership
• Earned widespread recognition for transformative contributions exceeding performance targets
• Applied unique expertise to drive strategic initiatives and develop organizational capabilities
• Established reputation for excellence in stakeholder management and process optimization

Previous Position | Previous Company | [Start Date] - [End Date]
• Consistently achieved performance targets while maintaining focus on professional development
• Collaborated with leadership to implement best practices and drive sustainable improvements

KEY PROJECTS & ACHIEVEMENTS
• [Project 1]: Led cross-functional initiative resulting in 25% efficiency improvement
• [Project 2]: Developed innovative solution that enhanced stakeholder satisfaction by 40%
• [Initiative 3]: Mentored team of 8 professionals, achieving 95% retention rate

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• [Relevant coursework, magna cum laude, etc.]

Professional Certifications:
• [Industry-specific certifications]
• [Continuing education and professional development]

ADDITIONAL INFORMATION
• [Languages spoken, volunteer work, or other relevant qualifications]
• [Industry associations or professional memberships]`;
    }
  };

  const handleEmailSubmit = () => {
    if (userEmail && userEmail.includes('@')) {
      const newUser = {
        email: userEmail,
        timestamp: new Date().toISOString(),
        industry: 'unknown',
        completed: false,
        tier: selectedTier
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentStep('questions');
    }
  };

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
      setCurrentStep('preview');
      // Update user record with completion
      setUsers(prev => prev.map(user => 
        user.email === userEmail 
          ? { ...user, completed: true, industry: detectIndustry(answers) }
          : user
      ));
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handlePayment = (tier) => {
    // Simulate payment processing
    const transaction = {
      id: `txn_${Date.now()}`,
      email: userEmail,
      tier: tier,
      amount: tiers[tier].price,
      status: 'completed',
      timestamp: new Date().toISOString(),
      industry: detectIndustry(answers)
    };
    
    setTransactions(prev => [...prev, transaction]);
    
    // In real implementation, this would integrate with Stripe
    alert(`Payment successful! $${tiers[tier].price} charged for ${tiers[tier].name} tier. Resume download would begin automatically.`);
    
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep('email');
    setCurrentQuestion(0);
    setUserEmail('');
    setAnswers({ moment: '', approach: '', uniqueness: '' });
  };

  const startWithTier = (tier) => {
    setSelectedTier(tier);
    setShowModal(true);
    setCurrentStep('email');
  };

  // Admin Dashboard Data
  const totalRevenue = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const industryBreakdown = users.reduce((acc, user) => {
    acc[user.industry] = (acc[user.industry] || 0) + 1;
    return acc;
  }, {});

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
      {/* Admin Access Button */}
      <button
        onClick={() => setShowAdmin(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '20px',
          zIndex: 999
        }}
      >
        📊
      </button>

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
          onClick={() => startWithTier('preview')}
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

      {/* Pricing Tiers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 10px'
      }}>
        {Object.entries(tiers).map(([tierKey, tierData]) => (
          <div key={tierKey} style={{
            backgroundColor: 'white',
            padding: '25px 20px',
            borderRadius: '15px',
            border: `3px solid ${tierData.color}`,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            transform: tierKey === 'best' ? 'scale(1.02)' : 'scale(1)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${tierData.color}, ${tierData.color}90)`
            }} />
            
            {tierKey === 'best' && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: `linear-gradient(45deg, ${tierData.color}, ${tierData.color}90)`,
                color: 'white',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                fontWeight: 'bold',
                boxShadow: `0 4px 10px ${tierData.color}50`
              }}>
                ⭐ MOST POPULAR ⭐
              </div>
            )}
            
            <h3 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#374151',
              marginTop: tierKey === 'best' ? '15px' : '0'
            }}>{tierData.name}</h3>
            <p style={{
              fontSize: 'clamp(28px, 6vw, 36px)',
              fontWeight: 'bold',
              color: tierData.color,
              marginBottom: '15px'
            }}>${tierData.price}<span style={{ fontSize: '18px', color: '#6b7280' }}>/mo</span></p>
            <button 
              onClick={() => startWithTier(tierKey)}
              style={{
                background: `linear-gradient(45deg, ${tierData.color}, ${tierData.color}90)`,
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
              Start Your Story
            </button>
          </div>
        ))}
      </div>

      {/* Admin Dashboard Modal */}
      {showAdmin && (
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
            padding: '30px',
            maxWidth: '95vw',
            width: '100%',
            maxHeight: '95vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowAdmin(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#ef4444',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              ×
            </button>

            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#059669' }}>
              Admin Dashboard
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '12px', border: '2px solid #059669' }}>
                <h3 style={{ fontSize: '18px', color: '#059669', marginBottom: '10px' }}>Total Users</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>{users.length}</p>
              </div>
              <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '12px', border: '2px solid #f59e0b' }}>
                <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '10px' }}>Completed Stories</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>{users.filter(u => u.completed).length}</p>
              </div>
              <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '2px solid #10b981' }}>
                <h3 style={{ fontSize: '18px', color: '#10b981', marginBottom: '10px' }}>Total Revenue</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>${totalRevenue}</p>
              </div>
              <div style={{ backgroundColor: '#faf5ff', padding: '20px', borderRadius: '12px', border: '2px solid #7c3aed' }}>
                <h3 style={{ fontSize: '18px', color: '#7c3aed', marginBottom: '10px' }}>Transactions</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>{transactions.length}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#374151' }}>Recent Users</h3>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}>
                  {users.slice(-5).map((user, index) => (
                    <div key={index} style={{ fontSize: '12px', marginBottom: '8px', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>{user.email}</strong> - {user.industry} - {user.completed ? '✅ Completed' : '⏳ In Progress'}
                      <br/><span style={{ color: '#6b7280' }}>{new Date(user.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#374151' }}>Recent Transactions</h3>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}>
                  {transactions.slice(-5).map((txn, index) => (
                    <div key={index} style={{ fontSize: '12px', marginBottom: '8px', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>${txn.amount} - {txn.tier}</strong> - {txn.email}
                      <br/><span style={{ color: '#6b7280' }}>{new Date(txn.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Modal */}
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
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            {currentStep === 'email' && (
              <>
                <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', marginBottom: '20px', color: '#059669' }}>
                  Let's Start Your Journey
                </h2>
                <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#6b7280', marginBottom: '30px' }}>
                  Enter your email to begin creating your personalized resume
                </p>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={!userEmail.includes('@')}
                  style={{
                    background: userEmail.includes('@') ? 'linear-gradient(45deg, #059669, #10b981)' : '#f3f4f6',
                    color: userEmail.includes('@') ? 'white' : '#9ca3af',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    fontWeight: 'bold',
                    cursor: userEmail.includes('@') ? 'pointer' : 'not-allowed',
                    width: '100%'
                  }}
                >
                  Continue to Questions ✨
                </button>
              </>
            )}

            {currentStep === 'questions' && (
              <>
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
                    boxSizing: 'border-box'
                  }}
                />

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
                      style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                    />
                    <span style={{ color: '#6b7280' }}>Use dyslexia-friendly font</span>
                  </label>
                </div>

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
                    {currentQuestion === questions.length - 1 ? 'Generate My Resume ✨' : 'Next'}
                  </button>
                </div>
              </>
            )}

            {currentStep === 'preview' && (
              <>
                <h2 style={{
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  marginBottom: '20px',
                  color: '#059669',
                  textAlign: 'center'
                }}>
                  AI-Generated Resume Preview
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  <div>
                    <h3 style={{ fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '15px', color: '#6b7280' }}>
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
                      whiteSpace: 'pre-line',
                      maxHeight: '300px',
                      overflow: 'auto'
                    }}>
                      {generateFullResume('preview')}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '15px', color: '#6b7280' }}>
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
                      fontFamily: 'Times, serif',
                      maxHeight: '300px',
                      overflow: 'auto'
                    }}>
                      {generateFullResume(selectedTier)}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #e0f2fe, #f0f9ff)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  border: '2px solid #0ea5e9'
                }}>
                  <p style={{ 
                    fontSize: 'clamp(14px, 3vw, 16px)', 
                    color: '#0c4a6e', 
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>
                    🤖 AI Detected Industry: {detectIndustry(answers).charAt(0).toUpperCase() + detectIndustry(answers).slice(1)}
                  </p>
                  <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#075985' }}>
                    Ready to download your professional resume? Choose your tier below to get the complete version.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  {Object.entries(tiers).map(([tierKey, tierData]) => (
                    <div key={tierKey} style={{
                      border: `2px solid ${tierData.color}`,
                      borderRadius: '12px',
                      padding: '20px',
                      backgroundColor: tierKey === 'best' ? '#fef3c7' : 'white'
                    }}>
                      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{tierData.name}</h3>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', color: tierData.color, marginBottom: '15px' }}>
                        ${tierData.price}/mo
                      </p>
                      <button
                        onClick={() => handlePayment(tierKey)}
                        style={{
                          backgroundColor: tierData.color,
                          color: 'white',
                          padding: '12px 20px',
                          border: 'none',
                          borderRadius: '8px',
                          width: '100%',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: 'clamp(12px, 3vw, 14px)'
                        }}
                      >
                        Download {tierData.name}
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <button
                    onClick={resetForm}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: 'clamp(12px, 3vw, 14px)'
                    }}
                  >
                    Start Over
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
