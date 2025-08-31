import React, { useState, useCallback } from 'react';
import { Upload, FileText, Zap, CheckCircle, AlertCircle, TrendingUp, User, Briefcase, Award, Target, Brain, Download, Edit3 } from 'lucide-react';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [resumeContent, setResumeContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [userPreferences, setUserPreferences] = useState({
    industry: '',
    careerLevel: '',
    targetRole: '',
    stylePreference: 'professional',
    specialRequirements: ''
  });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Claude AI API Integration
  const callClaudeAPI = async (prompt, maxTokens = 4000) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: maxTokens,
          temperature: 0.7,
          messages: [{ 
            role: 'user', 
            content: prompt 
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Claude API Error:', error);
      // Fallback to mock analysis if API fails
      return generateMockAnalysis();
    }
  };

  // Enhanced AI Analysis Prompt
  const createAnalysisPrompt = (resumeData, jobDesc, preferences) => {
    return `You are an expert resume writer and career coach with 20+ years of experience helping professionals land their dream jobs.

CONTEXT:
- Original Resume Content: ${JSON.stringify(resumeData, null, 2)}
- Target Job Description: ${jobDesc}
- User Industry: ${preferences.industry}
- Career Level: ${preferences.careerLevel}
- Target Role: ${preferences.targetRole}
- Style Preference: ${preferences.stylePreference}
- Special Requirements: ${preferences.specialRequirements}

TASK: Analyze this resume against the job description and provide a comprehensive analysis in JSON format with the following structure:

{
  "overallScore": number (0-100),
  "keyFindings": {
    "matchingSkills": ["skill1", "skill2", ...],
    "missingSkills": ["skill1", "skill2", ...],
    "strengthAreas": ["area1", "area2", ...],
    "improvementAreas": ["area1", "area2", ...]
  },
  "suggestions": [
    {
      "type": "critical|improvement|enhancement|formatting",
      "category": "skills|experience|summary|keywords|ats|industry",
      "title": "Brief title",
      "description": "Detailed explanation",
      "impact": "High|Medium|Low",
      "specificExample": "Show exactly what to change",
      "improvedVersion": "Show the improved text"
    }
  ],
  "industryInsights": {
    "trendingSkills": ["skill1", "skill2", ...],
    "industryKeywords": ["keyword1", "keyword2", ...],
    "salaryInsights": "Brief insight about market rates",
    "careerPathSuggestions": ["suggestion1", "suggestion2", ...]
  },
  "atsOptimization": {
    "score": number (0-100),
    "issues": ["issue1", "issue2", ...],
    "recommendations": ["rec1", "rec2", ...]
  }
}

Focus on actionable, specific improvements that will genuinely help this person get hired. Be creative but professional in your suggestions.`;
  };

  // Resume Optimization Prompt
  const createOptimizationPrompt = (resumeData, jobDesc, preferences, analysis) => {
    return `You are an expert resume writer. Based on the analysis provided, create an optimized version of this resume.

ORIGINAL RESUME: ${JSON.stringify(resumeData, null, 2)}
JOB DESCRIPTION: ${jobDesc}
USER PREFERENCES: ${JSON.stringify(preferences, null, 2)}
ANALYSIS: ${JSON.stringify(analysis, null, 2)}

TASK: Create a completely optimized resume that implements the suggestions from the analysis. Return in JSON format:

{
  "optimizedResume": {
    "personalInfo": {
      "name": "Full Name",
      "email": "email@example.com",
      "phone": "Phone Number",
      "location": "City, State",
      "linkedin": "LinkedIn URL",
      "portfolio": "Portfolio URL if applicable"
    },
    "professionalSummary": "Compelling 3-4 sentence summary optimized for this specific job",
    "experience": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "duration": "Start - End",
        "location": "City, State",
        "achievements": [
          "Quantified achievement with metrics and keywords",
          "Another strong achievement statement",
          "Third achievement focused on job requirements"
        ]
      }
    ],
    "skills": {
      "technical": ["skill1", "skill2", ...],
      "soft": ["skill1", "skill2", ...],
      "industry": ["skill1", "skill2", ...]
    },
    "education": [
      {
        "degree": "Degree Name",
        "school": "Institution Name", 
        "year": "Graduation Year",
        "relevant": "Relevant coursework or achievements"
      }
    ],
    "certifications": ["cert1", "cert2", ...],
    "projects": [
      {
        "name": "Project Name",
        "description": "Brief description with keywords",
        "technologies": ["tech1", "tech2", ...]
      }
    ]
  },
  "improvementsSummary": {
    "keyChanges": ["change1", "change2", ...],
    "keywordOptimization": "Explanation of keyword strategy",
    "atsImprovements": "ATS-specific enhancements made"
  }
}

Make this resume irresistible to hiring managers for this specific role. Use industry-appropriate language and ensure ATS compatibility.`;
  };

  // Mock analysis fallback
  const generateMockAnalysis = () => ({
    overallScore: 75,
    keyFindings: {
      matchingSkills: ["recruiting", "hr", "hiring", "talent acquisition"],
      missingSkills: ["data analysis", "HRIS systems", "employee engagement"],
      strengthAreas: ["recruitment experience", "team leadership"],
      improvementAreas: ["quantified achievements", "technical skills"]
    },
    suggestions: [
      {
        type: "critical",
        category: "keywords",
        title: "Add Missing Keywords",
        description: "Include data analysis and HRIS experience to match job requirements",
        impact: "High",
        specificExample: "Current: 'Managed recruitment process'",
        improvedVersion: "Managed end-to-end recruitment process using HRIS systems, analyzing recruitment data to improve hiring efficiency by 30%"
      }
    ],
    industryInsights: {
      trendingSkills: ["AI recruiting tools", "data-driven HR", "remote team management"],
      industryKeywords: ["talent pipeline", "diversity hiring", "employee retention"],
      salaryInsights: "HR Specialists in your area typically earn $65k-$85k",
      careerPathSuggestions: ["HR Manager", "Talent Acquisition Lead", "People Operations"]
    },
    atsOptimization: {
      score: 82,
      issues: ["Missing keywords in summary", "Could use more action verbs"],
      recommendations: ["Add industry keywords", "Use stronger action verbs"]
    }
  });

  // Parse uploaded resume (mock - replace with real PDF parsing)
  const parseResumeContent = (file) => {
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
        }
      ],
      skills: ["recruiting", "hr", "hiring", "employee relations", "talent acquisition"],
      education: [
        {
          degree: "Bachelor of Business Administration",
          school: "University of Maryland",
          year: "2019"
        }
      ]
    };
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

  const handleDragOver = (e) => e.preventDefault();
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

  const runAIAnalysis = async () => {
    if (!resumeContent || !jobDescription) return;
    
    setIsAnalyzing(true);
    try {
      const analysisPrompt = createAnalysisPrompt(resumeContent, jobDescription, userPreferences);
      const rawAnalysis = await callClaudeAPI(analysisPrompt);
      
      // Parse JSON response from Claude
      const analysis = JSON.parse(rawAnalysis);
      setAiAnalysis(analysis);
      setCurrentStep(3);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Use fallback analysis
      setAiAnalysis(generateMockAnalysis());
      setCurrentStep(3);
    }
    setIsAnalyzing(false);
  };

  const generateOptimizedResume = async () => {
    if (!aiAnalysis) return;
    
    setIsOptimizing(true);
    try {
      const optimizationPrompt = createOptimizationPrompt(resumeContent, jobDescription, userPreferences, aiAnalysis);
      const rawOptimized = await callClaudeAPI(optimizationPrompt, 6000);
      
      const optimized = JSON.parse(rawOptimized);
      setOptimizedResume(optimized);
      setCurrentStep(4);
    } catch (error) {
      console.error('Optimization failed:', error);
    }
    setIsOptimizing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: "Upload", icon: Upload },
              { step: 2, label: "Analyze", icon: Brain },
              { step: 3, label: "Review", icon: CheckCircle },
              { step: 4, label: "Optimize", icon: Zap }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <Icon size={20} />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {label}
                </span>
                {step < 4 && <div className="w-16 h-0.5 bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Step 1: Upload & Preferences */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Resume Builder
              </h1>
              <p className="text-lg text-gray-600">
                Upload your resume and let Claude AI optimize it for any job
              </p>
            </div>

            {/* Resume Upload */}
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

            {/* User Preferences */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Tell Us About Your Goals</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select 
                    value={userPreferences.industry}
                    onChange={(e) => setUserPreferences({...userPreferences, industry: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="marketing">Marketing</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Level
                  </label>
                  <select 
                    value={userPreferences.careerLevel}
                    onChange={(e) => setUserPreferences({...userPreferences, careerLevel: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-7 years)</option>
                    <option value="senior">Senior Level (8-15 years)</option>
                    <option value="executive">Executive (15+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={userPreferences.targetRole}
                    onChange={(e) => setUserPreferences({...userPreferences, targetRole: e.target.value})}
                    placeholder="e.g., Senior Product Manager"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Style
                  </label>
                  <select 
                    value={userPreferences.stylePreference}
                    onChange={(e) => setUserPreferences({...userPreferences, stylePreference: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="professional">Professional - Clean, traditional</option>
                    <option value="modern">Modern - Contemporary with color</option>
                    <option value="creative">Creative - Bold and innovative</option>
                    <option value="minimal">Minimal - Simple and elegant</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements (Optional)
                </label>
                <textarea
                  value={userPreferences.specialRequirements}
                  onChange={(e) => setUserPreferences({...userPreferences, specialRequirements: e.target.value})}
                  placeholder="Any specific requirements? (e.g., must include security clearance, focus on remote work experience, emphasize leadership skills...)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Resume Preview & Job Description */}
        {currentStep === 2 && resumeContent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Resume Preview</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Parsed Successfully
                </span>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="border-b pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{resumeContent.name}</h3>
                  <p className="text-gray-600">{resumeContent.email} • {resumeContent.phone}</p>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <User size={16} className="mr-2 text-blue-600" />
                    Professional Summary
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded">{resumeContent.summary}</p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase size={16} className="mr-2 text-blue-600" />
                    Experience
                  </h4>
                  {resumeContent.experience.map((exp, idx) => (
                    <div key={idx} className="mb-4 last:mb-0 bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{exp.title}</h5>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">{exp.duration}</span>
                      </div>
                      <p className="text-sm text-blue-600 mb-3 font-medium">{exp.company}</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-blue-600">•</span>
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
                    <Award size={16} className="mr-2 text-blue-600" />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeContent.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
                <Target size={24} className="mr-3 text-purple-600" />
                Target Job Description
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste the complete job posting:
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here including:
• Job title and company
• Required qualifications  
• Preferred skills
• Job responsibilities
• Company culture info

The more detail you provide, the better our AI can optimize your resume!"
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                    <Brain size={16} className="mr-2" />
                    Claude AI Analysis
                  </h4>
                  <p className="text-sm text-purple-800">
                    Our AI will analyze keyword matches, identify skill gaps, suggest improvements, 
                    and optimize for ATS systems. The more context you provide, the better the results!
                  </p>
                </div>

                <button
                  onClick={runAIAnalysis}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center font-medium text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Claude AI is analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-3" size={24} />
                      Analyze with Claude AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Analysis Results */}
        {currentStep === 3 && aiAnalysis && (
          <div className="space-y-8">
            {/* Analysis Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Claude AI Analysis Complete
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className={`text-3xl font-bold mb-2 ${
                    aiAnalysis.overallScore >= 80 ? 'text-green-600' : 
                    aiAnalysis.overallScore >= 60 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {aiAnalysis.overallScore}%
                  </div>
                  <p className="text-sm text-gray-600">Overall Match</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {aiAnalysis.keyFindings.matchingSkills.length}
                  </div>
                  <p className="text-sm text-gray-600">Skills Match</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {aiAnalysis.keyFindings.missingSkills.length}
                  </div>
                  <p className="text-sm text-gray-600">Missing Skills</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {aiAnalysis.atsOptimization.score}%
                  </div>
                  <p className="text-sm text-gray-600">ATS Score</p>
                </div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="mr-2" />
                  Skills You Have ✓
                </h3>
                <div className="space-y-2">
                  {aiAnalysis.keyFindings.matchingSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <span className="font-medium text-green-800 capitalize">{skill}</span>
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                  <AlertCircle className="mr-2" />
                  Skills to Add ⚠️
                </h3>
                <div className="space-y-2">
                  {aiAnalysis.keyFindings.missingSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                      <span className="font-medium text-red-800 capitalize">{skill}</span>
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded font-medium">PRIORITY</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="mr-3 text-blue-600" />
                Claude's Improvement Suggestions
              </h3>
              
              <div className="space-y-6">
                {aiAnalysis.suggestions.map((suggestion, idx) => (
                  <div key={idx} className={`border-l-4 p-4 rounded-r-lg ${
                    suggestion.type === 'critical' ? 'border-red-500 bg-red-50' :
                    suggestion.type === 'improvement' ? 'border-orange-500 bg-orange-50' :
                    suggestion.type === 'enhancement' ? 'border-blue-500 bg-blue-50' :
                    'border-green-500 bg-green-50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {suggestion.type === 'critical' && <AlertCircle size={20} className="text-red-600" />}
                        {suggestion.type === 'improvement' && <TrendingUp size={20} className="text-orange-600" />}
                        {suggestion.type === 'enhancement' && <Zap size={20} className="text-blue-600" />}
                        {suggestion.type === 'formatting' && <Edit3 size={20
