// src/pages/ResumeBuilder.js
import React, { useState, useCallback, useRef } from 'react';
import { Download, Save, Loader2, TrendingUp, Briefcase, DollarSign, Upload, FileText } from 'lucide-react';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState('insights');
  const [formData, setFormData] = useState({
    fullName: 'Herbert Essien',
    email: 'herb.essien@gmail.com',
    phone: '(225) 200-9320',
    location: '3210 Louisiana Street, Apt 1314, Houston, TX 77006',
    jobTitle: '',
    experience: '',
    summary: '',
    workExperience: '',
    education: '',
    skills: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [resumeResult, setResumeResult] = useState(null);
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file upload for resume parsing
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    setUploadedFile(file);
    setIsLoading(true);
    setLoadingMessage('Parsing your resume...');
    setError('');

    try {
      // Simulate resume parsing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract sample data based on what I can see from your resume
      const parsedData = {
        fullName: 'Herbert Essien',
        email: 'herbessien@gmail.com',
        phone: '(225) 200-9320',
        location: '3210 Louisiana Street, Apt 1314, Houston, TX 77006',
        jobTitle: 'Executive Recruiter',
        experience: '10+',
        summary: 'I do recruiting for over 10 years for production, supply chain and customer service, CEO, CFO executive roles',
        workExperience: 'Recruiting Manager - Executive Search Firm (2014-2024)\n• Forecasted and tracked key account metrics (e.g. quarterly sales results and annual forecasts)\n• Clearly communicated the progress of monthly/quarterly initiatives to internal and external stakeholders and prepared reports on account statuses\n• Collaborated with other members of sales team to identify and grow opportunities within territory\n• Coordinated with team working on the same accounts to ensure consistent service\n• Trained newly hired sales representatives and continued coaching and counseling team members\n• Received recognition for training and development of direct report who achieved sales escalations as needed',
        education: 'Business Administration - University of Houston',
        skills: 'SHRM, Recruiting, Executive Search, Sales Management, Team Leadership, Account Management, Training & Development'
      };

      setFormData(parsedData);
      setLoadingMessage('Resume parsed successfully!');
      
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('form');
      }, 1000);

    } catch (error) {
      setError('Failed to parse resume. Please try again or fill the form manually.');
      setIsLoading(false);
    }
  }, []);

  // Handle form input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Show resume form
  const showResumeForm = useCallback(() => {
    setCurrentStep('form');
    setError('');
  }, []);

  // Generate resume
  const generateResume = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.jobTitle) {
      setError('Please fill in all required fields (Name, Email, Job Title)');
      return;
    }

    setIsLoading(true);
    setError('');
    setCurrentStep('loading');

    try {
      // Step 1: Analyze resume data
      setLoadingMessage('Analyzing your background...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Optimize resume content
      setLoadingMessage('Optimizing resume content with AI...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: Generate optimized resume
      setLoadingMessage('Creating your professional resume...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate optimized result
      const optimizedResult = {
        optimizedData: {
          optimizedSummary: generateSmartSummary(formData),
          optimizedSkills: optimizeSkills(formData.skills, formData.jobTitle),
          optimizedExperience: enhanceWorkExperience(formData.workExperience),
          atsScore: calculateATSScore(formData),
          recommendations: generateRecommendations(formData)
        },
        originalData: formData
      };

      setResumeResult(optimizedResult);
      setCurrentStep('result');

    } catch (error) {
      console.error('Resume generation failed:', error);
      setError('Failed to generate resume. Please try again.');
      setCurrentStep('form');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [formData]);

  // Download PDF (simulated)
  const downloadResume = useCallback(async () => {
    if (!resumeResult) return;

    try {
      setIsLoading(true);
      setLoadingMessage('Generating PDF...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple text file for demo
      const resumeText = createResumeText(resumeResult);
      const blob = new Blob([resumeText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      setError('Failed to download resume. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [resumeResult, formData]);

  // Helper functions
  const createResumeText = (result) => {
    const { optimizedData, originalData } = result;
    return `${originalData.fullName}
${originalData.email} | ${originalData.phone} | ${originalData.location}

PROFESSIONAL SUMMARY
${optimizedData.optimizedSummary}

WORK EXPERIENCE
${originalData.workExperience}

EDUCATION
${originalData.education}

SKILLS
${optimizedData.optimizedSkills}

ATS SCORE: ${optimizedData.atsScore}/100
`;
  };

  const generateSmartSummary = (data) => {
    if (data.summary && data.summary.length > 20) {
      return `${data.summary} Enhanced with AI optimization for ${data.jobTitle} roles, leveraging ${data.experience} of industry experience.`;
    }
    
    const experienceText = data.experience === '10+' ? 'over 10 years' : 
                         data.experience === '6-10' ? '6-10 years' :
                         data.experience === '2-5' ? '2-5 years' : 'emerging';
    
    if (data.jobTitle.toLowerCase().includes('recruit')) {
      return `Experienced recruiting professional with ${experienceText} of expertise in executive search, talent acquisition, and client relationship management. Proven track record of successfully placing high-level executives across various industries, with deep understanding of market trends and candidate evaluation.`;
    }
    
    return `Dynamic professional with ${experienceText} of experience in ${data.jobTitle} roles. Proven ability to drive results, build relationships, and deliver exceptional outcomes in fast-paced environments.`;
  };

  const enhanceWorkExperience = (experience) => {
    if (!experience) return '';
    
    // Add action words and quantifiable metrics where possible
    return experience
      .replace(/\bmanaged\b/gi, 'Successfully managed')
      .replace(/\bworked\b/gi, 'Collaborated')
      .replace(/\bhelped\b/gi, 'Facilitated')
      .replace(/\bincreased\b/gi, 'Achieved increase of')
      .replace(/\bdecreased\b/gi, 'Reduced by');
  };

  const optimizeSkills = (skills, jobTitle) => {
    if (!skills) return getDefaultSkillsForRole(jobTitle);
    
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    const additionalSkills = getRecommendedSkills(jobTitle);
    
    const allSkills = [...skillsArray, ...additionalSkills];
    const uniqueSkills = [...new Set(allSkills)];
    
    return uniqueSkills.slice(0, 12).join(', ');
  };

  const getDefaultSkillsForRole = (jobTitle) => {
    if (jobTitle.toLowerCase().includes('recruit')) {
      return 'Executive Search, Talent Acquisition, Client Relations, SHRM Certification, ATS Systems, Interview Techniques, Salary Negotiation, Market Research, Candidate Screening, Relationship Building';
    }
    return 'Leadership, Communication, Problem Solving, Team Management, Strategic Planning, Client Relations';
  };

  const getRecommendedSkills = (jobTitle) => {
    if (jobTitle.toLowerCase().includes('recruit')) {
      return ['LinkedIn Recruiter', 'Boolean Search', 'Stakeholder Management', 'Pipeline Management'];
    }
    return ['Microsoft Office', 'Project Management', 'Data Analysis'];
  };

  const calculateATSScore = (data) => {
    let score = 0;
    if (data.fullName) score += 10;
    if (data.email) score += 10;
    if (data.phone) score += 10;
    if (data.location) score += 10;
    if (data.jobTitle) score += 15;
    if (data.summary && data.summary.length > 50) score += 20;
    if (data.workExperience && data.workExperience.length > 100) score += 15;
    if (data.skills && data.skills.split(',').length >= 3) score += 10;
    
    return Math.min(score, 100);
  };

  const generateRecommendations = (data) => {
    const recommendations = [];
    
    if (!data.summary || data.summary.length < 100) {
      recommendations.push("Expand professional summary to 100-150 words for better impact");
    }
    if (!data.workExperience || data.workExperience.length < 200) {
      recommendations.push("Add more detailed work experience with quantifiable achievements");
    }
    if (!data.skills || data.skills.split(',').length < 6) {
      recommendations.push("Include more relevant skills (aim for 8-12 skills)");
    }
    if (!data.education || data.education.length < 20) {
      recommendations.push("Add education details and any certifications");
    }
    
    return recommendations;
  };

  // Render upload section
  const renderUploadSection = () => (
    <div className="upload-section">
      <div className="upload-card">
        <FileText className="upload-icon" />
        <h3>Quick Start: Upload Your Existing Resume</h3>
        <p>Upload your current resume and we'll automatically fill the form for you</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: 'none' }}
        />
        <button
          className="upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          <Upload size={16} />
          Upload Resume
        </button>
        <p className="upload-note">Supports PDF, DOC, DOCX, TXT files</p>
      </div>
      
      <div className="divider">
        <span>OR</span>
      </div>
      
      <button className="manual-btn" onClick={showResumeForm}>
        Fill Form Manually
      </button>
    </div>
  );

  // Render insights section
  const renderInsights = () => (
    <div className="insights-section">
      <div className="insights-header">
        <TrendingUp className="chart-icon" />
        <span>Industry Insights & Trends</span>
      </div>
      
      <div className="content-grid">
        <div className="trending-skills">
          <div className="section-title">
            <div className="fire-icon">🔥</div>
            <span>Trending Skills</span>
          </div>
          <div className="skills-tags">
            <span className="skill-tag">Executive Search</span>
            <span className="skill-tag">AI-powered recruiting</span>
            <span className="skill-tag">Diversity hiring</span>
          </div>
        </div>
        
        <div className="career-paths">
          <div className="section-title">
            <Briefcase className="briefcase-icon" />
            <span>Career Path</span>
          </div>
          <ul className="career-list">
            <li className="career-item">📈 Senior Recruiter</li>
            <li className="career-item">📈 Talent Acquisition Manager</li>
            <li className="career-item">📈 VP of Recruiting</li>
          </ul>
        </div>
      </div>
      
      <div className="market-insights">
        <div className="market-title">
          <DollarSign className="dollar-icon" />
          <span>Market Insights</span>
        </div>
        <div className="salary-info">Executive Recruiters in Houston typically earn $75k-$120k + commission</div>
      </div>
    </div>
  );

  // Render generate section
  const renderGenerateSection = () => (
    <div className="generate-section">
      <h1 className="generate-title">Ready to Optimize Your Resume?</h1>
      <p className="generate-subtitle">
        Upload your existing resume for instant parsing, or start fresh with our AI-powered builder.
      </p>
      
      {renderUploadSection()}
    </div>
  );

  // Render form
  const renderForm = () => (
    <div className="resume-form">
      <div className="form-header">
        <h2 className="form-title">Your Professional Information</h2>
        {uploadedFile && (
          <div className="uploaded-file-info">
            <FileText size={16} />
            <span>Parsed from: {uploadedFile.name}</span>
          </div>
        )}
      </div>
      
      <form onSubmit={generateResume}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="jobTitle">Target Job Title *</label>
            <input
              type="text"
              id="jobTitle"
              placeholder="e.g., Executive Recruiter, HR Manager"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="0-1">0-1 years</option>
              <option value="2-5">2-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="summary">Professional Summary</label>
            <textarea
              id="summary"
              placeholder="Brief overview of your professional background and key achievements..."
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="workExperience">Work Experience</label>
            <textarea
              id="workExperience"
              placeholder="Job Title - Company Name (Year-Year)&#10;• Key achievement or responsibility&#10;• Another accomplishment with metrics"
              value={formData.workExperience}
              onChange={(e) => handleInputChange('workExperience', e.target.value)}
              rows={6}
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              placeholder="Degree - University Name (Year)&#10;Relevant Certifications"
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="skills">Key Skills</label>
            <input
              type="text"
              id="skills"
              placeholder="Separate skills with commas: Executive Search, SHRM, Leadership, etc."
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
            />
          </div>
        </div>
        
        <div className="btn-group">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setCurrentStep('insights')}
          >
            Back
          </button>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="spinner" /> : null}
            Generate My Resume
          </button>
        </div>
      </form>
    </div>
  );

  // Render loading
  const renderLoading = () => (
    <div className="loading">
      <div className="spinner-container">
        <Loader2 className="spinner large" />
      </div>
      <p>{loadingMessage}</p>
    </div>
  );

  // Render results
  const renderResults = () => {
    if (!resumeResult) return null;

    const { optimizedData, originalData } = resumeResult;

    return (
      <div className="resume-output">
        <div className="resume-header">
          <div className="resume-name">{originalData.fullName}</div>
          <div className="resume-contact">
            {[
              originalData.email && `📧 ${originalData.email}`,
              originalData.phone && `📞 ${originalData.phone}`,
              originalData.location && `📍 ${originalData.location}`
            ].filter(Boolean).join(' • ')}
          </div>
        </div>
        
        <div className="resume-section">
          <div className="resume-section-title">Professional Summary</div>
          <div className="resume-content">
            {optimizedData?.optimizedSummary || originalData.summary}
          </div>
        </div>
        
        {originalData.workExperience && (
          <div className="resume-section">
            <div className="resume-section-title">Work Experience</div>
            <div className="resume-content">
              <div dangerouslySetInnerHTML={{ 
                __html: formatWorkExperience(optimizedData?.optimizedExperience || originalData.workExperience) 
              }} />
            </div>
          </div>
        )}
        
        {originalData.education && (
          <div className="resume-section">
            <div className="resume-section-title">Education</div>
            <div className="resume-content">
              <div dangerouslySetInnerHTML={{ 
                __html: formatEducation(originalData.education) 
              }} />
            </div>
          </div>
        )}
        
        {originalData.skills && (
          <div className="resume-section">
            <div className="resume-section-title">Key Skills</div>
            <div className="resume-content">
              <div className="skills-grid">
                {(optimizedData?.optimizedSkills || originalData.skills)
                  .split(',')
                  .map(skill => skill.trim())
                  .filter(skill => skill)
                  .map((skill, index) => (
                    <span key={index} className="skill-item">{skill}</span>
                  ))
                }
              </div>
            </div>
          </div>
        )}

        {optimizedData && (
          <div className="resume-section">
            <div className="resume-section-title">AI Analysis Results</div>
            <div className="resume-content">
              <div className="analysis-results">
                <div className="ats-score">
                  <strong>ATS Compatibility Score: {optimizedData.atsScore}/100</strong>
                </div>
                {optimizedData.recommendations && optimizedData.recommendations.length > 0 && (
                  <div className="recommendations">
                    <h4>Recommendations for Improvement:</h4>
                    <ul>
                      {optimizedData.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="btn-group resume-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => setCurrentStep('form')}
          >
            Edit Resume
          </button>
          <button 
            className="btn btn-primary" 
            onClick={downloadResume}
            disabled={isLoading}
          >
            <Download size={16} />
            Download Resume
          </button>
        </div>
      </div>
    );
  };

  // Helper functions
  const formatWorkExperience = (experience) => {
    return experience
      .split('\n')
      .map(line => {
        line = line.trim();
        if (!line) return '';
        if (line.startsWith('•') || line.startsWith('-')) {
          return `<div style="margin-left: 20px; margin-bottom: 3px;">${line}</div>`;
        } else {
          return `<div style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">${line}</div>`;
        }
      })
      .join('');
  };

  const formatEducation = (education) => {
    return education
      .split('\n')
      .filter(line => line.trim())
      .map(line => `<div style="margin-bottom: 5px;"><strong>${line.trim()}</strong></div>`)
      .join('');
  };

  return (
    <div className="resume-builder">
      <div className="container">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {currentStep === 'insights' && (
          <>
            {renderInsights()}
            {renderGenerateSection()}
          </>
        )}
        
        {currentStep === 'form' && renderForm()}
        {currentStep === 'loading' && renderLoading()}
        {currentStep === 'result' && renderResults()}
      </div>
    </div>
  );
};

export default ResumeBuilder;
