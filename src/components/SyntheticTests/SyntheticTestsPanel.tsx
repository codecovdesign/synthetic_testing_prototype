import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, VideoCameraIcon, ArrowTopRightOnSquareIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TestResult {
  name: string;
  status: 'success' | 'error';
  details?: string;
  issueLink?: string;
  stackTrace?: string;
  isPlaying?: boolean;
}

interface SyntheticTestsPanelProps {
  onTestPlay: (testName: string) => void;
  currentTest?: string;
  currentPage?: string;
  onTestComplete: (testName: string) => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testName: string, environments: string[]) => void;
}

const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
  const [testName, setTestName] = useState('');
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleEnvironmentToggle = (env: string) => {
    setSelectedEnvironments(prev => 
      prev.includes(env) 
        ? prev.filter(e => e !== env)
        : [...prev, env]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">New Browser Test</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 space-y-4">
          <div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Environments
            </label>
            <div className="space-y-2">
              {['Staging', 'Production'].map((env) => (
                <label key={env} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedEnvironments.includes(env)}
                    onChange={() => handleEnvironmentToggle(env)}
                    className="h-4 w-4 text-[#584774] focus:ring-[#584774] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{env}</span>
                </label>
              ))}
            </div>
          </div>
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
              if (testName.trim() && selectedEnvironments.length > 0) {
                onSubmit(testName, selectedEnvironments);
                setTestName('');
                setSelectedEnvironments([]);
              }
            }}
            disabled={!testName.trim() || selectedEnvironments.length === 0}
            className="px-4 py-2 bg-[#584774] text-white rounded-md hover:bg-[#6C5B8E] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Record and Create
          </button>
        </div>
      </div>
    </div>
  );
};

const TestResult = ({ name, status, details, issueLink, stackTrace, isPlaying, onPlayToggle, isRecording }: TestResult & { onPlayToggle: () => void; isRecording?: boolean }) => (
  <div className="flex items-start justify-between py-3 px-4 border-b border-gray-200 last:border-b-0 relative">
    <div className="flex-1 min-w-0 pr-8">
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
              </div>
            )}
          </div>
          {details && <p className="text-sm text-gray-600 mt-1">{details}</p>}
          {stackTrace && (
            <div className="mt-2">
              <div className="text-sm text-gray-600 mb-1">Stack Trace:</div>
              <div className="max-h-32 overflow-y-auto w-[calc(100%-0.5rem)]">
                <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-200 whitespace-pre overflow-x-auto">
                  {stackTrace}
                </pre>
              </div>
            </div>
          )}
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">Recorded Events</summary>
            <div className="mt-2 pl-4 text-sm text-gray-600">
              {name === 'Apply SAVE20' && (
                <>
                  <p>• input#promo-code.value = "SAVE20"</p>
                  <p>• button#apply-promo.click()</p>
                  <p>• span#total-price.innerText = "$80"</p>
                  <p>• div#promo-confirmation.innerText = "Discount Applied!"</p>
                </>
              )}
              {name === 'Apply SAVE50' && (
                <>
                  <p className="text-red-600">• input#promo-code.value = "SAVE50" (Error: Redis connection timeout)</p>
                  <p className="text-red-600">• button#apply-promo.click() (Not executed)</p>
                  <p className="text-red-600">• span#total-price.innerText = "$100" (Not executed)</p>
                  <p className="text-red-600">• div#promo-error.innerText = "Invalid Promo Code" (Not executed)</p>
                </>
              )}
              {name === 'Purchase Completion' && (
                <>
                  <p>• User enters payment details</p>
                  <p>• Purchase completed</p>
                  <p>• Order confirmation shown</p>
                </>
              )}
            </div>
          </details>
        </>
      )}
    </div>
    <div className="flex-shrink-0">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlayToggle();
        }}
        className={`p-2 rounded-full ${
          isPlaying 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-[#584774] text-white hover:bg-[#6C5B8E]'
        }`}
      >
        {isPlaying ? (
          <StopIcon className="h-5 w-5" />
        ) : (
          <PlayIcon className="h-5 w-5" />
        )}
      </button>
    </div>
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
          { 
            name: 'Apply SAVE50', 
            status: 'error', 
            isPlaying: false,
            details: 'Redis connection timeout when fetching promo code data',
            issueLink: 'https://github.com/codecovdesign/synthetic_testing_prototype/issues/1234',
            stackTrace: `Error: Redis connection timeout after 5000ms
  at RedisClient.handleConnectionTimeout (app/lib/redis.ts:127:23)
  at PromoCodeService.validateCode (app/services/promo.ts:42:18)
  at async CheckoutController.applyPromo (app/controllers/checkout.ts:157:12)
  at async Promise.all (index 0)
  at async applyMiddleware (app/middleware/error.ts:12:3)`
          },
          { name: 'Purchase Completion', status: 'success', isPlaying: false }
        ];
      case 'products':
        return [
          { name: 'Product grid renders correctly', status: 'success', isPlaying: false },
          { name: 'Click adds product to cart', status: 'success', isPlaying: false },
          { name: 'Product image loads', status: 'success', isPlaying: false },
          { name: 'Product price displays', status: 'success', isPlaying: false }
        ];
      case 'cart':
        return [
          { name: 'Remove item from cart', status: 'success', isPlaying: false },
          { name: 'Update quantity', status: 'success', isPlaying: false },
          { name: 'Apply discount', status: 'success', isPlaying: false },
          { name: 'Calculate total', status: 'success', isPlaying: false }
        ];
      case 'account':
        return [
          { name: 'Edit profile fields', status: 'success', isPlaying: false },
          { name: 'Change password', status: 'success', isPlaying: false },
          { name: 'Validate email input', status: 'success', isPlaying: false },
          { name: 'Update subscription', status: 'success', isPlaying: false }
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
      // Only keep custom tests that were recorded on the current page
      const customTests = testResults.filter(test => 
        !defaultTests.some(defaultTest => defaultTest.name === test.name) &&
        test.name.includes(currentPage)
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
    // Add the current page to the test name to track which page it belongs to
    setRecordingTestName(`${testName} (${currentPage})`);
    
    // Add the new test with recording state
    setTestResults(prev => {
      const newTest: TestResult = {
        name: `${testName} (${currentPage})`,
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