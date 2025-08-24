import './App.css';
import React, { useState } from 'react';
import { User, MessageSquare, Star, Zap, Eye, Brain, Menu, X, Target, Bot, Rocket } from 'lucide-react';

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
    { id: 'home', label: 'Mission Control', icon: Rocket },
    { id: 'about', label: 'About', icon: User },
    { id: 'testimonials', label: 'Success Stories', icon: Star },
    { id: 'features', label: 'Launch Features', icon: MessageSquare }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Manager",
      quote: "Got my dream job in 2 weeks! The resume optimization was game-changing.",
      rating: 5
    },
    {
      name: "Mike T.",
      role: "Software Developer",
      quote: "The ATS breakthrough technology worked perfectly. Landed 3 offers!",
      rating: 5
    },
    {
      name: "Lisa K.",
      role: "Project Manager",
      quote: "Finally understood my career trajectory. Thank you LaunchPad Point!",
      rating: 5
    }
  ];

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={`bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-600 ${getFontClass()}`}>
        <div className="text-center mb-6">
          <Rocket className="mx-auto h-12 w-12 text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {isConciseMode ? "Launch Your Career!" : "Ready to Launch Your Career?"}
          </h2>
          <p className="text-slate-300">Join the career launch sequence</p>
        </div>
        
        <div className="mb-6">
          <p className="text-slate-300 mb-4">
            {isConciseMode 
              ? "Create account for unlimited career missions + personalized guidance!"
              : "You've experienced our mission briefing! Create a free account for unlimited access to our full career launch system."
            }
          </p>
          
          <div className="bg-blue-900/50 border border-blue-500 p-4 rounded-xl mb-4">
            <h3 className="font-semibold text-blue-300 mb-3">Mission Package Includes:</h3>
            <ul className="text-sm text-blue-200 space-y-2">
              <li>🚀 Unlimited career questions</li>
              <li>🤖 AI-powered resume engine</li>
              <li>🎯 ATS breakthrough technology</li>
              <li>📊 Career trajectory mapping</li>
              <li>📡 Weekly mission updates</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email to join the mission"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => {
              console.log('Mission signup with:', email);
              setShowSignupModal(false);
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            🚀 Launch My Career Mission
          </button>
        </div>
        
        <button
          onClick={() => setShowSignupModal(false)}
          className="mt-4 w-full text-slate-400 hover:text-slate-200 transition-colors"
        >
          Continue with free sequence
        </button>
      </div>
    </div>
  );

  const AccessibilityControls = () => (
    <div className="fixed top-4 right-4 z-40">
      {(isDyslexiaFont || isADHDFont || isConciseMode) && (
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 mb-3 shadow-2xl text-sm">
          <div className="text-slate-300 font-semibold mb-2">Active modes:</div>
          {isDyslexiaFont && <div className="text-purple-400">🔤 Dyslexia Font</div>}
          {isADHDFont && <div className="text-orange-400">🧠 ADHD Font</div>}
          {isConciseMode && <div className="text-green-400">⚡ Concise Mode</div>}
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setIsDyslexiaFont(!isDyslexiaFont);
            if (isADHDFont) setIsADHDFont(false);
          }}
          className={`${
            isDyslexiaFont ? 'bg-purple-700' : 'bg-purple-600'
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
            isADHDFont ? 'bg-orange-700' : 'bg-orange-600'
          } text-white p-2 rounded-full hover:bg-orange-700 transition-colors shadow-lg`}
          title="Toggle ADHD-Friendly Font"
        >
          <Brain className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsConciseMode(!isConciseMode)}
          className={`${
            isConciseMode ? 'bg-green-700' : 'bg-green-600'
          } text-white p-2 rounded-full hover:bg-green-700 transition-colors shadow-lg`}
          title="Toggle Concise Mode"
        >
          <Zap className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className={`bg-slate-800/95 backdrop-blur-lg shadow-2xl sticky top-0 z-30 border-b border-slate-700 ${getFontClass()}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Rocket className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-white">
                LaunchPad Point
              </div>
              <div className="text-sm text-blue-400">
                www.launchpadpoint.com
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
            className="md:hidden p-2 text-slate-300"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
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
                      : 'text-slate-300 hover:bg-slate-700'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className={`text-5xl font-bold text-white mb-8 ${getFontClass()}`}>
          {isConciseMode ? "Launch Your Career Fast" : "Launch Your Career Journey"}
        </h1>
        
        {/* Main Action Buttons */}
        <div className="space-y-4 max-w-lg mx-auto mb-12">
          <button
            onClick={handleQuestionSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all font-semibold text-lg flex items-center justify-center"
          >
            Launch My Resume 🚀
          </button>
          
          <button className="w-full border-2 border-slate-500 text-white py-4 px-6 rounded-2xl hover:bg-slate-700 transition-all font-semibold">
            Mission Briefing
          </button>
        </div>

        {/* Feature Description */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-slate-300 text-lg mb-6 flex items-center justify-center flex-wrap gap-4">
            <span className="flex items-center">
              🎯 Free Launch Sequence
            </span>
            <span className="flex items-center">
              • 3 Strategic Questions •
            </span>
            <span className="flex items-center">
              ⭐ AI-Powered Resume Engine
            </span>
          </p>
        </div>

        {/* Mission Control Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Mission Control Features</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* AI Resume Engine Card */}
            <div className="bg-slate-800 border-2 border-blue-500 rounded-2xl p-8 text-center">
              <Bot className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-400 mb-4">AI Resume Engine</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {isConciseMode 
                  ? "AI analyzes your career and optimizes it for hiring managers with industry keywords."
                  : "Our advanced AI analyzes your career story and launches it into professional orbit with industry-specific keywords and achievement-focused language that hiring managers can't ignore."
                }
              </p>
            </div>

            {/* ATS Breakthrough Technology Card */}
            <div className="bg-slate-800 border-2 border-green-500 rounded-2xl p-8 text-center">
              <Target className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-4">ATS Breakthrough Technology</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {isConciseMode
                  ? "Navigate ATS systems like a pro. Our formatting gets your resume to human eyes, not digital dead ends."
                  : "Navigate through Applicant Tracking Systems like a skilled pilot. Our formatting ensures your resume reaches human eyes, not digital dead ends."
                }
              </p>
            </div>

            {/* Career Trajectory Mapping Card */}
            <div className="bg-slate-800 border-2 border-purple-500 rounded-2xl p-8 text-center">
              <Star className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Career Trajectory Mapping</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {isConciseMode
                  ? "Map your career path with precision. Get strategic guidance for your next move."
                  : "Chart your professional course with precision navigation. Get strategic mission planning for your next career advancement."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Try Questions Section */}
        <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-semibold text-white mb-6">
            {isConciseMode ? "Start Mission Sequence:" : "Begin Your Launch Sequence:"}
          </h3>
          <div className="space-y-3">
            <button
              onClick={handleQuestionSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              "How do I optimize my resume?"
            </button>
            <button
              onClick={handleQuestionSubmit}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors"
            >
              "Prepare me for mission interviews"
            </button>
            <button
              onClick={handleQuestionSubmit}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors"
            >
              "What's my career trajectory?"
            </button>
          </div>
          <p className="text-slate-400 mt-4 text-center">
            <span className="text-blue-400 font-bold">{questionsAsked}</span>/3 strategic questions used
          </p>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Mission Command Center</h2>
        <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
          <p className="text-slate-300 text-lg mb-8">
            {isConciseMode 
              ? "LaunchPad Point helps professionals launch successful careers using AI technology."
              : "At LaunchPad Point, we provide the mission control center for your career launch. Our AI-powered platform gives you the strategic guidance needed to navigate your professional orbit with precision."
            }
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Mission Objective</h3>
              <p className="text-slate-300">{isConciseMode ? "Launch careers into professional orbit." : "To launch every professional into their ideal career trajectory using cutting-edge AI guidance systems."}</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-400 mb-4">Why Choose Our Mission</h3>
              <ul className="space-y-2 text-slate-300">
                <li>🚀 {isConciseMode ? "Instant results" : "Rapid career acceleration"}</li>
                <li>🤖 {isConciseMode ? "AI-powered" : "Advanced AI mission planning"}</li>
                <li>🎯 {isConciseMode ? "Proven success" : "Precision targeting for success"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TestimonialsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Successful Career Launches</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800 border border-slate-600 p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-blue-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FeaturesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Launch System Features</h2>
        <div className="space-y-8">
          {[
            {
              title: "AI-Powered Resume Engine",
              description: isConciseMode ? "Optimize resumes instantly" : "Transform your career story into a compelling professional narrative",
              features: ["ATS optimization", "Industry keywords", "Achievement focus"],
              color: "blue",
              icon: Bot
            },
            {
              title: "Interview Mission Prep",
              description: isConciseMode ? "Master interviews" : "Strategic preparation for successful interview missions",
              features: ["Question simulation", "Answer frameworks", "Confidence protocols"],
              color: "green",
              icon: MessageSquare
            },
            {
              title: "Career Trajectory Planning",
              description: isConciseMode ? "Map career path" : "Plot your professional course with precision navigation",
              features: ["Skills analysis", "Market intelligence", "Growth strategies"],
              color: "purple",
              icon: Target
            }
          ].map((feature, index) => (
            <div key={index} className={`bg-slate-800 border-2 border-${feature.color}-500 p-8 rounded-2xl`}>
              <div className="flex items-center mb-6">
                <feature.icon className={`h-12 w-12 text-${feature.color}-400 mr-4`} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              </div>
              <ul className="grid md:grid-cols-3 gap-4">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <Zap className={`h-4 w-4 text-${feature.color}-400 mr-2`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
    <div className={`min-h-screen ${getFontClass()}`}>
      <AccessibilityControls />
      <Navigation />
      
      <main>
        {renderContent()}
      </main>

      {/* Bottom Quotes Section */}
      <footer className="bg-slate-800 border-t border-slate-700 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="h-8 w-8 text-blue-400 mr-3" />
              <div className="text-2xl font-bold text-white">LaunchPad Point</div>
            </div>
            <div className="text-blue-400 font-medium mb-2">www.launchpadpoint.com</div>
            <p className="text-slate-400">Your Career Launch Platform</p>
          </div>
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            {isConciseMode ? "Mission Success Stories" : "Successful Career Launches"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="text-center bg-slate-700 p-6 rounded-xl border border-slate-600">
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "{testimonial.quote}"
                </p>
                <cite className="text-white font-semibold">
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
