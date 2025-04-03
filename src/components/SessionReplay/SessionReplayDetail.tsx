import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Header from '../Layout/Header';
import Navbar from '../Layout/Navbar';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, XMarkIcon } from '@heroicons/react/24/solid';
import MouseCursor from '../MouseCursor';
import Breadcrumb from '../Layout/Breadcrumb';
import CreateAssertionModal from './CreateAssertionModal';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
      isActive
        ? 'bg-white text-[#584774] border-t border-l border-r border-gray-200'
        : 'text-gray-600 hover:text-gray-800'
    }`}
  >
    {label}
  </button>
);

const mockBreadcrumbs = [
  {
    event: 'Page Load',
    timestamp: '00:00',
    path: '/account/%5Bgh/gl/bb%5D/%5Borg_name%5D/yaml',
  },
  {
    event: 'User Click',
    timestamp: '00:06',
    element: 'a..font-sans.cursor-pointer.hover:underline.focus:ring-2.font-semibold.text-ds-gray-senary.dark:text-ds-default-text.inline-flex.items-center.gap-1',
    html: '<a class="font-sans cursor-pointer hover:underline focus:ring-2 font-semibold text-ds-gray-senary dark:text-ds-default-text inline-flex items-center gap-1" data-cy="login" data-marketing="login" data-testid="login-link" href="https://app.codecov.io/login">*****</a>'
  },
  {
    event: 'Navigation',
    timestamp: '00:06',
    path: '/login'
  },
  {
    event: 'Page Load',
    timestamp: '00:21',
    path: '/gh'
  },
  {
    event: 'User Click',
    timestamp: '00:30',
    element: 'div#pendo-row-e92e9f32._pendo-row > div.pendo-mock-flexbox-row > div.pendo-mock-flexbox-element > button#pendo-button-6f056f8c.bb-button._pendo-button-primaryButton._pendo-button',
    html: '<button role="link" id="pendo-button-6f056f8c" class="bb-button _pendo-button-primaryButton _pendo-button" data-_pendo-button-primarybutton-1="" data-_pendo-button-1="" style="display: block; color: rgb(255, 255, 255); font-weight: 400; letter-spacing: 0px; line-height: 1; position: relative; text-align: center; text-transform: none; min-width: 0px; background-color: rgb(0, 113, 194); background-image: none; border-radius: 5px; font-family: &quot;Arial Black&quot;; font-size: 14px; padding: 11px 16px; white-space: pre-wrap; margin: 10px 0px 0px; width: auto; overflow-wrap: break-word; border: 0px solid rgb(42, 44, 53); float: none; vertical-align: baseline;">*** *** ****</button>'
  },
  {
    event: 'User Click',
    timestamp: '00:41',
    element: 'div#pendo-g-k2KhKxPUhfB0jfrRH4lI3-LUODo._pendo-step-container-size > div#pendo-guide-container._pendo-step-container-styles > button#pendo-close-guide-60bdf475._pendo-close-guide[aria-label="Close"]',
    html: '<button aria-label="Close" id="pendo-close-guide-60bdf475" class="_pendo-close-guide" style="min-width: 0px; line-height: 1; padding: 0px; margin: 0px; background-color: rgba(255, 255, 255, 0); background-image: none; border-radius: 0px; color: rgb(154, 156, 165); font-family: Helvetica; font-size: 32px; font-weight: 100; left: auto; position: absolute !important; right: 15px; top: 6px; z-index: 20; border: 0px; float: none; vertical-align: baseline; white-space: pre-wrap;">*</button>'
  },
  {
    event: 'User Click',
    timestamp: '00:43',
    element: 'div.my-6.flex.flex-col.gap-2 > div.mt-4.flex.gap-2 > input#marketingConsent[aria-label="sign up for marketing emails"][type="checkbox"][name="marketingConsent"]',
    html: '<input name="marketingConsent" type="checkbox" id="marketingConsent" aria-label="sign up for marketing emails">'
  },
  {
    event: 'User Click',
    timestamp: '00:47',
    element: 'div.mt-4.border-y.border-ds-gray-tertiary > div.my-6.flex.flex-col.gap-2 > div.flex.gap-2 > input#tos[aria-label="I accept the terms of service and privacy policy"][type="checkbox"][name="tos"]',
    html: '<input name="tos" type="checkbox" id="tos" aria-label="I accept the terms of service">'
  }
];

const tabs = [
  'Breadcrumbs',
  'Console',
  'Network',
  'DOM Events',
  'Performance',
  'Memory',
  'Storage',
  'Cookies',
  'Issues',
  'Sources',
  'Elements'
];

const SignupForm = ({ className = '' }: { className?: string }) => (
  <div className={`max-w-md mx-auto p-8 bg-white rounded-lg shadow ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Create a password"
        />
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex items-start">
          <input
            id="marketingConsent"
            name="marketingConsent"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="marketingConsent" className="ml-2 block text-sm text-gray-700">
            I want to receive marketing emails
          </label>
        </div>
        <div className="flex items-start">
          <input
            id="tos"
            name="tos"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="tos" className="ml-2 block text-sm text-gray-700">
            I accept the terms of service and privacy policy
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign up
      </button>
    </form>
  </div>
);

const ShippingForm = ({ className = '' }: { className?: string }) => (
  <div className={`max-w-2xl mx-auto p-8 bg-white rounded-lg shadow ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
          Apartment, suite, etc. (optional)
        </label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State / Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP / Postal Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          id="country"
          name="country"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Address
      </button>
    </form>
  </div>
);

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testName: string, environments: string[]) => void;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ isOpen, onClose, onSubmit }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create Test</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
              Test Name
            </label>
            <input
              type="text"
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#584774] focus:border-[#584774]"
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
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (testName.trim() && selectedEnvironments.length > 0) {
                  onSubmit(testName, selectedEnvironments);
                  setTestName('');
                  setSelectedEnvironments([]);
                  onClose();
                }
              }}
              disabled={!testName.trim() || selectedEnvironments.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-[#584774] rounded-md hover:bg-[#4a3d63] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SessionReplayDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const replay = location.state?.replay;
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [testCreated, setTestCreated] = useState(replay?.hasTest || false);
  const [url, setUrl] = useState('turing-corp.com/accountcreation');
  const [showModal, setShowModal] = useState(false);
  const [showAssertionModal, setShowAssertionModal] = useState(false);
  const [testName, setTestName] = useState('');
  const [assertion, setAssertion] = useState<{ flowName: string; prompt: string; conditionType: string; conditionValue: string } | null>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `Session Replay - ${replay?.name || 'Unknown Replay'}`;
  }, [replay]);

  useEffect(() => {
    // Set the URL based on the replay ID
    if (id === '8') {
      setUrl('turing-corp.com/shippingsubmission');
    } else {
      setUrl('turing-corp.com/accountcreation');
    }
  }, [id]);

  const resetForm = () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const marketingCheckbox = document.getElementById('marketingConsent') as HTMLInputElement;
    const tosCheckbox = document.getElementById('tos') as HTMLInputElement;
    
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (marketingCheckbox) marketingCheckbox.checked = false;
    if (tosCheckbox) tosCheckbox.checked = false;
  };

  const animateSignup = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 10000; // 10 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    setProgress(progress * 100);

    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      const emailInput = document.getElementById('email') as HTMLInputElement | null;
      const passwordInput = document.getElementById('password') as HTMLInputElement | null;
      const marketingCheckbox = document.getElementById('marketingConsent') as HTMLInputElement | null;
      const tosCheckbox = document.getElementById('tos') as HTMLInputElement | null;
      const submitButton = document.querySelector('button[type="submit"]');

      // Animation sequence
      if (progress < 0.2) {
        // Move to email input
        if (emailInput) {
          const inputRect = emailInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          emailInput.value = 'user@example.com'.slice(0, Math.floor(progress * 5 * 14));
          emailInput.focus();
        }
      } else if (progress < 0.4) {
        // Move to password input
        if (passwordInput) {
          const inputRect = passwordInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          passwordInput.value = '••••••••'.slice(0, Math.floor((progress - 0.2) * 5 * 8));
          passwordInput.focus();
        }
      } else if (progress < 0.6) {
        // Move to marketing checkbox
        if (marketingCheckbox) {
          const checkboxRect = marketingCheckbox.getBoundingClientRect();
          setCursorPosition({
            x: checkboxRect.left - rect.left + 10,
            y: checkboxRect.top - rect.top + 10
          });
          if (progress > 0.5) marketingCheckbox.checked = true;
        }
      } else if (progress < 0.8) {
        // Move to TOS checkbox
        if (tosCheckbox) {
          const checkboxRect = tosCheckbox.getBoundingClientRect();
          setCursorPosition({
            x: checkboxRect.left - rect.left + 10,
            y: checkboxRect.top - rect.top + 10
          });
          if (progress > 0.7) tosCheckbox.checked = true;
        }
      } else if (progress < 1) {
        // Move to submit button
        if (submitButton) {
          const buttonRect = submitButton.getBoundingClientRect();
          setCursorPosition({
            x: buttonRect.left - rect.left + buttonRect.width / 2,
            y: buttonRect.top - rect.top + buttonRect.height / 2
          });
        }
      }
    }

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateSignup);
    } else {
      setIsPlaying(false);
      setShowCursor(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setShowCursor(true);
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animateSignup);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setShowCursor(false);
      resetForm();
      setProgress(0);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleCreateTest = (testName: string, environments: string[]) => {
    console.log('Creating test:', testName, 'with environments:', environments);
    setTestCreated(true);
    setTestName(testName);
  };

  const handleCreateAssertion = (flowName: string, prompt: string, conditionType: string, conditionValue: string) => {
    setAssertion({ flowName, prompt, conditionType, conditionValue });
  };

  const renderTabContent = () => {
    const lowercaseActiveTab = activeTab.toLowerCase();
    switch (lowercaseActiveTab) {
      case 'breadcrumbs':
        return (
          <div className="divide-y divide-gray-100">
            {mockBreadcrumbs.map((crumb, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="font-medium text-gray-900">{crumb.event}</div>
                <div className="mt-1 text-sm text-gray-500">{crumb.timestamp}</div>
                {crumb.path && (
                  <div className="mt-1 text-sm text-gray-900 font-mono break-all">
                    {crumb.path}
                  </div>
                )}
                {crumb.element && (
                  <div className="mt-1 text-sm text-gray-900 font-mono break-all">
                    {crumb.element}
                  </div>
                )}
                {crumb.html && (
                  <div className="mt-2 text-xs text-gray-600 font-mono break-all bg-gray-50 p-2 rounded">
                    {crumb.html}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'console':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No console logs recorded</div>
          </div>
        );
      case 'network':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No network activity recorded</div>
          </div>
        );
      case 'dom events':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No DOM events recorded</div>
          </div>
        );
      case 'performance':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No performance data available</div>
          </div>
        );
      case 'memory':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No memory data available</div>
          </div>
        );
      case 'storage':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No storage activity recorded</div>
          </div>
        );
      case 'cookies':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No cookie changes recorded</div>
          </div>
        );
      case 'issues':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No issues detected</div>
          </div>
        );
      case 'sources':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No source files available</div>
          </div>
        );
      case 'elements':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No element changes recorded</div>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No data available</div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-16 flex-shrink-0 fixed left-0 top-0 h-full bg-white z-50 border-r border-gray-200">
        <Navbar />
      </div>
      <div className="flex-1 ml-16">
        <div className="sticky top-0 bg-white z-40">
          <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: 'Session Replay', to: '/session-replay' },
                { label: replay?.name || 'Unknown Replay' },
              ]}
            />
            <div className="flex items-center gap-3">
              {assertion ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-600">Passed</span>
                  <span className="text-gray-900">{assertion.flowName}</span>
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => setShowAssertionModal(true)}
                >
                  Create Assertion
                </button>
              )}
              {testCreated ? (
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${replay?.status === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className={`text-sm font-medium ${replay?.status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                      {replay?.status === 'error' ? 'Failing' : 'Passing'}
                    </span>
                    {testName && (
                      <span className="text-gray-900">
                        {testName}
                      </span>
                    )}
                  </div>
                  {replay?.status === 'error' && (
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <a href="#" className="text-gray-600 hover:text-gray-900">View Issue</a>
                      <button className="text-blue-600 hover:text-blue-800">Autofix</button>
                    </div>
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
            </div>
          </header>
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center">
            <div className="flex items-center flex-1 max-w-3xl mx-auto">
              <svg className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              />
            </div>
          </div>
        </div>
        <main className="flex bg-gray-50 h-[calc(100vh-64px)] gap-4 p-4">
          {/* Main Preview Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
              {/* Preview Area */}
              <div className="flex-1 p-6 relative" ref={previewRef}>
                {id === '8' ? (
                  <ShippingForm className="mt-0" />
                ) : (
                  <SignupForm className="mt-0" />
                )}
                {showCursor && (
                  <MouseCursor
                    position={cursorPosition}
                    className="absolute pointer-events-none"
                  />
                )}
              </div>
              
              {/* Playback Controls */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-5 w-5 text-gray-600" />
                    ) : (
                      <PlayIcon className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  
                  {/* Timeline */}
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-[#584774] rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Speed Controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Speed:</span>
                    {[0.5, 1, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-1 text-sm rounded ${
                          playbackSpeed === speed
                            ? 'bg-[#584774] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="w-[600px]">
            <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
              {/* Tabs */}
              <div className="border-b border-gray-200 overflow-x-auto">
                <div className="px-4 flex space-x-8 min-w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`py-4 px-1 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.toLowerCase()
                          ? 'border-[#584774] text-[#584774] border-b-2'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateTestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateTest}
      />
      <CreateAssertionModal
        isOpen={showAssertionModal}
        onClose={() => setShowAssertionModal(false)}
        onSubmit={handleCreateAssertion}
      />
    </div>
  );
};

export default SessionReplayDetail; 