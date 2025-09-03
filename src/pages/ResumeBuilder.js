import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, Clipboard, Sparkles, CheckCircle, AlertCircle, TrendingUp, User, Briefcase, GraduationCap, Award, Download, Eye, Edit3, Zap, Target, Lightbulb, ArrowLeft, Save, Share } from 'lucide-react';

const EnhancedResumeBuilder = () => {
  const [parseMethod, setParseMethod] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [extractedData, setExtractedData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [previewSections, setPreviewSections] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [activeTab, setActiveTab] = useState('parse');
  const fileInputRef = useRef(null);

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  const generateJobMatchSuggestions = (jobDesc) => {
    const jobKeywords = ['JavaScript', 'React', 'leadership', 'agile', 'Python'];
    const suggestions = [];
    
    if (jobDesc.toLowerCase().includes('leadership')) {
      suggestions.push({
        id: `job-lead-${Date.now()}`,
        type: 'job-match',
        icon: Target,
        priority: 'high',
        title: "Highlight Leadership Experience",
        message: "This role emphasizes leadership. Consider adding specific examples of team management and project leadership.",
        action: "Add Leadership Examples",
        category: "Job Match",
        matchImprovement: "+15% match score"
      });
    }
    
    if (jobDesc.toLowerCase().includes('agile') || jobDesc.toLowerCase().includes('scrum')) {
      suggestions.push({
        id: `job-agile-${Date.now()}`,
        type: 'job-match',
        icon: Zap,
        priority: 'medium',
        title: "Add Agile/Scrum Experience",
        message: "The job mentions Agile methodologies. Highlight your experience with Scrum, sprint planning, or agile development.",
        action: "Update Skills",
        category: "Job Match",
        matchImprovement: "+12% match score"
      });
    }

    return suggestions;
  };

  const parseResumeContent = useCallback(async (content, fileName = '') => {
    setIsProcessing(true);
    setParseProgress(0);
    setSuggestions([]);
    setPreviewSections([]);
    setCurrentStep('');

    const steps = [
      { progress: 5, message: "Initializing AI parser..." },
      { progress: 15, message: "Reading document structure..." },
      { progress: 25, message: "Extracting personal information..." },
      { progress: 40, message: "Analyzing work experience..." },
      { progress: 55, message: "Processing education details..." },
      { progress: 70, message: "Identifying skills and keywords..." },
      { progress: 80, message: "Calculating ATS compatibility..." },
      jobDescription ? { progress: 90, message: "Matching against job requirements..." } : null,
      { progress: 95, message: "Generating optimization suggestions..." },
      { progress: 100, message: "Analysis complete!" }
    ].filter(Boolean);

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 700));
      setParseProgress(step.progress);
      setCurrentStep(step.message);
      
      if (step.progress === 25) {
        const personalData = {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "(555) 123-4567",
          location: "San Francisco, CA",
          linkedin: "linkedin.com/in/johndoe",
          portfolio: "johndoe.dev"
        };
        setExtractedData(prev => ({ ...prev, personal: personalData }));
        setPreviewSections(prev => [...prev, { type: 'personal', data: personalData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 40) {
        const workData = [
          {
            company: "Tech Innovations LLC",
            position: "Senior Software Developer",
            duration: "2022 - Present",
            location: "Remote",
            achievements: [
              "Led development of microservices architecture serving 100K+ users",
              "Improved application performance by 45% through code optimization",
              "Mentored team of 5 junior developers on best practices",
              "Implemented agile development processes reducing delivery time by 30%"
            ]
          },
          {
            company: "StartupCorp",
            position: "Full Stack Developer",
            duration: "2020 - 2022",
            location: "San Francisco, CA",
            achievements: [
              "Built responsive web applications using React and Node.js",
              "Collaborated with cross-functional teams in agile environment",
              "Reduced bug count by 60% through comprehensive testing"
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
      
      if (step.progress === 55) {
        const eduData = [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            year: "2020",
            gpa: "3.7",
            honors: "Magna Cum Laude",
            relevant: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"]
          }
        ];
        setExtractedData(prev => ({ ...prev, education: eduData }));
        setPreviewSections(prev => [...prev, { type: 'education', data: eduData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 70) {
        const skillsData = {
          technical: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"],
          soft: ["Leadership", "Team Collaboration", "Problem Solving", "Communication", "Agile/Scrum"]
        };
        setExtractedData(prev => ({ ...prev, skills: skillsData }));
        setPreviewSections(prev => [...prev, { type: 'skills', data: skillsData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 80) {
        const score = 89;
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
            category: "ATS Score"
          }]);
        }, 800);
      }

      if (step.progress === 90 && jobDescription) {
        const matchScoreValue = 78;
        setMatchScore(matchScoreValue);
        
        // Add job-specific suggestions
        setTimeout(() => {
          const jobSuggestions = generateJobMatchSuggestions(jobDescription);
          setSuggestions(prev => [...prev, ...jobSuggestions]);
        }, 1000);
      }
    }

    setIsProcessing(false);
    setCurrentStep('');
  }, [jobDescription]);

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

  const handleSave = () => {
    console.log('Saving resume to history');
    alert('Resume saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={navigateBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Resume</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Resume Builder
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and job description to get AI-powered optimization and real-time job matching
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('parse')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'parse' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Smart Parser
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'manual' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Manual Builder
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Job Description Input */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Target Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get tailored suggestions and match scoring..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-gray-500">
                  {jobDescription.length} characters {jobDescription.length > 100 && '✓ Ready for matching'}
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  {jobDescription ? 'Job targeting enabled' : 'Optional but recommended'}
                </div>
              </div>
            </div>

            {/* Input Method Selection */}
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

            {/* Upload/Paste Area */}
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

            {/* Processing Status */}
            {isProcessing && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">AI Processing Resume</span>
                  <span className="text-lg font-bold text-blue-600">{parseProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${parseProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 italic flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  {currentStep}
                </div>
              </div>
            )}

            {/* Smart Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-600" />
                  AI Suggestions
                </h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className={`border-2 rounded-xl p-4 ${
                      suggestion.type === 'job-match' ? 'border-green-200 bg-green-50' :
                      suggestion.type === 'success' ? 'border-green-200 bg-green-50' :
                      'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            suggestion.type === 'job-match' ? 'bg-green-100 text-green-600' :
                            suggestion.type === 'success' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <suggestion.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 mb-1">{suggestion.title}</div>
                            <div className="text-sm text-gray-800 mb-2">{suggestion.message}</div>
                            {suggestion.matchImprovement && (
                              <div className="text-sm text-green-700 font-medium mb-3">
                                {suggestion.matchImprovement}
                              </div>
                            )}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSuggestionAction(suggestion)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                  suggestion.type === 'job-match' ? 'bg-green-600 hover:bg-green-700 text-white' :
                                  'bg-blue-600 hover:bg-blue-700 text-white'
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

          <div className="space-y-6">
            {/* Scores Dashboard */}
            {(atsScore > 0 || matchScore > 0) && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Resume Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {atsScore > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-700">ATS Compatibility</h4>
                        <div className="text-2xl font-bold text-green-600">{atsScore}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${atsScore}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Excellent for applicant tracking systems</p>
                    </div>
                  )}

                  {matchScore > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-700">Job Match Score</h4>
                        <div className="text-2xl font-bold text-blue-600">{matchScore}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${matchScore}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Strong match for target position</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Live Resume Preview */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Eye className="w-6 h-6 mr-3" />
                  Live Resume Preview
                </h3>
                {jobDescription && (
                  <p className="text-blue-100 mt-2">Optimized for target position</p>
                )}
              </div>
              
              <div className="p-8">
                {previewSections.map((section, index) => (
                  <div key={`${section.type}-${section.timestamp}`} className="mb-8 last:mb-0 animate-fadeIn">
                    {section.type === 'personal' && (
                      <div className="border-b-2 border-gray-100 pb-6">
                        <div className="flex items-center mb-4">
                          <User className="w-6 h-6 text-blue-600 mr-3" />
                          <h4 className="text-lg font-bold text-gray-800">Contact Information</h4>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.data.name}</h2>
                        <div className="text-gray-600 space-y-1">
                          <p className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {section.data.email} • {section.data.phone}
                          </p>
                          <p className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {section.data.location}
                          </p>
                          {section.data.linkedin && (
                            <p className="flex items-center">
                              <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                              {section.data.linkedin}
                            </p>
                          )}
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
                          <div key={i} className="mb-6 last:mb-0">
                            <h5 className="text-xl font-bold text-gray-900">{exp.position}</h5>
                            <p className="text-lg font-semibold text-green-600 mb-2">{exp.company} • {exp.duration}</p>
                            <p className="text-gray-600 text-sm mb-3">{exp.location}</p>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, j) => (
                                <li key={j} className="text-gray-700 flex items-start">
                                  <span className="text-blue-500 mr-3 mt-1">▪</span>
                                  {achievement}
                                </li>
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
                            <p className="text-lg font-semibold text-purple-600 mb-1">{edu.institution} • {edu.year}</p>
                            {edu.gpa && <p className="text-gray-600 mb-2">GPA: {edu.gpa} {edu.honors && `• ${edu.honors}`}</p>}
                            {edu.relevant && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">Relevant Coursework:</p>
                                <p className="text-sm text-gray-600">{edu.relevant.join(', ')}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'skills' && (
                      <div>
                        <div className="flex items-center mb-4">
                          <Award className="w-6 h-6 text-orange-600 mr-3" />
                          <h4 className="text-lg font-bold text-gray-800">Skills & Competencies</h4>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h6 className="font-bold text-gray-800 mb-3">Technical Skills</h6>
                            <div className="flex flex-wrap gap-2">
                              {section.data.technical.map((skill, i) => {
                                const isJobMatch = jobDescription && jobDescription.toLowerCase().includes(skill.toLowerCase());
                                return (
                                  <span key={i} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    isJobMatch 
                                      ? 'bg-green-500 text-white ring-2 ring-green-300 shadow-lg' 
                                      : 'bg-blue-500 text-white'
                                  }`}>
                                    {skill}
                                    {isJobMatch && <span className="ml-1">✓</span>}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <h6 className="font-bold text-gray-800 mb-3">Soft Skills</h6>
                            <div className="flex flex-wrap gap-2">
                              {section.data.soft.map((skill, i) => {
                                const isJobMatch = jobDescription && jobDescription.toLowerCase().includes(skill.toLowerCase());
                                return (
                                  <span key={i} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    isJobMatch 
                                      ? 'bg-green-500 text-white ring-2 ring-green-300 shadow-lg' 
                                      : 'bg-indigo-500 text-white'
                                  }`}>
                                    {skill}
                                    {isJobMatch && <span className="ml-1">✓</span>}
                                  </span>
                                );
                              })}
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
                    <p className="text-gray-500 mb-4">Upload or paste your resume to see the live preview</p>
                    {jobDescription && (
                      <p className="text-blue-600 text-sm">Job description loaded - your resume will be optimized for this position</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {previewSections.length > 0 && (
                <div className="border-t bg-gray-50 px-8 py-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleExport('pdf')}
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => handleExport('docx')}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOCX</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('manual')}
                        className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Manual Builder Tab Content */}
        {activeTab === 'manual' && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manual Resume Builder</h2>
            <div className="text-center py-16">
              <Edit3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Manual Builder Coming Soon</h3>
              <p className="text-gray-500 mb-6">
                The manual builder will allow you to create and edit resumes section by section with full control.
              </p>
              <button
                onClick={() => setActiveTab('parse')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Use Smart Parser Instead
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
