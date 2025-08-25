import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        id: Date.now(),
        company: '',
        position: '',
        duration: '',
        description: ''
      }]
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

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Professional Resume
          </h1>
          <p className="text-xl text-gray-600">
            Fill out your information and we'll create a professional resume for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, name: e.target.value}
                  })}
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, email: e.target.value}
                  })}
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: {...resumeData.personalInfo, phone: e.target.value}
                  })}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
              <textarea
                placeholder="Brief description of your professional background and goals..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={resumeData.summary}
                onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
              />
            </div>

            {/* Experience */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Experience
                </button>
              </div>
              
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
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
                  </div>
                  <input
                    type="text"
                    placeholder="Duration (e.g., Jan 2020 - Present)"
                    className="w-full p-2 border rounded mb-4"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  />
                  <textarea
                    placeholder="Job description and achievements..."
                    rows="3"
                    className="w-full p-2 border rounded"
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  />
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <div className="border p-6 bg-gray-50 min-h-96">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h3>
                <p className="text-gray-600">{resumeData.personalInfo.email}</p>
                <p className="text-gray-600">{resumeData.personalInfo.phone}</p>
              </div>
              
              {resumeData.summary && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 border-b">Professional Summary</h4>
                  <p className="text-sm leading-relaxed">{resumeData.summary}</p>
                </div>
              )}
              
              {resumeData.experience.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 border-b">Work Experience</h4>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between">
                        <span className="font-medium">{exp.position || 'Position'}</span>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      <div className="text-sm text-gray-700">{exp.company}</div>
                      <p className="text-sm mt-1">{exp.description}</p>
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
