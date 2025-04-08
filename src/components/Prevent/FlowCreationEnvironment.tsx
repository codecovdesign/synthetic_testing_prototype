import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, XMarkIcon, ChevronDownIcon, StopIcon } from '@heroicons/react/24/solid';
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

const environments = [
  { id: '1', name: 'Production', url: 'https://app.example.com' },
  { id: '2', name: 'Staging', url: 'https://staging.example.com' }
];

const LoginForm = ({ className = '' }: { className?: string }) => (
  <div className={`w-full max-w-[2000px] bg-white shadow-lg rounded-lg ${className}`}>
    {/* Top Navigation Bar */}
    <div className="bg-[#131921] text-white rounded-t-lg">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-3xl font-bold text-white mr-12">amazon</div>
          <div className="flex items-center space-x-6 text-base">
            <span className="text-gray-300">Deliver to</span>
            <span className="font-medium">United States</span>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <button className="text-base hover:underline">Sign in</button>
          <button className="text-base hover:underline">Returns & Orders</button>
          <button className="text-base hover:underline">Cart</button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="px-12 py-12">
      <div className="max-w-xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-10">
          <h1 className="text-4xl font-medium mb-8">Sign in</h1>
          <form className="space-y-8">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                Email or mobile phone number
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-5 py-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-5 py-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-6 text-lg border border-transparent rounded-md shadow-sm font-medium text-white bg-[#FFD814] hover:bg-[#F7CA00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD814]"
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
  <div className={`w-full max-w-[2000px] bg-white shadow-lg rounded-lg ${className}`}>
    {/* Top Navigation Bar */}
    <div className="bg-[#131921] text-white rounded-t-lg">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-3xl font-bold text-white mr-12">amazon</div>
          <div className="flex items-center space-x-6 text-base">
            <span className="text-gray-300">Deliver to</span>
            <span className="font-medium">United States</span>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <button className="text-base hover:underline">Sign in</button>
          <button className="text-base hover:underline">Returns & Orders</button>
          <button className="text-base hover:underline">Cart</button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="px-12 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-10">
          <h1 className="text-3xl font-medium mb-10">Checkout</h1>
          <div className="space-y-10">
            {/* Shipping Address */}
            <div className="border-b border-gray-200 pb-10">
              <h2 className="text-2xl font-medium mb-8">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full px-5 py-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="block w-full px-5 py-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-b border-gray-200 pb-10">
              <h2 className="text-2xl font-medium mb-8">Payment Method</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    className="h-5 w-5 text-[#FF9900] focus:ring-[#FF9900] border-gray-300"
                  />
                  <label htmlFor="creditCard" className="ml-4 block text-lg font-medium text-gray-700">
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
  const [selectedEnv, setSelectedEnv] = useState(environments[0]); // Default to Production
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEnvDropdownOpen, setIsEnvDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isRecording, setIsRecording] = useState(false);

  const handleUrlSelect = (url: typeof mockUrls[0]) => {
    setIsLoading(true);
    setSelectedUrl(url);
    setIsDropdownOpen(false);
    
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

  const handleRecordClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsModalOpen(true);
    } else {
      setIsRecording(true);
    }
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
                {/* Environment Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsEnvDropdownOpen(!isEnvDropdownOpen)}
                    className="w-40 flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="text-left">{selectedEnv.name}</span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  {isEnvDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-40 bg-white shadow-lg rounded-md border border-gray-200">
                      <div className="max-h-60 overflow-y-auto">
                        {environments.map((env) => (
                          <button
                            key={env.id}
                            onClick={() => {
                              setSelectedEnv(env);
                              setIsEnvDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          >
                            <div className="font-medium">{env.name}</div>
                            <div className="text-xs text-gray-500 truncate">{env.url}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* URL Selector */}
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
                  onClick={handleRecordClick}
                  className={`px-4 py-2 flex items-center space-x-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500' 
                    : 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <StopIcon className="h-5 w-5" />
                      <span>Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-100"></span>
                      </span>
                      <span>Record Flow</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 bg-gray-50 p-4 overflow-auto">
              <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                <div className="min-h-[600px] bg-gray-100 rounded-lg relative overflow-y-auto">
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
                    </div>
                  ) : (
                    <div className="w-full py-8 px-4">
                      {selectedUrl.path === '/login' ? (
                        <LoginForm />
                      ) : selectedUrl.path === '/checkout' ? (
                        <CheckoutForm />
                      ) : (
                        <div className="text-gray-500">Select a URL to preview</div>
                      )}
                    </div>
                  )}
                </div>
                {isRecording && (
                  <div className="mt-4 text-gray-500 italic text-center">
                    Recording in progress...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  label={tab}
                  isActive={activeTab.toLowerCase() === tab.toLowerCase()}
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