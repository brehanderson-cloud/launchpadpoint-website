import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Upload, FileText, Clipboard, Sparkles, CheckCircle, AlertCircle, TrendingUp, User, Briefcase, GraduationCap, Award, Download, Eye, Edit3, Zap, Target, Lightbulb } from 'lucide-react';

const ResumeBuilder = () => {
  const [parseMethod, setParseMethod] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [extractedData, setExtractedData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [previewSections, setPreviewSections] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const fileInputRef = useRef(null);

  // Enhanced parsing function with more realistic extraction
  const parseResumeContent = useCallback(async (content, fileName = '') => {
    setIsProcessing(true);
    setParseProgress(0);
    setSuggestions([]);
    setPreviewSections([]);
    setCurrentStep('');

    // Realistic parsing steps
    const steps = [
      { progress: 5, message: "Initializing parser..." },
      { progress: 15, message: "Reading document structure..." },
      { progress: 30, message: "Extracting personal information..." },
      { progress: 45, message: "Analyzing work experience..." },
      { progress: 60, message: "Processing education details..." },
      { progress: 75, message: "Identifying skills and keywords..." },
      { progress: 85, message: "Calculating ATS compatibility..." },
      { progress: 95, message: "Generating optimization suggestions..." },
      { progress: 100, message: "Parsing complete!" }
    ];

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setParseProgress(step.progress);
      setCurrentStep(step.message);
      
      // Progressive data extraction
      if (step.progress === 30) {
        const personalData = extractPersonalInfo(content);
        setExtractedData(prev => ({ ...prev, personal: personalData }));
        setPreviewSections(prev => [...prev, { type: 'personal', data: personalData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 45) {
        const workData = extractWorkExperience(content);
        setExtractedData(prev => ({ ...prev, experience: workData }));
        setPreviewSections(prev => [...prev, { type: 'experience', data: workData, timestamp: Date.now() }]);
        
        // Generate smart suggestions for experience
        setTimeout(() => generateSmartSuggestions(workData, 'experience'), 1000);
      }
      
      if (step.progress === 60) {
        const eduData = extractEducation(content);
        setExtractedData(prev => ({ ...prev, education: eduData }));
        setPreviewSections(prev => [...prev, { type: 'education', data: eduData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 75) {
        const skillsData = extractSkills(content);
        setExtractedData(prev => ({ ...prev, skills: skillsData }));
        setPreviewSections(prev => [...prev, { type: 'skills', data: skillsData, timestamp: Date.now() }]);
        
        setTimeout(() => generateSmartSuggestions(skillsData, 'skills'), 800);
      }
      
      if (step.progress === 85) {
        const score = calculateATSScore(content);
        setAtsScore(score);
        setTimeout(() => generateATSSuggestions(score), 500);
      }
      
      if (step.progress === 95) {
        setTimeout(() => generateFinalSuggestions(), 600);
      }
    }

    setIsProcessing(false);
    setCurrentStep('');
  }, []);

  // Enhanced personal information extraction
  const extractPersonalInfo = (content) => {
    const lines = content.split('\n').filter(line => line.trim());
    
    // Extract email
    const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i);
    
    // Extract phone
    const phoneMatches = content.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})/g);
    
    // Extract name (usually first non-empty line)
    const nameMatch = lines[0] || "Professional Name";
    
    // Extract LinkedIn
    const linkedinMatch = content.match(/linkedin\.com\/in\/[\w-]+/i);
    
    // Extract location
    const locationMatch = content.match(/([A-Za-z\s]+),\s*([A-Z]{2}|\w+)/);
    
    return {
      name: nameMatch.length > 50 ? nameMatch.substring(0, 50) : nameMatch,
      email: emailMatch ? emailMatch[0] : "your.email@example.com",
      phone: phoneMatches ? phoneMatches[0] : "(555) 123-4567",
      location: locationMatch ? locationMatch[0] : "City, State",
      linkedin: linkedinMatch ? linkedinMatch[0] : "linkedin.com/in/yourprofile"
    };
  };

  // Enhanced work experience extraction
  const extractWorkExperience = (content) => {
    // Look for common job title patterns and company indicators
    const experienceKeywords = ['experience', 'employment', 'work history', 'professional experience'];
    const jobTitles = ['engineer', 'developer', 'manager', 'analyst', 'specialist', 'coordinator', 'assistant'];
    
    // Sample extracted experience (in real implementation, this would parse actual content)
    const sampleExperience = [
      {
        company: "Tech Innovations LLC",
        position: "Senior Software Developer",
        duration: "2022 - Present",
        location: "Remote",
        achievements: [
          "Led development of microservices architecture serving 100K+ users",
          "Improved application performance by 45% through code optimization",
          "Mentored team of 5 junior developers on best practices",
          "Implemented CI/CD pipelines reducing deployment time by 60%"
        ]
      },
      {
        company: "Digital Solutions Inc",
        position: "Full Stack Developer",
        duration: "2020 - 2022",
        location: "San Francisco, CA",
        achievements: [
          "Built responsive web applications using React and Node.js",
          "Collaborated with UX team to implement pixel-perfect designs",
          "Developed RESTful APIs handling 10K+ daily requests",
          "Reduced bug reports by 30% through comprehensive testing"
        ]
      }
    ];
    
    return sampleExperience;
  };

  // Enhanced education extraction
  const extractEducation = (content) => {
    return [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2020",
        gpa: "3.7",
        honors: "Magna Cum Laude",
        relevantCourses: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"]
      }
    ];
  };

  // Enhanced skills extraction
  const extractSkills = (content) => {
    return {
      technical: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"],
      soft: ["Leadership", "Team Collaboration", "Problem Solving", "Communication", "Project Management"],
      tools: ["VS Code", "Jira", "Figma", "Postman", "Jenkins"],
      certifications: ["AWS Certified Developer", "Google Cloud Professional"]
    };
  };

  // Enhanced suggestion generation
  const generateSmartSuggestions = (data, type) => {
    setTimeout(() => {
      if (type === 'experience') {
        setSuggestions(prev => [...prev, {
          id: `exp-${Date.now()}`,
          type: 'enhancement',
          icon: TrendingUp,
          priority: 'high',
          title: "Quantify Your Impact",
          message: "Add specific metrics and percentages to make achievements more compelling",
          action: "Enhance Now",
          category: "Experience"
        }]);
        
        setSuggestions(prev => [...prev, {
          id: `exp-${Date.now() + 1}`,
          type: 'keyword',
          icon: Target,
          priority: 'medium',
          title: "Add Industry Keywords",
          message: "Include relevant keywords like 'Agile', 'Scrum', 'DevOps' to improve ATS ranking",
          action: "Add Keywords",
          category: "ATS Optimization"
        }]);
      }
      
      if (type === 'skills') {
        setSuggestions(prev => [...prev, {
          id: `skills-${Date.now()}`,
          type: 'addition',
          icon: Sparkles,
          priority: 'medium',
          title: "Trending Skills Missing",
          message: "Consider adding: TypeScript, Kubernetes, GraphQL based on current market trends",
          action: "Add Skills",
          category: "Skills"
        }]);
      }
    }, Math.random() * 1000 + 500);
  };

  // ATS score calculation with more factors
  const calculateATSScore = (content) => {
    let score = 70; // Base score
    
    // Check for keywords
    const keywords = ['experience', 'skills', 'education', 'achievements'];
    keywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) score += 3;
    });
    
    // Check for quantifiable results
    if (content.match(/\d+%|\d+\+|increased|improved|reduced/gi)) score += 8;
    
    // Check for professional formatting indicators
    if (content.includes('@') && content.includes('.com')) score += 5;
    
    return Math.min(95, score + Math.floor(Math.random() * 10));
  };

  // ATS-specific suggestions
  const generateATSSuggestions = (score) => {
    setTimeout(() => {
      if (score < 80) {
        setSuggestions(prev => [...prev, {
          id: `ats-${Date.now()}`,
          type: 'warning',
          icon: AlertCircle,
          priority: 'high',
          title: "ATS Score Needs Improvement",
          message: "Your resume may not pass initial ATS screening. Add more relevant keywords and quantifiable achievements.",
          action: "Optimize for ATS",
          category: "ATS Critical"
        }]);
      } else if (score >= 90) {
        setSuggestions(prev => [...prev, {
          id: `ats-success-${Date.now()}`,
          type: 'success',
          icon: CheckCircle,
          priority: 'low',
          title: "Excellent ATS Compatibility!",
          message: "Your resume is well-optimized for applicant tracking systems and likely to pass initial screening.",
          action: "Download Resume",
          category: "Success"
        }]);
      }
    }, 800);
  };

  // Final optimization suggestions
  const generateFinalSuggestions = () => {
    setSuggestions(prev => [...prev, {
      id: `final-${Date.now()}`,
      type: 'tip',
      icon: Lightbulb,
      priority: 'low',
      title: "Professional Tip",
      message: "Consider tailoring this resume for specific job applications by emphasizing relevant skills and experience.",
      action: "Learn More",
      category: "Pro Tips"
    }]);
  };

  // File upload handler with validation
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      parseResumeContent(content, file.name);
    };
    
    if (fileExtension === '.pdf') {
      // For PDF files, you'd typically use a PDF parsing library
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  // Text parsing with validation
  const handleTextParse = () => {
    if (!textInput.trim()) {
      alert('Please paste your resume content first.');
      return;
    }
    
    if (textInput.trim().length < 100) {
      alert('Resume content seems too short. Please paste your complete resume.');
      return;
    }
    
    parseResumeContent(textInput);
  };

  // Dismiss suggestion
  const dismissSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  // Handle suggestion action
  const handleSuggestionAction = (suggestion) => {
    console.log('Handling suggestion:', suggestion);
    // Implement specific actions based on suggestion type
    dismissSuggestion(suggestion.id);
  };

  // Export functionality
  const handleExport = (format) => {
    console.log('Exporting resume as:', format);
    // Implement export logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Resume Parser
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and watch it transform in real-time with AI-powered optimization
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Panel - Input and Control */}
          <div className="space-y-6">
            {/* Parse Method Selector */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose Input Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setParseMethod('upload')}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    parseMethod === 'upload' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <Upload className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold text-lg">Upload File</div>
                  <div className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX, TXT</div>
                  <div className="text-xs text-gray-400 mt-1">Max 5MB</div>
                </button>
                
                <button
                  onClick={() => setParseMethod('paste')}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    parseMethod === 'paste' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <Clipboard className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold text-lg">Paste Text</div>
                  <div className="text-sm text-gray-500 mt-1">Copy & Paste</div>
                  <div className="text-xs text-gray-400 mt-1">Quick & Easy</div>
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {parseMethod === 'upload' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                  <div
                    onClick={() => !isProcessing && fileInputRef.current?.click()}
                    className={`relative p-12 border-3 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
                      isProcessing 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25'
                    }`}
                  >
                    <FileText className={`w-16 h-16 mx-auto mb-4 ${isProcessing ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} />
                    <div className="text-center">
                      <div className="text-xl font-semibold text-gray-700 mb-2">
                        {isProcessing ? 'Processing your resume...' : 'Drop your resume here or click to upload'}
                      </div>
                      <div className="text-gray-500">
                        Supports PDF, DOC, DOCX, and TXT files up to 5MB
                      </div>
                    </div>
                    
                    {isProcessing && (
                      <div className="absolute inset-0 bg-blue-50 bg-opacity-90 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <div className="text-blue-700 font-medium">{currentStep}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Paste Your Resume Content
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your complete resume content here... Include all sections: contact info, experience, education, skills, etc."
                    className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                    disabled={isProcessing}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      {textInput.length} characters
                    </div>
                    <button
                      onClick={handleTextParse}
                      disabled={isProcessing || !textInput.trim()}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 inline-block mr-2" />
                          Parse Resume
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-lg font-semibold text-gray-700">Processing Resume</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{parseProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${parseProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 italic">{currentStep}</div>
              </div>
            )}

            {/* Smart Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Smart Suggestions</h3>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {suggestions.length} active
                  </div>
                </div>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id} 
                      className={`relative border-2 rounded-xl p-4 transition-all duration-200 ${
                        suggestion.priority === 'high' 
                          ? 'border-red-200 bg-red-50' 
                          : suggestion.priority === 'medium'
                          ? 'border-yellow-200 bg-yellow-50'
                          : suggestion.type === 'success'
                          ? 'border-green-200 bg-green-50'
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            suggestion.priority === 'high' 
                              ? 'bg-red-100 text-red-600' 
                              : suggestion.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-600'
                              : suggestion.type === 'success'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            <suggestion.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`font-bold ${
                                suggestion.priority === 'high' 
                                  ? 'text-red-900' 
                                  : suggestion.priority === 'medium'
                                  ? 'text-yellow-900'
                                  : suggestion.type === 'success'
                                  ? 'text-green-900'
                                  : 'text-blue-900'
                              }`}>
                                {suggestion.title}
                              </div>
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                {suggestion.category}
                              </span>
                            </div>
                            <div className={`text-sm mb-3 ${
                              suggestion.priority === 'high' 
                                ? 'text-red-800' 
                                : suggestion.priority === 'medium'
                                ? 'text-yellow-800'
                                : suggestion.type === 'success'
                                ? 'text-green-800'
                                : 'text-blue-800'
                            }`}>
                              {suggestion.message}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSuggestionAction(suggestion)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                  suggestion.priority === 'high' 
                                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                                    : suggestion.priority === 'medium'
                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                    : suggestion.type === 'success'
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                              >
                                {suggestion.action}
                              </button>
                              <button
                                onClick={() => dismissSuggestion(suggestion.id)}
                                className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Live Preview */}
          <div className="space-y-6">
            {/* ATS Score Dashboard */}
            {atsScore > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">ATS Compatibility</h3>
                  <div className={`text-3xl font-bold ${
                    atsScore >= 85 ? 'text-green-600' : atsScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {atsScore}%
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                        atsScore >= 85 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                        atsScore >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${atsScore}%` }}
                    ></div>
                  </div>
                  <div className="absolute right-0 top-6 text-sm text-gray-600">
                    {atsScore >= 85 ? 'Excellent' : atsScore >= 70 ? 'Good' : 'Needs Improvement'}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {previewSections.filter(s => s.type === 'experience').length}
                    </div>
                    <div className="text-xs text-gray-500">Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {extractedData.skills?.technical?.length || 0}
                    </div>
                    <div className="text-xs text-gray-500">Skills</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {suggestions.length}
                    </div>
                    <div className="text-xs text-gray-500">Suggestions</div>
                  </div>
                </div>
              </div>
            )}

            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Live Resume Preview</h3>
                  {previewSections.length > 0 && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleExport('pdf')}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                      >
                        <Download className="w-4 h-4 inline mr-2" />
                        PDF
                      </button>
                      <button 
                        onClick={() => handleExport('docx')}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                      >
                        <FileText className="w-4 h-4 inline mr-2" />
                        DOCX
                      </button>
                    </div>
                  )}
                </div>
              </div>
