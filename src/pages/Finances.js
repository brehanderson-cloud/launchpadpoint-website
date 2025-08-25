import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Finances = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions] = useState([
    { id: 1, type: 'income', amount: 2500, description: 'Freelance Project', date: '2024-08-24', category: 'Work' },
    { id: 2, type: 'expense', amount: 89, description: 'Software Subscription', date: '2024-08-23', category: 'Tools' },
    { id: 3, type: 'income', amount: 1200, description: 'Consulting Fee', date: '2024-08-22', category: 'Consulting' },
    { id: 4, type: 'expense', amount: 45, description: 'Domain Renewal', date: '2024-08-21', category: 'Business' }
  ]);

  const [budgets] = useState([
    { category: 'Software Tools', budgeted: 200, spent: 89, color: 'blue' },
    { category: 'Education', budgeted: 300, spent: 149, color: 'green' },
    { category: 'Marketing', budgeted: 500, spent: 234, color: 'purple' },
    { category: 'Equipment', budgeted: 1000, spent: 0, color: 'orange' }
  ]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netIncome = totalIncome - totalExpenses;

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
                Finances
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your career-related income and expenses
          </p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</p>
                <p className="text-3xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-2xl">
                📈
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-red-600 mt-1">+5% this month</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center text-2xl">
                📉
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Income</p>
                <p className="text-3xl font-bold text-blue-600">${netIncome.toLocaleString()}</p>
                <p className="text-sm text-blue-600 mt-1">+18% this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
          <div className="flex border-b dark:border-gray-700">
            {['overview', 'transactions', 'budgets'].map(tab => (
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
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Income Sources</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium dark:text-white">Freelance Work</span>
                      <span className="text-green-600 font-bold">$2,500</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium dark:text-white">Consulting</span>
                      <span className="text-green-600 font-bold">$1,200</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Expense Categories</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="font-medium dark:text-white">Software Tools</span>
                      <span className="text-red-600 font-bold">$89</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="font-medium dark:text-white">Business Expenses</span>
                      <span className="text-red-600 font-bold">$45</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Transactions</h3>
                <div className="space-y-4">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                        }`}>
                          <span className="text-xl">
                            {transaction.type === 'income' ? '💰' : '💳'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{transaction.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.category} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'budgets' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Budget Overview</h3>
                <div className="space-y-6">
                  {budgets.map((budget, index) => {
                    const percentage = (budget.spent / budget.budgeted) * 100;
                    const isOverBudget = percentage > 100;
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium dark:text-white">{budget.category}</span>
                          <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
                            ${budget.spent} / ${budget.budgeted}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              isOverBudget ? 'bg-red-500' : `bg-${budget.color}-500`
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1 text-xs">
                          <span className="text-gray-600 dark:text-gray-400">{percentage.toFixed(1)}% used</span>
                          {isOverBudget && (
                            <span className="text-red-600">Over budget!</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances;
