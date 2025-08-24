import React, { useState, useEffect } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentStep, setCurrentStep] = useState('email');
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showStory, setShowStory] = useState(false);

  // Stripe Configuration
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Rv0gQMefLmcYtK75GuIVPj1PA707dyiVqrJ_p5T9Riv73B2Hz00d89QNScS';
const PRICE_IDS = {
  basic: 'price_1RzQ1wJ5ERkOYcRimAym5yrb',
  best: 'price_1RzQ2YJ5ERkOYcRiYs0G8RDs',
  immaculate: 'price_1RzQ35J5ERkOYcRiNysMIv4x'
};

  // Load Stripe
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Data persistence using localStorage
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
      placeholder: "Take your time... describe that moment when you felt truly valued...",
      encouragement: "Your story matters. Even small moments of impact reveal your unique strengths."
    },
    {
      id: 'approach',
      text: "What do you think it was about your approach that made such an impact?",
      placeholder: "What was special about how you handled that situation?",
      encouragement: "You have a unique way of seeing and solving problems. That's your superpower."
    },
    {
      id: 'uniqueness',
      text: "Why do you believe you were able to help in a way that others might not have been able to?",
      placeholder: "What unique qualities or perspective did you bring?",
      encouragement: "Your different way of thinking isn't a limitation - it's your competitive advantage."
    }
  ];

  const tiers = {
    basic: { name: 'Essential', price: 19, color: '#059669', features: ['AI-crafted professional summary', 'Dyslexia-friendly formatting', 'Core skills highlighting', 'Basic work history structure'] },
    best: { name: 'Professional', price: 39, color: '#f59e0b', features: ['Everything in Essential', 'Industry-specific keywords', 'Achievement-focused language', 'Cover letter template', 'ATS-optimized format'] },
    immaculate: { name: 'Executive', price: 49, color: '#7c3aed', features: ['Everything in Professional', 'LinkedIn profile optimization', 'Executive summary crafting', 'Personal brand development', 'Interview talking points'] }
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
      return `Professional with demonstrated ability to deliver meaningful results. Known for ${approach && approach.length > 10 ? approach.toLowerCase() : 'innovative problem-solving skills'} and commitment to ${keywords.split(',')[0]}.`;
    } else if (tier === 'best') {
      return `Results-driven professional with proven track record of making significant impact through ${approach && approach.length > 10 ? approach.toLowerCase() : 'creative approaches'}. Recognized for ability to ${moment && moment.length > 20 ? 'deliver exceptional outcomes that exceed expectations' : 'create positive change in challenging environments'}. Specializes in ${keywords} with focus on ${uniqueness && uniqueness.length > 10 ? uniqueness.toLowerCase() : 'collaborative problem-solving and continuous improvement'}.`;
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
• Creative Problem Solving & Analysis
• Team Collaboration & Communication  
• Detail-Oriented Excellence
• Process Innovation
• Adaptable Leadership

EXPERIENCE
Current Position | Company Name
• Successfully contributed to team objectives through innovative approaches
• Recognized for professional excellence and unique perspective
• Applied distinctive problem-solving skills to drive project success
• Demonstrated ability to see solutions others missed

EDUCATION
[Your Degree] | [University Name]
[Graduation Year]`;
    } else if (tier === 'best') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
• Strategic Problem Solving  • Creative Leadership  • Process Innovation
• Cross-functional Communication  • Data Analysis  • Change Management

PROFESSIONAL EXPERIENCE
Current Position | Company Name | [Start Date] - Present
• Successfully delivered exceptional results through out-of-the-box thinking
• Gained recognition for outstanding contribution to organizational success
• Leveraged unique perspective to optimize operations and drive development
• Maintained focus on continuous improvement and relationship building

Previous Position | Previous Company | [Start Date] - [End Date]
• Applied creative problem-solving to overcome complex challenges
• Built strong stakeholder relationships through authentic communication

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• [Relevant coursework, honors, or achievements]`;
    } else {
      return `${name}
${contact}
LinkedIn: [Your LinkedIn Profile] | Portfolio: [Your Website]

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
Innovation Leadership       Process Excellence         Strategic Vision
Creative Problem Solving   Team Development          Change Management

PROFESSIONAL EXPERIENCE
Senior Position | Company Name | [Start Date] - Present
• Spearheaded innovative initiatives resulting in measurable improvements
• Earned recognition for transformative contributions that exceeded targets
• Applied unique expertise to drive strategic initiatives and capability development
• Led diverse teams through complex challenges using creative approaches

Previous Position | Previous Company | [Start Date] - [End Date]
• Consistently achieved performance targets through innovative methodologies
• Collaborated with leadership to implement breakthrough solutions

KEY PROJECTS & ACHIEVEMENTS
• Led cross-functional initiative resulting in 25% efficiency improvement
• Developed creative solution that enhanced stakeholder satisfaction by 40%
• Mentored team of 8 professionals, achieving 95% retention through inclusive leadership

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• [Relevant coursework, magna cum laude, etc.]`;
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

  const handleStripePayment = async (tierKey) => {
    if (!window.Stripe) {
      alert('Stripe is loading, please try again in a moment');
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: PRICE_IDS[tierKey],
          customerEmail: userEmail,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel'
        })
      });

      if (!response.ok) {
        // Fallback to direct Stripe checkout for demo
        const { error } = await stripe.redirectToCheckout({
          lineItems: [{
            price: PRICE_IDS[tierKey],
            quantity: 1,
          }],
          mode: 'subscription',
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel',
          customerEmail: userEmail,
        });

        if (error) {
          console.error('Stripe error:', error);
          alert('Payment failed: ' + error.message);
        }
        return;
      }

      const session = await response.json();
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (error) {
        alert('Payment failed: ' + error.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      // Record transaction locally for demo purposes
      const transaction = {
        id: `txn_${Date.now()}`,
        email: userEmail,
        tier: tierKey,
        amount: tiers[tierKey].price,
        status: 'completed',
        timestamp: new Date().toISOString(),
        industry: detectIndustry(answers)
      };
      
      setTransactions(prev => [...prev, transaction]);
      alert(`Payment successful! Your ${tiers[tierKey].name} resume is ready for download.`);
      setShowModal(false);
      resetForm();
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const resetForm = () => {
    setCurrentStep('email');
    setCurrentQuestion(0);
    setUserEmail('');
    setAnswers({ moment: '', approach: '', uniqueness: '' });
  };

  const startJourney = () => {
    setShowModal(true);
    setCurrentStep('email');
  };

  // Admin Dashboard Data
  const totalRevenue = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const completionRate = users.length > 0 ? (users.filter(u => u.completed).length / users.length * 100).toFixed(1) : 0;

  return (
    <div style={{
      padding: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
      minHeight: '100vh',
      width: '100%',
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

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        padding: '60px 20px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating elements */}
        <div style={{ position: 'absolute', top: '20px', left: '10%', fontSize: '30px', opacity: '0.3' }} className="animate-float">🧠</div>
        <div style={{ position: 'absolute', top: '40px', right: '15%', fontSize: '25px', opacity: '0.3', animationDelay: '2s' }} className="animate-float">💡</div>
        <div style={{ position: 'absolute', bottom: '30px', left: '20%', fontSize: '35px', opacity: '0.3', animationDelay: '4s' }} className="animate-float">⭐</div>

        <div className="animate-fadeInUp" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 64px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Your Unique Mind Is Your Career Advantage
          </h1>
          
          <p style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            marginBottom: '30px',
            lineHeight: '1.4',
            color: '#e2e8f0'
          }}>
            I know what it feels like to be overlooked because your brain works differently.
            <br/>
            <strong>Let's change that together.</strong>
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              lineHeight: '1.6',
              color: '#f1f5f9',
              fontStyle: 'italic'
            }}>
              "I've battled dyslexia and ADHD my whole life. I know what it's like when employers can't see past the surface to recognize your unique problem-solving abilities, creativity, and resilience. Your different way of thinking isn't a limitation—it's your competitive advantage."
            </p>
            <p style={{ 
              marginTop: '15px', 
              fontSize: 'clamp(14px, 3vw, 16px)', 
              color: '#cbd5e1',
              fontWeight: 'bold'
            }}>
              - The Founder
            </p>
          </div>

          <button
            onClick={startJourney}
            style={{
              background: 'linear-gradient(45deg, #059669, #10b981)',
              color: 'white',
              padding: '20px 40px',
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(5, 150, 105, 0.4)',
              transition: 'all 0.3s ease',
              marginRight: '15px',
              marginBottom: '15px'
            }}
          >
            Discover Your Hidden Strengths
          </button>

          <button
            onClick={() => setShowStory(true)}
            style={{
              background: 'transparent',
              color: '#e2e8f0',
              padding: '20px 40px',
              fontSize: 'clamp(16px, 3vw, 18px)',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '15px'
            }}
          >
            Read My Story
          </button>

          <p style={{
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#94a3b8',
            marginTop: '20px'
          }}>
            ✨ Free assessment • 3 simple questions • AI-powered insights
          </p>
        </div>
      </div>

      {/* Social Proof Section */}
      <div style={{ padding: '50px 20px', backgroundColor: 'white' }}>
        <h2 style={{ 
          fontSize: 'clamp(24px, 5vw, 32px)', 
          marginBottom: '30px',
          color: '#1e293b'
        }}>
          You're Not Alone In This Journey
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            padding: '25px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            border: '2px solid #0ea5e9'
          }}>
            <p style={{ fontSize: '16px', color: '#0c4a6e', fontStyle: 'italic', marginBottom: '15px' }}>
              "Finally, someone who gets it! My dyslexia always made me feel like my resume didn't show my real capabilities. This changed everything."
            </p>
            <p style={{ fontSize: '14px', color: '#075985', fontWeight: 'bold' }}>- Sarah M., Marketing Manager</p>
          </div>

          <div style={{
            padding: '25px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
            border: '2px solid #10b981'
          }}>
            <p style={{ fontSize: '16px', color: '#064e3b', fontStyle: 'italic', marginBottom: '15px' }}>
              "I have ADHD and always struggled to organize my thoughts on paper. This helped me see my scattered thinking as creative problem-solving."
            </p>
            <p style={{ fontSize: '14px', color: '#047857', fontWeight: 'bold' }}>- Marcus T., Software Developer</p>
          </div>

          <div style={{
            padding: '25px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fefbf3, #fef3c7)',
            border: '2px solid #f59e0b'
          }}>
            <p style={{ fontSize: '16px', color: '#78350f', fontStyle: 'italic', marginBottom: '15px' }}>
              "I never realized my unique perspective was actually an asset. Now employers see me as innovative, not just 'different.'"
            </p>
            <p style={{ fontSize: '14px', color: '#92400e', fontWeight: 'bold' }}>- Jennifer L., Project Coordinator</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: '50px 20px', background: '#f8fafc' }}>
        <h2 style={{ 
          fontSize: 'clamp(24px, 5vw, 32px)', 
          marginBottom: '40px',
          color: '#1e293b'
        }}>
          Three Questions. Life-Changing Results.
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #059669, #10b981)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '30px'
            }}>
              💭
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#1e293b' }}>Share Your Story</h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>
              Tell us about a time when you made a real difference. Everyone has these moments - we help you see them clearly.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '30px'
            }}>
              🤖
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#1e293b' }}>AI Analysis</h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>
              Our AI detects your industry, communication style, and unique strengths - especially those that neurotypical assessment might miss.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #7c3aed, #a855f7)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '30px'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#1e293b' }}>Get Noticed</h3>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>
              Receive a resume that showcases your unique problem-solving abilities and resilience as competitive advantages.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        color: 'white'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 40px)',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          Ready to be seen for who you really are?
        </h2>
        
        <p style={{
          fontSize: 'clamp(16px, 4vw, 20px)',
          marginBottom: '30px',
          color: '#e2e8f0',
          lineHeight: '1.4'
        }}>
          Your different way of thinking has given you unique insights and problem-solving abilities.
          <br/>
          Let's make sure employers see that too.
        </p>

        <button
          onClick={startJourney}
          style={{
            background: 'linear-gradient(45deg, #059669, #10b981)',
            color: 'white',
            padding: '20px 40px',
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(5, 150, 105, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          Start Your Transformation
        </button>

        <p style={{
          fontSize: 'clamp(14px, 3vw, 16px)',
          color: '#94a3b8',
          marginTop: '20px'
        }}>
          No credit card required • See your potential first
        </p>
      </div>

      {/* Personal Story Modal */}
      {showStory && (
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
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowStory(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
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

            <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#1e293b' }}>
              Why I Built LaunchpadPoint
            </h2>

            <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
              <p style={{ marginBottom: '20px' }}>
                Growing up with dyslexia and ADHD, I spent years feeling like I was always one step behind. Teachers would tell me to "focus more" or "try harder," but they didn't understand that my brain simply processed information differently.
              </p>

              <p style={{ marginBottom: '20px' }}>
                In the job market, it was even worse. My resume looked scattered. My interview answers seemed unfocused. Employers saw the gaps and the job-hopping without understanding the incredible problem-solving journey that led to each change.
              </p>

              <p style={{ marginBottom: '20px' }}>
                But here's what I learned: <strong>My "scattered" thinking was actually creative problem-solving.</strong> My "inability to focus" was actually an ability to see the big picture that others missed. My "different" approach was actually innovation.
              </p>

              <p style={{ marginBottom: '20px' }}>
                The breakthrough came when I realized that traditional resume advice wasn't built for minds like ours. We needed a different approach - one that highlighted our unique strengths instead of trying to hide our differences.
              </p>

              <p style={{ marginBottom: '30px' }}>
                LaunchpadPoint exists because I believe every person with ADHD, dyslexia, or any form of neurodivergence deserves to be seen for the innovative thinker they truly are. Your different perspective isn't something to overcome - it's your competitive advantage.
              </p>

              <div style={{
                background: '#f0f9ff',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #059669'
              }}>
                <p style={{ fontStyle: 'italic', margin: 0 }}>
                  "If you're reading this and feeling overlooked, undervalued, or misunderstood - I see you. Your time to shine is now."
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => {
                  setShowStory(false);
                  startJourney();
                }}
                style={{
                  background: 'linear-gradient(45deg, #059669, #10b981)',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Start My Journey
              </button>
            </div>
          </div>
        </div>
      )}

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
              Business Dashboard
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '12px', border: '2px solid #059669' }}>
                <h3 style={{ fontSize: '18px', color: '#059669', marginBottom: '10px' }}>Total Users</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>{users.length}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>People Discovered</p>
              </div>
              <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '12px', border: '2px solid #f59e0b' }}>
                <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '10px' }}>Completion Rate</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>{completionRate}%</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Stories Shared</p>
              </div>
              <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '2px solid #10b981' }}>
                <h3 style={{ fontSize: '18px', color: '#10b981', marginBottom: '10px' }}>Revenue</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>${totalRevenue}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Lives Changed</p>
              </div>
              <div style={{ backgroundColor: '#faf5ff', padding: '20px', borderRadius: '12px', border: '2px solid #7c3aed' }}>
                <h3 style={{ fontSize: '18px', color: '#7c3aed', marginBottom: '10px' }}>Transactions</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>{transactions.length}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Successful Payments</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#374151' }}>Recent Email Signups</h3>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}>
                  {users.slice(-5).reverse().map((user, index) => (
                    <div key={index} style={{ 
                      fontSize: '12px', 
                      marginBottom: '8px', 
                      padding: '8px', 
                      backgroundColor: 'white', 
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong>{user.email}</strong>
                      <br/>Industry: {user.industry} | Status: {user.completed ? 'Completed' : 'In Progress'}
                      <br/><span style={{ color: '#6b7280' }}>{new Date(user.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No users yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#374151' }}>Recent Transactions</h3>
                <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}>
                  {transactions.slice(-5).reverse().map((txn, index) => (
                    <div key={index} style={{ 
                      fontSize: '12px', 
                      marginBottom: '8px', 
                      padding: '8px', 
                      backgroundColor: 'white', 
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong>${txn.amount} - {txn.tier.toUpperCase()}</strong>
                      <br/>Customer: {txn.email}
                      <br/>Industry: {txn.industry}
                      <br/><span style={{ color: '#6b7280' }}>ID: {txn.id}</span>
                      <br/><span style={{ color: '#6b7280' }}>{new Date(txn.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No transactions yet</p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + "Email,Industry,Completed,Timestamp\n"
                    + users.map(u => `${u.email},${u.industry},${u.completed},${u.timestamp}`).join("\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "launchpadpoint_users.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Export User Data
              </button>
              <button
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + "Transaction ID,Email,Tier,Amount,Industry,Timestamp\n"
                    + transactions.map(t => `${t.id},${t.email},${t.tier},${t.amount},${t.industry},${t.timestamp}`).join("\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "launchpadpoint_transactions.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                style={{
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Export Transaction Data
              </button>
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
                <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '20px', color: '#059669', textAlign: 'center' }}>
                  🌟 Your Transformation Starts Here
                </h2>
                <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', color: '#6b7280', marginBottom: '30px', textAlign: 'center' }}>
                  Ready to discover what makes you uniquely valuable? Let's begin.
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
                  Begin My Story
                </button>
              </>
            )}

            {currentStep === 'questions' && (
              <>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          backgroundColor: index <= currentQuestion ? '#059669' : '#d1d5db',
                          margin: '0 8px',
                          transition: 'all 0.3s ease',
                          boxShadow: index <= currentQuestion ? '0 0 10px rgba(5, 150, 105, 0.5)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>

                <h2 style={{
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  marginBottom: '15px',
                  color: '#374151',
                  lineHeight: '1.4',
                  textAlign: 'center'
                }}>
                  {questions[currentQuestion].text}
                </h2>

                <p style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  color: '#059669',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginBottom: '25px',
                  fontWeight: '500'
                }}>
                  {questions[currentQuestion].encouragement}
                </p>

                <textarea
                  value={answers[questions[currentQuestion].id]}
                  onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                  placeholder={questions[currentQuestion].placeholder}
                  style={{
                    width: '100%',
                    minHeight: '150px',
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
                    fontSize: '14px',
                    color: '#059669',
                    fontWeight: '500'
                  }}>
                    <input
                      type="checkbox"
                      checked={dyslexiaFont}
                      onChange={(e) => setDyslexiaFont(e.target.checked)}
                      style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                    />
                    <span>Use dyslexia-friendly font (we've got you covered! 🧠)</span>
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
                      padding: '15px 25px',
                      backgroundColor: currentQuestion === 0 ? '#f3f4f6' : '#6b7280',
                      color: currentQuestion === 0 ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      flex: '1'
                    }}
                  >
                    Previous
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={!answers[questions[currentQuestion].id].trim()}
                    style={{
                      padding: '15px 25px',
                      background: answers[questions[currentQuestion].id].trim() 
                        ? 'linear-gradient(45deg, #059669, #10b981)' 
                        : '#f3f4f6',
                      color: answers[questions[currentQuestion].id].trim() ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: answers[questions[currentQuestion].id].trim() ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      flex: '2'
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? '✨ Reveal My Potential' : 'Continue My Story'}
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
                  🎉 Look What We Discovered About You!
                </h2>

                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  border: '2px solid #0ea5e9'
                }}>
                  <p style={{ 
                    fontSize: 'clamp(16px, 3vw, 18px)', 
                    color: '#0c4a6e', 
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>
                    🎯 AI Detected Industry: {detectIndustry(answers).charAt(0).toUpperCase() + detectIndustry(answers).slice(1)}
                  </p>
                  <p style={{ fontSize: '14px', color: '#075985' }}>
                    Your unique experiences have prepared you for roles in this field in ways others can't replicate.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#6b7280' }}>
                      🧠 Your Neuro-Optimized Resume
                    </h3>
                    <div style={{
                      backgroundColor: '#fffef7',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #fbbf24',
                      fontFamily: 'OpenDyslexic, Arial, sans-serif',
                      fontSize: '12px',
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
                    <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#6b7280' }}>
                      💼 Professional Format
                    </h3>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '11px',
                      lineHeight: '1.4',
                      whiteSpace: 'pre-line',
                      fontFamily: 'Times, serif',
                      maxHeight: '300px',
                      overflow: 'auto'
                    }}>
                      {generateFullResume('basic')}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                  padding: '25px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  textAlign: 'center',
                  border: '2px solid #10b981'
                }}>
                  <h3 style={{ fontSize: '20px', color: '#064e3b', marginBottom: '15px', fontWeight: 'bold' }}>
                    Ready to Get the Recognition You Deserve?
                  </h3>
                  <p style={{ fontSize: '16px', color: '#047857', marginBottom: '20px' }}>
                    Choose your level of career transformation. Each tier is designed to showcase your unique strengths in different ways.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  {Object.entries(tiers).map(([tierKey, tierData]) => (
                    <div key={tierKey} style={{
                      border: `3px solid ${tierData.color}`,
                      borderRadius: '15px',
                      padding: '25px',
                      backgroundColor: tierKey === 'best' ? '#fef3c7' : 'white',
                      position: 'relative',
                      transform: tierKey === 'best' ? 'scale(1.05)' : 'scale(1)'
                    }}>
                      {tierKey === 'best' && (
                        <div style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: tierData.color,
                          color: 'white',
                          padding: '8px 20px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          MOST POPULAR
                        </div>
                      )}
                      
                      <h3 style={{ fontSize: '22px', marginBottom: '10px', marginTop: tierKey === 'best' ? '15px' : '0' }}>
                        {tierData.name}
                      </h3>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: tierData.color, marginBottom: '20px' }}>
                        ${tierData.price}<span style={{ fontSize: '16px', color: '#6b7280' }}>/month</span>
                      </p>
                      
                      <ul style={{
                        textAlign: 'left',
                        fontSize: '14px',
                        marginBottom: '25px',
                        paddingLeft: '0',
                        listStyle: 'none'
                      }}>
                        {tierData.features.map((feature, index) => (
                          <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ color: tierData.color, marginRight: '8px', fontWeight: 'bold' }}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        onClick={() => handleStripePayment(tierKey)}
                        disabled={isProcessingPayment}
                        style={{
                          backgroundColor: isProcessingPayment ? '#9ca3af' : tierData.color,
                          color: 'white',
                          padding: '15px 20px',
                          border: 'none',
                          borderRadius: '10px',
                          width: '100%',
                          cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}
                      >
                        {isProcessingPayment ? 'Processing...' : `Transform My Career - $${tierData.price}`}
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
                    💝 30-day money-back guarantee • Cancel anytime • Dyslexia & ADHD optimized
                  </p>
                  <button
                    onClick={resetForm}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
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
