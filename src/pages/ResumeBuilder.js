import React, { useState, useCallback } from 'react';
import { Upload, FileText, Zap, CheckCircle, AlertCircle, TrendingUp, User, Briefcase, Award, Target } from 'lucide-react';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [resumeContent, setResumeContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock resume parsing (in real implementation, would use PDF parsing library)
  const parseResumeContent = (file) => {
    // Simulated parsed resume content
    return {
      name: "Herbert Essien",
      email: "herb.essien@gmail.com",
      phone: "(555) 123-4567",
      summary: "Experienced HR professional with 5+ years in recruitment and talent acquisition. Proven track record of building diverse teams and implementing effective hiring strategies.",
      experience: [
        {
          title: "Senior HR Specialist",
          company: "TechCorp Solutions",
          duration: "2021 - Present",
          responsibilities: [
            "Led recruitment initiatives for technical positions",
            "Developed onboarding programs for new hires",
            "Managed employee relations and performance reviews"
          ]
        },
        {
          title: "HR Coordinator",
          company: "StartupXYZ",
          duration: "2019 - 2021",
          responsibilities: [
            "Coordinated hiring processes for multiple departments",
            "Maintained employee records and compliance documentation",
            "Assisted with benefits administration"
          ]
        }
      ],
      skills: ["recruiting", "hr", "hiring", "employee relations", "talent acquisition", "onboarding"],
      education: [
        {
          degree: "Bachelor of Business Administration",
          school: "University of Maryland",
          year: "2019"
        }
      ]
    };
  };

  // AI Analysis Engine
  const analyzeResumeAgainstJob = (resumeData, jobDesc) => {
    // Mock AI analysis - in real implementation, would use actual AI
    const jobKeywords = extractKeywords(jobDesc);
    const resumeKeywords = resumeData.skills.concat(
      resumeData.experience.flatMap(exp => exp.responsibilities.join(' ').toLowerCase().split(' '))
    );

    const matchingSkills = jobKeywords.filter(keyword => 
      resumeKeywords.some(skill => skill.toLowerCase().includes(keyword.toLowerCase()))
    );

    const missingSkills = jobKeywords.filter(keyword => 
      !resumeKeywords.some(skill => skill.toLowerCase().includes(keyword.toLowerCase()))
    );

    return {
      overallScore: Math.round((matchingSkills.length / jobKeywords.length) * 100),
      matchingSkills: matchingSkills.slice(0, 5),
      missingSkills: missingSkills.slice(0, 5),
      suggestions: [
        {
          type: "critical",
          title: "Add Missing Keywords",
          description: `Include ${missingSkills.slice(0, 3).join(', ')} in your experience descriptions`,
          impact: "High"
        },
        {
          type: "improvement",
          title: "Quantify Achievements",
          description: "Add specific numbers and metrics to your accomplishments",
          impact: "High"
        },
        {
          type: "enhancement",
          title: "Optimize Summary",
          description: "Tailor your professional summary to match the job requirements",
          impact: "Medium"
        },
        {
          type: "formatting",
          title: "Update Skills Section",
          description: "Reorganize skills to highlight most relevant ones first",
          impact: "Medium"
        }
      ]
    };
  };

  const extractKeywords = (jobDesc) => {
    // Simple keyword extraction - in real implementation, would use NLP
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an'];
    return jobDesc.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 10);
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedResume(file);
      const parsedContent = parseResumeContent(file);
      setResumeContent(parsedContent);
      setCurrentStep(2);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedResume(file);
      const parsedContent = parseResumeContent(file);
      setResumeContent(parsedContent);
      setCurrentStep(2);
    }
  };

  const runAIAnalysis = () => {
    if (!resumeContent || !jobDescription) return;
    
    setIsAnalyzing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      const analysis = analyzeResumeAgainstJob(resumeContent, jobDescription);
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
      setCurrentStep(3);
    }, 2000);
  };

  const getSuggestionIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertCircle className="text-red-500" />;
      case 'improvement': return <TrendingUp className="text-orange-500" />;
      case 'enhancement': return <Zap className="text-blue-500" />;
      default: return <CheckCircle className="text-green-500" />;
    }
  };

  const getSuggestionColor = (type) => {
    switch(type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'improvement': return 'border-orange-200 bg-orange-50';
      case 'enhancement': return 'border-blue-200 bg-blue-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: "Upload", icon: Upload },
              { step: 2, label: "Build", icon: FileText },
              { step: 3, label: "Review", icon: CheckCircle }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {label}
                </span>
                {step < 3 && <div className="w-16 h-0.5 bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Step 1: Upload Resume */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                LaunchpadPoint Enhanced Resume
              </h1>
              <p className="text-lg text-gray-600">
                Upload your current resume and we'll help you optimize it with AI
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Your Current Resume</h2>
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <div className="mb-4">
                  <label htmlFor="resume-upload" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer inline-block">
                    Upload Resume (PDF)
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-gray-600">Or drag and drop your PDF here</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Resume Content & Job Description */}
        {currentStep === 2 && resumeContent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Resume Preview</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  ✓ Uploaded Successfully
                </span>
              </div>

              <div className="space-y-6">
                {/* Header */}
                <div className="border-b pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{resumeContent.name}</h3>
                  <p className="text-gray-600">{resumeContent.email} • {resumeContent.phone}</p>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <User size={16} className="mr-2" />
                    Professional Summary
                  </h4>
                  <p className="text-gray-700 text-sm">{resumeContent.summary}</p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase size={16} className="mr-2" />
                    Experience
                  </h4>
                  {resumeContent.experience.map((exp, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-gray-900">{exp.title}</h5>
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.responsibilities.slice(0, 2).map((resp, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Award size={16} className="mr-2" />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeContent.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description Input */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Target size={24} className="mr-3 text-blue-600" />
                Target Job Description
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste the job description you're applying for:
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here... Include requirements, responsibilities, and qualifications."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-blue-800">
                    Include the complete job posting for best results. Our AI will analyze requirements, 
                    preferred qualifications, and company culture to optimize your resume.
                  </p>
                </div>

                <button
                  onClick={runAIAnalysis}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center font-medium"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2" size={20} />
                      Analyze & Get AI Suggestions
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Analysis & Suggestions */}
        {currentStep === 3 && aiAnalysis && (
          <div className="space-y-8">
            {/* AI Analysis Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  AI Resume Analysis Complete
                </h2>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      aiAnalysis.overallScore >= 80 ? 'text-green-600' : 
                      aiAnalysis.overallScore >= 60 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {aiAnalysis.overallScore}%
                    </div>
                    <p className="text-gray-600">Match Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {aiAnalysis.suggestions.length}
                    </div>
                    <p className="text-gray-600">Suggestions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {aiAnalysis.matchingSkills.length}
                    </div>
                    <p className="text-gray-600">Skills Match</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="mr-2" />
                  Matching Skills Found
                </h3>
                <div className="space-y-2">
                  {aiAnalysis.matchingSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-green-50 p-3 rounded">
                      <span className="font-medium text-green-800">{skill}</span>
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                  <AlertCircle className="mr-2" />
                  Missing Keywords
                </h3>
                <div className="space-y-2">
                  {aiAnalysis.missingSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-red-50 p-3 rounded">
                      <span className="font-medium text-red-800">{skill}</span>
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">ADD</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="mr-3 text-blue-600" />
                AI-Powered Improvement Suggestions
              </h3>
              
              <div className="space-y-4">
                {aiAnalysis.suggestions.map((suggestion, idx) => (
                  <div key={idx} className={`border rounded-lg p-4 ${getSuggestionColor(suggestion.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getSuggestionIcon(suggestion.type)}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {suggestion.title}
                          </h4>
                          <p className="text-gray-700 text-sm mb-2">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        suggestion.impact === 'High' ? 'bg-red-200 text-red-800' :
                        suggestion.impact === 'Medium' ? 'bg-orange-200 text-orange-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {suggestion.impact} Impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Style Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Choose Resume Style</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'professional', name: 'Professional', desc: 'Clean, traditional format', selected: selectedStyle === 'professional' },
                  { id: 'modern', name: 'Modern', desc: 'Contemporary design with subtle colors', selected: selectedStyle === 'modern' },
                  { id: 'creative', name: 'Creative', desc: 'Bold colors and modern typography', selected: selectedStyle === 'creative' }
                ].map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      style.selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold mb-2">{style.name}</h4>
                    <p className="text-sm text-gray-600">{style.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
              >
                Back to Edit
              </button>
              
              <div className="space-x-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium">
                  Download Optimized Resume
                </button>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  Finalize Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 continued: No AI analysis yet */}
        {currentStep === 2 && !aiAnalysis && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-600 mr-3" />
              <div>
                <h4 className="font-medium text-yellow-800">Ready for AI Analysis</h4>
                <p className="text-yellow-700 text-sm">
                  Add a job description above to get personalized suggestions for your resume.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
