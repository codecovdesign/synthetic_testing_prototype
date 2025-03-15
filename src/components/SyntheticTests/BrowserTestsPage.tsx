import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface BrowserTest {
  id: string;
  name: string;
  status: 'passed' | 'failed';
  lastRun: string;
  duration: string;
  failureReason?: string;
  linkedPR: string;
  lastUpdated: string;
}

const mockTests: BrowserTest[] = [
  {
    id: '1',
    name: 'Fix Account Creation Flow',
    status: 'passed',
    lastRun: '2 min ago',
    duration: '5s',
    linkedPR: 'PR #456',
    lastUpdated: 'Today'
  },
  {
    id: '2',
    name: 'Checkout Flow',
    status: 'failed',
    lastRun: '5 min ago',
    duration: '7s',
    failureReason: '"Apply Discount" button missing',
    linkedPR: 'PR #1234',
    lastUpdated: 'Today'
  },
  {
    id: '3',
    name: 'Apply SAVE20 Discount',
    status: 'passed',
    lastRun: '5 min ago',
    duration: '4s',
    linkedPR: 'PR #1234',
    lastUpdated: 'Today'
  },
  {
    id: '4',
    name: 'Apply SAVE50 Discount',
    status: 'failed',
    lastRun: '2 days ago',
    duration: '6s',
    failureReason: 'Server timeout',
    linkedPR: 'PR #399',
    lastUpdated: '2 days ago'
  },
  {
    id: '5',
    name: 'Purchase Completion',
    status: 'passed',
    lastRun: '3 days ago',
    duration: '3s',
    linkedPR: 'PR #387',
    lastUpdated: '3 days ago'
  },
  {
    id: '6',
    name: 'Login Flow',
    status: 'passed',
    lastRun: '5 min ago',
    duration: '6s',
    linkedPR: 'PR #470',
    lastUpdated: 'Today'
  },
  {
    id: '7',
    name: 'User Profile Update',
    status: 'failed',
    lastRun: '15 min ago',
    duration: '8s',
    failureReason: 'Form validation error',
    linkedPR: 'PR #471',
    lastUpdated: 'Today'
  },
  {
    id: '8',
    name: 'Logout Process',
    status: 'passed',
    lastRun: '20 min ago',
    duration: '2s',
    linkedPR: 'PR #472',
    lastUpdated: 'Today'
  },
  {
    id: '9',
    name: 'Reset Password',
    status: 'passed',
    lastRun: '30 min ago',
    duration: '4s',
    linkedPR: 'PR #473',
    lastUpdated: 'Today'
  },
  {
    id: '10',
    name: 'Change Email Address',
    status: 'failed',
    lastRun: '45 min ago',
    duration: '6s',
    failureReason: 'API timeout',
    linkedPR: 'PR #474',
    lastUpdated: 'Today'
  },
  {
    id: '11',
    name: '2FA Login Flow',
    status: 'passed',
    lastRun: '1 hour ago',
    duration: '5s',
    linkedPR: 'PR #475',
    lastUpdated: 'Yesterday'
  },
  {
    id: '12',
    name: 'Add to Cart',
    status: 'failed',
    lastRun: '2 hours ago',
    duration: '7s',
    failureReason: 'UI button unresponsive',
    linkedPR: 'PR #476',
    lastUpdated: 'Yesterday'
  },
  {
    id: '13',
    name: 'Remove from Cart',
    status: 'passed',
    lastRun: '3 hours ago',
    duration: '3s',
    linkedPR: 'PR #477',
    lastUpdated: 'Yesterday'
  },
  {
    id: '14',
    name: 'Apply Membership Discount',
    status: 'passed',
    lastRun: '4 hours ago',
    duration: '4s',
    linkedPR: 'PR #478',
    lastUpdated: 'Yesterday'
  },
  {
    id: '15',
    name: 'Checkout with PayPal',
    status: 'failed',
    lastRun: '5 hours ago',
    duration: '9s',
    failureReason: 'Payment gateway error',
    linkedPR: 'PR #479',
    lastUpdated: 'Yesterday'
  },
  {
    id: '16',
    name: 'Guest Checkout',
    status: 'passed',
    lastRun: '6 hours ago',
    duration: '6s',
    linkedPR: 'PR #480',
    lastUpdated: 'Yesterday'
  },
  {
    id: '17',
    name: 'Order Confirmation Email',
    status: 'passed',
    lastRun: '7 hours ago',
    duration: '5s',
    linkedPR: 'PR #481',
    lastUpdated: '2 days ago'
  },
  {
    id: '18',
    name: 'Mobile Login Flow',
    status: 'failed',
    lastRun: '8 hours ago',
    duration: '6s',
    failureReason: 'CSS layout broken',
    linkedPR: 'PR #482',
    lastUpdated: '2 days ago'
  },
  {
    id: '19',
    name: 'Dark Mode Toggle',
    status: 'passed',
    lastRun: '9 hours ago',
    duration: '2s',
    linkedPR: 'PR #483',
    lastUpdated: '2 days ago'
  },
  {
    id: '20',
    name: 'Save Address in Profile',
    status: 'failed',
    lastRun: '10 hours ago',
    duration: '8s',
    failureReason: 'Database write issue',
    linkedPR: 'PR #484',
    lastUpdated: '2 days ago'
  }
];

interface SortConfig {
  key: keyof BrowserTest;
  direction: 'asc' | 'desc';
}

export default function BrowserTestsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'lastRun', direction: 'asc' });

  const handleSort = (key: keyof BrowserTest) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedTests = useMemo(() => {
    return mockTests
      .filter(test => {
        const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = String(a[sortConfig.key]);
        const bValue = String(b[sortConfig.key]);
        const direction = sortConfig.direction === 'asc' ? 1 : -1;
        return aValue < bValue ? -direction : direction;
      });
  }, [searchTerm, statusFilter, sortConfig]);

  const handleTestClick = (testId: string, testName: string) => {
    navigate(`/browser-tests/${testId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'passed' | 'failed')}
          >
            <option value="all">All Status</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Test Name', 'Status', 'Last Run', 'Duration', 'Failure Reason', 'Linked PR', 'Last Updated'].map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof BrowserTest)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      <div className="flex flex-col">
                        <ChevronUpIcon className="h-3 w-3" />
                        <ChevronDownIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedTests.map((test) => (
                <tr
                  key={test.id}
                  className="hover:bg-gray-50"
                >
                  <td 
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => handleTestClick(test.id, test.name)}
                  >
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      {test.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      test.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {test.status === 'passed' ? '✅ Passed' : '❌ Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.lastRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.failureReason || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link 
                      to={test.linkedPR === 'PR #1234' ? '/' : '/browser-tests'} 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {test.linkedPR}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 