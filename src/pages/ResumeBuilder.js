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
        company: '',
        position: '',
        duration: '',
        description: ''
      }]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Build Your Resume</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                value={resumeData.personalInfo.name}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  personalInfo: {...resumeData.personalInfo, name: e.target.value}
                })}
              />
              
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg"
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  personalInfo: {...resumeData.personalInfo, email: e.target.value}
                })}
              />
              
              <textarea
                placeholder="Professional Summary"
                rows="4"
                className="w-full p-3 border rounded-lg"
                value={resumeData.summary}
                onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
              />
              
              <button
                onClick={addExperience}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Work Experience
              </button>
            </div>
          </div>
          
          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <div className="border p-4 bg-gray-50 min-h-96">
              <h3 className="text-lg font-bold">{resumeData.personalInfo.name || 'Your Name'}</h3>
              <p className="text-gray-600">{resumeData.personalInfo.email}</p>
              <div className="mt-4">
                <h4 className="font-semibold">Summary</h4>
                <p className="text-sm">{resumeData.summary || 'Your professional summary will appear here...'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <PaymentButton
                customerEmail={resumeData.personalInfo.email}
                customerName={resumeData.personalInfo.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }
