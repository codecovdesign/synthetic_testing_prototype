import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import MouseCursor from '../MouseCursor';
import Breadcrumb from '../Layout/Breadcrumb';
import CreateAssertionModal from '../SessionReplay/CreateAssertionModal';
import { Menu } from '@headlessui/react';

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
    path: '/login',
  },
  {
    event: 'User Click',
    timestamp: '00:06',
    element: 'button[type="submit"]',
    html: '<button type="submit">Login</button>'
  },
  {
    event: 'Navigation',
    timestamp: '00:06',
    path: '/dashboard'
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

const LoginForm = ({ className = '' }: { className?: string }) => (
  <div className={`max-w-md mx-auto p-8 bg-white rounded-lg shadow ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
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
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
  </div>
);

const SuggestedFlowReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previewRef = useRef<HTMLDivElement>(null);

  const flowTitle = location.state?.flowTitle || 'Unknown Flow';

  useEffect(() => {
    document.title = `Review suggested flow: ${flowTitle}`;
  }, [flowTitle]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animateLogin);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleClose = () => {
    navigate('/prevent', { 
      state: { 
        activeTab: 'flows',
        fromSuggestedFlow: true 
      } 
    });
  };

  const handleCreateFlow = () => {
    setShowCreateFlowModal(true);
  };

  const handleFlowCreated = () => {
    setShowCreateFlowModal(false);
    navigate('/prevent', { 
      state: { 
        activeTab: 'flows',
        fromSuggestedFlow: true 
      } 
    });
  };

  const animateLogin = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 10000; // 10 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    setProgress(progress * 100);

    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      const submitButton = document.querySelector('button[type="submit"]');

      if (progress < 0.3) {
        if (emailInput) {
          const inputRect = emailInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          emailInput.value = 'john.doe@example.com'.slice(0, Math.floor(progress * 3.33 * 19));
          emailInput.focus();
        }
      } else if (progress < 0.6) {
        if (passwordInput) {
          const inputRect = passwordInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          passwordInput.value = '********'.slice(0, Math.floor((progress - 0.3) * 3.33 * 8));
          passwordInput.focus();
        }
      } else if (progress < 0.9) {
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
      animationRef.current = requestAnimationFrame(animateLogin);
    } else {
      setIsPlaying(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'breadcrumbs':
        return (
          <div className="bg-white p-4 rounded-b-lg border border-gray-200">
            <div className="space-y-2">
              {mockBreadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded">
                  <span className="text-sm text-gray-500 w-16">{crumb.timestamp}</span>
                  <span className="text-sm font-medium text-gray-900">{crumb.event}</span>
                  <span className="text-sm text-gray-600 flex-1">{crumb.path || crumb.element}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-4 rounded-b-lg border border-gray-200">
            <p className="text-gray-500">Content for {activeTab} tab</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <Breadcrumb items={[
              { label: 'Prevent', path: '/prevent' },
              { label: 'Flows', path: '/prevent' },
              { label: `Review suggested flow: ${flowTitle}`, path: '#' }
            ]} />
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateFlow}
                className="px-4 py-2 text-sm font-medium text-white bg-[#584774] rounded-md hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
              >
                Create Flow
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel (2/3 width) */}
          <div className="w-2/3 flex flex-col border-r border-gray-200">
            <div className="flex-1 p-6 overflow-auto">
              <div
                ref={previewRef}
                className="relative bg-gray-50 rounded-lg p-4 min-h-[400px]"
              >
                <LoginForm />
                {showCursor && (
                  <MouseCursor
                    x={cursorPosition.x}
                    y={cursorPosition.y}
                  />
                )}
              </div>
            </div>
            {/* Play panel */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSpeedChange(0.5)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      0.5x
                    </button>
                    <button
                      onClick={() => handleSpeedChange(1)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      1x
                    </button>
                    <button
                      onClick={() => handleSpeedChange(2)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      2x
                    </button>
                  </div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#584774] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right panel (1/3 width) */}
          <div className="w-1/3 flex flex-col">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-4 px-6">
                {tabs.map((tab) => (
                  <Tab
                    key={tab}
                    label={tab}
                    isActive={activeTab === tab.toLowerCase()}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  />
                ))}
              </nav>
            </div>
            <div className="flex-1 overflow-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {showCreateFlowModal && (
        <CreateAssertionModal
          isOpen={showCreateFlowModal}
          onClose={() => setShowCreateFlowModal(false)}
          onSubmit={(data) => {
            console.log('Creating flow with data:', data);
            handleFlowCreated();
          }}
          initialData={{
            flowName: flowTitle,
            prompt: '',
            assertions: [],
            genericAssertions: []
          }}
        />
      )}
    </div>
  );
};

export default SuggestedFlowReview; 