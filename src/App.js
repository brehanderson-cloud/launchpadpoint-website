import './App.css';
import React, { useState } from 'react';
import { User, MessageSquare, Star, Zap } from 'react-icons';

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
    if (isADHDFont) return 'font-sans';
    return 'font-serif';
  };

  return (
    <div className={`hero ${getFontClass()}`}>
      <img src="/rocket-icon.png" alt="Rocket" />
      <h1>Welcome aboard, Captain Herb</h1>
      <p>Your resume is ready for liftoff. Let’s launch your career into orbit.</p>
    </div>
  );
};

export default LaunchPadPointWebsite;
