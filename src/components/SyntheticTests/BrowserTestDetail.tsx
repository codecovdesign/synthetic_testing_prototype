import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import MouseCursor from '../MouseCursor';
import Breadcrumb from '../Layout/Breadcrumb';
import Navbar from '../Layout/Navbar';
import { mockTests } from './BrowserTestsPage';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon, ArrowTopRightOnSquareIcon, Cog6ToothIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import AppPreview from '../AppPreview/AppPreview';

// Import the form components from SessionReplayDetail
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
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue
      </button>
    </form>
  </div>
);

const LoginForm = ({ className = '' }: { className?: string }) => (
  <div className={`max-w-md mx-auto p-8 bg-white rounded-lg shadow ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Log in to your account</h2>
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#584774] focus:border-[#584774]"
          placeholder="example@email.com"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#584774] focus:border-[#584774]"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#584774] hover:bg-[#4a3a61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
      >
        Log In
      </button>
    </form>
  </div>
);

const DiscountPreview = ({ 
  className = '',
  promoCode,
  setPromoCode,
  appliedCode,
  setAppliedCode,
  discount,
  setDiscount,
  error,
  setError
}: { 
  className?: string;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedCode: string;
  setAppliedCode: (code: string) => void;
  discount: number;
  setDiscount: (amount: number) => void;
  error: string;
  setError: (msg: string) => void;
}) => {
  const originalPrice = 99.99;
  const finalPrice = originalPrice * (1 - discount / 100);

  const handleApplyPromoCode = () => {
    const code = promoCode.toLowerCase();
    if (code === 'save20') {
      setAppliedCode(promoCode);
      setDiscount(20);
      setError('');
      setPromoCode('');
    } else if (code === 'save50') {
      setError('Error applying SAVE50 code: Internal Server Error');
      setDiscount(0);
      setAppliedCode('');
    } else {
      setError('Invalid promo code');
      setDiscount(0);
      setAppliedCode('');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Order Summary */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-blue-900">Order Summary</h3>
        <div className="flex justify-between mb-2 text-blue-800">
          <span>Premium Plan (Annual)</span>
          <span>${originalPrice.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-teal-600 mb-2">
            <span>Discount ({discount}% off)</span>
            <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-blue-200 pt-2 mt-2">
          <div className="flex justify-between font-medium text-blue-900">
            <span>Total</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo Code Input */}
      <div>
        <label htmlFor="promo" className="block text-sm font-medium text-blue-900 mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              id="promo"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setError('');
              }}
              placeholder="Enter promo code"
              className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-blue-200'} px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`}
            />
            {error && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
            {appliedCode && (
              <p className="text-teal-600 text-sm mt-1">
                Promo code {appliedCode} applied successfully! (20% discount)
              </p>
            )}
          </div>
          <button 
            id="apply-promo"
            onClick={handleApplyPromoCode}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Purchase Button */}
      <button 
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Complete Purchase
      </button>
    </div>
  );
};

const ProductList = ({ className = '' }: { className?: string }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  
  return (
    <div className={`max-w-2xl mx-auto p-8 bg-white rounded-lg shadow ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Premium Plan</h3>
            <p className="text-sm text-gray-500">Annual subscription with premium features</p>
            <p className="text-lg font-medium text-gray-900 mt-1">$99.99</p>
          </div>
          <button
            id="add-to-cart"
            onClick={() => setAddedToCart(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
        {addedToCart && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-700">Item added to cart successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

interface BreadcrumbItem {
  event: string;
  timestamp: string;
  path?: string;
  element?: string;
  value?: string;
  error?: string;
  status?: string;
  html?: string;
}

interface TestSource {
  [key: string]: string;
}

const testSources: TestSource = {
  'apply save20 discount': `test('Apply SAVE20 Discount', async ({ page }) => {
  await page.goto('/checkout');
  await page.fill('#promo', 'SAVE20');
  await page.click('#apply-promo');
  await expect(page.locator('#discount-success')).toHaveText('Promo code SAVE20 applied successfully! (20% discount)');
});`,
  'apply save50 discount': `test('Apply SAVE50 Discount', async ({ page }) => {
  await page.goto('/checkout');
  await page.fill('#promo', 'SAVE50');
  await page.click('#apply-promo');
  await expect(page.locator('#promo-error')).toHaveText('Error applying SAVE50 code: Internal Server Error');
});`,
  'add to cart': `test('Add to Cart', async ({ page }) => {
  await page.goto('/products');
  await page.click('#add-to-cart');
  await expect(page.locator('#cart-success')).toHaveText('Item added to cart successfully!');
});`,
  'login test': `test('Login Test', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'example@email.com');
  await page.fill('#password', '••••••••');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});`
};

const getTestSlug = (testName: string): string => {
  return testName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

interface EnvironmentStatus {
  name: string;
  status: 'success' | 'error';
}

interface BrowserTestDetailProps {
  testName?: string;
  status?: 'success' | 'error';
  environments?: EnvironmentStatus[];
  onEnvironmentConfigChange?: (environments: EnvironmentStatus[]) => void;
  onTestPlay?: (testName: string) => void;
  onTestComplete?: (testName: string) => void;
  currentTest?: string;
  details?: string;
  issueLink?: string;
  stackTrace?: string;
}

const EnvironmentStatusBadge = ({ environment }: { environment: EnvironmentStatus }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${environment.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
    <span className="text-sm text-gray-600">{environment.name}</span>
    <span className={`text-sm ${environment.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
      {environment.status === 'success' ? 'Passing' : 'Failing'}
    </span>
  </div>
);

const ConfigurationModal = ({ 
  isOpen, 
  onClose, 
  environments, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  environments: EnvironmentStatus[];
  onSave: (environments: EnvironmentStatus[]) => void;
}) => {
  const [selectedEnvironments, setSelectedEnvironments] = useState<EnvironmentStatus[]>(environments);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Test Configuration</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Environments
          </label>
          <div className="space-y-2">
            {['Staging', 'Production'].map((env) => (
              <label key={env} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedEnvironments.some(e => e.name === env)}
                  onChange={() => {
                    setSelectedEnvironments(prev => {
                      const exists = prev.some(e => e.name === env);
                      if (exists) {
                        return prev.filter(e => e.name !== env);
                      }
                      return [...prev, { name: env, status: 'success' }];
                    });
                  }}
                  className="h-4 w-4 text-[#584774] focus:ring-[#584774] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{env}</span>
              </label>
            ))}
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
              onSave(selectedEnvironments);
              onClose();
            }}
            className="px-4 py-2 bg-[#584774] text-white rounded-md hover:bg-[#6C5B8E]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const BrowserTestDetail: React.FC<BrowserTestDetailProps> = ({
  testName,
  status,
  environments,
  onEnvironmentConfigChange,
  onTestPlay,
  onTestComplete,
  currentTest,
  details,
  issueLink,
  stackTrace
}) => {
  const { testId } = useParams();
  const test = mockTests.find(t => t.id === testId) || {
    id: '2',
    name: 'Apply SAVE50',
    status: 'error',
    environments: [
      { name: 'Staging', status: 'error' },
      { name: 'Production', status: 'error' }
    ],
    url: '/checkout',
    nextRun: 'in 55 minutes',
    lastUpdated: '1 day ago',
    relatedIssues: 2
  };
  const navigate = useNavigate();

  // If no test is found, show a loading state or error
  if (!test) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Test not found</div>
      </div>
    );
  }

  // Use the test data from the URL parameter
  const currentTestName = test.name;
  const currentStatus = test.status;
  const currentEnvironments = test.environments;
  const currentUrl = test.url;

  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [url, setUrl] = useState(currentUrl);
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previewRef = useRef<HTMLDivElement>(null);
  const promoInputRef = useRef<HTMLInputElement>(null);
  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isTestExpanded, setIsTestExpanded] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    environments: [],
    schedule: 'daily',
    time: '00:00',
    days: ['monday'],
    emailNotifications: [],
    slackNotifications: [],
    retryCount: 3,
    timeout: 30,
    screenshotOnFailure: true,
    videoRecording: true,
    networkConditions: 'fast',
    viewport: 'desktop',
    customHeaders: '',
    tags: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      name: currentTestName,
      description: '',
      environments: [],
      schedule: 'daily',
      time: '00:00',
      days: ['monday'],
      emailNotifications: [],
      slackNotifications: [],
      retryCount: 3,
      timeout: 30,
      screenshotOnFailure: true,
      videoRecording: true,
      networkConditions: 'fast',
      viewport: 'desktop',
      customHeaders: '',
      tags: '',
      notes: ''
    });
    setFormErrors({});
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 10000; // 10 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    setProgress(progress * 100);

    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();

      if (currentTestName.includes('save20')) {
        // Animation sequence for SAVE20
        const promoInput = document.getElementById('promo') as HTMLInputElement;
        const applyButton = document.getElementById('apply-promo');

        if (progress < 0.3) {
          if (promoInput) {
            const inputRect = promoInput.getBoundingClientRect();
            setCursorPosition({
              x: inputRect.left - rect.left + 10,
              y: inputRect.top - rect.top + 10
            });
            setPromoCode('SAVE20'.slice(0, Math.floor(progress * 3.33 * 6)));
            promoInput.focus();
          }
        } else if (progress < 0.6) {
          if (applyButton) {
            const buttonRect = applyButton.getBoundingClientRect();
            setCursorPosition({
              x: buttonRect.left - rect.left + buttonRect.width / 2,
              y: buttonRect.top - rect.top + buttonRect.height / 2
            });
            if (progress > 0.55) {
              setAppliedCode('SAVE20');
              setDiscount(20);
              setError('');
              setPromoCode('');
            }
          }
        }
      } else if (currentTestName.includes('save50')) {
        // Animation sequence for SAVE50
        const promoInput = document.getElementById('promo') as HTMLInputElement;
        const applyButton = document.getElementById('apply-promo');

        if (progress < 0.3) {
          if (promoInput) {
            const inputRect = promoInput.getBoundingClientRect();
            setCursorPosition({
              x: inputRect.left - rect.left + 10,
              y: inputRect.top - rect.top + 10
            });
            setPromoCode('SAVE50'.slice(0, Math.floor(progress * 3.33 * 6)));
            promoInput.focus();
          }
        } else if (progress < 0.6) {
          if (applyButton) {
            const buttonRect = applyButton.getBoundingClientRect();
            setCursorPosition({
              x: buttonRect.left - rect.left + buttonRect.width / 2,
              y: buttonRect.top - rect.top + buttonRect.height / 2
            });
            if (progress > 0.55) {
              // Show error for SAVE50
              setError('Error applying SAVE50 code: Internal Server Error');
              setDiscount(0);
              setAppliedCode('');
              setPromoCode('');
            }
          }
        }
      } else if (currentTestName.includes('add to cart')) {
        // Animation sequence for Add to Cart
        const addToCartButton = document.getElementById('add-to-cart');

        if (progress < 0.3) {
          if (addToCartButton) {
            const buttonRect = addToCartButton.getBoundingClientRect();
            setCursorPosition({
              x: buttonRect.left - rect.left + buttonRect.width / 2,
              y: buttonRect.top - rect.top + buttonRect.height / 2
            });
            if (progress > 0.25) {
              setAddedToCart(true);
            }
          }
        }
      } else {
        // Default login animation
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
            emailInput.value = 'example@email.com'.slice(0, Math.floor(progress * 3.33 * 15));
            emailInput.focus();
          }
        } else if (progress < 0.6) {
          if (passwordInput) {
            const inputRect = passwordInput.getBoundingClientRect();
            setCursorPosition({
              x: inputRect.left - rect.left + 10,
              y: inputRect.top - rect.top + 10
            });
            passwordInput.value = '••••••••'.slice(0, Math.floor((progress - 0.3) * 3.33 * 8));
            passwordInput.focus();
          }
        } else if (progress < 1) {
          if (submitButton) {
            const buttonRect = submitButton.getBoundingClientRect();
            setCursorPosition({
              x: buttonRect.left - rect.left + buttonRect.width / 2,
              y: buttonRect.top - rect.top + buttonRect.height / 2
            });
          }
        }
      }
    }

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
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
      resetForm();
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setShowCursor(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const renderTabContent = () => {
    const mockBreadcrumbs: BreadcrumbItem[] = [
      {
        event: 'Page Load',
        timestamp: '00:00',
        path: url,
      }
    ];

    // Add test-specific breadcrumbs
    if (currentTestName.includes('save50')) {
      mockBreadcrumbs.push(
        {
          event: 'Input Value Change',
          timestamp: '00:03',
          element: 'input#promo',
          value: 'SAVE50',
          error: 'Redis connection timeout',
          html: '<input type="text" id="promo" value="SAVE50" />'
        },
        {
          event: 'User Click',
          timestamp: '00:04',
          element: 'button#apply-promo',
          status: 'Not executed',
          html: '<button id="apply-promo">Apply</button>'
        },
        {
          event: 'Text Content Update',
          timestamp: '00:05',
          element: 'span#total-price',
          value: '$100',
          status: 'Not executed',
          html: '<span id="total-price">$100</span>'
        },
        {
          event: 'Text Content Update',
          timestamp: '00:05',
          element: 'div#promo-error',
          value: 'Invalid Promo Code',
          status: 'Not executed',
          html: '<div id="promo-error">Invalid Promo Code</div>'
        }
      );
    } else if (currentTestName.includes('save20')) {
      mockBreadcrumbs.push(
        {
          event: 'Input Value Change',
          timestamp: '00:03',
          element: 'input#promo',
          value: 'SAVE20',
          html: '<input type="text" id="promo" value="SAVE20" />'
        },
        {
          event: 'User Click',
          timestamp: '00:04',
          element: 'button#apply-promo',
          html: '<button id="apply-promo">Apply</button>'
        },
        {
          event: 'Text Content Update',
          timestamp: '00:05',
          element: 'div#discount-success',
          value: 'Promo code SAVE20 applied successfully!',
          html: '<div id="discount-success">Promo code SAVE20 applied successfully!</div>'
        }
      );
    } else if (currentTestName.includes('add to cart')) {
      mockBreadcrumbs.push(
        {
          event: 'User Click',
          timestamp: '00:03',
          element: 'button#add-to-cart',
          html: '<button id="add-to-cart">Add to Cart</button>'
        },
        {
          event: 'Text Content Update',
          timestamp: '00:04',
          element: 'div#cart-success',
          value: 'Item added to cart successfully!',
          html: '<div id="cart-success">Item added to cart successfully!</div>'
        }
      );
    } else {
      // Default login form breadcrumbs
      mockBreadcrumbs.push(
        {
          event: 'Input Value Change',
          timestamp: '00:03',
          element: 'input#email',
          value: 'example@email.com',
          html: '<input type="email" id="email" value="example@email.com" />'
        },
        {
          event: 'Input Value Change',
          timestamp: '00:04',
          element: 'input#password',
          value: '••••••••',
          html: '<input type="password" id="password" value="••••••••" />'
        },
        {
          event: 'User Click',
          timestamp: '00:05',
          element: 'button[type="submit"]',
          html: '<button type="submit">Log In</button>'
        }
      );
    }

    const lowercaseActiveTab = activeTab.toLowerCase();
    switch (lowercaseActiveTab) {
      case 'breadcrumbs':
        return (
          <div className="divide-y divide-gray-100">
            {mockBreadcrumbs.map((crumb, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{crumb.event}</div>
                  <div className="text-sm text-gray-500">{crumb.timestamp}</div>
                </div>
                {crumb.path && (
                  <div className="mt-1 text-sm text-gray-900 font-mono break-all">
                    {crumb.path}
                  </div>
                )}
                {crumb.element && (
                  <div className="mt-1 text-sm text-gray-900 font-mono break-all">
                    {crumb.element}
                    {crumb.value && (
                      <span className="text-blue-600">.value = "{crumb.value}"</span>
                    )}
                    {crumb.error && (
                      <span className="text-red-600"> (Error: {crumb.error})</span>
                    )}
                    {crumb.status && (
                      <span className="text-orange-600"> ({crumb.status})</span>
                    )}
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
      case 'source':
        return (
          <div className="source-code">
            <pre>
              <code>
                {currentTestName.includes('checkout') ? `// Checkout flow test
describe('Checkout Flow', () => {
  it('should complete checkout process', () => {
    // Test implementation
  });
});` : currentTestName.includes('products') ? `// Product listing test
describe('Product Listing', () => {
  it('should display products correctly', () => {
    // Test implementation
  });
});` : currentTestName.includes('cart') ? `// Shopping cart test
describe('Shopping Cart', () => {
  it('should manage cart items', () => {
    // Test implementation
  });
});` : `// Account management test
describe('Account Management', () => {
  it('should handle user account operations', () => {
    // Test implementation
  });
});`}
              </code>
            </pre>
          </div>
        );
      case 'test-source':
        return (
          <div className="test-source">
            <h3>Test Source</h3>
            <div className="source-code">
              <pre>
                <code>
                  {currentTestName.includes('save20') ? `// Save 20% test
describe('Save 20% Banner', () => {
  it('should display and apply discount', () => {
    // Test implementation
  });
});` : `// Standard test
describe('${currentTestName}', () => {
  it('should execute successfully', () => {
    // Test implementation
  });
});`}
                </code>
              </pre>
            </div>
          </div>
        );
      case 'test-actions':
        return (
          <div className="test-actions">
            <button className="action-button">
              <i className="fas fa-play"></i>
              Run Test
            </button>
            <button 
              className="action-button"
              onClick={() => window.open(`https://github.com/codecovdesign/synthetic_testing_prototype/blob/main/tests/${getTestSlug(currentTestName)}.spec.ts`, '_blank')}
            >
              <i className="fas fa-code-branch"></i>
              View in GitHub
            </button>
            <button className="action-button">
              <i className="fas fa-history"></i>
              View History
            </button>
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

  const renderPreview = () => {
    if (!currentTestName) return null;

    if (currentTestName.includes('save20')) {
      return (
        <div className="preview-content">
          <div className="promo-section">
            <h2>Apply Promo Code</h2>
            <div className="promo-input">
              <input
                type="text"
                id="promo"
                placeholder="Enter promo code"
                value={promoCode}
                readOnly
              />
              <button id="apply-promo">Apply</button>
            </div>
            {error && <div className="error">{error}</div>}
            {appliedCode && (
              <div className="success">
                Applied {appliedCode} - {discount}% off!
              </div>
            )}
          </div>
        </div>
      );
    }

    if (currentTestName.includes('save50')) {
      return (
        <div className="preview-content">
          <div className="promo-section">
            <h2>Apply Promo Code</h2>
            <div className="promo-input">
              <input
                type="text"
                id="promo"
                placeholder="Enter promo code"
                value={promoCode}
                readOnly
              />
              <button id="apply-promo">Apply</button>
            </div>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      );
    }

    if (currentTestName.includes('add to cart')) {
      return (
        <div className="preview-content">
          <div className="product-section">
            <h2>Product Details</h2>
            <div className="product-info">
              <h3>Premium Widget</h3>
              <p className="price">$99.99</p>
              <button id="add-to-cart" className={addedToCart ? 'added' : ''}>
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="preview-content">
        <div className="login-section">
          <h2>Login</h2>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/browser-tests" className="hover:text-gray-700">
              Browser Tests
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{test?.name}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-white p-6">
            <div className="h-full flex flex-col">
              <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <AppPreview
                  currentTest={currentTestName}
                  isPlaying={isPlaying}
                  onTestComplete={() => {
                    setIsPlaying(false);
                    if (onTestComplete) onTestComplete(currentTestName);
                  }}
                  currentPage={currentUrl.split('/')[1]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            {/* Run Test Button */}
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                if (onTestPlay) onTestPlay(currentTestName);
              }}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#584774] hover:bg-[#4a3a61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774] mb-6"
            >
              {isPlaying ? (
                <>
                  <PauseIcon className="h-4 w-4 mr-2" />
                  Pause Test
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Run Test
                </>
              )}
            </button>

            {/* Environment Status Section */}
            <div className="mb-6 bg-gray-50 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Environment Status</h3>
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="text-sm text-[#584774] hover:text-[#4a3a61]"
                >
                  Configure
                </button>
              </div>
              <hr className="border-gray-200 mb-3" />
              <div className="space-y-3">
                {['Staging', 'Production'].map((envName) => {
                  const env = currentEnvironments.find(e => e.name === envName);
                  return (
                    <div key={envName} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{envName}</span>
                      {env ? (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${env.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className={`text-sm font-medium ${env.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {env.status === 'success' ? 'Passing' : 'Failing'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not configured</span>
                      )}
                    </div>
                  );
                })}
                {(test.name === 'Apply SAVE50' || test.name === 'Click adds product to cart' || test.name === 'Checkout validation') && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Link to={`/browser-tests/${test.id}/issues`} className="text-sm text-blue-600 hover:text-blue-800">
                      {test.name === 'Click adds product to cart' ? '3 related issues' :
                       test.name === 'Apply SAVE50' ? '2 related issues' :
                       test.name === 'Checkout validation' ? '2 related issues' : ''}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Test Source Section */}
            <div className="mb-6 bg-gray-50 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTestExpanded(!isTestExpanded)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isTestExpanded ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </button>
                  <h3 className="text-sm font-medium text-gray-500">Test Source</h3>
                </div>
                {currentTestName === 'apply save20 discount' ? (
                  <button
                    onClick={() => window.open(`https://github.com/codecovdesign/synthetic_testing_prototype/blob/main/tests/${getTestSlug(currentTestName)}.spec.ts`, '_blank')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#584774] hover:bg-[#4a3a61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Commit to Repo
                  </button>
                ) : (
                  <a
                    href={`https://github.com/codecovdesign/synthetic_testing_prototype/blob/main/tests/${getTestSlug(currentTestName)}.spec.ts`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    View in Repo
                  </a>
                )}
              </div>
              {isTestExpanded && (
                <>
                  <pre className="text-sm font-mono text-gray-800 overflow-x-auto">
                    <code>
                      {currentTestName.includes('save20') ? `// Save 20% test
describe('Save 20% Banner', () => {
  it('should display and apply discount', () => {
    // Test implementation
  });
});` : `// Standard test
describe('${currentTestName}', () => {
  it('should execute successfully', () => {
    // Test implementation
  });
});`}
                    </code>
                  </pre>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <div className="flex space-x-8 min-w-max">
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
            <div className="mt-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      <ConfigurationModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        environments={currentEnvironments}
        onSave={(updatedEnvironments) => {
          if (onEnvironmentConfigChange) {
            onEnvironmentConfigChange(updatedEnvironments);
          }
          setShowConfigModal(false);
        }}
      />
    </div>
  );
}

export default BrowserTestDetail; 