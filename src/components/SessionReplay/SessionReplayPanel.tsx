import React, { useState } from 'react';
import { PlayIcon, ArrowTopRightOnSquareIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

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
  }
].map(replay => ({
  ...replay,
  status: replay.errors > 0 ? 'error' as const : 'success' as const
}));

type SortField = 'name' | 'os' | 'browser' | 'duration' | 'deadClicks' | 'rageClicks' | 'errors' | 'activity' | 'browserTest';
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

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReplays = [...mockReplays].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (sortField === 'browserTest') {
      // Sort by test status: failing tests first, then passing tests, then no tests
      if (a.hasTest && !b.hasTest) return -1 * direction;
      if (!a.hasTest && b.hasTest) return 1 * direction;
      if (a.hasTest && b.hasTest) {
        if (a.status === 'error' && b.status === 'success') return -1 * direction;
        if (a.status === 'success' && b.status === 'error') return 1 * direction;
      }
      return 0;
    }

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction;
    }
    return 0;
  });

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 ml-1" />
    );
  };

  const renderSortableHeader = (field: SortField, label: string) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {label}
        {renderSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {renderSortableHeader('name', 'Replay')}
              {renderSortableHeader('os', 'OS')}
              {renderSortableHeader('browser', 'Browser')}
              {renderSortableHeader('duration', 'Duration')}
              {renderSortableHeader('deadClicks', 'Dead Clicks')}
              {renderSortableHeader('rageClicks', 'Rage Clicks')}
              {renderSortableHeader('errors', 'Errors')}
              {renderSortableHeader('activity', 'Activity')}
              {renderSortableHeader('browserTest', 'Browser Test')}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedReplays.map((replay) => (
              <tr
                key={replay.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/session-replay/${replay.id}`, { state: { replay } })}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{replay.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{replay.os}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{replay.browser}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{replay.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{replay.deadClicks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{replay.rageClicks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{replay.errors}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActivityBars value={replay.activity} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {replay.hasTest ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${replay.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`text-sm ${replay.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          {replay.status === 'success' ? 'Passing' : 'Failing'}
                        </span>
                        {replay.testName && (
                          <span className="text-gray-500 ml-2">
                            {replay.testName}
                          </span>
                        )}
                      </div>
                      {replay.status === 'error' && replay.issueId && (
                        <div className="flex items-center gap-2 pl-4 text-xs">
                          <a href="#" className="text-blue-600 hover:text-blue-800">
                            {replay.issueId}
                          </a>
                          <span className="text-gray-400">|</span>
                          <a href="#" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                            <span role="img" aria-label="autofix" className="text-yellow-500">💡</span>
                            <span>autofix</span>
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle create test action
                      }}
                      className="text-gray-500 hover:text-gray-700 font-medium text-sm text-left"
                    >
                      Create as Test
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionReplayPanel; 