import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Issue {
  id: string;
  title: string;
  testFile: string;
  browserTestName: string;
  lastSeen: string;
  age: string;
  trend: boolean[]; // Array of 14 days, true for failure, false for no activity
  events: number;
  users: number;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
}

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'AssertionError: Expected true but got false',
    testFile: 'dashboard-access.spec.ts',
    browserTestName: 'Dashboard Access Test',
    lastSeen: '2h ago',
    age: '5d',
    trend: [true, false, true, true, false, false, true, false, false, true, false, false, true, false],
    events: 192,
    users: 43,
    priority: 'medium',
    assignee: '@kelly'
  },
  {
    id: '2',
    title: 'APIException: GET /users/ failed',
    testFile: 'user-profile.spec.ts',
    browserTestName: 'User Profile Test',
    lastSeen: '4h ago',
    age: '3d',
    trend: [false, true, false, true, true, false, true, false, true, false, true, false, false, true],
    events: 156,
    users: 28,
    priority: 'high',
    assignee: '@mike'
  },
  {
    id: '3',
    title: 'NetworkError: Failed to load checkout page',
    testFile: 'checkout-flow.spec.ts',
    browserTestName: 'Checkout Flow Test',
    lastSeen: '1h ago',
    age: '2d',
    trend: [true, true, false, true, false, true, false, true, false, true, false, true, false, true],
    events: 245,
    users: 67,
    priority: 'high',
    assignee: '@sarah'
  },
  {
    id: '4',
    title: 'TimeoutError: Login form submission',
    testFile: 'login.spec.ts',
    browserTestName: 'Login Test',
    lastSeen: '5h ago',
    age: '1d',
    trend: [false, false, true, false, true, false, true, false, true, false, true, false, true, false],
    events: 178,
    users: 52,
    priority: 'medium',
    assignee: '@john'
  },
  {
    id: '5',
    title: 'ValidationError: Invalid form data',
    testFile: 'registration.spec.ts',
    browserTestName: 'Registration Test',
    lastSeen: '3h ago',
    age: '4d',
    trend: [true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    events: 134,
    users: 38,
    priority: 'low',
    assignee: '@emma'
  },
  {
    id: '6',
    title: 'ElementNotFound: Search results container',
    testFile: 'search.spec.ts',
    browserTestName: 'Search Test',
    lastSeen: '6h ago',
    age: '2d',
    trend: [false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    events: 167,
    users: 45,
    priority: 'medium',
    assignee: '@david'
  },
  {
    id: '7',
    title: 'StateError: Cart total calculation',
    testFile: 'cart.spec.ts',
    browserTestName: 'Cart Test',
    lastSeen: '1d ago',
    age: '6d',
    trend: [true, true, true, false, true, false, true, false, true, false, true, false, true, false],
    events: 189,
    users: 58,
    priority: 'high',
    assignee: '@lisa'
  },
  {
    id: '8',
    title: 'RenderError: Product image loading',
    testFile: 'product-details.spec.ts',
    browserTestName: 'Product Details Test',
    lastSeen: '2d ago',
    age: '7d',
    trend: [false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    events: 145,
    users: 42,
    priority: 'medium',
    assignee: '@tom'
  }
];

const IssuesPage = () => {
  const [selectedProject, setSelectedProject] = useState('My Projects');
  const [selectedEnv, setSelectedEnv] = useState('All Environments');
  const [dateRange, setDateRange] = useState('14d');
  const [searchQuery, setSearchQuery] = useState('browser tests');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Issues</h1>
        </div>
      </div>

      <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Filters Row */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className="relative w-64">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              >
                <option value="My Projects">My Projects</option>
                <option value="All Projects">All Projects</option>
                <option value="Recent Projects">Recent Projects</option>
              </select>
            </div>
            <div className="relative w-48">
              <select
                value={selectedEnv}
                onChange={(e) => setSelectedEnv(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              >
                <option value="All Environments">All Environments</option>
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="Development">Development</option>
              </select>
            </div>
            <div className="relative w-32">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              >
                <option value="14d">14d</option>
                <option value="7d">7d</option>
                <option value="30d">30d</option>
              </select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <div className="flex items-center pl-10 pr-4 py-2 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-[#584774] focus-within:border-[#584774]">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-700">issue.category</span>
                    <span className="text-sm text-gray-600">browser tests</span>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Events
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                      <div className="text-sm text-gray-500">{issue.browserTestName}</div>
                      <div className="text-xs text-gray-400">{issue.testFile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.lastSeen}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-0.5">
                        {issue.trend.map((hasFailure, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-4 rounded-sm ${
                              hasFailure ? 'bg-gray-700' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.events}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.users}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.priority === 'high' ? '🔴' : issue.priority === 'medium' ? '🟠' : '🟢'} {issue.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.assignee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage; 