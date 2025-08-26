import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton';

export default function ResumeBuilderWithTailoring() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      location: '',
      phone: '',
      email: '',
      linkedIn: '',
      website: ''
    },
    professionalSummary: '',
    skills: [],
    experience: [],
    education: [],
    certifications: []
  });

  const [jobDescription, setJobDescription] = useState('');
  const [tailoringMode, setTailoringMode] = useState(false);
  const [suggestions, setSuggestions] = useState({
    missingSkills: [],
    keywordMatches: [],
    summaryTips: [],
    experienceTips: []
  });

  // Simple keyword extraction function
  const extractKeywords = (text) => {
    const commonSkills = [
      'javascript', 'python', 'react', 'node.js', 'html', 'css', 'sql', 'aws', 'docker', 'kubernetes',
      'project management', 'agile', 'scrum', 'leadership', 'communication', 'analytics', 'marketing',
      'sales', 'customer service', 'accounting', 'finance', 'recruiting', 'hr', 'recruiting',
      'full cycle recruiting', 'ats', 'applicant tracking', 'hiring', 'interviewing', 'sourcing',
      'linkedin recruiter', 'indeed', 'monster', 'background checks', 'payroll', 'benefits',
      'employee relations', 'compliance', 'i-9', 'onboarding', 'performance management'
    ];
    
    const lowerText = text.toLowerCase();
    return commonSkills.filter(skill => 
      lowerText.includes(skill.toLowerCase())
    );
  };

  const analyzeJobDescription = () => {
    if (!jobDescription.trim()) return;

    const jobKeywords = extractKeywords(jobDescription);
    const resumeText = [
      resumeData.professionalSummary,
      ...resumeData.skills,
      ...resumeData.experience.flatMap(exp => exp.responsibilities || [])
    ].join(' ').toLowerCase();

    const resumeKeywords = extractKeywords(resumeText);
    const missingSkills = jobKeywords.filter(keyword => 
      !resumeKeywords.includes(keyword)
    );

    const keywordMatches = jobKeywords.filter(keyword => 
      resumeKeywords.includes(keyword)
    );

    // Generate basic suggestions
    const summaryTips = [];
    const experienceTips = [];

    if (jobDescription.toLowerCase().includes('leadership')) {
      summaryTips.push('Consider highlighting leadership experience in your summary');
    }
    if (jobDescription.toLowerCase().includes('team')) {
      summaryTips.push('Mention your team collaboration skills');
    }
    if (jobDescription.toLowerCase().includes('results') || jobDescription.toLowerCase().includes('metrics')) {
      experienceTips.push('Add quantifiable results and metrics to your experience bullets');
    }

    setSuggestions({
      missingSkills,
      keywordMatches,
      summaryTips,
      experienceTips
    });

    setTailoringMode(true);
  };

  const addMissingSkill = (skill) => {
    if (!resumeData.skills.includes(skill)) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skill]
      });
    }
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        id: Date.now(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: ['']
      }]
    });
  };

  const addSkill = () => {
    if (resumeData.skills.length < 20) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, '']
      });
    }
  };

  const updateSkill = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({...resumeData, skills: newSkills});
  };

  const removeSkill = (index) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const updateExperienceResponsibility = (expId, respIndex, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === expId ? {
          ...exp,
          responsibilities: exp.responsibilities.map((resp, idx) =>
            idx === respIndex ? value : resp
          )
        } : exp
      )
    });
  };

  const addResponsibility = (expId) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === expId ? {
          ...exp,
          responsibilities: [...exp.responsibilities, '']
        } : exp
      )
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Resume Builder
          </h1>
          <p className="text-xl text-gray-600">
            Build your resume and tailor it to specific job postings
          </p>
        </div>

        {/* Job Description Input */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Tailoring (Optional)</h2>
          <p className="text-gray-600 mb-4">
            Paste a job description below to get AI suggestions for optimizing your resume
          </p>
          <textarea
            placeholder="Paste the job description here to get tailoring suggestions..."
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button
            onClick={analyzeJobDescription}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            disabled={!jobDescription.trim()}
          >
            Analyze Job & Get Suggestions
          </button>
        </div>

        {/* Tailoring Suggestions */}
        {tailoringMode && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Resume Tailoring Suggestions
            </h3>
            
            {suggestions.keywordMatches.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-green-800 mb-2">✓ Keywords You Match:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.keywordMatches.map((keyword, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {suggestions.missingSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-orange-800 mb-2">⚠️ Consider Adding These Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.missingSkills.map((skill, idx) => (
                    <button
                      key={idx}
                      onClick={() => addMissingSkill(skill)}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm hover:bg-orange-200 border border-orange-300"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {suggestions.summaryTips.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 Summary Tips:</h4>
                <ul className="text-blue-700 text-sm">
                  {suggestions.summaryTips.map((tip, idx) => (
                    <li key={idx} className="mb-1">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.experienceTips.length > 0 && (
              <div>
                <h4 className="font-medium text-purple-800 mb-2">🎯 Experience Tips:</h4>
                <ul className="text-purple-700 text-sm">
                  {suggestions.experienceTips.map((tip, idx) => (
                    <li key={idx} className="mb-1">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, name: e.target.value}
                  })}
                />
                <input
                  type="text"
                  placeholder="Location (City, State)"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, location: e.target.value}
                  })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, phone: e.target.value}
                  })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, email: e.target.value}
                  })}
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
              {tailoringMode && suggestions.summaryTips.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                  <p className="text-yellow-800 text-sm font-medium">💡 Tip: {suggestions.summaryTips[0]}</p>
                </div>
              )}
              <textarea
                placeholder="Write a compelling professional summary (3-4 sentences highlighting your experience, key skills, and career goals)"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={resumeData.professionalSummary}
                onChange={(e) => setResumeData({...resumeData, professionalSummary: e.target.value})}
              />
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <button
                  onClick={addSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={resumeData.skills.length >= 20}
                >
                  Add Skill
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter skill"
                      className="flex-1 p-2 border rounded"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Professional Experience</h2>
                <button
                  onClick={addExperience}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Experience
                </button>
              </div>
              
              {tailoringMode && suggestions.experienceTips.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-4">
                  <p className="text-purple-800 text-sm font-medium">🎯 {suggestions.experienceTips[0]}</p>
                </div>
              )}

              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border p-4 rounded mb-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="p-2 border rounded"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="p-2 border rounded"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="p-2 border rounded"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Start Date (MM/YYYY)"
                        className="flex-1 p-2 border rounded"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="End Date"
                        className="flex-1 p-2 border rounded"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    Currently working here
                  </label>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Key Responsibilities & Achievements:</label>
                      <button
                        onClick={() => addResponsibility(exp.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Add Point
                      </button>
                    </div>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <textarea
                        key={respIndex}
                        placeholder="• Describe your responsibility or achievement with metrics when possible..."
                        className="w-full p-2 border rounded mb-2"
                        rows="2"
                        value={resp}
                        onChange={(e) => updateExperienceResponsibility(exp.id, respIndex, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <div className="border p-6 bg-gray-50 min-h-96 text-sm">
              
              {/* Header */}
              <div className="text-center mb-6 border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {resumeData.personalInfo.name || 'YOUR NAME'}
                </h3>
                <div className="text-gray-600 mt-2">
                  {resumeData.personalInfo.location && `${resumeData.personalInfo.location} • `}
                  {resumeData.personalInfo.phone && `${resumeData.personalInfo.phone} • `}
                  {resumeData.personalInfo.email}
                </div>
              </div>

              {/* Professional Summary */}
              {resumeData.professionalSummary && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 border-b border-gray-300">PROFESSIONAL SUMMARY</h4>
                  <p className="leading-relaxed">{resumeData.professionalSummary}</p>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 border-b border-gray-300">SKILLS</h4>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.filter(skill => skill.trim()).map((skill, idx) => (
                      <span key={idx} className="mr-4 mb-1">• {skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Experience */}
              {resumeData.experience.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h4>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{exp.company || 'Company Name'}</div>
                          <div className="font-medium">{exp.position || 'Position Title'}</div>
                        </div>
                        <div className="text-right text-sm">
                          <div>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                          <div>{exp.location}</div>
                        </div>
                      </div>
                      {exp.responsibilities.some(resp => resp.trim()) && (
                        <div className="mt-2">
                          {exp.responsibilities.filter(resp => resp.trim()).map((resp, idx) => (
                            <div key={idx} className="mb-1">• {resp}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <PaymentButton
                customerEmail={resumeData.personalInfo.email}
                customerName={resumeData.personalInfo.name}
                resumeType="professional"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
              }
