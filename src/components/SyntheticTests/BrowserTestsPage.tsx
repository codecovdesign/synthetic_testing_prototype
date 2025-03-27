import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, ChevronDownIcon as ChevronDownIconSolid, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { subDays } from 'date-fns';
import TestResultsChart from './TestResultsChart';
import ConfigurationModal from './ConfigurationModal';
import CreateTestModal from './CreateTestModal';

interface Test {
  id: string;
  name: string;
  status: 'success' | 'error';
  environments: {
    name: string;
    status: 'success' | 'error';
  }[];
  url: string;
  lastRun: string;
  nextRun: string;
  linkedPR: string;
  lastUpdated: string;
}

const EnvironmentStatusBadge = ({ environment }: { environment: { name: string; status: 'success' | 'error' } }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${environment.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
    <span className="text-sm text-gray-600">{environment.name}</span>
  </div>
);

export const mockTests: Test[] = [
  {
    id: '1',
    name: 'Apply SAVE20',
    status: 'success',
    environments: [
      { name: 'Staging', status: 'success' },
      { name: 'Production', status: 'success' }
    ],
    url: '/checkout',
    lastRun: '2 minutes ago',
    nextRun: 'in 58 minutes',
    linkedPR: 'PR #1234',
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'Apply SAVE50',
    status: 'error',
    environments: [
      { name: 'Staging', status: 'error' },
      { name: 'Production', status: 'success' }
    ],
    url: '/checkout',
    lastRun: '5 minutes ago',
    nextRun: 'in 55 minutes',
    linkedPR: 'PR #1235',
    lastUpdated: '1 day ago'
  },
  {
    id: '3',
    name: 'Purchase Completion',
    status: 'success',
    environments: [
      { name: 'Staging', status: 'success' }
    ],
    url: '/checkout',
    lastRun: '10 minutes ago',
    nextRun: 'in 50 minutes',
    linkedPR: 'PR #1236',
    lastUpdated: '3 days ago'
  },
  {
    id: '4',
    name: 'Product grid renders correctly',
    status: 'success',
    environments: [
      { name: 'Production', status: 'success' }
    ],
    url: '/products',
    lastRun: '15 minutes ago',
    nextRun: 'in 45 minutes',
    linkedPR: 'PR #1237',
    lastUpdated: '1 week ago'
  },
  {
    id: '5',
    name: 'Click adds product to cart',
    status: 'success',
    environments: [
      { name: 'Staging', status: 'error' },
      { name: 'Production', status: 'error' }
    ],
    url: '/products',
    lastRun: '20 minutes ago',
    nextRun: 'in 40 minutes',
    linkedPR: 'PR #1238',
    lastUpdated: '2 weeks ago'
  },
  {
    id: '6',
    name: 'User login flow',
    status: 'success',
    environments: [
      { name: 'Staging', status: 'success' },
      { name: 'Production', status: 'success' }
    ],
    url: '/login',
    lastRun: '25 minutes ago',
    nextRun: 'in 35 minutes',
    linkedPR: 'PR #1239',
    lastUpdated: '1 month ago'
  },
  {
    id: '7',
    name: 'Checkout validation',
    status: 'error',
    environments: [
      { name: 'Staging', status: 'error' },
      { name: 'Production', status: 'error' }
    ],
    url: '/checkout',
    lastRun: '30 minutes ago',
    nextRun: 'in 30 minutes',
    linkedPR: 'PR #1240',
    lastUpdated: '2 months ago'
  },
  {
    id: '8',
    name: 'Product search functionality',
    status: 'success',
    environments: [
      { name: 'Staging', status: 'success' },
      { name: 'Production', status: 'success' }
    ],
    url: '/products',
    lastRun: '35 minutes ago',
    nextRun: 'in 25 minutes',
    linkedPR: 'PR #1241',
    lastUpdated: '3 months ago'
  },
  {
    id: '9',
    name: 'Cart persistence',
    status: 'success',
    environments: [
      { name: 'Staging', status: 'success' }
    ],
    url: '/cart',
    lastRun: '40 minutes ago',
    nextRun: 'in 20 minutes',
    linkedPR: 'PR #1242',
    lastUpdated: '4 months ago'
  },
  {
    id: '10',
    name: 'Order confirmation email',
    status: 'success',
    environments: [
      { name: 'Production', status: 'success' }
    ],
    url: '/checkout/confirmation',
    lastRun: '45 minutes ago',
    nextRun: 'in 15 minutes',
    linkedPR: 'PR #1243',
    lastUpdated: '5 months ago'
  }
];

interface SortConfig {
  key: keyof Test;
  direction: 'asc' | 'desc';
}

// Mock data for the chart
const mockDailyResults = Array.from({ length: 90 }, (_, i) => {
  const date = subDays(new Date(), 89 - i);
  return {
    date,
    passed: Math.floor(Math.random() * 20) + 10,
    failed: Math.floor(Math.random() * 5),
    skipped: Math.floor(Math.random() * 3),
    hasIssues: Math.random() > 0.7 // 30% chance of having issues
  };
});

const BrowserTestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'error'>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSessionReplayModalOpen, setIsSessionReplayModalOpen] = useState(false);
  const [isEnvironmentModalOpen, setIsEnvironmentModalOpen] = useState(false);

  // Calculate open issues count from failed tests
  const openIssuesCount = 8;

  const handleSort = (key: keyof Test) => {
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
        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sortConfig.key === 'status') {
          return sortConfig.direction === 'asc'
            ? (a.status === 'success' ? 1 : -1)
            : (a.status === 'success' ? -1 : 1);
        }
        if (sortConfig.key === 'lastRun') {
          return sortConfig.direction === 'asc'
            ? a.lastRun.localeCompare(b.lastRun)
            : b.lastRun.localeCompare(a.lastRun);
        }
        if (sortConfig.key === 'nextRun') {
          return sortConfig.direction === 'asc'
            ? a.nextRun.localeCompare(b.nextRun)
            : b.nextRun.localeCompare(a.nextRun);
        }
        return 0;
      });
  }, [searchTerm, statusFilter, sortConfig]);

  const handleTestClick = (testId: string, testName: string) => {
    navigate(`/browser-tests/${testId}`);
  };

  const toggleTestExpansion = (testId: string) => {
    setExpandedTests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testId)) {
        newSet.delete(testId);
      } else {
        newSet.add(testId);
      }
      return newSet;
    });
  };

  const handleCreateFromSessionReplay = () => {
    navigate('/session-replay');
  };

  const handleCreateFromEnvironment = () => {
    navigate('/browser-tests/create');
  };

  const statusOptions = [
    { value: 'all', label: 'All Tests' },
    { value: 'success', label: 'Passing' },
    { value: 'error', label: 'Failing' }
  ];

  return (
    <div className="p-6">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <TestResultsChart 
              openIssuesCount={openIssuesCount}
              dailyResults={mockDailyResults}
            />
            
            <div className="bg-white rounded-lg shadow">
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
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'success' | 'error')}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm rounded-md"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsConfigModalOpen(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                  >
                    Configuration
                  </button>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[#584774] hover:bg-[#473661] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]">
                      Create Test
                      <ChevronDownIconSolid className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleCreateFromSessionReplay}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                            >
                              From Existing Session Replay
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleCreateFromEnvironment}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                            >
                              From Environment
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-x-auto max-h-[calc(100vh-400px)]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {['Test Name', 'Status', 'Last Run', 'Linked PR', 'Last Updated'].map((header) => (
                          <th
                            key={header}
                            onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Test)}
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
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleTestClick(test.id, test.name)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{test.name}</div>
                            <div className="text-sm text-gray-500">{test.url}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {test.environments.map((env, index) => (
                                <React.Fragment key={env.name}>
                                  <EnvironmentStatusBadge environment={env} />
                                  {index < test.environments.length - 1 && <span className="text-gray-300">,</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {test.lastRun}
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
          </div>
        </div>
      </div>

      <ConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
      />
      <CreateTestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default BrowserTestsPage; 