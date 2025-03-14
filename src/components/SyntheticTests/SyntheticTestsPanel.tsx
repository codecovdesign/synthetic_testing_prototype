import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, VideoCameraIcon, ArrowTopRightOnSquareIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TestResult {
  name: string;
  status: 'success' | 'error';
  details?: string;
  issueLink?: string;
  stackTraceLink?: string;
  isPlaying?: boolean;
}

interface SyntheticTestsPanelProps {
  onTestPlay: (testName: string) => void;
  currentTest?: string;
  currentPage?: string;
  onTestComplete: (testName: string) => void;
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
          <h3 className="text-lg font-semibold text-gray-900">New Browser Test</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-transparent"
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
                setTestName('');
              }
            }}
            disabled={!testName.trim()}
            className="px-4 py-2 bg-[#584774] text-white rounded-md hover:bg-[#6C5B8E] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Record and Create
          </button>
        </div>
      </div>
    </div>
  );
};

const TestResult = ({ name, status, details, issueLink, stackTraceLink, isPlaying, onPlayToggle, isRecording }: TestResult & { onPlayToggle: () => void; isRecording?: boolean }) => (
  <div className="flex items-start justify-between py-3 px-4 border-b border-gray-200 last:border-b-0">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">{isRecording ? 'Recording...' : name}</span>
      </div>
      {!isRecording && (
        <>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status === 'success' ? 'Passed' : 'Failed'}
            </span>
            {status === 'error' && (
              <div className="flex items-center gap-2">
                {issueLink && (
                  <a 
                    href={issueLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    <span>Related Issue</span>
                  </a>
                )}
                {stackTraceLink && (
                  <>
                    <span className="text-gray-300">•</span>
                    <a 
                      href={stackTraceLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                      <span>Stack Trace</span>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
          {details && <p className="text-sm text-gray-600 mt-1">{details}</p>}
        </>
      )}
    </div>
    <button
      onClick={onPlayToggle}
      className={`p-2 rounded-full ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-75`}
    >
      {isPlaying ? (
        <StopIcon className="h-5 w-5" />
      ) : (
        <PlayIcon className="h-5 w-5" />
      )}
    </button>
  </div>
);

const TestStep = ({ step, completed }: { step: string; completed: boolean }) => (
  <div className="flex items-center space-x-2 p-2">
    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${completed ? 'bg-green-500' : 'bg-gray-200'}`}>
      {completed && <CheckCircleIcon className="h-4 w-4 text-white" />}
    </div>
    <span className={`text-sm ${completed ? 'text-gray-700' : 'text-gray-500'}`}>{step}</span>
  </div>
);

const SyntheticTestsPanel: React.FC<SyntheticTestsPanelProps> = ({ currentPage = 'checkout', currentTest, onTestPlay, onTestComplete }) => {
  const getTestsForPage = (page: string = 'checkout'): TestResult[] => {
    switch (page) {
      case 'checkout':
        return [
          { name: 'Apply SAVE20', status: 'success', isPlaying: false },
          { name: 'Apply SAVE50', status: 'error', isPlaying: false },
          { name: 'Purchase Completion', status: 'success', isPlaying: false }
        ];
      case 'account':
        return [
          { name: 'Update Profile', status: 'success', isPlaying: false },
          { name: 'Delete Account', status: 'success', isPlaying: false },
          { name: 'Change Password', status: 'error', isPlaying: false }
        ];
      case 'orders':
        return [
          { name: 'View Order History', status: 'success', isPlaying: false },
          { name: 'Cancel Order', status: 'success', isPlaying: false },
          { name: 'Download Invoice', status: 'error', isPlaying: false }
        ];
      default:
        return [];
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>(getTestsForPage('checkout'));
  const [recordingTestName, setRecordingTestName] = useState('');

  // Update tests when page changes, but preserve recorded tests
  React.useEffect(() => {
    if (!isRecording) {
      const defaultTests = getTestsForPage(currentPage);
      const customTests = testResults.filter(test => 
        !defaultTests.some(defaultTest => defaultTest.name === test.name)
      );
      setTestResults([...defaultTests, ...customTests]);
    }
  }, [currentPage, isRecording]);

  const steps = [
    "Enter promo code 'SAVE20'",
    "Verify 20% discount applied",
    "Click Complete Purchase",
    "Test Created Successfully"
  ];

  const handleStartRecording = (testName: string) => {
    setShowModal(false);
    setIsRecording(true);
    setRecordingTestName(testName);
    
    // Add the new test with recording state
    setTestResults(prev => {
      const newTest: TestResult = {
        name: testName,
        status: 'success' as const,
        isPlaying: false
      };
      return [...prev, newTest];
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Update the recorded test with the final name and success status
    setTestResults(prev => {
      const newResults = [...prev];
      const lastTest = newResults[newResults.length - 1];
      if (lastTest) {
        lastTest.name = recordingTestName;
        lastTest.status = 'success';
        lastTest.isPlaying = false;
      }
      return newResults;
    });
    setRecordingTestName('');
  };

  const handlePlayToggle = (index: number) => {
    const test = testResults[index];
    if (!test.isPlaying) {
      onTestPlay(test.name);
    } else {
      onTestComplete(test.name);
    }
    setTestResults(prev => prev.map((test, i) => ({
      ...test,
      isPlaying: i === index ? !test.isPlaying : false
    })));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSubmit={handleStartRecording}
      />
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Browser Tests</h2>
      </div>
      <div className="flex-1 overflow-auto">
        {testResults.map((result, index) => (
          <TestResult
            key={result.name}
            {...result}
            isPlaying={currentTest === result.name}
            onPlayToggle={() => handlePlayToggle(index)}
            isRecording={isRecording && index === testResults.length - 1}
          />
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => isRecording ? handleStopRecording() : setShowModal(true)}
          className={`flex items-center space-x-2 px-4 py-2 ${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-[#584774] hover:bg-[#6C5B8E]'
          } text-white rounded-md transition-colors w-full justify-center`}
        >
          <VideoCameraIcon className="h-5 w-5" />
          <span>{isRecording ? 'Stop Recording' : 'Record New Test'}</span>
        </button>
      </div>
    </div>
  );
};

export default SyntheticTestsPanel; 