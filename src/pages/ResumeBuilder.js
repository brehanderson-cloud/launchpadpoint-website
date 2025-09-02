import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Upload, FileText, Clipboard, Sparkles, CheckCircle, AlertCircle, TrendingUp, User, Briefcase, GraduationCap, Award } from 'lucide-react';

const SmartResumeParser = () => {
  const [parseMethod, setParseMethod] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [extractedData, setExtractedData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [previewSections, setPreviewSections] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef(null);

  // Simulated parsing function
  const parseResumeContent = useCallback(async (content, fileName = '') => {
    setIsProcessing(true);
    setParseProgress(0);
    setSuggestions([]);
    setPreviewSections([]);

    // Simulate parsing progress
    const steps = [
      { progress: 10, message: "Reading document..." },
      { progress: 25, message: "Extracting personal information..." },
      { progress: 40, message: "Analyzing work experience..." },
      { progress: 60, message: "Processing education details..." },
      { progress: 75, message: "Identifying skills..." },
      { progress: 90, message: "Optimizing for ATS..." },
      { progress: 100, message: "Complete!" }
    ];

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setParseProgress(step.progress);
      
      // Add sections progressively
      if (step.progress === 25) {
        const personalData = extractPersonalInfo(content);
        setExtractedData(prev => ({ ...prev, personal: personalData }));
        setPreviewSections(prev => [...prev, { type: 'personal', data: personalData }]);
      }
      
      if (step.progress === 40) {
        const workData = extractWorkExperience(content);
        setExtractedData(prev => ({ ...prev, experience: workData }));
        setPreviewSections(prev => [...prev, { type: 'experience', data: workData }]);
        
        // Trigger smart suggestions
        generateSmartSuggestions(workData, 'experience');
      }
      
      if (step.progress === 60) {
        const eduData = extractEducation(content);
        setExtractedData(prev => ({ ...prev, education: eduData }));
        setPreviewSections(prev => [...prev, { type: 'education', data: eduData }]);
      }
      
      if (step.progress === 75) {
        const skillsData = extractSkills(content);
        setExtractedData(prev => ({ ...prev, skills: skillsData }));
        setPreviewSections(prev => [...prev, { type: 'skills', data: skillsData }]);
        
        generateSmartSuggestions(skillsData, 'skills');
      }
      
      if (step.progress === 90) {
        const score = calculateATSScore();
        setAtsScore(score);
        generateATSSuggestions(score);
      }
    }

    setIsProcessing(false);
  }, []);

  // Extract personal information
  const extractPersonalInfo = (content) => {
    const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const phoneMatch = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);
    const nameMatch = content.split('\n')[0];
    
    return {
      name: nameMatch || "John Doe",
      email: emailMatch ? emailMatch[0] : "john.doe@email.com",
      phone: phoneMatch ? phoneMatch[0] : "(555) 123-4567",
      location: "City, State"
    };
  };

  // Extract work experience
  const extractWorkExperience = (content) => {
    return [
      {
        company: "Tech Solutions Inc",
        position: "Senior Software Engineer",
        duration: "2021 - Present",
        achievements: [
          "Led development of web applications",
          "Improved system performance by 40%",
          "Mentored junior developers"
        ]
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "2019 - 2021",
        achievements: [
          "Built responsive web interfaces",
          "Implemented REST APIs",
          "Collaborated with design team"
        ]
      }
    ];
  };

  // Extract education
  const extractEducation = (content) => {
    return [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2019",
        gpa: "3.8"
      }
    ];
  };

  // Extract skills
  const extractSkills = (content) => {
    return {
      technical: ["JavaScript", "React", "Node.js", "Python", "SQL"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"]
    };
  };

  // Generate smart suggestions
  const generateSmartSuggestions = (data, type) => {
    setTimeout(() => {
      if (type === 'experience') {
        setSuggestions(prev => [...prev, {
          id: Date.now(),
          type: 'enhancement',
          icon: TrendingUp,
          title: "Quantify Your Achievements",
          message: "Add specific numbers and percentages to make your impact more compelling",
          action: "Enhance Experience"
        }]);
      }
      
      if (type === 'skills') {
        setSuggestions(prev => [...prev, {
          id: Date.now() + 1,
          type: 'addition',
          icon: Sparkles,
          title: "Missing Key Skills",
          message: "Consider adding: Docker, AWS, TypeScript based on your experience",
          action: "Add Skills"
        }]);
      }
    }, 1000);
  };

  // Calculate ATS score
  const calculateATSScore = () => {
    return Math.floor(Math.random() * 20) + 75; // 75-95 range
  };

  // Generate ATS suggestions
  const generateATSSuggestions = (score) => {
    setTimeout(() => {
      if (score < 85) {
        setSuggestions(prev => [...prev, {
          id: Date.now() + 2,
          type: 'ats',
          icon: AlertCircle,
          title: "ATS Optimization Needed",
          message: "Add more industry keywords and improve formatting for better ATS compatibility",
          action: "Optimize ATS"
        }]);
      } else {
        setSuggestions(prev => [...prev, {
          id: Date.now() + 3,
          type: 'success',
          icon: CheckCircle,
          title: "Excellent ATS Score!",
          message: "Your resume is well-optimized for applicant tracking systems",
          action: "Export Resume"
        }]);
      }
    }, 500);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      parseResumeContent(content, file.name);
    };
    reader.readAsText(file);
  };

  // Handle text paste
  const handleTextParse = () => {
    if (textInput.trim()) {
      parseResumeContent(textInput);
    }
  };

  // Dismiss suggestion
  const dismissSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Resume Parser</h1>
          <p className="text-lg text-gray-600">Upload your resume and watch it transform in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Methods */}
          <div className="space-y-6">
            {/* Parse Method Selector */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Input Method</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setParseMethod('upload')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    parseMethod === 'upload' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Upload File</div>
                  <div className="text-sm text-gray-500">PDF, DOC, TXT</div>
                </button>
                
                <button
                  onClick={() => setParseMethod('paste')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    parseMethod === 'paste' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Clipboard className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Paste Text</div>
                  <div className="text-sm text-gray-500">Copy & Paste</div>
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {parseMethod === 'upload' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors disabled:opacity-50"
                  >
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <div className="text-lg font-medium text-gray-700">
                      {isProcessing ? 'Processing...' : 'Click to upload your resume'}
                    </div>
                    <div className="text-gray-500">PDF, DOC, DOCX, or TXT files</div>
                  </button>
                </div>
              ) : (
                <div>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleTextParse}
                    disabled={isProcessing || !textInput.trim()}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Parse Resume'}
                  </button>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing</span>
                  <span className="text-sm text-gray-500">{parseProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${parseProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Smart Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Smart Suggestions</h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <suggestion.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-blue-900">{suggestion.title}</div>
                            <div className="text-sm text-blue-700">{suggestion.message}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissSuggestion(suggestion.id)}
                          className="text-blue-400 hover:text-blue-600"
                        >
                          ×
                        </button>
                      </div>
                      <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        {suggestion.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Live Preview */}
          <div className="space-y-6">
            {/* ATS Score */}
            {atsScore > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">ATS Compatibility Score</h3>
                  <div className={`text-2xl font-bold ${atsScore >= 85 ? 'text-green-600' : atsScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {atsScore}%
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${atsScore >= 85 ? 'bg-green-500' : atsScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Live Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <h3 className="text-lg font-semibold">Live Resume Preview</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {previewSections.map((section, index) => (
                  <div 
                    key={section.type}
                    className="animate-fade-in-up opacity-0"
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out ${index * 0.3}s forwards`
                    }}
                  >
                    {section.type === 'personal' && (
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <User className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">Personal Information</h4>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.data.name}</h2>
                        <div className="text-gray-600">
                          <p>{section.data.email} • {section.data.phone}</p>
                          <p>{section.data.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {section.type === 'experience' && (
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-3">
                          <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">Work Experience</h4>
                        </div>
                        {section.data.map((exp, i) => (
                          <div key={i} className="mb-4">
                            <h5 className="font-semibold text-gray-900">{exp.position}</h5>
                            <p className="text-blue-600 font-medium">{exp.company} • {exp.duration}</p>
                            <ul className="mt-2 space-y-1">
                              {exp.achievements.map((achievement, j) => (
                                <li key={j} className="text-gray-700 text-sm">• {achievement}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'education' && (
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-3">
                          <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">Education</h4>
                        </div>
                        {section.data.map((edu, i) => (
                          <div key={i}>
                            <h5 className="font-semibold text-gray-900">{edu.degree}</h5>
                            <p className="text-blue-600">{edu.institution} • {edu.year}</p>
                            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'skills' && (
                      <div>
                        <div className="flex items-center mb-3">
                          <Award className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">Skills</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h6 className="font-medium text-gray-700">Technical Skills</h6>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {section.data.technical.map((skill, i) => (
                                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-700">Soft Skills</h6>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {section.data.soft.map((skill, i) => (
                                <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {previewSections.length === 0 && !isProcessing && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Upload or paste your resume to see the live preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SmartResumeParser;
