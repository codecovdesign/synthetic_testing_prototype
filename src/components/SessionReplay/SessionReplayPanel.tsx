import React, { useState } from 'react';
import { PlayIcon, ArrowTopRightOnSquareIcon, ChevronUpIcon, ChevronDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import ReplayTestingAside from './ReplayTestingAside';

interface ReplayData {
  id: string;
  name: string;
  os: string;
  browser: string;
  duration: string;
  deadClicks: number;
  rageClicks: number;
  errors: number;
  activity: number;
  hasTest: boolean;
  status: 'success' | 'error';
  issueId?: string;
  issueTitle?: string;
  testName?: string;
}

const mockReplays: ReplayData[] = [
  {
    id: '1',
    name: '68.195.30.244',
    os: 'macOS 13.1',
    browser: 'Chrome 120',
    duration: '2m 45s',
    deadClicks: 3,
    rageClicks: 2,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'error',
    issueId: 'SYNT-123',
    issueTitle: 'Checkout flow fails on payment submission',
    testName: 'Confirmation Modal'
  },
  {
    id: '2',
    name: '72.134.56.89',
    os: 'Windows 11',
    browser: 'Firefox 123',
    duration: '1m 30s',
    deadClicks: 5,
    rageClicks: 4,
    errors: 2,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'success'
  },
  {
    id: '3',
    name: '192.168.1.105',
    os: 'iOS 17.2',
    browser: 'Safari 17',
    duration: '3m 15s',
    deadClicks: 1,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'User Settings Flow'
  },
  {
    id: '4',
    name: '45.67.89.123',
    os: 'Android 14',
    browser: 'Chrome Mobile 120',
    duration: '4m 10s',
    deadClicks: 2,
    rageClicks: 1,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'error'
  },
  {
    id: '5',
    name: '103.44.56.78',
    os: 'macOS 14.0',
    browser: 'Safari 17',
    duration: '1m 55s',
    deadClicks: 0,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'Account Settings'
  },
  {
    id: '6',
    name: '156.78.90.234',
    os: 'Windows 10',
    browser: 'Edge 120',
    duration: '2m 20s',
    deadClicks: 4,
    rageClicks: 3,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'error'
  },
  {
    id: '7',
    name: '91.234.12.45',
    os: 'Linux Ubuntu',
    browser: 'Firefox 123',
    duration: '1m 15s',
    deadClicks: 1,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'success'
  },
  {
    id: '8',
    name: '172.16.45.89',
    os: 'macOS 13.2',
    browser: 'Chrome 120',
    duration: '2m 50s',
    deadClicks: 2,
    rageClicks: 1,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    issueId: 'SYNT-456',
    issueTitle: 'Address validation fails for international addresses',
    testName: 'Shipping Address Form'
  },
  {
    id: '9',
    name: '10.0.12.167',
    os: 'Windows 11',
    browser: 'Chrome 120',
    duration: '1m 40s',
    deadClicks: 0,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'success'
  },
  {
    id: '10',
    name: '192.168.0.234',
    os: 'macOS 14.1',
    browser: 'Safari 17',
    duration: '2m 05s',
    deadClicks: 1,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'Profile Settings'
  },
  {
    id: '11',
    name: '203.0.113.1',
    os: 'Windows 11',
    browser: 'Chrome 120',
    duration: '3m 20s',
    deadClicks: 2,
    rageClicks: 1,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'error',
    issueId: 'SYNT-789',
    issueTitle: 'Payment processing timeout',
    testName: 'Payment Flow'
  },
  {
    id: '12',
    name: '198.51.100.2',
    os: 'macOS 14.0',
    browser: 'Safari 17',
    duration: '4m 15s',
    deadClicks: 0,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'success'
  },
  {
    id: '13',
    name: '192.0.2.3',
    os: 'Windows 10',
    browser: 'Edge 120',
    duration: '1m 55s',
    deadClicks: 1,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'Search Results'
  },
  {
    id: '14',
    name: '203.0.113.4',
    os: 'iOS 17.2',
    browser: 'Safari 17',
    duration: '2m 30s',
    deadClicks: 5,
    rageClicks: 3,
    errors: 2,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'error'
  },
  {
    id: '15',
    name: '198.51.100.5',
    os: 'Android 14',
    browser: 'Chrome Mobile 120',
    duration: '3m 45s',
    deadClicks: 0,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'Mobile Navigation'
  },
  {
    id: '16',
    name: '192.0.2.6',
    os: 'Linux Ubuntu',
    browser: 'Firefox 123',
    duration: '2m 10s',
    deadClicks: 2,
    rageClicks: 1,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'error'
  },
  {
    id: '17',
    name: '203.0.113.7',
    os: 'macOS 13.2',
    browser: 'Chrome 120',
    duration: '1m 40s',
    deadClicks: 0,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'User Preferences'
  },
  {
    id: '18',
    name: '198.51.100.8',
    os: 'Windows 11',
    browser: 'Edge 120',
    duration: '2m 55s',
    deadClicks: 3,
    rageClicks: 2,
    errors: 1,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'error'
  },
  {
    id: '19',
    name: '192.0.2.9',
    os: 'iOS 17.1',
    browser: 'Safari 17',
    duration: '3m 10s',
    deadClicks: 0,
    rageClicks: 0,
    errors: 0,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: true,
    status: 'success',
    testName: 'Mobile Checkout'
  },
  {
    id: '20',
    name: '203.0.113.10',
    os: 'Android 13',
    browser: 'Chrome Mobile 120',
    duration: '2m 25s',
    deadClicks: 4,
    rageClicks: 3,
    errors: 2,
    activity: Math.floor(Math.random() * 10) + 1,
    hasTest: false,
    status: 'error'
  }
].map(replay => ({
  ...replay,
  status: replay.errors > 0 ? 'error' as const : 'success' as const
}));

type SortField = 'name' | 'os' | 'browser' | 'duration' | 'deadClicks' | 'rageClicks' | 'errors' | 'activity' | 'hasTest' | 'status';
type SortDirection = 'asc' | 'desc';

const getActivityColor = (activity: string) => {
  switch (activity.toLowerCase()) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const ActivityBars = ({ value }: { value: number }) => {
  const bars = Array.from({ length: 10 }, (_, i) => (
    <div
      key={i}
      className={`w-0.5 h-3 mx-px ${i < value ? 'bg-purple-500' : 'bg-gray-200'}`}
    />
  ));

  return (
    <div className="flex items-end">
      {bars}
    </div>
  );
};

const SessionReplayPanel = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [testFilter, setTestFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReplays = [...mockReplays].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (sortField === 'hasTest') {
      return direction * (a.hasTest === b.hasTest ? 0 : a.hasTest ? 1 : -1);
    }

    if (typeof aValue === 'string') {
      return direction * (aValue.localeCompare(bValue as string));
    }

    return direction * ((aValue as number) - (bValue as number));
  });

  const renderSortableHeader = (label: string, field: SortField) => (
    <th
      scope="col"
      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer"
      onClick={() => handleSort(field)}
    >
      <div className="group inline-flex">
        {label}
        <span className="ml-2 flex-none rounded text-gray-400">
          {sortField === field ? (
            sortDirection === 'asc' ? (
              <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            )
          ) : (
            <ChevronUpIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          )}
        </span>
      </div>
    </th>
  );

  const filteredReplays = sortedReplays.filter(replay => {
    const statusMatch = statusFilter === 'all' || replay.status === statusFilter;
    const testMatch = testFilter === 'all' || (replay.hasTest ? 'hasTest' : 'noTest') === testFilter;
    const searchMatch = replay.name.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && testMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            {renderSortableHeader('Name', 'name')}
                            {renderSortableHeader('OS', 'os')}
                            {renderSortableHeader('Browser', 'browser')}
                            {renderSortableHeader('Duration', 'duration')}
                            {renderSortableHeader('Dead Clicks', 'deadClicks')}
                            {renderSortableHeader('Rage Clicks', 'rageClicks')}
                            {renderSortableHeader('Errors', 'errors')}
                            {renderSortableHeader('Activity', 'activity')}
                            {renderSortableHeader('Browser Test', 'hasTest')}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {filteredReplays.map((replay) => (
                            <tr
                              key={replay.id}
                              onClick={() => navigate(`/session-replay/${replay.id}`, { state: { replay } })}
                              className="hover:bg-gray-50 cursor-pointer"
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <div className="flex items-center">
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{replay.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.os}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.browser}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.duration}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.deadClicks}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.rageClicks}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.errors}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{replay.activity}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {replay.hasTest ? (
                                  <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${replay.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className={replay.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                                      {replay.testName}
                                    </span>
                                    {replay.issueId && (
                                      <a
                                        href={`/issues/${replay.issueId}`}
                                        className="ml-2 text-gray-400 hover:text-gray-500"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                      </a>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <span className="text-gray-500">No test</span>
                                  </div>
                                )}
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
          <ReplayTestingAside />
        </div>
      </div>
    </div>
  );
};

export default SessionReplayPanel; 