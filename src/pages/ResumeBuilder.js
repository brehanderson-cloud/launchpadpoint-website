// src/pages/ResumeBuilder.js
import React, { useState, useCallback } from 'react';
import { Download, Save, Loader2, TrendingUp, Briefcase, DollarSign } from 'lucide-react';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState('insights');
  const [formData, setFormData] = useState({
    fullName: 'Herbert Essien', // Pre-filled from your user context
    email: 'herb.essien@gmail.com', // Pre-filled from your user context
    phone: '',
    location: '',
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
  const [currentResumeId, setCurrentResumeId] = useState(null);

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
      
      // For now, we'll simulate the API calls since you don't have backend yet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Optimize resume content
      setLoadingMessage('Optimizing resume content with AI...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: Generate optimized resume
      setLoadingMessage('Creating your professional resume...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate optimized result
      const optimizedResult = {
        optimizedData: {
          optimizedSummary: generateSmartSummary(formData),
          optimizedSkills: optimizeSkills(formData.skills, formData.jobTitle),
          optimizedExperience: formData.workExperience,
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

  // Download PDF (simulated for now)
  const downloadResume = useCallback(async () => {
    if (!resumeResult) return;

    try {
      setIsLoading(true);
      
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just show success message
      alert('PDF generation completed! (This is a demo - real PDF will be implemented with backend API)');

    } catch (error) {
      console.error('Download failed:', error);
      setError('Failed to download resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [resumeResult, formData, currentResumeId]);

  // Save resume (simulated for now)
  const saveResume = useCallback(async () => {
    if (!resumeResult) return;

    try {
      setIsLoading(true);
      
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Resume saved successfully! (This is a demo - real saving will be implemented with backend API)');

    } catch (error) {
      console.error('Save failed:', error);
      setError('Failed to save resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [resumeResult, formData, currentResumeId]);

  // Helper functions for AI simulation
  const generateSmartSummary = (data) => {
    const experienceText = data.experience === '0-1' ? 'emerging professional' : 
                         data.experience === '2-5' ? 'experienced professional' :
                         data.experience === '6-10' ? 'seasoned professional' : 'senior professional';
    
    if (data.summary) {
      return `${data.summary} Enhanced with AI optimization for ${data.jobTitle} roles.`;
    }
    
    const templates = {
      'hr': `Strategic HR ${experienceText} with expertise in talent acquisition, employee relations, and organizational development. Proven track record of implementing data-driven HR solutions that improve employee satisfaction and drive business results.`,
      'data': `Results-oriented data ${experienceText} specializing in statistical analysis, data visualization, and business intelligence. Expert in transforming complex datasets into actionable insights that inform strategic decision-making.`,
      'software': `Innovative software ${experienceText} with expertise in full-stack development, system design, and modern programming languages. Passionate about building scalable applications and contributing to collaborative development environments.`,
      'marketing': `Creative marketing ${experienceText} with strong background in digital marketing, brand strategy, and campaign optimization. Demonstrated ability to drive engagement, increase conversions, and deliver measurable ROI.`
    };
    
    const jobLower = data.jobTitle.toLowerCase();
    for (const [category, template] of Object.entries(templates)) {
      if (jobLower.includes(category)) {
        return template;
      }
    }
    
    return `Dynamic ${experienceText} with strong analytical and communication skills. Committed to delivering excellence and driving results in fast-paced environments.`;
  };

  const optimizeSkills = (skills, jobTitle) => {
    if (!skills) return getDefaultSkillsForRole(jobTitle);
    
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    const additionalSkills = getRecommendedSkills(jobTitle);
    
    const allSkills = [...skillsArray];
    additionalSkills.forEach(skill => {
      if (!allSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
        allSkills.push(skill);
      }
    });
    
    return allSkills.slice(0, 12).join(', ');
  };

  const getDefaultSkillsForRole = (jobTitle) => {
    const skillSets = {
      'hr': 'Talent Acquisition, Employee Relations, Performance Management, HRIS Systems, Recruiting, Onboarding, Training & Development, Compensation Planning',
      'data': 'Data Analysis, Python, SQL, Tableau, Excel, Statistical Analysis, Business Intelligence, Data Visualization',
      'software': 'JavaScript, Python, React, Node.js, Git, Agile, System Design, Database Management',
      'marketing': 'Digital Marketing, Google Analytics, SEO/SEM, Social Media Marketing, Content Strategy, Email Marketing, Campaign Management, Brand Strategy'
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, skillSet] of Object.entries(skillSets)) {
      if (jobLower.includes(category)) {
        return skillSet;
      }
    }
    
    return 'Communication, Problem Solving, Team Collaboration, Time Management, Leadership, Analytical Thinking';
  };

  const getRecommendedSkills = (jobTitle) => {
    const recommendations = {
      'hr': ['Workday', 'ADP', 'Microsoft Office', 'Data Analysis'],
      'data': ['Machine Learning', 'R', 'Power BI', 'A/B Testing'],
      'software': ['AWS', 'Docker', 'API Development', 'Testing'],
      'marketing': ['HubSpot', 'Adobe Creative Suite', 'CRM', 'WordPress']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, skills] of Object.entries(recommendations)) {
      if (jobLower.includes(category)) {
        return skills;
      }
    }
    
    return ['Microsoft Office', 'Communication', 'Leadership'];
  };

  const calculateATSScore = (data) => {
    let score = 0;
    if (data.fullName) score += 10;
    if (data.email) score += 10;
    if (data.phone) score += 5;
    if (data.location) score += 5;
    if (data.jobTitle) score += 15;
    if (data.summary && data.summary.length > 50) score += 20;
    if (data.workExperience && data.workExperience.length > 100) score += 25;
    if (data.skills && data.skills.split(',').length >= 5) score += 10;
    
    return Math.min(score, 100);
  };

  const generateRecommendations = (data) => {
    const recommendations = [];
    
    if (!data.summary || data.summary.length < 50) {
      recommendations.push("Add a compelling professional summary");
    }
    if (!data.workExperience || data.workExperience.length < 100) {
      recommendations.push("Expand work experience with specific achievements");
    }
    if (!data.skills || data.skills.split(',').length < 5) {
      recommendations.push("Include more relevant skills for your target role");
    }
    
    return recommendations;
  };

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
            <span className="skill-tag">AI recruiting tools</span>
            <span className="skill-tag">data-driven HR</span>
            <span className="skill-tag">remote team management</span>
          </div>
        </div>
        
        <div className="career-paths">
          <div className="section-title">
            <Briefcase className="briefcase-icon" />
            <span>Career Path</span>
          </div>
          <ul className="career-list">
            <li className="career-item">📈 HR Manager</li>
            <li className="career-item">📈 Talent Acquisition Lead</li>
            <li className="career-item">📈 People Operations</li>
          </ul>
        </div>
      </div>
      
      <div className="market-insights">
        <div className="market-title">
          <DollarSign className="dollar-icon" />
          <span>Market Insights</span>
        </div>
        <div className="salary-info">HR Specialists in your area typically earn $65k-$85k</div>
      </div>
    </div>
  );

  // Render generate section
  const renderGenerateSection = () => (
    <div className="generate-section">
      <h1 className="generate-title">Ready to Optimize Your Resume?</h1>
      <p className="generate-subtitle">
        Claude AI will now create a perfectly optimized version of your resume based on all the analysis above.
      </p>
      <button className="generate-btn" onClick={showResumeForm} disabled={isLoading}>
        <span>⚡</span>
        Generate Optimized Resume
      </button>
    </div>
  );

  // Render form
  const renderForm = () => (
    <div className="resume-form">
      <h2 className="form-title">Tell Us About Yourself</h2>
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
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="jobTitle">Target Job Title *</label>
            <input
              type="text"
              id="jobTitle"
              placeholder="e.g., HR Manager, Data Analyst"
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
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="workExperience">Work Experience</label>
            <textarea
              id="workExperience"
              placeholder="Job Title - Company Name (Year-Year)&#10;• Key achievement or responsibility&#10;• Another accomplishment with metrics if possible"
              value={formData.workExperience}
              onChange={(e) => handleInputChange('workExperience', e.target.value)}
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              placeholder="Degree - University Name (Year)&#10;Relevant Certifications"
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="skills">Key Skills</label>
            <input
              type="text"
              id="skills"
              placeholder="Separate skills with commas: Project Management, Data Analysis, Leadership, etc."
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
            <div className="resume-section-title">Experience</div>
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

        {/* Show ATS Score and Recommendations */}
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
            Download PDF
          </button>
          <button 
            className="btn btn-primary" 
            onClick={saveResume}
            disabled={isLoading}
          >
            <Save size={16} />
            Save Resume
          </button>
        </div>
      </div>
    );
  };

  // Helper function to format work experience
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

  // Helper function to format education
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
