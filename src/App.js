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
      text: "Tell us about a moment when someone genuinely thanked you or said you made a real difference in their work or life. What happened?",
      placeholder: "Describe that moment when you felt truly valued and made an impact...",
      encouragement: "Every career has launch-worthy moments. Let's find yours and fuel your resume with real impact."
    },
    {
      id: 'approach',
      text: "What was special about your approach that made such a difference?",
      placeholder: "What was unique about how you handled that situation?",
      encouragement: "Your unique approach is rocket fuel for your career. Let's capture what makes you different."
    },
    {
      id: 'uniqueness',
      text: "Why were you able to help in a way others couldn't? What unique perspective did you bring?",
      placeholder: "What qualities or viewpoint did you bring that made the difference?",
      encouragement: "This is your career DNA - the unique code that makes you irreplaceable. Let's launch it into orbit."
    }
  ];

  const tiers = {
    basic: { 
      name: 'Orbit Starter', 
      price: 19, 
      color: '#059669', 
      features: [
        'AI-crafted professional summary that launches first impressions',
        'Skills section optimized for career liftoff', 
        'Dyslexia-friendly formatting for clear communication',
        'Basic work history structured for maximum impact',
        'Download in PDF format ready for job applications'
      ] 
    },
    best: { 
      name: 'Mission Control', 
      price: 39, 
      color: '#f59e0b', 
      features: [
        'Everything in Orbit Starter',
        'Industry-specific keywords that get past AI screening',
        'Achievement-focused language that showcases results',
        'Professional cover letter template',
        'ATS-optimized format ensures your resume reaches human eyes',
        'Quarterly resume updates to keep you competitive'
      ] 
    },
    immaculate: { 
      name: 'Deep Space', 
      price: 49, 
      color: '#7c3aed', 
      features: [
        'Everything in Mission Control',
        'LinkedIn profile optimization for professional networking',
        'Executive-level summary crafting',
        'Personal brand development strategy',
        'Interview talking points based on your unique story',
        'Priority support from our career launch specialists'
      ] 
    }
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
      return `Dynamic professional with demonstrated ability to deliver meaningful results and drive positive outcomes. Known for ${approach && approach.length > 10 ? approach.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : 'innovative problem-solving abilities'} and unwavering commitment to ${keywords.split(',')[0]}. Proven track record of making significant impact through strategic thinking and collaborative approach.`;
    } else if (tier === 'best') {
      return `Results-driven professional with proven expertise in launching successful initiatives and driving organizational growth through ${approach && approach.length > 10 ? approach.toLowerCase() : 'strategic innovation'}. Recognized for exceptional ability to ${moment && moment.length > 20 ? 'deliver transformative outcomes that exceed performance expectations' : 'create positive change in complex environments'}. Specializes in ${keywords} with demonstrated focus on ${uniqueness && uniqueness.length > 10 ? uniqueness.toLowerCase() : 'collaborative problem-solving and operational excellence'}.`;
    } else {
      return `Visionary leader with extensive experience orchestrating high-impact initiatives that drive ${keywords}. Distinguished by ${uniqueness && uniqueness.length > 15 ? uniqueness.toLowerCase() : 'unique strategic perspective and innovative problem-solving methodologies'}. Consistently delivers ${moment && moment.length > 25 ? 'game-changing results that create lasting organizational transformation' : 'exceptional performance outcomes while building robust stakeholder relationships'}. Proven ability to navigate complex challenges and launch teams toward unprecedented success.`;
    }
  };

  const generateFullResume = (tier) => {
    const industry = detectIndustry(answers);
    const summary = generateProfessionalSummary(answers, industry, tier);
    
    const name = userEmail ? userEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Your Name";
    const contact = `${name} | ${userEmail || 'your.email@example.com'} | (555) 123-4567 | LinkedIn: linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}`;

    if (tier === 'basic' || tier === 'preview') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
• Strategic Problem Solving & Innovation    • Cross-Functional Team Leadership
• Process Optimization & Excellence        • Stakeholder Relationship Management  
• Data-Driven Decision Making             • Change Management & Implementation
• Communication & Presentation Skills     • Project Management & Execution

PROFESSIONAL EXPERIENCE
Current Position | Company Name | [Start Date] - Present
• Successfully launched key initiatives resulting in measurable organizational improvements
• Developed and implemented innovative solutions that enhanced operational efficiency
• Built and maintained strategic partnerships with key stakeholders across departments
• Recognized for exceptional performance and unique problem-solving approach

Previous Position | Previous Company | [Start Date] - [End Date]  
• Applied creative thinking to overcome complex business challenges
• Collaborated effectively with diverse teams to achieve ambitious project goals

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• Relevant coursework: [List relevant courses]
• Academic achievements: [GPA, honors, etc.]

ADDITIONAL INFORMATION
• Proficient in [relevant software/tools for your industry]
• Volunteer experience: [relevant volunteer work]
• Languages: [if applicable]`;
    } else if (tier === 'best') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
Strategic Leadership & Vision    •    Process Innovation & Optimization    •    Team Development & Mentoring
Data Analytics & Insights       •    Change Management Excellence       •    Cross-functional Collaboration
Project Management Expertise    •    Stakeholder Engagement             •    Performance Optimization

PROFESSIONAL EXPERIENCE
Senior Position | Company Name | [Start Date] - Present
• Spearheaded cross-functional initiatives that delivered 25%+ improvement in key performance metrics
• Launched innovative processes that enhanced operational efficiency and reduced costs by $X annually
• Built and led high-performing teams of X+ professionals, achieving 95% employee satisfaction
• Developed strategic partnerships that expanded market reach and drove revenue growth
• Recognized with [specific award/recognition] for exceptional leadership and results

Previous Position | Previous Company | [Start Date] - [End Date]
• Successfully managed $X budget while consistently delivering projects on time and under budget
• Implemented data-driven strategies that improved customer satisfaction scores by X%
• Collaborated with C-suite executives to develop and execute strategic initiatives
• Mentored junior team members, with 90% receiving promotions within 18 months

KEY ACHIEVEMENTS
• Launched company-wide initiative that resulted in $X cost savings annually
• Developed innovative solution that increased customer retention by X%
• Led digital transformation project affecting X+ employees across Y locations
• Received industry recognition for excellence in [relevant area]

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• Relevant coursework: [Advanced coursework relevant to your field]
• Academic honors: [Magna Cum Laude, Dean's List, etc.]
• Professional certifications: [PMP, Six Sigma, industry-specific certs]

TECHNICAL PROFICIENCIES
• Advanced skills: [List advanced software/tools]
• Intermediate skills: [List intermediate capabilities]
• Emerging technologies: [Show you stay current]`;
    } else {
      return `${name}
${contact}
Portfolio: [your-portfolio-website.com]

EXECUTIVE SUMMARY
${summary}

CORE LEADERSHIP COMPETENCIES
Visionary Strategy Development    •    Organizational Transformation    •    Executive Team Leadership
Innovation & Digital Strategy     •    P&L Management                  •    Mergers & Acquisitions
Global Operations Management     •    Stakeholder Relations           •    Change Management Excellence

EXECUTIVE EXPERIENCE
Chief [Position] | Company Name | [Start Date] - Present
• Orchestrated enterprise-wide transformation resulting in $XM revenue growth and 40% operational efficiency gain
• Launched innovative product lines that captured X% market share within 18 months of launch
• Built and scaled organization from X to Y+ employees while maintaining cultural excellence
• Developed strategic partnerships with Fortune 500 companies, generating $XM in new business
• Led successful IPO/acquisition process valued at $XM [if applicable]
• Recognized as [Industry Leader/40 Under 40/other prestigious recognition]

Senior Executive | Previous Company | [Start Date] - [End Date]
• Transformed underperforming division into market leader, achieving X% year-over-year growth
• Successfully integrated M&A activity involving $XM transaction and X+ employees
• Launched international expansion into X markets, establishing company presence in Y countries
• Developed award-winning company culture that achieved 95% employee satisfaction rating

Director Level Position | Earlier Company | [Start Date] - [End Date]
• Spearheaded digital transformation initiative affecting X+ customers and $XM in annual transactions
• Built strategic business unit from concept to $XM revenue stream within 3 years

BOARD & ADVISORY POSITIONS
• Board Member, [Organization Name] | [Year] - Present
• Advisory Board, [Company Name] | [Year] - Present  
• Mentor, [Accelerator/Incubator Name] | [Year] - Present

RECOGNITION & AWARDS
• [Industry Award], [Year] - [Brief description]
• [Executive Recognition], [Year] - [Achievement]
• Featured speaker: [Conference Name], [Year]
• Published thought leadership: [Publication], [Year]

EDUCATION & EXECUTIVE DEVELOPMENT
[Advanced Degree] | [Prestigious University] | [Year]
[Undergraduate Degree] | [University Name] | [Year]
Executive Education: [Harvard Business School/Wharton/Stanford] | [Program Name] | [Year]

PROFESSIONAL AFFILIATIONS
• [Industry Association] - Board Member
• [Professional Organization] - Executive Committee
• [Charitable Organization] - Strategic Advisor`;
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
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (error) {
        alert('Payment failed: ' + error.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
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
      alert(`Launch successful! Your ${tiers[tierKey].name} resume is ready for takeoff. Check your email for download instructions.`);
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

  const totalRevenue = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const completionRate = users.length > 0 ? (users.filter(u => u.completed).length / users.length * 100).toFixed(1) : 0;

  return (
    <div style={{
      padding: '0',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
      color: 'white'
    }}>
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
          @keyframes rocketLaunch {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(-2deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            75% { transform: translateY(-15px) rotate(-1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
          }
          .rocket-launch {
            animation: rocketLaunch 3s ease-in-out infinite;
          }
          .orbit {
            animation: orbit 8s linear infinite;
          }
          .glow-effect {
            animation: glow 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '80px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '50px', left: '10%', fontSize: '20px', opacity: '0.6' }} className="orbit">⭐</div>
        <div style={{ position: 'absolute', top: '100px', right: '15%', fontSize: '16px', opacity: '0.4', animationDelay: '2s' }} className="orbit">🛰️</div>
        <div style={{ position: 'absolute', bottom: '60px', left: '20%', fontSize: '18px', opacity: '0.5', animationDelay: '4s' }} className="orbit">🌟</div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="rocket-launch" style={{ fontSize: 'clamp(60px, 12vw, 120px)', marginBottom: '20px' }}>🚀</div>
          
          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #60a5fa, #34d399, #fbbf24)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            LAUNCHPADPOINT
          </h1>

          <h2 style={{
            fontSize: 'clamp(24px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '25px',
            color: '#e2e8f0'
          }}>
            AI-Powered Resume Builder That Launches Careers Into Orbit
          </h2>
          
          <p style={{
            fontSize: 'clamp(18px, 4vw, 28px)',
            marginBottom: '30px',
            lineHeight: '1.4',
            color: '#cbd5e1'
          }}>
            Stop crash-landing in the resume pile. Our AI mission control transforms your career story into a resume that breaks through the atmosphere and lands you in the interview chair.
          </p>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '40px',
            border: '2px solid rgba(59, 130, 246, 0.3)'
          }}>
            <h3 style={{
              fontSize: 'clamp(20px, 4vw, 32px)',
              marginBottom: '15px',
              color: '#60a5fa'
            }}>
              Houston, We Have a Solution
            </h3>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              lineHeight: '1.6',
              color: '#f1f5f9'
            }}>
              Your experiences are the fuel. Our AI is the rocket engine. Together, we'll launch your resume past the gatekeepers and straight to hiring managers who recognize your value.
            </p>
          </div>

          <button
            onClick={startJourney}
            className="glow-effect"
            style={{
              background: 'linear-gradient(45deg, #3b82f6, #10b981)',
              color: 'white',
              padding: '25px 50px',
              fontSize: 'clamp(18px, 4vw, 28px)',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginRight: '20px',
              marginBottom: '20px'
            }}
          >
            Launch My Resume 🚀
          </button>

          <button
            onClick={() => setShowStory(true)}
            style={{
              background: 'transparent',
              color: '#e2e8f0',
              padding: '25px 50px',
              fontSize: 'clamp(16px, 3vw, 20px)',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
          >
            Mission Briefing
          </button>

          <p style={{
            fontSize: 'clamp(14px, 3vw, 18px)',
            color: '#94a3b8',
            marginTop: '25px'
          }}>
            🎯 Free Launch Sequence • 3 Strategic Questions • AI-Powered Resume Engine
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 20px', backgroundColor: '#1e293b' }}>
        <h2 style={{ 
          fontSize: 'clamp(28px, 6vw, 48px)', 
          marginBottom: '50px',
          color: '#f1f5f9'
        }}>
          Mission Control Features
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            padding: '30px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: '2px solid #3b82f6',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#60a5fa' }}>AI Resume Engine</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Our advanced AI analyzes your career story and launches it into professional orbit with industry-specific keywords and achievement-focused language that hiring managers can't ignore.
            </p>
          </div>

          <div style={{
            padding: '30px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: '2px solid #10b981',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#34d399' }}>ATS Breakthrough Technology</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Navigate through Applicant Tracking Systems like a skilled pilot. Our formatting ensures your resume reaches human eyes, not digital dead ends.
            </p>
          </div>

          <div style={{
            padding: '30px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: '2px solid #f59e0b',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧠</div>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#fbbf24' }}>Neurodiversity Optimized</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Built by someone who understands different thinking styles. Dyslexia-friendly fonts, clear layouts, and supportive guidance throughout your launch sequence.
            </p>
          </div>
        </div>
      </div>

      {/* About the Founder Section */}
      <div style={{ padding: '80px 20px', backgroundColor: '#475569' }}>
        <h2 style={{ 
          fontSize: 'clamp(28px, 6vw, 48px)', 
          marginBottom: '30px',
          color: '#f1f5f9'
        }}>
          Built by Someone Who Gets It
        </h2>
        
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '20px',
          border: '2px solid rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '80px', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #60a5fa, #34d399)',
                borderRadius: '50%',
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>👨‍🚀</div>
              <h3 style={{ fontSize: '24px', color: '#60a5fa', marginBottom: '10px' }}>The Founder</h3>
              <p style={{ fontSize: '16px', color: '#cbd5e1' }}>Dyslexic • ADHD • Career Launch Specialist</p>
            </div>
            
            <div>
              <p style={{ 
                fontSize: '18px', 
                lineHeight: '1.6', 
                color: '#e2e8f0',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "I've spent my entire career being told my brain works 'wrong.' Dyslexia made me scramble words. ADHD made me jump between ideas. Traditional resume builders made me feel like I was trying to fit a rocket engine into a bicycle frame."
              </p>
              
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#cbd5e1',
                marginBottom: '20px'
              }}>
                But here's what I discovered: my dyslexia gives me a unique ability to spot patterns others miss. My ADHD brain sees connections across industries that linear thinkers can't. These aren't disabilities - they're design features for building better career tools.
              </p>
              
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#cbd5e1',
                marginBottom: '25px'
              }}>
                LaunchpadPoint exists because I understand the frustration of having incredible value that traditional systems can't capture. If you've ever felt like your resume doesn't show your real capabilities, this is your mission control.
              </p>
              
              <button
                onClick={() => setShowStory(true)}
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #10b981)',
                  color: 'white',
                  padding: '15px 25px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Read My Full Mission Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div style={{ padding: '80px 20px', backgroundColor: '#334155' }}>
        <h2 style={{ 
          fontSize: 'clamp(28px, 6vw, 48px)', 
          marginBottom: '50px',
          color: '#f1f5f9'
        }}>
          Successful Launch Stories
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            padding: '30px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            border: '2px solid #60a5fa'
          }}>
            <p style={{ fontSize: '18px', color: '#e2e8f0', fontStyle: 'italic', marginBottom: '20px' }}>
              "LaunchpadPoint took my scattered work history and launched it into a compelling career narrative. I went from zero interviews to three job offers in one month!"
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold' }}>- Sarah M., Marketing Manager</p>
          </div>

          <div style={{
            padding: '30px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            border: '2px solid #34d399'
          }}>
            <p style={{ fontSize: '18px', color: '#e2e8f0', fontStyle: 'italic', marginBottom: '20px' }}>
              "As someone with ADHD, organizing my achievements was impossible. Their AI found patterns I couldn't see and launched my resume into the stratosphere."
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold' }}>- Marcus T., Software Developer</p>
          </div>

          <div style={{
            padding: '30px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            border: '2px solid #fbbf24'
          }}>
            <p style={{ fontSize: '18px', color: '#e2e8f0', fontStyle: 'italic', marginBottom: '20px' }}>
              "I was stuck in resume purgatory for months. LaunchpadPoint's mission control got me past the gatekeepers and into the C-suite conversation."
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold' }}>- Jennifer L., Executive Director</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <h2 style={{ 
          fontSize: 'clamp(28px, 6vw, 48px)', 
          marginBottom: '50px',
          color: '#f1f5f9'
        }}>
          Launch Sequence: T-Minus 3 Steps
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px auto',
              fontSize: '36px',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
            }}>
              📝
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#60a5fa' }}>T-3: Share Your Story</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Tell us about your career-defining moments. Our AI Mission Control analyzes your unique impact and identifies the fuel for your professional rocket.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #10b981, #047857)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px auto',
              fontSize: '36px',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#34d399' }}>T-2: AI Processing</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Our advanced AI engines detect your industry, optimize keywords, and craft professional language that breaks through ATS barriers and reaches hiring managers.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px auto',
              fontSize: '36px',
              boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)'
            }}>
              🎯
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#fbbf24' }}>T-1: Launch Success</h3>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Receive your mission-ready resume that positions you as the solution to employers' problems, not just another applicant in the launch queue.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '5%', fontSize: '24px', opacity: '0.3' }} className="orbit">🌌</div>
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', fontSize: '20px', opacity: '0.3', animationDelay: '3s' }} className="orbit">⭐</div>

        <h2 style={{
          fontSize: 'clamp(32px, 7vw, 56px)',
          marginBottom: '25px',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #60a5fa, #34d399)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Ready for Launch?
        </h2>
        
        <p style={{
          fontSize: 'clamp(18px, 4vw, 28px)',
          marginBottom: '40px',
          color: '#e2e8f0',
          lineHeight: '1.4'
        }}>
          Stop orbiting the same opportunities. Launch your career into new territory with a resume that breaks through the noise and lands you where you belong.
        </p>

        <button
          onClick={startJourney}
          className="glow-effect"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #10b981, #f59e0b)',
            backgroundSize: '300% 300%',
            color: 'white',
            padding: '25px 50px',
            fontSize: 'clamp(20px, 4vw, 32px)',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)'
          }}
        >
          Initiate Launch Sequence 🚀
        </button>

        <p style={{
          fontSize: 'clamp(14px, 3vw, 18px)',
          color: '#94a3b8',
          marginTop: '30px'
        }}>
          🛡️ Mission Success Guaranteed • Cancel Anytime • Launch in Minutes
        </p>
      </div>

      {/* Mission Briefing Modal */}
      {showStory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            border: '2px solid #3b82f6'
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

            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '20px' }}>🚀</div>

            <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#60a5fa', textAlign: 'center' }}>
              The Mission Behind LaunchpadPoint
            </h2>

            <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#e2e8f0' }}>
              <p style={{ marginBottom: '20px' }}>
                I was 8 years old when my teacher first told my parents I was "behind." The letters on the page looked like they were doing backflips. Words I knew by heart suddenly became foreign when I tried to write them down. My brain processed information like a rocket engine - powerful, but completely different from everyone else's steady-burning jets.
              </p>

              <p style={{ marginBottom: '20px' }}>
                By high school, I had two labels: <strong style={{ color: '#fbbf24' }}>Dyslexic. ADHD.</strong> Most people saw these as limitations. I saw them as my brain's unique operating system - one that could see patterns others missed, make connections across seemingly unrelated ideas, and approach problems from angles that linear thinkers never considered.
              </p>

              <p style={{ marginBottom: '20px' }}>
                But when I entered the job market, reality hit hard. Traditional resume formats made my career story look scattered. My diverse experiences - jumping between industries, finding creative solutions to complex problems - looked like instability rather than innovation. I watched hiring managers' eyes glaze over as they tried to fit my rocket-engine brain into their bicycle-frame expectations.
              </p>

              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #ef4444',
                marginBottom: '20px'
              }}>
                <p style={{ fontStyle: 'italic', margin: 0, color: '#fca5a5' }}>
                  I was rejected from 47 jobs in 6 months. Not because I couldn't do the work - I knew I could excel. But because my resume couldn't communicate my value in their language.
                </p>
              </div>

              <p style={{ marginBottom: '20px' }}>
                That's when I realized something crucial: <strong style={{ color: '#34d399' }}>My dyslexia wasn't the problem. Traditional resume builders were.</strong>
              </p>

              <p style={{ marginBottom: '20px' }}>
                My dyslexic brain excels at pattern recognition - I can spot the hidden connections between a candidate's experiences and what employers actually need. My ADHD gives me the ability to rapidly process multiple data points and synthesize them into compelling narratives. These aren't disorders - they're design features for understanding career complexity.
              </p>

              <p style={{ marginBottom: '20px' }}>
                So I built LaunchpadPoint using my "disadvantages" as advantages:
              </p>

              <ul style={{ 
                color: '#cbd5e1', 
                marginBottom: '20px', 
                paddingLeft: '0',
                listStyle: 'none'
              }}>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#60a5fa', marginRight: '10px', fontWeight: 'bold' }}>🧠</span>
                  <strong>Dyslexia</strong> gave me the ability to see resume patterns that neurotypical builders miss
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#34d399', marginRight: '10px', fontWeight: 'bold' }}>⚡</span>
                  <strong>ADHD</strong> helps me rapidly connect experiences across industries and roles
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#fbbf24', marginRight: '10px', fontWeight: 'bold' }}>🎯</span>
                  <strong>Career struggles</strong> taught me exactly what hiring managers are actually looking for
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f87171', marginRight: '10px', fontWeight: 'bold' }}>💡</span>
                  <strong>Rejection experience</strong> showed me how to break through ATS barriers
                </li>
              </ul>

              <p style={{ marginBottom: '20px' }}>
                Every feature in LaunchpadPoint exists because I understand what it feels like to:
              </p>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <p style={{ margin: '0 0 10px 0', color: '#cbd5e1' }}>✓ Have incredible value that traditional formats can't capture</p>
                <p style={{ margin: '0 0 10px 0', color: '#cbd5e1' }}>✓ Know you're perfect for a role but can't get past the screening</p>
                <p style={{ margin: '0 0 10px 0', color: '#cbd5e1' }}>✓ Feel like your unique thinking style is seen as a weakness</p>
                <p style={{ margin: '0', color: '#cbd5e1' }}>✓ Need extra processing time or different formatting to show your best work</p>
              </div>

              <p style={{ marginBottom: '20px' }}>
                The breakthrough came when I stopped trying to fit into their system and started building one that actually works for minds like ours. LaunchpadPoint's AI doesn't just format your resume - it translates your unique experiences into the language hiring managers understand and value.
              </p>

              <p style={{ marginBottom: '30px' }}>
                This isn't just another resume builder. It's a translation system built by someone whose brain works differently, for everyone whose career story deserves to be told properly.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                padding: '20px',
                borderRadius: '10px',
                borderLeft: '4px solid #3b82f6',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontStyle: 'italic', 
                  margin: 0, 
                  fontSize: '18px',
                  color: '#f1f5f9'
                }}>
                  "If you've ever felt like your resume doesn't show your real capabilities, if you've ever been told your brain works 'wrong,' if you've ever known you were perfect for a job but couldn't get past the gatekeepers - this is your mission control. Let's launch your career where it belongs: in orbit above the competition."
                </p>
                <p style={{ 
                  marginTop: '15px', 
                  fontSize: '14px', 
                  color: '#94a3b8',
                  fontWeight: 'bold'
                }}>
                  - Founder & Chief Launch Officer
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
                  background: 'linear-gradient(45deg, #3b82f6, #10b981)',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Begin Launch Sequence 🚀
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
            color: '#1e293b',
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

            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#3b82f6' }}>
              Mission Control Dashboard
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '12px', border: '2px solid #3b82f6' }}>
                <h3 style={{ fontSize: '18px', color: '#1d4ed8', marginBottom: '10px' }}>Launches Initiated</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>{users.length}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Career Transformations</p>
              </div>
              <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '2px solid #10b981' }}>
                <h3 style={{ fontSize: '18px', color: '#047857', marginBottom: '10px' }}>Mission Success Rate</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>{completionRate}%</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Completed Sequences</p>
              </div>
              <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '12px', border: '2px solid #f59e0b' }}>
                <h3 style={{ fontSize: '18px', color: '#d97706', marginBottom: '10px' }}>Mission Revenue</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>${totalRevenue}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Successful Launches</p>
              </div>
              <div style={{ backgroundColor: '#faf5ff', padding: '20px', borderRadius: '12px', border: '2px solid #7c3aed' }}>
                <h3 style={{ fontSize: '18px', color: '#6b21a8', marginBottom: '10px' }}>Active Missions</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>{transactions.length}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Paid Subscribers</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1e293b' }}>Recent Launch Initiations</h3>
                <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}>
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
                      <br/>Target: {user.industry} | Status: {user.completed ? 'Launch Complete' : 'In Progress'}
                      <br/><span style={{ color: '#6b7280' }}>{new Date(user.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Awaiting first launch</p>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1e293b' }}>Successful Mission Payments</h3>
                <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflow: 'auto' }}>
                  {transactions.slice(-5).reverse().map((txn, index) => (
                    <div key={index} style={{ 
                      fontSize: '12px', 
                      marginBottom: '8px', 
                      padding: '8px', 
                      backgroundColor: 'white', 
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong>${txn.amount} - {tiers[txn.tier]?.name || txn.tier}</strong>
                      <br/>Astronaut: {txn.email}
                      <br/>Mission: {txn.industry}
                      <br/><span style={{ color: '#6b7280' }}>Launch ID: {txn.id}</span>
                      <br/><span style={{ color: '#6b7280' }}>{new Date(txn.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No successful launches yet</p>
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
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Export Launch Data
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
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Export Mission Revenue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Application Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '10px'
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            color: 'white',
            borderRadius: '20px',
            padding: 'clamp(20px, 5vw, 40px)',
            maxWidth: '95vw',
            width: '100%',
            maxHeight: '95vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '2px solid #3b82f6'
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
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚀</div>
                  <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', marginBottom: '15px', color: '#60a5fa' }}>
                    Launch Sequence Initiated
                  </h2>
                  <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: '#cbd5e1' }}>
                    Enter your email to begin building your career-launching resume
                  </p>
                </div>
                
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="mission-control@yourcareer.com"
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: '#0f172a',
                    color: 'white'
                  }}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={!userEmail.includes('@')}
                  style={{
                    background: userEmail.includes('@') 
                      ? 'linear-gradient(45deg, #3b82f6, #10b981)' 
                      : '#374151',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    fontWeight: 'bold',
                    cursor: userEmail.includes('@') ? 'pointer' : 'not-allowed',
                    width: '100%'
                  }}
                >
                  {userEmail.includes('@') ? '🚀 Begin Launch Sequence' : 'Enter Valid Mission Email'}
                </button>
              </>
            )}

            {currentStep === 'questions' && (
              <>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
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
                          backgroundColor: index <= currentQuestion ? '#3b82f6' : '#374151',
                          margin: '0 8px',
                          transition: 'all 0.3s ease',
                          boxShadow: index <= currentQuestion ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                    Mission Phase {currentQuestion + 1} of {questions.length}
                  </p>
                </div>

                <h2 style={{
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  marginBottom: '15px',
                  color: '#e2e8f0',
                  lineHeight: '1.4',
                  textAlign: 'center'
                }}>
                  {questions[currentQuestion].text}
                </h2>

                <p style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  color: '#60a5fa',
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
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    resize: 'vertical',
                    fontFamily: dyslexiaFont ? 'OpenDyslexic, Arial, sans-serif' : 'Arial, sans-serif',
                    backgroundColor: dyslexiaFont ? '#fffef7' : '#0f172a',
                    color: dyslexiaFont ? '#1e293b' : 'white',
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
                    color: '#60a5fa',
                    fontWeight: '500'
                  }}>
                    <input
                      type="checkbox"
                      checked={dyslexiaFont}
                      onChange={(e) => setDyslexiaFont(e.target.checked)}
                      style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                    />
                    <span>Activate neurodiversity-optimized display 🧠</span>
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
                      backgroundColor: currentQuestion === 0 ? '#374151' : '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      flex: '1'
                    }}
                  >
                    ← Previous Phase
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={!answers[questions[currentQuestion].id].trim()}
                    style={{
                      padding: '15px 25px',
                      background: answers[questions[currentQuestion].id].trim() 
                        ? 'linear-gradient(45deg, #3b82f6, #10b981)' 
                        : '#374151',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: answers[questions[currentQuestion].id].trim() ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      flex: '2'
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? '🚀 Launch My Resume' : 'Next Phase →'}
                  </button>
                </div>
              </>
            )}

            {currentStep === 'preview' && (
              <>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
                  <h2 style={{
                    fontSize: 'clamp(24px, 5vw, 36px)',
                    marginBottom: '20px',
                    color: '#60a5fa'
                  }}>
                    Launch Successful! Resume Ready for Orbit
                  </h2>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  border: '2px solid #3b82f6'
                }}>
                  <p style={{ 
                    fontSize: 'clamp(16px, 3vw, 18px)', 
                    color: '#60a5fa', 
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>
                    🎯 Mission Target Acquired: {detectIndustry(answers).charAt(0).toUpperCase() + detectIndustry(answers).slice(1)}
                  </p>
                  <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                    Your resume is now optimized for breakthrough success in this sector.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#fbbf24' }}>
                      🧠 Neuro-Optimized Format
                    </h3>
                    <div style={{
                      backgroundColor: dyslexiaFont ? '#fffef7' : '#0f172a',
                      color: dyslexiaFont ? '#1e293b' : '#cbd5e1',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #fbbf24',
                      fontFamily: 'OpenDyslexic, Arial, sans-serif',
                      fontSize: '11px',
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
                    <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#60a5fa' }}>
                      💼 Executive Format
                    </h3>
                    <div style={{
                      backgroundColor: '#0f172a',
                      color: '#cbd5e1',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #60a5fa',
                      fontSize: '10px',
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
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))',
                  padding: '25px',
                  borderRadius: '15px',
                  marginBottom: '30px',
                  textAlign: 'center',
                  border: '2px solid #10b981'
                }}>
                  <h3 style={{ fontSize: '20px', color: '#34d399', marginBottom: '15px', fontWeight: 'bold' }}>
                    Choose Your Launch Vehicle
                  </h3>
                  <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '20px' }}>
                    Select your mission tier. Each level provides more powerful engines to propel your career further.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {Object.entries(tiers).map(([tierKey, tierData]) => (
                    <div key={tierKey} style={{
                      border: `3px solid ${tierData.color}`,
                      borderRadius: '15px',
                      padding: '25px',
                      backgroundColor: tierKey === 'best' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.05)',
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
                      
                      <h3 style={{ 
                        fontSize: '22px', 
                        marginBottom: '10px', 
                        marginTop: tierKey === 'best' ? '15px' : '0',
                        color: tierData.color
                      }}>
                        {tierData.name}
                      </h3>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: tierData.color, marginBottom: '20px' }}>
                        ${tierData.price}<span style={{ fontSize: '16px', color: '#94a3b8' }}>/month</span>
                      </p>
                      
                      <ul style={{
                        textAlign: 'left',
                        fontSize: '14px',
                        marginBottom: '25px',
                        paddingLeft: '0',
                        listStyle: 'none'
                      }}>
                        {tierData.features.map((feature, index) => (
                          <li key={index} style={{ 
                            marginBottom: '8px', 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            color: '#cbd5e1'
                          }}>
                            <span style={{ color: tierData.color, marginRight: '8px', fontWeight: 'bold' }}>🚀</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        onClick={() => handleStripePayment(tierKey)}
                        disabled={isProcessingPayment}
                        style={{
                          backgroundColor: isProcessingPayment ? '#374151' : tierData.color,
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
                        {isProcessingPayment ? 'Launching...' : `🚀 Launch ${tierData.name} - $${tierData.price}`}
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '15px' }}>
                    🛡️ Mission Success Guarantee • Launch Anytime • Cancel Anytime • 30-Day Orbit Trial
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
                    Restart Launch Sequence
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
