import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hi! I'm your AI Career Assistant. I can help you with job searching, salary negotiations, interview prep, and career planning. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How do I negotiate a higher salary?",
    "What skills should I learn for my career goals?",
    "Help me prepare for a technical interview",
    "Review my resume and suggest improvements"
  ];

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant',
        content: getAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate')) {
      return "Here are proven salary negotiation strategies: 1) Research market rates using Glassdoor and PayScale 2) Document your achievements and value-add 3) Practice your pitch 4) Consider the full compensation package 5) Time your request strategically. Would you like me to help you prepare a specific negotiation script?";
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      return "Based on current market trends, I recommend focusing on: Technical Skills - Cloud platforms (AWS/Azure), AI/ML basics, System Design; Soft Skills - Leadership, Communication, Problem-solving. What's your current role and career goal? I can provide a personalized learning path.";
    } else if (lowerMessage.includes('interview')) {
      return "Let's break down interview prep: 1) Technical Questions - Practice coding problems, system design 2) Behavioral Questions - Use STAR method 3) Company Research - Know their values, products, challenges 4) Questions to Ask - Show genuine interest. Which area would you like to dive deeper into?";
    } else if (lowerMessage.includes('resume')) {
      return "I'd be happy to help with your resume! Here's what makes a strong resume: 1) Clear, quantified achievements 2) Relevant keywords for ATS 3) Clean, professional format 4) Tailored content for target roles. You can upload your resume or paste the content here for specific feedback.";
    } else {
      return "That's a great question! I can help you with career planning, job search strategies, interview preparation, salary negotiation, and skill development. Could you be more specific about what you'd like to focus on?";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              🤖 AI Career Assistant
            </h1>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                placeholder="Ask me about your career..."
                className="flex-1 border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => handleSendMessage(input)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant
