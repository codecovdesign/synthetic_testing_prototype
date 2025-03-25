import React, { useState } from 'react';
import { PlayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface ReplayData {
  id: string;
  name: string;
  status: 'success' | 'error';
  hasTest: boolean;
  testName?: string;
  reason?: string;
  isAutoCreated?: boolean;
}

const mockReplays: ReplayData[] = [
  {
    id: '1',
    name: '68.195.30.244',
    status: 'error',
    hasTest: true,
    testName: 'Confirmation Modal',
    isAutoCreated: true
  },
  {
    id: '2',
    name: '72.134.56.89',
    status: 'success',
    hasTest: false,
    reason: 'High activity and success rate',
    isAutoCreated: false
  },
  {
    id: '3',
    name: '192.168.1.105',
    status: 'success',
    hasTest: true,
    testName: 'User Settings Flow',
    isAutoCreated: true
  },
  {
    id: '4',
    name: '45.67.89.123',
    status: 'error',
    hasTest: false,
    reason: 'Area with common errors',
    isAutoCreated: false
  },
  {
    id: '5',
    name: '103.44.56.78',
    status: 'success',
    hasTest: true,
    testName: 'Account Settings',
    isAutoCreated: true
  },
  {
    id: '6',
    name: '156.78.90.234',
    status: 'error',
    hasTest: false,
    reason: 'High rage clicks detected',
    isAutoCreated: false
  },
  {
    id: '7',
    name: '91.234.12.45',
    status: 'success',
    hasTest: true,
    testName: 'Profile Settings',
    isAutoCreated: true
  },
  {
    id: '8',
    name: '172.16.45.89',
    status: 'success',
    hasTest: true,
    testName: 'Shipping Address Form',
    isAutoCreated: true
  },
  {
    id: '9',
    name: '10.0.12.167',
    status: 'success',
    hasTest: false,
    reason: 'Consistent successful checkout flow',
    isAutoCreated: false
  },
  {
    id: '10',
    name: '192.168.0.234',
    status: 'success',
    hasTest: true,
    testName: 'Profile Settings',
    isAutoCreated: true
  },
  {
    id: '11',
    name: '203.0.113.1',
    status: 'error',
    hasTest: true,
    testName: 'Payment Processing',
    isAutoCreated: true
  },
  {
    id: '12',
    name: '198.51.100.2',
    status: 'success',
    hasTest: false,
    reason: 'High user engagement',
    isAutoCreated: false
  },
  {
    id: '13',
    name: '192.0.2.3',
    status: 'success',
    hasTest: true,
    testName: 'Search Functionality',
    isAutoCreated: true
  },
  {
    id: '14',
    name: '203.0.113.4',
    status: 'error',
    hasTest: false,
    reason: 'Multiple dead clicks detected',
    isAutoCreated: false
  }
];

const ReplayTestingAside = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'auto' | 'suggested'>('auto');

  const autoCreatedReplays = mockReplays.filter(replay => replay.isAutoCreated);
  const suggestedReplays = mockReplays.filter(replay => !replay.isAutoCreated);

  const handleReplayClick = (id: string) => {
    navigate(`/session-replay/${id}`, { state: { replay: mockReplays.find(r => r.id === id) } });
  };

  const handleCreateTest = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Handle test creation logic here
    console.log('Create test for replay:', id);
  };

  const renderReplayItem = (replay: ReplayData) => (
    <div
      key={replay.id}
      onClick={() => handleReplayClick(replay.id)}
      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-b-0"
    >
      <div className="flex items-center space-x-3">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {replay.name}
          </div>
          {replay.testName && (
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${replay.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className={`text-xs ${replay.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {replay.testName}
              </div>
            </div>
          )}
          {replay.reason && (
            <div className="text-xs text-gray-500">{replay.reason}</div>
          )}
        </div>
      </div>
      {!replay.isAutoCreated && (
        <button
          onClick={(e) => handleCreateTest(e, replay.id)}
          className="px-2 py-1 text-xs font-medium text-white bg-[#584774] rounded hover:bg-[#6C5B8E]"
        >
          Create Test
        </button>
      )}
    </div>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Replay Testing</h2>
        <div className="mt-4 relative flex rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab('auto')}
            className={`relative flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-l-md ${
              activeTab === 'auto'
                ? 'bg-[#584774] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Auto-created
          </button>
          <button
            onClick={() => setActiveTab('suggested')}
            className={`relative flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-r-md ${
              activeTab === 'suggested'
                ? 'bg-[#584774] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Suggested
          </button>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-12rem)]">
        {activeTab === 'auto' ? (
          autoCreatedReplays.map(renderReplayItem)
        ) : (
          suggestedReplays.map(renderReplayItem)
        )}
      </div>
    </div>
  );
};

export default ReplayTestingAside; 