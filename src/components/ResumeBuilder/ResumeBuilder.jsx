// src/components/ResumeBuilder/ResumeBuilder.jsx
import React, { useState, useCallback } from 'react';
import { ChevronRight, Download, Save, Loader2, TrendingUp, Briefcase, DollarSign } from 'lucide-react';
import axios from 'axios';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState('insights');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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
      const analysisResponse = await axios.post('/api/ai/analyze-resume', formData);
      
      // Step 2: Optimize resume content
      setLoadingMessage('Optimizing resume content...');
      const optimizationResponse = await axios.post('/api/ai/optimize-resume', {
        ...formData,
        analysis: analysisResponse.data.analysis
      });

      // Step 3: Display results
      setLoadingMessage('Creating your professional resume...');
      setResumeResult({
        ...optimizationResponse.data,
        originalData: formData
      });

      setCurrentStep('result');

    } catch (error) {
      console.error('Resume generation failed:', error);
      setError(error.response?.data?.error || 'Failed to generate resume. Please try again.');
      setCurrentStep('form');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [formData]);

  // Download PDF
  const downloadResume = useCallback(async () => {
    if (!resumeResult) return;

    try {
      setIsLoading(true);
      
      const response = await axios.post('/api/download-resume-pdf', {
        resumeData: { ...formData, ...resumeResult.optimizedData },
        resumeId: currentResumeId
      }, {
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download failed:', error);
      setError('Failed to download resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [resumeResult, formData, currentResumeId]);

  // Save resume
  const saveResume = useCallback(async () => {
    if (!resumeResult) return;

    try {
      setIsLoading(true);
      
      const response = await axios.post('/api/save-resume', {
        resumeData: { ...formData, ...resumeResult.optimizedData },
        resumeId: currentResumeId
      });

      setCurrentResumeId(response.data.resumeId);
      // Show success message (you could add a toast notification here)
      console.log('Resume saved successfully');

    } catch (error) {
      console.error('Save failed:', error);
      setError('Failed to save resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [resumeResult, formData, currentResumeId]);

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
