import React from 'react';

export default function ProfileHeader({ userName = 'User', userEmail = '' }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">LaunchpadPoint</h1>
          <p className="text-sm text-gray-600">Professional Resume Builder</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-gray-600">{userEmail}</div>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
