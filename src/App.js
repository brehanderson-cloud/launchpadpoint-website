import React, { useState } from 'react';
import { User, MessageSquare, Star, Zap, Eye, Brain, Menu, X } from 'lucide-react';

const LaunchPadPointWebsite = () => {
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
  const [isADHDFont, setIsADHDFont] = useState(false);
  const [isConciseMode, setIsConciseMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Font helper function
  const getFontClass = () => {
    if (isDyslexiaFont) return 'font-mono';
    if (isADHDFont) return 'font-sans tracking-wide leading-relaxed';
    return '';
  };

  // Trial limitation - show signup after 3 questions
  const handleQuestionSubmit = () => {
    if (questionsAsked >= 2) {
      setShowSignupModal(true);
    } else {
      setQuestionsAsked(prev => prev + 1);
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'about', label: 'About', icon: User },
    { id: 'testimonials', label: 'Success Stories', icon: Star },
    { id: 'features', label: 'Features', icon: MessageSquare }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Manager",
      quote: "Got my dream job in 2 weeks! The resume tips were game-changing.",
      rating: 5
    },
    {
      name: "Mike T.",
      role: "Software Developer",
      quote: "Interview prep was spot-on. Landed 3 offers!",
      rating: 5
    },
    {
      name: "Lisa K.",
      role: "Project Manager",
      quote: "Finally understood my career path. Thank you!",
      rating: 5
    }
  ];

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg p-6 max-w-md w-full ${getFontClass()}`}>
        <div className="text-center mb-4">
          <Zap className="mx-auto h-12 w-12 text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            {isConciseMode ? "Launch Your Career!" : "Ready to Launch Your Career?"}
          </h2>
        </div>
        
        <div className="mb-4">
          <p className={`text-gray-600 ${isConciseMode ? 'text-sm' : 'text-base'} mb-4`}>
            {isConciseMode 
              ? "Create account for unlimited career help + personalized tips!"
              : "You've tried our tool and seen how it works! Create a free account to get unlimited access plus personalized career guidance tailored just for you."
            }
          </p>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">What you get:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Unlimited career questions</li>
              <li>✓ Personalized resume tips</li>
              <li>✓ Interview preparation</li>
              <li>✓ Career path guidance</li>
              <li>✓ Weekly job market insights</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => {
              console.log('Signup with:', email);
              setShowSignupModal(false);
            }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Start My Career Journey
          </button>
        </div>
        
        <button
          onClick={() => setShowSignupModal(false)}
          className="mt-3 w-full text-gray-500 hover:text-gray-700"
        >
          Maybe later
        </button>
      </div>
    </div>
  );

  const AccessibilityControls = () => (
    <div className="fixed top-4 right-4 z-40">
      {(isDyslexiaFont || isADHDFont || isConciseMode) && (
        <div className="bg-white rounded-lg p-2 mb-2 shadow-lg border text-xs">
          <div className="text-gray-600 mb-1">Active modes:</div>
          {isDyslexiaFont && <div className="text-purple-600">🔤 Dyslexia Font</div>}
          {isADHDFont && <div className="text-orange-600">🧠 ADHD Font</div>}
          {isConciseMode && <div className="text-green-600">⚡ Concise Mode</div>}
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setIsDyslexiaFont(!isDyslexiaFont);
            if (isADHDFont) setIsADHDFont(false);
          }}
          className={`${
            isDyslexiaFont ? 'bg-purple-800' : 'bg-purple-600'
          } text-white p-2 rounded-full hover:bg-purple-700 transition-colors shadow-lg`}
          title="Toggle Dyslexia-Friendly Font"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setIsADHDFont(!isADHDFont);
            if (isDyslexiaFont) setIsDyslexiaFont(false);
          }}
          className={`${
            isADHDFont ? 'bg-orange-800' : 'bg-orange-600'
          } text-white p-2 rounded-full hover:bg-orange-700 transition-colors shadow-lg`}
          title="Toggle ADHD-Friendly Font"
        >
          <Brain className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsConciseMode(!isConciseMode)}
          className={`${
            isConciseMode ? 'bg-green-800' : 'bg-green-600'
          } text-white p-2 rounded-full hover:bg-green-700 transition-colors shadow-lg`}
          title="Toggle Concise Mode"
        >
          <Zap className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className={`bg-white shadow-lg sticky top-0 z-30 ${getFontClass()}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-600 mr-2" />
            <div>
              <div className="text-2xl font-bold text-blue-600">
                LaunchPad Point
              </div>
              <div className="text-sm text-gray-500 hidden md:block">
                www.launchpadpoint.com
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {isConciseMode ? tab.label.split(' ')[0] : tab.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className={`text-5xl font-bold text-gray-800 mb-6 ${getFontClass()}`}>
          {isConciseMode ? "Launch Your Career Fast" : "Launch Your Career Journey"}
        </h1>
        <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto ${isConciseMode ? 'text-lg' : ''}`}>
          {isConciseMode 
            ? "Get instant career help. Ask questions, get answers, land your dream job."
            : "Get personalized career guidance, resume tips, and interview prep. Your launchpad to career success."
          }
        </p>
        
        {/* Try It Section */}
        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto mb-8">
          <h3 className="text-lg font-semibold mb-4">Try it now - Ask a career question:</h3>
          <div className="space-y-3">
            <button
              onClick={handleQuestionSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              "How do I improve my resume?"
            </button>
            <button
              onClick={handleQuestionSubmit}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              "Prepare me for interviews"
            </button>
            <button
              onClick={handleQuestionSubmit}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              "What career path fits me?"
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            {questionsAsked}/3 free questions used
          </p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          { title: "Resume Review", desc: "Get instant feedback", color: "blue" },
          { title: "Interview Prep", desc: "Practice common questions", color: "green" },
          { title: "Career Path", desc: "Find your direction", color: "purple" }
        ].map(card => (
          <div key={card.title} className={`bg-${card.color}-50 p-6 rounded-lg border border-${card.color}-200 hover:shadow-lg transition-shadow cursor-pointer`}>
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.desc}</p>
            <button className={`bg-${card.color}-600 text-white px-4 py-2 rounded hover:bg-${card.color}-700 transition-colors`}>
              {isConciseMode ? "Try Now" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">About LaunchPad Point</h2>
      <div className="prose prose-lg mx-auto">
        <p className={isConciseMode ? "text-base" : "text-lg"}>
          {isConciseMode 
            ? "We help people get better jobs. Our AI gives you real career advice that works."
            : "At LaunchPad Point, we believe everyone deserves a fulfilling career. Our AI-powered platform provides personalized guidance to help you navigate your professional journey with confidence."
          }
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p>{isConciseMode ? "Help you get the job you want." : "To democratize career success by making professional guidance accessible to everyone."}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
            <ul className="space-y-2">
              <li>✓ {isConciseMode ? "Fast answers" : "Instant, personalized advice"}</li>
              <li>✓ {isConciseMode ? "Expert tips" : "Industry expert insights"}</li>
              <li>✓ {isConciseMode ? "Proven results" : "Proven track record of success"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const TestimonialsPage = () => (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg border">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className={`text-gray-600 mb-4 ${isConciseMode ? 'text-sm' : 'text-base'}`}>
              "{testimonial.quote}"
            </p>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FeaturesPage = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">What You Get</h2>
      <div className="space-y-8">
        {[
          {
            title: "Personalized Resume Tips",
            description: isConciseMode ? "Fix your resume fast" : "Get specific suggestions to make your resume stand out to employers",
            features: ["ATS-friendly formatting", "Industry-specific keywords", "Achievement highlighting"]
          },
          {
            title: "Interview Preparation",
            description: isConciseMode ? "Practice interviews" : "Practice with common questions and get feedback on your answers",
            features: ["Common questions", "Answer frameworks", "Confidence building"]
          },
          {
            title: "Career Path Guidance",
            description: isConciseMode ? "Find your direction" : "Discover career opportunities that match your skills and interests",
            features: ["Skills assessment", "Industry insights", "Growth planning"]
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg border">
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <ul className="grid md:grid-cols-3 gap-4">
              {feature.features.map((item, i) => (
                <li key={i} className="flex items-center">
                  <Zap className="h-4 w-4 text-blue-600 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'about': return <AboutPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'features': return <FeaturesPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${getFontClass()}`}>
      <AccessibilityControls />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Bottom Quotes Section */}
      <footer className="bg-white border-t mt-16 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-blue-600 mr-2" />
              <div className="text-2xl font-bold text-blue-600">LaunchPad Point</div>
            </div>
            <div className="text-blue-500 font-medium mb-2">www.launchpadpoint.com</div>
            <p className="text-gray-600">Your Career Launch Platform</p>
          </div>
          <h3 className="text-2xl font-bold text-center mb-8">
            {isConciseMode ? "What People Say" : "What Our Users Say"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="text-center">
                <p className={`text-gray-600 mb-4 ${isConciseMode ? 'text-sm' : 'text-base'}`}>
                  "{testimonial.quote}"
                </p>
                <cite className="font-semibold">
                  {testimonial.name}, {testimonial.role}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </footer>

      {showSignupModal && <SignupModal />}
    </div>
  );
};

export default LaunchPadPointWebsite;
