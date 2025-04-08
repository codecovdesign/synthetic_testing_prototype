import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Breadcrumb from '../Layout/Breadcrumb';
import { Menu } from '@headlessui/react';
import CreateAssertionModal, { Assertion } from '../SessionReplay/CreateAssertionModal';

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
          <div className="mt-4 text-sm text-gray-500">
            By continuing, you agree to Amazon's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">New to Amazon?</span>
              <button className="ml-1 text-sm text-blue-600 hover:underline">Create your Amazon account</button>
            </div>
          </div>
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
                <div className="col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    placeholder="Enter ZIP code"
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                      placeholder="Enter card number"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                      placeholder="MM/YY"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items (3)</span>
                  <span className="font-medium">$299.97</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$24.00</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">$323.97</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FFD814] hover:bg-[#F7CA00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD814]"
            >
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface Replay {
  id: string;
  name: string;
  timestamp: string;
  user: string;
  location: string;
  description?: string;
}

const mockReplays: Replay[] = [
  { id: '1', name: 'Session #324: Login from mobile', timestamp: '2024-03-15 10:30:45', user: 'John Doe', location: 'San Francisco, CA' },
  { id: '2', name: 'Session #182: Checkout attempt', timestamp: '2024-03-15 11:15:22', user: 'Jane Smith', location: 'New York, NY' },
  { id: '3', name: 'Session #407: Profile update', timestamp: '2024-03-15 12:45:10', user: 'Bob Johnson', location: 'Chicago, IL' },
  { id: '4', name: 'Session #91: Password reset flow', timestamp: '2024-03-15 14:20:33', user: 'Alice Brown', location: 'Austin, TX' },
  { id: '5', name: 'Session #215: Cart abandoned after payment error', timestamp: '2024-03-15 15:05:18', user: 'Charlie Wilson', location: 'Seattle, WA' },
];

const suggestedReplays: Replay[] = [
  { 
    id: 's1', 
    name: '/login → /dashboard', 
    description: 'High success rate with consistent pattern',
    timestamp: '2024-03-15 09:15:30',
    user: 'System',
    location: 'Auto-detected'
  },
  { 
    id: 's2', 
    name: 'Replay #124', 
    description: 'Multiple payment validation failures',
    timestamp: '2024-03-15 10:45:22',
    user: 'System',
    location: 'Auto-detected'
  },
  { 
    id: 's3', 
    name: '/search page interaction', 
    description: 'High engagement with filters',
    timestamp: '2024-03-15 11:30:15',
    user: 'System',
    location: 'Auto-detected'
  },
  { 
    id: 's4', 
    name: '203.0.113.5 session', 
    description: 'Rage clicks detected during checkout',
    timestamp: '2024-03-15 13:20:45',
    user: 'System',
    location: 'Auto-detected'
  },
  { 
    id: 's5', 
    name: 'Replay #217', 
    description: '/settings form — Long time spent on profile fields',
    timestamp: '2024-03-15 14:05:18',
    user: 'System',
    location: 'Auto-detected'
  },
  { 
    id: 's6', 
    name: 'Replay #112', 
    description: 'Common mobile nav interaction pattern',
    timestamp: '2024-03-15 15:40:33',
    user: 'System',
    location: 'Auto-detected'
  },
  { 
    id: 's7', 
    name: '/reset-password', 
    description: 'High error rate on validation',
    timestamp: '2024-03-15 16:25:10',
    user: 'System',
    location: 'Auto-detected'
  }
];

const FlowCreationReplay: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedReplay, setSelectedReplay] = useState<Replay>(mockReplays[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [replayFilter, setReplayFilter] = useState<'all' | 'suggested'>('all');
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredReplays = replayFilter === 'suggested' 
    ? suggestedReplays.filter(replay => 
        replay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (replay.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      )
    : mockReplays.filter(replay => 
        replay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        replay.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        replay.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleReplaySelect = (replay: Replay) => {
    setIsLoading(true);
    setSelectedReplay(replay);
    setIsDropdownOpen(false);
    setSearchQuery('');
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    navigate('/prevent', { state: { activeTab: 'flows' } });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(
        selectedReplay.id === 's2' ? animateCheckout : animateLogin
      );
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
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

  const animateCheckout = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 10000; // 10 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    setProgress(progress * 100);

    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
      const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
      const addressInput = document.getElementById('address') as HTMLInputElement;
      const cityInput = document.getElementById('city') as HTMLInputElement;
      const zipInput = document.getElementById('zip') as HTMLInputElement;
      const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
      const expiryInput = document.getElementById('expiry') as HTMLInputElement;
      const submitButton = document.querySelector('button[type="submit"]');

      if (progress < 0.1) {
        if (firstNameInput) {
          const inputRect = firstNameInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          firstNameInput.value = 'John'.slice(0, Math.floor(progress * 10 * 4));
          firstNameInput.focus();
        }
      } else if (progress < 0.2) {
        if (lastNameInput) {
          const inputRect = lastNameInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          lastNameInput.value = 'Doe'.slice(0, Math.floor((progress - 0.1) * 10 * 3));
          lastNameInput.focus();
        }
      } else if (progress < 0.3) {
        if (addressInput) {
          const inputRect = addressInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          addressInput.value = '123 Main St'.slice(0, Math.floor((progress - 0.2) * 10 * 10));
          addressInput.focus();
        }
      } else if (progress < 0.4) {
        if (cityInput) {
          const inputRect = cityInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          cityInput.value = 'San Francisco'.slice(0, Math.floor((progress - 0.3) * 10 * 13));
          cityInput.focus();
        }
      } else if (progress < 0.5) {
        if (zipInput) {
          const inputRect = zipInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          zipInput.value = '94105'.slice(0, Math.floor((progress - 0.4) * 10 * 5));
          zipInput.focus();
        }
      } else if (progress < 0.7) {
        if (cardNumberInput) {
          const inputRect = cardNumberInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          cardNumberInput.value = '4242 4242 4242 4242'.slice(0, Math.floor((progress - 0.5) * 5 * 19));
          cardNumberInput.focus();
        }
      } else if (progress < 0.8) {
        if (expiryInput) {
          const inputRect = expiryInput.getBoundingClientRect();
          setCursorPosition({
            x: inputRect.left - rect.left + 10,
            y: inputRect.top - rect.top + 10
          });
          expiryInput.value = '12/25'.slice(0, Math.floor((progress - 0.7) * 10 * 5));
          expiryInput.focus();
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
      animationRef.current = requestAnimationFrame(animateCheckout);
    } else {
      setIsPlaying(false);
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
                <span className="text-sm text-gray-600">Page Load: /login</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-900">00:06</span>
                <span className="text-sm text-gray-600">User Click: button[type="submit"]</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-900">00:06</span>
                <span className="text-sm text-gray-600">Navigation: /dashboard</span>
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

  const handleCreateFlow = (flowName: string, prompt: string, assertions: Assertion[], genericAssertions: string[]) => {
    console.log('Creating flow with data:', { flowName, prompt, assertions, genericAssertions });
    // Close the modal and navigate back to Prevent Flows page
    setIsModalOpen(false);
    navigate('/prevent', { state: { activeTab: 'flows' } });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <Breadcrumb
          items={[
            { label: 'Prevent', to: '/prevent' },
            { label: 'Flows', to: '/prevent', state: { activeTab: 'flows' } },
            { label: 'Create new flow from replay' }
          ]}
        />
        <button
          onClick={handleClose}
          className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span>{selectedReplay.name}</span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                      <div className="p-2 border-b border-gray-200">
                        <div className="flex items-center space-x-4 mb-2">
                          <button
                            onClick={() => setReplayFilter('all')}
                            className={`px-3 py-1 text-sm rounded-md ${
                              replayFilter === 'all' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            All Replays
                          </button>
                          <button
                            onClick={() => setReplayFilter('suggested')}
                            className={`px-3 py-1 text-sm rounded-md ${
                              replayFilter === 'suggested' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            Suggested Replays
                          </button>
                        </div>
                        <div className="relative">
                          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search replays..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredReplays.map((replay) => (
                          <button
                            key={replay.id}
                            onClick={() => handleReplaySelect(replay)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          >
                            <div className="font-medium">{replay.name}</div>
                            {replay.description && (
                              <div className="text-sm text-gray-500">{replay.description}</div>
                            )}
                            <div className="text-sm text-gray-500">
                              {replay.user} • {replay.location} • {replay.timestamp}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#584774] text-white rounded-md shadow-sm hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                >
                  Create Flow
                </button>
              </div>
            </div>

            <div className="flex-1 bg-gray-50 p-4 overflow-auto">
              <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden" ref={previewRef}>
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
                    </div>
                  ) : (
                    <>
                      {selectedReplay.id === 's2' ? (
                        <CheckoutForm className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      ) : (
                        <LoginForm className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                      {showCursor && (
                        <div
                          className="absolute w-4 h-4 bg-blue-500 rounded-full pointer-events-none"
                          style={{
                            left: cursorPosition.x,
                            top: cursorPosition.y,
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                    </button>
                    <div className="w-64 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.floor(progress / 100 * 10)}s
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSpeedChange(0.5)}
                      className={`px-2 py-1 text-sm rounded ${
                        playbackSpeed === 0.5 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      0.5x
                    </button>
                    <button
                      onClick={() => handleSpeedChange(1)}
                      className={`px-2 py-1 text-sm rounded ${
                        playbackSpeed === 1 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      1x
                    </button>
                    <button
                      onClick={() => handleSpeedChange(2)}
                      className={`px-2 py-1 text-sm rounded ${
                        playbackSpeed === 2 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      2x
                    </button>
                  </div>
                </div>
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
    </div>
  );
};

export default FlowCreationReplay; 