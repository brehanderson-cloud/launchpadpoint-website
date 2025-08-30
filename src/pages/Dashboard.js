import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    applications: 0,
    connections: 0,
    income: 0,
    profileViews: 0
  });

  const recentActivity = [
    {
      id: 1,
      type: 'system',
      title: 'Resume builder accessed',
      time: '2 hours ago',
      icon: '📄'
    },
    {
      id: 2,
      type: 'system',
      title: 'Account created successfully',
      time: '1 day ago',
      icon: '✅'
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
              <div className="relative">
                <span className="text-gray-400 cursor-not-allowed">Jobs</span>
                <span className="absolute -top-2 -right-6 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
              <div className="relative">
                <span className="text-gray-400 cursor-not-allowed">Network</span>
                <span className="absolute -top-2 -right-6 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
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
            Welcome to LaunchpadPoint!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your career development journey starts here
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-blue-600">{stats.applications}</p>
                <p className="text-xs text-gray-500 mt-1">Track your job applications</p>
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
                <p className="text-xs text-gray-500 mt-1">Build your network</p>
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
                <p className="text-xs text-gray-500 mt-1">Track your earnings</p>
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
                <p className="text-xs text-gray-500 mt-1">Monitor your visibility</p>
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
                onClick={() => navigate('/resume-builder')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Create Resume
              </button>
              <button className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-medium cursor-not-allowed">
                Search Jobs (Coming Soon)
              </button>
              <button className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-medium cursor-not-allowed">
                Connect & Network (Coming Soon)
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

        {/* Coming Soon Features */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  🔍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Job Search</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered job matching</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Find jobs that match your skills and experience with our intelligent job search engine.</p>
            </div>
            
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  🤝
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Professional Network</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Connect with professionals</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Build meaningful connections with industry professionals and grow your network.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
