import React, { useState, useCallback, useRef } from 'react';
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

  const parseResumeContent = useCallback(async (content, fileName = '') => {
    setIsProcessing(true);
    setParseProgress(0);
    setSuggestions([]);
    setPreviewSections([]);
    setCurrentStep('');

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
      
      if (step.progress === 30) {
        const personalData = {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "(555) 123-4567",
          location: "City, State",
          linkedin: "linkedin.com/in/johndoe"
        };
        setExtractedData(prev => ({ ...prev, personal: personalData }));
        setPreviewSections(prev => [...prev, { type: 'personal', data: personalData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 45) {
        const workData = [
          {
            company: "Tech Innovations LLC",
            position: "Senior Software Developer",
            duration: "2022 - Present",
            location: "Remote",
            achievements: [
              "Led development of microservices architecture serving 100K+ users",
              "Improved application performance by 45% through code optimization",
              "Mentored team of 5 junior developers on best practices"
            ]
          }
        ];
        setExtractedData(prev => ({ ...prev, experience: workData }));
        setPreviewSections(prev => [...prev, { type: 'experience', data: workData, timestamp: Date.now() }]);
        
        setTimeout(() => {
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
        }, 1000);
      }
      
      if (step.progress === 60) {
        const eduData = [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            year: "2020",
            gpa: "3.7",
            honors: "Magna Cum Laude"
          }
        ];
        setExtractedData(prev => ({ ...prev, education: eduData }));
        setPreviewSections(prev => [...prev, { type: 'education', data: eduData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 75) {
        const skillsData = {
          technical: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"],
          soft: ["Leadership", "Team Collaboration", "Problem Solving", "Communication"]
        };
        setExtractedData(prev => ({ ...prev, skills: skillsData }));
        setPreviewSections(prev => [...prev, { type: 'skills', data: skillsData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 85) {
        const score = 87;
        setAtsScore(score);
        setTimeout(() => {
          setSuggestions(prev => [...prev, {
            id: `ats-${Date.now()}`,
            type: 'success',
            icon: CheckCircle,
            priority: 'low',
            title: "Excellent ATS Compatibility!",
            message: "Your resume is well-optimized for applicant tracking systems",
            action: "Download Resume",
            category: "Success"
          }]);
        }, 800);
      }
    }

    setIsProcessing(false);
    setCurrentStep('');
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      parseResumeContent(content, file.name);
    };
    reader.readAsText(file);
  };

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

  const dismissSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const handleSuggestionAction = (suggestion) => {
    console.log('Handling suggestion:', suggestion);
    dismissSuggestion(suggestion.id);
  };

  const handleExport = (format) => {
    console.log('Exporting resume as:', format);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Resume Parser
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and watch it transform in real-time with AI-powered optimization
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
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
                </button>
              </div>
            </div>

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
                    className="relative p-12 border-3 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all duration-300 cursor-pointer"
                  >
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <div className="text-center">
                      <div className="text-xl font-semibold text-gray-700 mb-2">
                        {isProcessing ? 'Processing your resume...' : 'Drop your resume here or click to upload'}
                      </div>
                      <div className="text-gray-500">
                        Supports PDF, DOC, DOCX, and TXT files up to 5MB
                      </div>
                    </div>
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
                    placeholder="Paste your complete resume content here..."
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg"
                    >
                      {isProcessing ? 'Processing...' : 'Parse Resume'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isProcessing && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">Processing Resume</span>
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

            {suggestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Suggestions</h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                            <suggestion.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-blue-900 mb-1">{suggestion.title}</div>
                            <div className="text-sm text-blue-800 mb-3">{suggestion.message}</div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSuggestionAction(suggestion)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
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

          <div className="space-y-6">
            {atsScore > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">ATS Compatibility</h3>
                  <div className="text-3xl font-bold text-green-600">{atsScore}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-2xl font-bold">Live Resume Preview</h3>
              </div>
              
              <div className="p-8">
                {previewSections.map((section, index) => (
                  <div key={`${section.type}-${section.timestamp}`} className="mb-8 last:mb-0">
                    {section.type === 'personal' && (
                      <div className="border-b-2 border-gray-100 pb-6">
                        <div className="flex items-center mb-4">
                          <User className="w-6 h-6 text-blue-600 mr-3" />
                          <h4 className="text-lg font-bold text-gray-800">Personal Information</h4>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.data.name}</h2>
                        <div className="text-gray-600">
                          <p>{section.data.email} • {section.data.phone}</p>
                          <p>{section.data.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {section.type === 'experience' && (
                      <div className="border-b-2 border-gray-100 pb-6">
                        <div className="flex items-center mb-4">
                          <Briefcase className="w-6 h-6 text-green-600 mr-3" />
                          <h4 className="text-lg font-bold text-gray-800">Professional Experience</h4>
                        </div>
                        {section.data.map((exp, i) => (
                          <div key={i} className="mb-4">
                            <h5 className="text-xl font-bold text-gray-900">{exp.position}</h5>
                            <p className="text-lg font-semibold text-green-600">{exp.company} • {exp.duration}</p>
                            <ul className="mt-2 space-y-1">
                              {exp.achievements.map((achievement, j) => (
                                <li key={j} className="text-gray-700">• {achievement}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'education' && (
                      <div className="border-b-2 border-gray-100 pb-6">
                        <div className="flex items-center mb-4">
                          <GraduationCap className="w-6 h-6 text-purple-600 mr-3" />
                          <h4 className="text-lg font-bold text-gray-800">Education</h4>
                        </div>
                        {section.data.map((edu, i) => (
                          <div key={i}>
                            <h5 className="text-xl font-bold text-gray-900">{edu.degree}</h5>
                            <p className="text-lg font-semibold text-purple-600">{edu.institution} • {edu.year}</p>
                            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'skills' && (
                      <div>
                        <div className="flex items-center mb-4">
                          <Award className="w-6 h-6 text-orange-600 mr-3" />
                          <h4 className="text-lg font-bold text-gray-800">Skills</h4>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h6 className="font-bold text-gray-800 mb-2">Technical Skills</h6>
                            <div className="flex flex-wrap gap-2">
                              {section.data.technical.map((skill, i) => (
                                <span key={i} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h6 className="font-bold text-gray-800 mb-2">Soft Skills</h6>
                            <div className="flex flex-wrap gap-2">
                              {section.data.soft.map((skill, i) => (
                                <span key={i} className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
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
                  <div className="text-center py-16">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Parse Your Resume</h3>
                    <p className="text-gray-500">Upload or paste your resume to see the live preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
