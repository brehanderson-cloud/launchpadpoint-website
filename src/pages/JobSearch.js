import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechFlow Inc',
      location: 'Remote',
      type: 'Full-time',
      salary: '$95,000 - $130,000',
      posted: '2 days ago',
      description: 'We are looking for a senior developer to lead our engineering team...',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      matchScore: 92
    },
    {
      id: 2,
      title: 'Frontend Architect',
      company: 'Innovation Labs',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      posted: '1 week ago',
      description: 'Join our team to architect scalable frontend solutions...',
      skills: ['React', 'Vue.js', 'System Design', 'Leadership'],
      matchScore: 88
    },
    {
      id: 3,
      title: 'AI/ML Engineer',
      company: 'DataVision Labs',
      location: 'Austin, TX (Hybrid)',
      type: 'Full-time',
      salary: '$105,000 - $140,000',
      posted: '3 days ago',
      description: 'Build intelligent systems and ML models for enterprise clients...',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
      matchScore: 87
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-blue-600"
            >
              LaunchpadPoint
            </button>
            <div className="hidden md:flex space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Dashboard
              </button>
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Jobs
              </button>
              <button 
                onClick={() => navigate('/network')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Network
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate('/ai-assistant')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            AI Assistant
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered job recommendations based on your profile
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map(job => (
            <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="font-medium">{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.salary}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:ml-8 flex flex-col items-start lg:items-end">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {job.matchScore}%
                    </div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                      Apply Now
                    </button>
                    <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg">
                      Save Job
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Posted {job.posted}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
