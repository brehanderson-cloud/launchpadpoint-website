import React, { useState, useRef } from 'react';
import PaymentButton from '../components/PaymentButton';

export default function ComprehensiveResumeBuilder() {
  const [userProfile] = useState({ name: 'Herbert Essien', email: 'herb.essien@gmail.com' });
  
  const [currentStep, setCurrentStep] = useState('upload'); // upload, build, review, final
  const [originalResume, setOriginalResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', location: '', phone: '', email: '' },
    professionalSummary: '',
    skills: [],
    experience: [],
    education: []
  });

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [activeBulletPoint, setActiveBulletPoint] = useState(null);
  const [resumeHistory, setResumeHistory] = useState([]);
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });
  const [resumeStyle, setResumeStyle] = useState('professional'); // professional, colorful, modern
  
  const fileInputRef = useRef(null);

  // Parse uploaded resume (simplified)
  const parseResume = (text) => {
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    
    return {
      personalInfo: {
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : ''
      },
      fullText: text
    };
  };

  // AI Resume Analysis
  const analyzeResume = () => {
    if (!originalResume || !jobDescription) {
      alert('Please upload both your resume and job description first');
      return;
    }

    // Simulated AI analysis (in real implementation, use OpenAI API)
    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(originalResume);
    const missingKeywords = jobKeywords.filter(k => !resumeKeywords.includes(k));
    
    const suggestions = [
      {
        type: 'keyword',
        message: `Add these keywords from the job posting: ${missingKeywords.slice(0, 3).join(', ')}`,
        action: 'addKeywords',
        data: missingKeywords.slice(0, 3)
      },
      {
        type: 'summary',
        message: 'Your summary should highlight leadership experience mentioned in the job posting',
        action: 'updateSummary'
      },
      {
        type: 'experience',
        message: 'Add quantifiable metrics to your experience bullets',
        action: 'addMetrics'
      }
    ];

    setAiSuggestions(suggestions);
    setCurrentStep('build');
  };

  // Extract keywords (simplified)
  const extractKeywords = (text) => {
    const techSkills = ['javascript', 'python', 'react', 'sql', 'aws', 'project management', 'leadership', 'analytics'];
    const hrSkills = ['recruiting', 'ats', 'hiring', 'hr', 'employee relations', 'payroll', 'benefits'];
    const allSkills = [...techSkills, ...hrSkills];
    
    return allSkills.filter(skill => text.toLowerCase().includes(skill));
  };

  // AI Resume Assistant
  const ResumeAIAssistant = () => {
    const [chatMessages, setChatMessages] = useState([
      {
        role: 'assistant',
        content: 'Hi! I\'m here to help improve your resume. I can suggest questions to build stronger content, help you write professional bullet points, and tailor your resume to the job description you provided.'
      }
    ]);
    const [userInput, setUserInput] = useState('');

    const suggestedQuestions = [
      "What specific results did you achieve in your last role?",
      "How did you save time or money for your company?",
      "What systems or tools are you expert in?",
      "How many people did you manage or collaborate with?",
      "What awards or recognition did you receive?",
      "What was your biggest professional accomplishment?"
    ];

    const sendMessage = () => {
      if (!userInput.trim()) return;
      
      const newMessages = [
        ...chatMessages,
        { role: 'user', content: userInput },
        { 
          role: 'assistant', 
          content: `Great! Based on "${userInput}", here's a professional bullet point: • ${generateProfessionalBullet(userInput)}` 
        }
      ];
      
      setChatMessages(newMessages);
      setUserInput('');
    };

    const generateProfessionalBullet = (input) => {
      // Simplified bullet point generation
      if (input.toLowerCase().includes('manage') || input.toLowerCase().includes('lead')) {
        return `Led cross-functional team of X members to achieve Y% improvement in Z metric`;
      }
      if (input.toLowerCase().includes('save') || input.toLowerCase().includes('reduce')) {
        return `Implemented cost-saving initiative that reduced expenses by $X annually`;
      }
      return `Delivered measurable results through ${input} resulting in improved team performance`;
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">AI Resume Assistant</h3>
        
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
          <h4 className="font-medium mb-2">Suggested Questions:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setUserInput(q)}
                className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
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
            placeholder="Tell me about your achievements..."
            className="flex-1 p-2 border rounded"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // In real implementation, use PDF parser
      setOriginalResume("Sample parsed resume content...");
      
      const parsed = parseResume("Sample resume text");
      setResumeData(prevData => ({
        ...prevData,
        personalInfo: { ...prevData.personalInfo, ...parsed.personalInfo }
      }));
    }
  };

  // Save version to history
  const saveToHistory = () => {
    setResumeHistory([...resumeHistory, { ...resumeData, timestamp: Date.now() }]);
  };

  // Undo function
  const undoLastChange = () => {
    if (resumeHistory.length > 0) {
      const previous = resumeHistory[resumeHistory.length - 1];
      setResumeData(previous);
      setResumeHistory(resumeHistory.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Profile */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LaunchpadPoint</h1>
            <p className="text-sm text-gray-600">Professional Resume Builder</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">{userProfile.name}</div>
              <div className="text-sm text-gray-600">{userProfile.email}</div>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userProfile.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {['Upload', 'Build', 'Review', 'Final'].map((step, idx) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    ['upload', 'build', 'review', 'final'][idx] === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="ml-2 text-sm">{step}</span>
                  {idx < 3 && <div className="w-8 h-0.5 bg-gray-300 ml-4"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Upload Documents */}
        {currentStep === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Upload Your Current Resume</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Upload Resume (PDF)
                  </button>
                  <p className="text-gray-500 mt-2">Or drag and drop your PDF here</p>
                </div>
                {originalResume && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800">Resume uploaded successfully!</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <textarea
                  placeholder="Paste the complete job description here..."
                  rows="10"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <button
                  onClick={analyzeResume}
                  disabled={!originalResume || !jobDescription}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                  Analyze & Build Resume
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Why Upload Both Documents?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  AI analyzes your current experience and skills
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Identifies missing keywords from job posting
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Suggests professional bullet points
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Creates tailored resume that matches requirements
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Build Resume */}
        {currentStep === 'build' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* AI Suggestions Panel */}
              {aiSuggestions.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">AI Recommendations</h3>
                  {aiSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="mb-3 p-3 bg-white rounded border">
                      <p className="text-sm">{suggestion.message}</p>
                      {suggestion.type === 'keyword' && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {suggestion.data.map(keyword => (
                            <button
                              key={keyword}
                              onClick={() => setResumeData({
                                ...resumeData,
                                skills: [...resumeData.skills, keyword]
                              })}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200"
                            >
                              + {keyword}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => {
                      saveToHistory();
                      setResumeData({
                        ...resumeData,
                        personalInfo: {...resumeData.personalInfo, name: e.target.value}
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full p-3 border rounded-lg"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: {...resumeData.personalInfo, location: e.target.value}
                    })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded-lg"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: {...resumeData.personalInfo, phone: e.target.value}
                    })}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-lg"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: {...resumeData.personalInfo, email: e.target.value}
                    })}
                  />
                </div>
              </div>

              {/* Professional Summary with AI Help */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                <textarea
                  placeholder="Professional summary..."
                  rows="4"
                  className="w-full p-3 border rounded-lg mb-4"
                  value={resumeData.professionalSummary}
                  onChange={(e) => setResumeData({...resumeData, professionalSummary: e.target.value})}
                />
                <button
                  onClick={() => setActiveBulletPoint('summary')}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
                >
                  Get AI Help with Summary
                </button>
              </div>

              {/* Experience Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
                {resumeData.experience.map((exp, expIdx) => (
                  <div key={expIdx} className="border p-4 rounded mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="p-2 border rounded"
                        value={exp.company || ''}
                      />
                      <input
                        type="text"
                        placeholder="Job Title"
                        className="p-2 border rounded"
                        value={exp.position || ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="font-medium">Responsibilities & Achievements:</label>
                      {(exp.responsibilities || ['']).map((resp, respIdx) => (
                        <div key={respIdx} className="flex gap-2">
                          <textarea
                            placeholder="• Describe your responsibility..."
                            className="flex-1 p-2 border rounded"
                            rows="2"
                            value={resp}
                          />
                          <button
                            onClick={() => setActiveBulletPoint(`exp-${expIdx}-${respIdx}`)}
                            className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                          >
                            AI Help
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={undoLastChange}
                  disabled={resumeHistory.length === 0}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400"
                >
                  Undo
                </button>
                <button
                  onClick={() => setCurrentStep('review')}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Review Resume
                </button>
              </div>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="space-y-6">
              <ResumeAIAssistant />
              
              {/* Quick Actions */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    Suggest skills from job posting
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    Improve bullet point strength
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    Add missing keywords
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Compare */}
        {currentStep === 'review' && (
          <div className="space-y-8">
            
            {/* Style Selection */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Choose Resume Style</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'professional', name: 'Professional', desc: 'Clean, traditional format' },
                  { key: 'modern', name: 'Modern', desc: 'Contemporary design with subtle colors' },
                  { key: 'colorful', name: 'Creative', desc: 'Bold colors and modern typography' }
                ].map(style => (
                  <button
                    key={style.key}
                    onClick={() => setResumeStyle(style.key)}
                    className={`p-4 border-2 rounded-lg text-left ${
                      resumeStyle === style.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{style.name}</div>
                    <div className="text-sm text-gray-600">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Original Resume</h3>
                <div className="bg-white p-6 rounded-lg shadow border h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {originalResume || 'Original resume will appear here after upload...'}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">LaunchpadPoint Enhanced Resume</h3>
                <div className={`p-6 rounded-lg shadow border h-96 overflow-y-auto ${
                  resumeStyle === 'colorful' ? 'bg-gradient-to-br from-blue-50 to-purple-50' :
                  resumeStyle === 'modern' ? 'bg-gray-50' : 'bg-white'
                }`}>
                  
                  {/* Enhanced Resume Preview */}
                  <div className="text-center mb-6 border-b pb-4">
                    <h4 className={`text-2xl font-bold mb-2 ${
                      resumeStyle === 'colorful' ? 'text-blue-800' : 'text-gray-900'
                    }`}>
                      {resumeData.personalInfo.name || 'YOUR NAME'}
                    </h4>
                    <div className="text-gray-600">
                      {resumeData.personalInfo.location} • {resumeData.personalInfo.phone} • {resumeData.personalInfo.email}
                    </div>
                  </div>

                  {resumeData.professionalSummary && (
                    <div className="mb-6">
                      <h5 className={`font-semibold text-lg mb-2 border-b ${
                        resumeStyle === 'colorful' ? 'text-purple-800 border-purple-300' : 'text-gray-800'
                      }`}>
                        PROFESSIONAL SUMMARY
                      </h5>
                      <p className="text-sm leading-relaxed">{resumeData.professionalSummary}</p>
                    </div>
                  )}

                  {resumeData.skills.length > 0 && (
                    <div className="mb-6">
                      <h5 className={`font-semibold text-lg mb-2 border-b ${
                        resumeStyle === 'colorful' ? 'text-green-800 border-green-300' : 'text-gray-800'
                      }`}>
                        SKILLS
                      </h5>
                      <div className="grid grid-cols-2 gap-1">
                        {resumeData.skills.filter(s => s.trim()).map((skill, idx) => (
                          <span key={idx} className="text-sm">• {skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentStep('build')}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
              >
                Back to Edit
              </button>
              <button
                onClick={() => setCurrentStep('final')}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Finalize Resume
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Review & Payment */}
        {currentStep === 'final' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Final Resume Review</h2>
              
              {/* Final resume preview would go here */}
              <div className="border p-6 bg-gray-50 rounded-lg mb-6">
                <p className="text-center text-gray-600">Final formatted resume preview</p>
              </div>

              <PaymentButton
                customerEmail={resumeData.personalInfo.email || userProfile.email}
                customerName={resumeData.personalInfo.name || userProfile.name}
                resumeType="professional"
              />
            </div>

            {/* Feedback Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>
              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFeedback({...feedback, rating: star})}
                    className={`text-2xl ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Tell us about your experience..."
                rows="3"
                className="w-full p-3 border rounded-lg"
                value={feedback.comment}
                onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
              />
              <button
                onClick={() => console.log('Feedback submitted:', feedback)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}

        {/* AI Bullet Point Helper Modal */}
        {activeBulletPoint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">AI Bullet Point Assistant</h3>
              <p className="text-gray-600 mb-4">
                Tell me more about this responsibility or achievement:
              </p>
              <textarea
                placeholder="Describe what you did, how you did it, and what the results were..."
                rows="4"
                className="w-full p-3 border rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveBulletPoint(null)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Generate professional bullet point
                    console.log('Generate bullet point for:', activeBulletPoint);
                    setActiveBulletPoint(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
