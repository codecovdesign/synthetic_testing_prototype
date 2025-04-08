import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import Breadcrumb from '../Layout/Breadcrumb';
import CreateAssertionModal from '../SessionReplay/CreateAssertionModal';
import FlowConfigurationModal from './FlowConfigurationModal';

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
  <div className={`w-full h-full bg-white ${className}`}>
    {/* Top Navigation Bar */}
    <div className="bg-[#131921] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white mr-8">amazon</div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-300">Deliver to</span>
            <span className="font-medium">United States</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm hover:underline">Sign in</button>
          <button className="text-sm hover:underline">Returns & Orders</button>
          <button className="text-sm hover:underline">Cart</button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="border border-gray-200 rounded-lg p-6">
          <h1 className="text-3xl font-medium mb-4">Sign in</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email or mobile phone number
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FFD814] hover:bg-[#F7CA00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD814]"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const CheckoutForm = ({ className = '' }: { className?: string }) => (
  <div className={`w-full h-full bg-white ${className}`}>
    {/* Top Navigation Bar */}
    <div className="bg-[#131921] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white mr-8">amazon</div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-300">Deliver to</span>
            <span className="font-medium">United States</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm hover:underline">Sign in</button>
          <button className="text-sm hover:underline">Returns & Orders</button>
          <button className="text-sm hover:underline">Cart</button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-6">
          <h1 className="text-2xl font-medium mb-6">Checkout</h1>
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter first name"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    className="h-4 w-4 text-[#FF9900] focus:ring-[#FF9900] border-gray-300"
                  />
                  <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit Card
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface FlowCreationEnvironmentProps {
  breadcrumbItems?: Array<{
    label: string;
    to?: string;
    state?: { activeTab: string };
  }>;
}

const mockUrls = [
  { id: '1', path: '/home', description: 'Home page' },
  { id: '2', path: '/dashboard', description: 'User dashboard' },
  { id: '3', path: '/checkout', description: 'Checkout process' },
  { id: '4', path: '/login', description: 'Login page' },
  { id: '5', path: '/search', description: 'Search page' }
];

const FlowCreationEnvironment: React.FC<FlowCreationEnvironmentProps> = ({ breadcrumbItems = [
  { label: 'Prevent', to: '/prevent' },
  { label: 'Flows', to: '/prevent', state: { activeTab: 'flows' } },
  { label: 'Create new flow from environment' }
] }) => {
  const navigate = useNavigate();
  const [selectedUrl, setSelectedUrl] = useState(mockUrls[3]); // Default to /login
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationIntervalRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      animationIntervalRef.current = window.setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    }

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const handleUrlSelect = (url: typeof mockUrls[0]) => {
    setIsLoading(true);
    setSelectedUrl(url);
    setIsDropdownOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCreateFlow = (data: any) => {
    console.log('Creating flow with data:', data);
    setIsModalOpen(false);
    navigate('/prevent', { state: { activeTab: 'flows' } });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  };

  const renderTabContent = () => {
    switch (activeTab.toLowerCase()) {
      case 'breadcrumbs':
        return (
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-900">00:00</span>
                <span className="text-sm text-gray-600">Page Load: {selectedUrl.path}</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <p className="text-sm text-gray-500">No data available for this tab.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-40">
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <button
            onClick={() => navigate('/prevent', { state: { activeTab: 'flows' } })}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-64 flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="text-left">{selectedUrl.path}</span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-200">
                      <div className="max-h-60 overflow-y-auto">
                        {mockUrls.map((url) => (
                          <button
                            key={url.id}
                            onClick={() => handleUrlSelect(url)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          >
                            <div className="font-medium">{url.path}</div>
                            <div className="text-sm text-gray-500">{url.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsConfigModalOpen(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Configure
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#584774] text-white rounded-md shadow-sm hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                >
                  Create Flow
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#584774]"></div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto">
                    {selectedUrl.path === '/login' ? (
                      <LoginForm className={isPlaying ? 'animate-fade-in' : ''} />
                    ) : selectedUrl.path === '/checkout' ? (
                      <CheckoutForm className={isPlaying ? 'animate-fade-in' : ''} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Select a URL to preview
                      </div>
                    )}
                  </div>
                  <div className="mt-4 bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handlePlayPause}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {isPlaying ? (
                            <PauseIcon className="h-6 w-6" />
                          ) : (
                            <PlayIcon className="h-6 w-6" />
                          )}
                        </button>
                        <div className="text-sm text-gray-600">
                          {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div
                      ref={progressBarRef}
                      onClick={handleProgressBarClick}
                      className="h-2 bg-gray-200 rounded-full cursor-pointer"
                    >
                      <div
                        className="h-full bg-[#584774] rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  label={tab}
                  isActive={activeTab === tab.toLowerCase()}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                />
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      <CreateAssertionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateFlow}
        initialData={{
          flowName: '',
          prompt: '',
          assertions: [],
          genericAssertions: []
        }}
      />
      <FlowConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
      />
    </div>
  );
};

export default FlowCreationEnvironment; 