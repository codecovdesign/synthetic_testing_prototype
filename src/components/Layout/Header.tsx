import React, { useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { GitHubIcon } from '../../components/Icons';
import Breadcrumb from './Breadcrumb';

interface HeaderProps {
  isSessionReplay?: boolean;
  testCreated?: boolean;
  onCreateTest?: (testName: string) => void;
  replayName?: string;
  testName?: string;
  testStatus?: 'success' | 'error';
}

const Modal = ({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSubmit: (testName: string) => void;
}) => {
  const [testName, setTestName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create Browser Test</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="text-xl">×</span>
          </button>
        </div>
        <div className="mb-6">
          <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-2">
            Test Name
          </label>
          <input
            type="text"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter test name"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (testName.trim()) {
                onSubmit(testName);
                onClose();
              }
            }}
            disabled={!testName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Test
          </button>
        </div>
      </div>
    </div>
  );
};

const mockReplays = {
  '1': '68.195.30.244',
  '2': '72.134.56.89',
  '3': '192.168.1.105',
  '4': '45.67.89.123',
  '5': '103.44.56.78',
  '6': '156.78.90.234',
  '7': '91.234.12.45',
  '8': '172.16.45.89',
  '9': '10.0.12.167',
  '10': '192.168.0.234'
};

const Header: React.FC<HeaderProps> = ({ 
  isSessionReplay, 
  testCreated, 
  onCreateTest,
  replayName,
  testName,
  testStatus 
}) => {
  const location = useLocation();
  const { id } = useParams();
  const isDetailView = location.pathname.includes('/session-replay/') && id && !location.pathname.includes('/selectors');
  const [showModal, setShowModal] = useState(false);

  const getReplayName = (id: string) => {
    return mockReplays[id as keyof typeof mockReplays] || 'Unknown Replay';
  };

  const handleCreateTest = (testName: string) => {
    if (onCreateTest) {
      onCreateTest(testName);
    }
    setShowModal(false);
  };

  const prTitle = "Fix Account Creation Flow";
  const prNumber = "1234";
  const prUrl = `/pull/${prNumber}`;

  if (isSessionReplay) {
    if (isDetailView) {
      return (
        <>
          <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: 'Session Replay', to: '/session-replay' },
                { label: replayName || 'Unknown Replay' },
              ]}
            />
            {testCreated ? (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${testStatus === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className={`text-sm ${testStatus === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                  {testStatus === 'error' ? 'Failing' : 'Passing'}
                </span>
                {testName && (
                  <span className="text-gray-500 ml-2">
                    {testName}
                  </span>
                )}
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setShowModal(true)}
              >
                Create as Test
              </button>
            )}
          </header>
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center">
            <div className="flex items-center flex-1 max-w-3xl mx-auto">
              <svg className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-sm text-gray-600">turing-corp.com/accountcreation</span>
            </div>
          </div>
          <Modal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleCreateTest}
          />
        </>
      );
    }
    return (
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Session Replay
        </h1>
      </header>
    );
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <Breadcrumb
        items={[
          { label: 'Browser Tests', to: '/browser-tests' },
          { label: prTitle }
        ]}
      />
      <Link 
        to={`/pr/${prNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <GitHubIcon className="h-5 w-5" />
        <span>View PR-{prNumber}</span>
      </Link>
    </header>
  );
};

export default Header; 