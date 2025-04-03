import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Issue {
  id: string;
  title: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  lastSeen: string;
  firstSeen: string;
  count: number;
  testFile: string;
  browserTestName: string;
  age: string;
  trend: boolean[];
  events: number;
  users: number;
  error: string;
  stack: string;
  url: string;
}

const mockAssertionIssues: Issue[] = [
  {
    id: 'ISSUE-123',
    title: 'Checkout Flow assertion failed: Promo code validation',
    status: 'Open',
    priority: 'high',
    assignee: 'John Doe',
    lastSeen: '2 hours ago',
    firstSeen: '2 days ago',
    count: 15,
    testFile: 'checkout.spec.ts',
    browserTestName: 'Apply SAVE50',
    age: '5d',
    trend: [true, false, true, true, false, false, true, false, false, true, false, false, true, false],
    events: 192,
    users: 43,
    error: 'TypeError: Cannot read properties of undefined (reading \'applyPromoCode\')',
    stack: 'at applyPromoCode (checkout.js:45:12)\nat handlePromoCode (checkout.js:89:5)',
    url: 'https://example.com/checkout'
  },
  {
    id: 'ISSUE-127',
    title: 'Checkout Flow assertion failed: Payment processing',
    status: 'Open',
    priority: 'high',
    assignee: 'Jane Smith',
    lastSeen: '1 day ago',
    firstSeen: '3 days ago',
    count: 8,
    testFile: 'checkout.spec.ts',
    browserTestName: 'Apply SAVE50',
    age: '3d',
    trend: [false, true, false, true, true, false, true, false, true, false, true, false, false, true],
    events: 156,
    users: 28,
    error: 'ValidationError: Promo code has expired',
    stack: 'at validatePromoCode (validation.js:23:8)\nat handlePromoCode (checkout.js:89:5)',
    url: 'https://example.com/checkout'
  }
];

const AssertionIssuesPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('issue.category replay-assertion: Checkout Flow');

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setIssues(mockAssertionIssues);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Issues</h1>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  New Issue
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter issues..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                Clear
              </button>
            </div>
          </div>

          {/* Issues Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Seen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : issues.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No issues found
                    </td>
                  </tr>
                ) : (
                  issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">I</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{issue.id}</div>
                            <div className="text-sm text-gray-500">{issue.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.priority === 'high' ? '🔴' : issue.priority === 'medium' ? '🟠' : '🟢'} {issue.priority}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.assignee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.lastSeen}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.firstSeen}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {issue.count}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssertionIssuesPage; 