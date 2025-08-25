import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Network = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('connections');

  const [connections] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      mutualConnections: 12,
      recentActivity: 'Posted about React best practices',
      time: '2 hours ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Product Manager',
      company: 'Microsoft',
      mutualConnections: 8,
      recentActivity: 'Shared an article about AI in product development',
      time: '5 hours ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'UX Designer',
      company: 'Figma',
      mutualConnections: 15,
      recentActivity: 'Celebrating 3 years at Figma',
      time: '1 day ago'
    }
  ]);

  const [suggestions] = useState([
    {
      id: 1,
      name: 'David Kim',
      title: 'Full Stack Developer',
      company: 'Stripe',
      mutualConnections: 5,
      reason: 'Works in similar role'
    },
    {
      id: 2,
      name: 'Lisa Wang',
      title: 'Engineering Manager',
      company: 'Airbnb',
      mutualConnections: 3,
      reason: 'Same university'
    }
  ]);

  const [discussions] = useState([
    {
      id: 1,
      title: 'How to transition from Frontend to Full Stack Development?',
      author: 'Alex Thompson',
      replies: 24,
      likes: 45,
      time: '3 hours ago'
    },
    {
      id: 2,
      title: 'Remote Work Best Practices for 2024',
      author: 'Maria Garcia',
      replies: 18,
      likes: 32,
      time: '1 day ago'
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
              <button 
                onClick={() => navigate('/jobs')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Jobs
              </button>
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
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
            Professional Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with professionals and grow your career network
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
          <div className="flex border-b dark:border-gray-700">
            {['connections', 'suggestions', 'discussions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'connections' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold dark:text-white">Your Connections</h3>
                {connections.map(connection => (
                  <div key={connection.id} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-white">{connection.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {connection.title} at {connection.company}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {connection.mutualConnections} mutual connections
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {connection.recentActivity} • {connection.time}
                        </p>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'suggestions' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold dark:text-white">People You May Know</h3>
                {suggestions.map(suggestion => (
                  <div key={suggestion.id} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {suggestion.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-white">{suggestion.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {suggestion.title} at {suggestion.company}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {suggestion.mutualConnections} mutual connections • {suggestion.reason}
                        </p>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold dark:text-white">Community Discussions</h3>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    Start Discussion
                  </button>
                </div>
                {discussions.map(discussion => (
                  <div key={discussion.id} className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <h4 className="font-semibold dark:text-white mb-2">{discussion.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>By {discussion.author}</span>
                      <div className="flex items-center space-x-4">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.likes} likes</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
