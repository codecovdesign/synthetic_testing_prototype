import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import MouseCursor from '../MouseCursor';
import Breadcrumb from '../Layout/Breadcrumb';
import Navbar from '../Layout/Navbar';
import { mockTests } from './BrowserTestsPage';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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

export default function BrowserTestDetail() {
  const { testId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [url, setUrl] = useState('example.com/checkout');
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

  // Get the actual test data
  const test = mockTests.find(t => t.id === testId);
  const testName = test?.name?.toLowerCase() || '';

  const resetForm = () => {
    if (testName.includes('save20') || testName.includes('save50')) {
      const promoInput = document.getElementById('promo') as HTMLInputElement;
      if (promoInput) {
        promoInput.value = '';
        setPromoCode('');
        setAppliedCode('');
        setDiscount(0);
        setError('');
      }
    } else if (testName.includes('add to cart')) {
      setAddedToCart(false);
    } else {
      // Default login form reset
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      if (emailInput) emailInput.value = '';
      if (passwordInput) passwordInput.value = '';
    }
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 10000; // 10 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    setProgress(progress * 100);

    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();

      if (testName.includes('save20')) {
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
      } else if (testName.includes('save50')) {
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
      } else if (testName.includes('add to cart')) {
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
        path: test?.url || '/checkout',
      }
    ];

    // Add test-specific breadcrumbs
    if (testName.includes('save50')) {
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
    } else if (testName.includes('save20')) {
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
    } else if (testName.includes('add to cart')) {
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
      default:
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No data available</div>
          </div>
        );
    }
  };

  const renderPreview = () => {
    if (testName.includes('save20') || testName.includes('save50')) {
      return (
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-6 border border-blue-100">
          <DiscountPreview 
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            appliedCode={appliedCode}
            setAppliedCode={setAppliedCode}
            discount={discount}
            setDiscount={setDiscount}
            error={error}
            setError={setError}
          />
        </div>
      );
    } else if (testName.includes('add to cart')) {
      return <ProductList />;
    } else {
      return <LoginForm className="mt-0" />;
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-16 flex-shrink-0 fixed left-0 top-0 h-full bg-white z-50 border-r border-gray-200">
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="sticky top-0 bg-white z-40">
          <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: 'Browser Tests', to: '/browser-tests' },
                { label: test?.name || `Test ${testId}` },
              ]}
            />
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${test?.status === 'passed' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${test?.status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                {test?.status === 'passed' ? 'Passing' : 'Failing'}
              </span>
            </div>
          </header>
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center">
            <div className="flex items-center flex-1 max-w-3xl mx-auto">
              <svg className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <input
                type="text"
                value={test?.url || url}
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
                <div className="max-w-2xl mx-auto">
                  {renderPreview()}
                </div>
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
              {/* Test Section */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setIsTestExpanded(!isTestExpanded)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      {isTestExpanded ? (
                        <ChevronDownIcon className="h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )}
                      <span>Test</span>
                    </button>
                    {testName.includes('save20') ? (
                      <button
                        onClick={() => window.open(`https://github.com/codecovdesign/synthetic_testing_prototype/blob/main/tests/${getTestSlug(testName)}.spec.ts`, '_blank')}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#584774] hover:bg-[#4a3a61] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Commit to Repo
                      </button>
                    ) : (
                      <a
                        href={`https://github.com/codecovdesign/synthetic_testing_prototype/blob/main/tests/${getTestSlug(testName)}.spec.ts`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span>View in Repo</span>
                      </a>
                    )}
                  </div>
                  {isTestExpanded && (
                    <div className="mt-3 bg-gray-50 rounded-md">
                      <pre className="p-4 text-sm font-mono text-gray-800 overflow-x-auto">
                        <code>{testSources[testName] || testSources['login test']}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>

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
    </div>
  );
} 