import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    applications: 24,
    connections: 156,
    income: 4250,
    profileViews: 89
  });

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'Applied to Senior Developer at TechCorp',
      time: '2 hours ago',
      icon: '💼'
    },
    {
      id: 2,
      type: 'connection',
      title: 'Sarah Johnson accepted your connection',
      time: '4 hours ago',
      icon: '👥'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Received $1,500 payment from Client A',
      time: '1 day ago',
      icon: '💰'
    }
  ];

  const jobRecommendations = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechFlow Inc',
      location: 'Remote',
      salary: '$95k - $130k',
      matchScore: 92
    },
    {
      id: 2,
      title: 'Frontend Architect',
      company: 'Innovation Labs',
      location: 'San Francisco',
      salary: '$120k - $160k',
      matchScore: 88
    }
  ];

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
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/jobs')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Jobs
              </button>
              <button 
                onClick={() => navigate('/network')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Network
              </button>
              <button 
                onClick={() => navigate('/finances')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Finances
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Professional!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your career progress overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-blue-600">{stats.applications}</p>
                <p className="text-xs text-green-600 mt-1">+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                💼
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Connections</p>
                <p className="text-2xl font-bold text-green-600">{stats.connections}</p>
                <p className="text-xs text-green-600 mt-1">+8% this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Income</p>
                <p className="text-2xl font-bold text-purple-600">${stats.income}</p>
                <p className="text-xs text-green-600 mt-1">+15% this month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                💰
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Views</p>
                <p className="text-2xl font-bold text-orange-600">{stats.profileViews}</p>
                <p className="text-xs text-green-600 mt-1">+5% this week</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                👀
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/ai-assistant')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Ask AI Assistant
              </button>
              <button 
                onClick={() => navigate('/jobs')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Search Jobs
              </button>
              <button 
                onClick={() => navigate('/network')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Connect & Network
              </button>
              <button 
                onClick={() => navigate('/finances')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Track Finances
              </button>
            </div>
          </div>
        </div>

        {/* Job Recommendations */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">AI Job Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobRecommendations.map(job => (
              <div key={job.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{job.location} • {job.salary}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{job.matchScore}%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
