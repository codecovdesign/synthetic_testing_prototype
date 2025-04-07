import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockTests } from '../SyntheticTests/BrowserTestsPage';
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
  error: string;
  stack: string;
  url: string;
}

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Promo code SAVE50 not being applied to cart total',
    testFile: 'checkout.spec.ts',
    browserTestName: 'Apply SAVE50',
    lastSeen: '2h ago',
    age: '5d',
    trend: [true, false, true, true, false, false, true, false, false, true, false, false, true, false],
    events: 192,
    users: 43,
    priority: 'high',
    assignee: '@kelly',
    error: 'TypeError: Cannot read properties of undefined (reading \'applyPromoCode\')',
    stack: 'at applyPromoCode (checkout.js:45:12)\nat handlePromoCode (checkout.js:89:5)',
    url: 'https://example.com/checkout'
  },
  {
    id: '2',
    title: 'Promo code SAVE50 validation failing for expired codes',
    testFile: 'checkout.spec.ts',
    browserTestName: 'Apply SAVE50',
    lastSeen: '4h ago',
    age: '3d',
    trend: [false, true, false, true, true, false, true, false, true, false, true, false, false, true],
    events: 156,
    users: 28,
    priority: 'high',
    assignee: '@mike',
    error: 'ValidationError: Promo code has expired',
    stack: 'at validatePromoCode (validation.js:23:8)\nat handlePromoCode (checkout.js:89:5)',
    url: 'https://example.com/checkout'
  },
  {
    id: '3',
    title: 'Product not being added to cart after clicking add button',
    testFile: 'cart.spec.ts',
    browserTestName: 'Click adds product to cart',
    lastSeen: '1h ago',
    age: '2d',
    trend: [true, true, false, true, false, true, false, true, false, true, false, true, false, true],
    events: 245,
    users: 67,
    priority: 'high',
    assignee: '@sarah',
    error: 'AssertionError: Expected element to be visible: By(css selector, ".cart-item")',
    stack: 'at CartPage.addToCart (cart.js:23:8)\nat CartTest.clickAddToCart (cart.spec.ts:45:3)',
    url: 'https://example.com/cart'
  },
  {
    id: '4',
    title: 'Cart item count not updating after adding product',
    testFile: 'cart.spec.ts',
    browserTestName: 'Click adds product to cart',
    lastSeen: '3h ago',
    age: '1d',
    trend: [true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    events: 178,
    users: 45,
    priority: 'high',
    assignee: '@james',
    error: 'AssertionError: Expected cart count to be 1, but was 0',
    stack: 'at CartPage.verifyCartCount (cart.js:45:12)\nat CartTest.clickAddToCart (cart.spec.ts:45:3)',
    url: 'https://example.com/cart'
  },
  {
    id: '5',
    title: 'Cart item disappears after page refresh',
    testFile: 'cart.spec.ts',
    browserTestName: 'Click adds product to cart',
    lastSeen: '5h ago',
    age: '4d',
    trend: [false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    events: 189,
    users: 52,
    priority: 'high',
    assignee: '@emma',
    error: 'AssertionError: Cart is empty after page refresh',
    stack: 'at CartPage.verifyCartPersistence (cart.js:67:4)\nat CartTest.clickAddToCart (cart.spec.ts:45:3)',
    url: 'https://example.com/cart'
  },
  {
    id: '6',
    title: 'Checkout form validation failing for invalid email format',
    testFile: 'checkout.spec.ts',
    browserTestName: 'Checkout validation',
    lastSeen: '1h ago',
    age: '2d',
    trend: [true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    events: 167,
    users: 38,
    priority: 'high',
    assignee: '@david',
    error: 'ValidationError: Invalid email format',
    stack: 'at validateEmail (validation.js:12:4)\nat validateCheckoutForm (checkout.js:67:2)',
    url: 'https://example.com/checkout'
  },
  {
    id: '7',
    title: 'Checkout form not accepting valid credit card numbers',
    testFile: 'checkout.spec.ts',
    browserTestName: 'Checkout validation',
    lastSeen: '2h ago',
    age: '3d',
    trend: [false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    events: 145,
    users: 31,
    priority: 'high',
    assignee: '@lisa',
    error: 'ValidationError: Invalid credit card number',
    stack: 'at validateCreditCard (validation.js:45:8)\nat validateCheckoutForm (checkout.js:67:2)',
    url: 'https://example.com/checkout'
  }
];

const BrowserTestIssuesPage = () => {
  const { testId } = useParams();
  const test = mockTests.find(t => t.id === testId);
  const [selectedProject, setSelectedProject] = useState('My Projects');
  const [selectedEnv, setSelectedEnv] = useState('All Environments');
  const [dateRange, setDateRange] = useState('14d');
  const [searchQuery, setSearchQuery] = useState('browser tests');

  // Filter issues to only show those related to the current test
  const filteredIssues = mockIssues.filter(issue => 
    issue.browserTestName === test?.name || !test?.name
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Issues</h1>
        </div>
      </div>

      <div className="max-w-full py-6 px-4 sm:px-6 lg:px-8">
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
                    <span className="text-sm text-gray-600">browser tests: {test?.name || ''}</span>
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
                    Test File
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
                {filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                      <div className="text-sm text-gray-500">{issue.browserTestName}</div>
                      <div className="text-xs text-gray-400">{issue.testFile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.testFile}
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

export default BrowserTestIssuesPage; 