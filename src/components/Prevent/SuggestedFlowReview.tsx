import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import MouseCursor from '../MouseCursor';
import Breadcrumb from '../Layout/Breadcrumb';
import CreateTestModal from '../SyntheticTests/CreateTestModal';
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
    id: '1',
    event: 'Web Vital: Cumulative Layout Shift',
    timestamp: '00:00',
    value: '0.25',
    label: 'Meh',
    details: '{\n2 items\n}',
    startTime: 0,
    endTime: 1
  },
  {
    id: '2',
    event: 'Web Vital: Interaction To Next Paint',
    timestamp: '00:01',
    value: '120.00ms',
    label: 'Good',
    details: '{\n1 item\n}',
    startTime: 1,
    endTime: 2
  },
  {
    id: '3',
    event: 'Web Vital: Largest Contentful Paint',
    timestamp: '00:01',
    value: '785.20ms',
    label: 'Good',
    details: '{\n1 item\n}',
    startTime: 1,
    endTime: 2
  },
  {
    id: '4',
    event: 'User Click',
    timestamp: '00:15',
    element: 'StyledMain > IssueListFilters > StyledPageFilterBar > CompactSelect > DropdownButton',
    html: `<button aria-disabled="false" type="button" aria-haspopup="true" aria-expanded="true" data-test-id="page-filter-project-selector" data-sentry-element="StyledButton" data-sentry-component="DropdownButton" data-sentry-source-file="index.tsx" class="en302zp1 app-1pttlw3 e140qn372 :hover" role="button" aria-controls="react-aria3635037120-«r12»"><span class="app-e95za5 e18pngx40" role="presentation"></span><span data-sentry-element="ButtonLabel" data-sentry-source-file="index.tsx" class="app-1x2krai e140qn371 :hover"><span class="app-ctg5a9 e140qn370"><!-- 1 descendents --></span><span data-sentry-element="TriggerLabelWrap" data-sentry-source-file="trigger.tsx" class="app-iokfu6 ej2c5n72 :hover"><!-- 1 descendents --></span><div class="app-1c8ckin en302zp2"><!-- 1 descendents --></div></span></button>`,
    startTime: 15,
    endTime: 16
  },
  {
    id: '5',
    event: 'Navigation',
    timestamp: '00:17',
    path: '/issues/?end=2025-04-25T07%3A55%3A00&project=[Filtered]&start=2025-04-17T12%3A56%3A00',
    startTime: 17,
    endTime: 18
  },
  {
    id: '6',
    event: 'User Click',
    timestamp: '00:19',
    element: 'StreamGroup > GroupSummary > EventOrGroupHeader > Title > getTitle',
    html: `<a data-issue-title-link="true" data-sentry-element="TitleWithLink" data-sentry-component="getTitle" data-sentry-source-file="eventOrGroupHeader.tsx" class="app-14km9ec e1c8ut032 :hover" href="https://demo.sentry.io/issues/6542349745/?project=4508968118321152&amp;query=is%3Aunresolved%20issue.priority%3A%5Bhigh%2C%20medium%5D&amp;referrer=issue-stream&amp;stream_index=0"><span class="app-35ezg3 e1c8ut030" data-sentry-component="EventOrGroupTitle" data-sentry-source-file="eventOrGroupTitle.tsx"><span data-testid="stacktrace-preview" data-sentry-component="StackTracePreview" data-sentry-source-file="stackTracePreview.tsx"><!-- 1 descendents --></span></span></a>`,
    startTime: 19,
    endTime: 20
  },
  {
    id: '7',
    event: 'Navigation',
    timestamp: '00:19',
    path: '/issues/6542349745/?project=[Filtered]&query=is%3Aunresolved%20issue.pri',
    startTime: 19,
    endTime: 20
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
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);

  const flowTitle = location.state?.flowTitle || 'Unknown Flow';

  useEffect(() => {
    document.title = `Review suggested flow: ${flowTitle}`;
  }, [flowTitle]);

  useEffect(() => {
    console.log('showCreateFlowModal state changed:', showCreateFlowModal);
  }, [showCreateFlowModal]);

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
    console.log('Create Flow button clicked');
    console.log('Current showCreateFlowModal state:', showCreateFlowModal);
    setShowCreateFlowModal(true);
    console.log('After setShowCreateFlowModal(true)');
  };

  const handleFlowCreated = () => {
    console.log('Flow created, closing modal'); // Debug log
    setShowCreateFlowModal(false);
    navigate('/prevent', { 
      state: { 
        activeTab: 'flows',
        fromSuggestedFlow: true 
      } 
    });
  };

  const handleStartTimeSelect = (time: number) => {
    setSelectedStartTime(time);
    if (selectedEndTime !== null && time > selectedEndTime) {
      setSelectedEndTime(null);
    }
  };

  const handleEndTimeSelect = (time: number) => {
    if (selectedStartTime === null || time >= selectedStartTime) {
      setSelectedEndTime(time);
    }
  };

  const handlePlayFromTime = (startTime: number, endTime: number) => {
    setIsPlaying(true);
    startTimeRef.current = undefined;
    // Convert seconds to milliseconds for animation
    const startTimeMs = startTime * 1000;
    const endTimeMs = endTime * 1000;
    const duration = endTimeMs - startTimeMs;
    
    // Reset progress to start at the selected time
    setProgress((startTime / 20) * 100); // Assuming total duration is 20 seconds
    
    // Start animation from the selected time
    const animateFromTime = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp - startTimeMs;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      setProgress(((startTime + (progress * (endTime - startTime))) / 20) * 100);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFromTime);
      } else {
        setIsPlaying(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateFromTime);
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
            <div className="space-y-4">
              {mockBreadcrumbs.map((crumb, index) => {
                const isInSelectedRange = selectedStartTime !== null && selectedEndTime !== null &&
                  crumb.startTime >= selectedStartTime && crumb.endTime <= selectedEndTime;
                const isStartOfRange = selectedStartTime === crumb.startTime;
                const isEndOfRange = selectedEndTime === crumb.endTime;

                return (
                  <div 
                    key={crumb.id} 
                    className={`p-3 rounded border ${
                      isInSelectedRange 
                        ? 'bg-[#584774]/5 border-[#584774]' 
                        : 'border-gray-100 bg-gray-50'
                    } ${
                      isStartOfRange ? 'border-t-2 border-t-[#584774]' : ''
                    } ${
                      isEndOfRange ? 'border-b-2 border-b-[#584774]' : ''
                    } ${
                      isInSelectedRange && !isStartOfRange && !isEndOfRange ? 'border-l-2 border-r-2 border-l-[#584774] border-r-[#584774]' : ''
                    } transition-colors duration-200`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${isInSelectedRange ? 'text-[#584774] font-medium' : 'text-gray-500'}`}>
                          {crumb.timestamp}
                        </span>
                        <span className={`text-xs font-semibold ${isInSelectedRange ? 'text-[#584774]' : 'text-gray-700'}`}>
                          {crumb.event}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStartTimeSelect(crumb.startTime)}
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            selectedStartTime === crumb.startTime
                              ? 'bg-[#584774] text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Start
                        </button>
                        <button
                          onClick={() => handleEndTimeSelect(crumb.endTime)}
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            selectedEndTime === crumb.endTime
                              ? 'bg-[#584774] text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                          disabled={selectedStartTime !== null && crumb.endTime <= selectedStartTime}
                        >
                          End
                        </button>
                        {selectedStartTime === crumb.startTime && selectedEndTime === crumb.endTime && (
                          <button
                            onClick={() => handlePlayFromTime(crumb.startTime, crumb.endTime)}
                            className="px-2 py-1 text-xs font-medium rounded bg-[#584774] text-white hover:bg-[#4a3c62]"
                          >
                            Play
                          </button>
                        )}
                      </div>
                    </div>
                    {crumb.value && crumb.label && (
                      <div className="mb-1 text-sm">
                        <span className={`font-mono px-2 py-0.5 rounded mr-2 ${
                          isInSelectedRange ? 'bg-[#584774]/10 text-[#584774]' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {crumb.value}
                        </span>
                        <span className={`text-xs ${isInSelectedRange ? 'text-[#584774]' : 'text-gray-600'}`}>
                          ({crumb.label})
                        </span>
                      </div>
                    )}
                    {crumb.details && (
                      <pre className={`rounded p-2 text-xs whitespace-pre-wrap ${
                        isInSelectedRange ? 'bg-[#584774]/10 text-[#584774]' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {crumb.details}
                      </pre>
                    )}
                    {crumb.element && (
                      <div className={`mb-1 text-xs font-mono ${
                        isInSelectedRange ? 'text-[#584774]' : 'text-gray-600'
                      }`}>
                        {crumb.element}
                      </div>
                    )}
                    {crumb.path && (
                      <div className={`mb-1 text-xs font-mono ${
                        isInSelectedRange ? 'text-[#584774]' : 'text-blue-700'
                      }`}>
                        {crumb.path}
                      </div>
                    )}
                    {crumb.html && (
                      <div className={`mt-1 border rounded p-2 overflow-x-auto text-xs ${
                        isInSelectedRange ? 'border-[#584774]/30 bg-[#584774]/5' : 'border-gray-200 bg-white'
                      }`} 
                      dangerouslySetInnerHTML={{ __html: crumb.html }} 
                      />
                    )}
                  </div>
                );
              })}
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
              { label: 'Prevent' },
              { label: 'Flows' },
              { label: `Review suggested flow: ${flowTitle}` }
            ]} />
            <div className="flex items-center space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Create Flow button clicked (inline)');
                  handleCreateFlow();
                }}
                disabled={selectedStartTime === null || selectedEndTime === null}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774] ${
                  selectedStartTime === null || selectedEndTime === null
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#584774] hover:bg-[#4a3c62]'
                }`}
              >
                Create Flow
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
                    position={cursorPosition}
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
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Why this flow was suggested:</p>
                <p>
                  This login flow demonstrates exceptional reliability with a 98.7% success rate across 2,345 sessions, 
                  completing in an average of 4.2 seconds (well below the 8-second benchmark). With a low error rate of 1.3% 
                  and consistent user behavior patterns, this high-traffic flow (500+ daily users) is an ideal candidate for automation.
                </p>
              </div>
            </div>
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

      <CreateTestModal
        isOpen={showCreateFlowModal}
        onClose={() => {
          console.log('Modal onClose called');
          setShowCreateFlowModal(false);
        }}
        onSubmit={(testName, environments, assertions) => {
          console.log('Modal onSubmit called with:', { testName, environments, assertions });
          handleFlowCreated();
        }}
        hideAssertions={true}
      />
    </div>
  );
};

export default SuggestedFlowReview; 