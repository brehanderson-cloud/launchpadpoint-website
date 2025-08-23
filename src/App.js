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
  const [selectedTier, setSelectedTier] = useState('basic');
  const [showDownload, setShowDownload] = useState(false);

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
      return `Highly accomplished professional with extensive experience driving ${keywords}. Distinguished by ${uniqueness && uniqueness.length > 15 ? uniqueness.toLowerCase() : 'unique perspective and innovative problem-solving approach'}. Proven ability to ${moment && moment.length > 25 ? 'consistently deliver transformative results that create lasting positive impact' : 'exceed performance expectations while building strong stakeholder relationships'}. Expert in leveraging ${approach && approach.length > 15 ? approach.toLowerCase() : 'strategic thinking and collaborative leadership'} to achieve organizational objectives and foster sustainable growth.`;
    }
  };

  const generateSkills = (answers, industry, tier) => {
    const industrySkills = {
      healthcare: ['Patient Care', 'Medical Documentation', 'Healthcare Compliance', 'Clinical Analysis', 'Quality Improvement'],
      recruiting: ['Full-Cycle Recruiting', 'Candidate Assessment', 'Interview Techniques', 'ATS Systems', 'Talent Pipeline Development'],
      aviation: ['Airport Operations', 'Regulatory Compliance', 'Safety Management', 'Emergency Response', 'Risk Assessment'],
      education: ['Curriculum Development', 'Student Assessment', 'Educational Technology', 'Classroom Management', 'Learning Analytics'],
      sales: ['Revenue Generation', 'Client Relationship Management', 'Market Analysis', 'Negotiation', 'Sales Strategy'],
      technology: ['Software Development', 'Technical Analysis', 'System Integration', 'User Experience', 'Project Management'],
      general: ['Project Management', 'Process Improvement', 'Team Leadership', 'Data Analysis', 'Strategic Planning']
    };

    const baseSkills = ['Communication', 'Problem Solving', 'Team Collaboration', 'Attention to Detail', 'Adaptability'];
    const specificSkills = industrySkills[industry] || industrySkills.general;

    if (tier === 'basic' || tier === 'preview') {
      return [...specificSkills.slice(0, 3), ...baseSkills.slice(0, 2)];
    } else if (tier === 'best') {
      return [...specificSkills, ...baseSkills.slice(0, 3)];
    } else {
      return [...specificSkills, ...baseSkills, 'Strategic Thinking', 'Mentoring', 'Innovation'];
    }
  };

  const generateExperience = (answers, industry, tier) => {
    const { moment, approach, uniqueness } = answers;

    if (tier === 'basic' || tier === 'preview') {
      return [
        `• Contributed to positive outcomes through ${approach && approach.length > 10 ? approach.toLowerCase() : 'dedicated effort and attention to detail'}`,
        `• Recognized for ability to ${moment && moment.length > 15 ? 'make meaningful impact on team and organizational success' : 'deliver consistent results'}`,
        `• Applied ${uniqueness && uniqueness.length > 10 ? uniqueness.toLowerCase() : 'unique perspective and skills'} to support team objectives`
      ];
    } else if (tier === 'best') {
      return [
        `• Successfully delivered exceptional results through ${approach && approach.length > 10 ? approach.toLowerCase() + ', resulting in enhanced team performance and stakeholder satisfaction' : 'innovative problem-solving and collaborative leadership'}`,
        `• Gained recognition for ${moment && moment.length > 20 ? 'consistently exceeding expectations and creating positive impact across multiple stakeholder groups' : 'outstanding contribution to organizational success'}`,
        `• Leveraged ${uniqueness && uniqueness.length > 15 ? uniqueness.toLowerCase() + ' to drive process improvements and mentor colleagues' : 'distinctive skills and perspective to optimize operations and support professional development initiatives'}`,
        `• Maintained focus on continuous improvement while building strong professional relationships`
      ];
    } else {
      return [
        `• Spearheaded initiatives that resulted in measurable improvements through ${approach && approach.length > 15 ? approach.toLowerCase() + ', leading to enhanced operational efficiency and stakeholder satisfaction' : 'strategic thinking and collaborative leadership approaches'}`,
        `• Earned widespread recognition for ${moment && moment.length > 25 ? 'transformative contributions that consistently exceeded performance targets and created lasting organizational value' : 'exceptional ability to deliver results while building strong cross-functional partnerships'}`,
        `• Applied ${uniqueness && uniqueness.length > 20 ? uniqueness.toLowerCase() + ' to identify innovative solutions and mentor high-performing teams' : 'unique expertise and perspective to drive strategic initiatives and develop organizational capabilities'}`,
        `• Established reputation for excellence in stakeholder management, process optimization, and knowledge transfer`,
        `• Consistently achieved performance targets while maintaining focus on professional development and team growth`,
        `• Collaborated with leadership to implement best practices and drive sustainable organizational improvements`
      ];
    }
  };

  const generateFullResume = (tier) => {
    const industry = detectIndustry(answers);
    const summary = generateProfessionalSummary(answers, industry, tier);
    const skills = generateSkills(answers, industry, tier);
    const experience = generateExperience(answers, industry, tier);

    const name = "Your Name";
    const contact = "Your City, State | (555) 123-4567 | your.email@example.com";

    if (tier === 'basic' || tier === 'preview') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE SKILLS
${skills.map(skill => `• ${skill}`).join('\n')}

EXPERIENCE
Recent Position | Company Name
${experience.join('\n')}

EDUCATION
[Your Degree] | [University Name]
[Graduation Year]`;
    } else if (tier === 'best') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
${skills.slice(0, 5).map(skill => `• ${skill}`).join('\n')}

TECHNICAL SKILLS
${skills.slice(5).map(skill => `• ${skill}`).join('\n')}

PROFESSIONAL EXPERIENCE
Recent Position | Company Name | [Start Date] - Present
${experience.join('\n')}

Previous Position | Previous Company | [Start Date] - [End Date]
• [Additional experience details would be added based on your background]

EDUCATION
[Your Degree] | [University Name] | [Graduation Year]
[Relevant coursework, honors, or achievements]

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
${skills.slice(0, 3).map(skill => skill).join('                    ')}

Professional Skills         Industry Expertise          Leadership Capabilities  
${skills.slice(3, 6).map(skill => skill).join('                    ')}

PROFESSIONAL EXPERIENCE
Senior Position | Company Name | [Start Date] - Present
${experience.slice(0, 3).join('\n')}

Previous Position | Previous Company | [Start Date] - [End Date]
${experience.slice(3).join('\n')}

Earlier Position | Earlier Company | [Start Date] - [End Date]
• [Additional experience details customized to your background]

KEY PROJECTS & ACHIEVEMENTS
• [Project 1]: [Impact and results achieved]
• [Project 2]: [Quantifiable outcomes and stakeholder value]
• [Initiative 3]: [Process improvements and team development]

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
    setShowDownload(false);
    setAnswers({ moment: '', approach: '', uniqueness: '' });
  };

  const startWithTier = (tier) => {
    setSelectedTier(tier);
    setShowModal(true);
  };

  const handleUpgrade = () => {
    setShowModal(false);
    setShowDownload(true);
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
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 25px rgba(5, 150, 105, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 20px rgba(5, 150, 105, 0.4)';
          }}
        >
          Let's Help the World See Your Potential
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
        }}>
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
          <button 
            onClick={() => startWithTier('basic')}
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
            Start Your Story
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
        }}>
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
            MOST POPULAR
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
          <button 
            onClick={() => startWithTier('best')}
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
            Tell Your Story
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
        }}>
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
          <button 
            onClick={() => startWithTier('immaculate')}
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
            Master Your Story
          </button>
        </div>
      </div>

      {/* Download Modal */}
      {showDownload && (
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
              onClick={() => setShowDownload(false)}
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

            <h2 style={{ fontSize: 'clamp(20px, 5vw, 28px)', marginBottom: '20px', color: '#059669' }}>
              Choose Your Tier to Download
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {[
                { tier: 'basic', price: 19, color: '#059669' },
                { tier: 'best', price: 39, color: '#f59e0b' },
                { tier: 'immaculate', price: 49, color: '#7c3aed' }
              ].map(({ tier, price, color }) => (
                <div key={tier} style={{
                  border: `2px solid ${color}`,
                  borderRadius: '12px',
                  padding: '20px',
                  backgroundColor: tier === 'best' ? '#fef3c7' : 'white'
                }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', textTransform: 'capitalize' }}>{tier}</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: color, marginBottom: '15px' }}>
                    ${price}/mo
                  </p>
                  <button
                    onClick={() => alert(`Processing ${tier} tier payment... This would connect to Stripe/payment system.`)}
                    style={{
                      backgroundColor: color,
                      color: 'white',
                      padding: '12px 20px',
                      border: 'none',
                      borderRadius: '8px',
                      width: '100%',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Download {tier.charAt(0).toUpperCase() + tier.slice(1)} Resume
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Question Modal */}
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

                {/* Navigation */}
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
                    {currentQuestion === questions.length - 1 ? 'Generate My Resume' : 'Next'}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* AI-Generated Resume Preview */}
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
                      whiteSpace: 'pre-line',
                      maxHeight: '400px',
                      overflow: 'auto'
                    }}>
                      {generateFullResume('preview')}
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
                      fontFamily: 'Times, serif',
                      maxHeight: '400px',
                      overflow: 'auto'
                    }}>
                      {generateFullResume(selectedTier)}
                    </div>
                  </div>
                </div>

                {/* AI Analysis Box */}
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
                    AI Detected Industry: {detectIndustry(answers).charAt(0).toUpperCase() + detectIndustry(answers).slice(1)}
                  </p>
                  <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#075985' }}>
                    Your resume has been customized with industry-specific language and formatting. 
                    {selectedTier === 'immaculate' ? ' Full version includes job description matching and LinkedIn optimization.' : 
                     selectedTier === 'best' ? ' Upgrade to Immaculate for complete career narrative.' : 
                     ' Upgrade for professional summary and enhanced formatting.'}
                  </p>
                </div>

                {/* Action Buttons */}
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
                    onClick={handleUpgrade}
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
                    Download My Resume
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
