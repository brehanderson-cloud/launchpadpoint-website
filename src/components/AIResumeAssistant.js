import React, { useState } from 'react';

export default function AIResumeAssistant({ onSuggestionApply }) {
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'I can help you build a stronger resume. What would you like to work on?'
    }
  ]);
  const [userInput, setUserInput] = useState('');

  const suggestedQuestions = [
    "What specific results did you achieve?",
    "How did you save time or money?",
    "What systems or tools do you use?",
    "How many people did you manage?",
    "What was your biggest accomplishment?"
  ];

  const sendMessage = () => {
    if (!userInput.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user', content: userInput },
      { 
        role: 'assistant', 
        content: generateResponse(userInput)
      }
    ];
    
    setChatMessages(newMessages);
    setUserInput('');
  };

  const generateResponse = (input) => {
    if (input.toLowerCase().includes('manage')) {
      return 'Great leadership experience! Try: "Led team of X employees to achieve Y% improvement in Z metric"';
    }
    if (input.toLowerCase().includes('save') || input.toLowerCase().includes('reduce')) {
      return 'Excellent cost-saving initiative! Try: "Implemented process that reduced costs by $X annually"';
    }
    return `Here's a professional way to phrase that: "Delivered ${input} resulting in improved organizational performance"`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">AI Resume Coach</h3>
      
      <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-xs ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2 text-sm">Quick Questions:</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setUserInput(q)}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about your resume..."
          className="flex-1 p-2 border rounded text-sm"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Ask
        </button>
      </div>
    </div>
  );
            }
