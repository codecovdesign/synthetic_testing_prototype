import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import Navbar from '../Layout/Navbar';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';
import MouseCursor from '../MouseCursor';
import Breadcrumb from '../Layout/Breadcrumb';
import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

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
  'Overview',
  'Timeline',
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

const getStatusDisplay = (status: 'passed' | 'failed' | 'untested') => {
  switch (status) {
    case 'passed':
      return '✅ Passing';
    case 'failed':
      return '❌ Failing';
    case 'untested':
      return '🕓 Untested';
    default:
      return status;
  }
};

const AssertionDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const assertion = location.state?.assertion;
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [url, setUrl] = useState('turing-corp.com/accountcreation');
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previewRef = useRef<HTMLDivElement>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const originalPrice = 99.99;
  const finalPrice = originalPrice * (1 - discount / 100);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [tos, setTos] = useState(false);

  useEffect(() => {
    document.title = `Assertion - ${assertion?.flowName || 'Unknown Assertion'}`;
  }, [assertion]);

  useEffect(() => {
    // Set the URL based on the assertion ID
    if (id === '2') { // Checkout Flow assertion
      setUrl('turing-corp.com/checkout');
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

  const animateSignup = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 10000; // 10 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    setProgress(progress * 100);

    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();

      if (id === '2') { // Checkout Flow assertion
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
              setError('Error applying SAVE50 code: Internal Server Error');
              setDiscount(0);
              setAppliedCode('');
              setPromoCode('');
            }
          }
        }
      } else {
        // Original animation for other assertions
        const emailInput = document.getElementById('email') as HTMLInputElement | null;
        const passwordInput = document.getElementById('password') as HTMLInputElement | null;
        const marketingCheckbox = document.getElementById('marketingConsent') as HTMLInputElement | null;
        const tosCheckbox = document.getElementById('tos') as HTMLInputElement | null;
        const submitButton = document.querySelector('button[type="submit"]');

        if (progress < 0.2) {
          if (emailInput) {
            const inputRect = emailInput.getBoundingClientRect();
            setCursorPosition({
              x: inputRect.left - rect.left + 10,
              y: inputRect.top - rect.top + 10
            });
            setEmail('john.doe@example.com'.slice(0, Math.floor(progress * 5 * 19)));
            emailInput.focus();
          }
        } else if (progress < 0.4) {
          if (passwordInput) {
            const inputRect = passwordInput.getBoundingClientRect();
            setCursorPosition({
              x: inputRect.left - rect.left + 10,
              y: inputRect.top - rect.top + 10
            });
            setPassword('••••••••'.slice(0, Math.floor((progress - 0.2) * 5 * 8)));
            passwordInput.focus();
          }
        } else if (progress < 0.6) {
          if (marketingCheckbox) {
            const checkboxRect = marketingCheckbox.getBoundingClientRect();
            setCursorPosition({
              x: checkboxRect.left - rect.left + checkboxRect.width / 2,
              y: checkboxRect.top - rect.top + checkboxRect.height / 2
            });
            if (progress > 0.55) {
              setMarketingConsent(true);
            }
          }
        } else if (progress < 0.8) {
          if (tosCheckbox) {
            const checkboxRect = tosCheckbox.getBoundingClientRect();
            setCursorPosition({
              x: checkboxRect.left - rect.left + checkboxRect.width / 2,
              y: checkboxRect.top - rect.top + checkboxRect.height / 2
            });
            if (progress > 0.75) {
              setTos(true);
            }
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
      setProgress(0);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const renderTabContent = () => {
    const lowercaseActiveTab = activeTab.toLowerCase();
    switch (lowercaseActiveTab) {
      case 'overview':
        return (
          <div className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Flow Name</h3>
                  <p className="mt-1 text-sm text-gray-900">{assertion?.flowName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 text-sm text-gray-900">{getStatusDisplay(assertion?.status || 'untested')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Seen</h3>
                  <p className="mt-1 text-sm text-gray-900">{assertion?.lastSeen || '—'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Checked</h3>
                  <p className="mt-1 text-sm text-gray-900">{assertion?.lastChecked || '—'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Failures</h3>
                  <p className="mt-1 text-sm text-gray-900">{assertion?.failures || '—'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Linked Issues</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    <a href="/assertion-issues" className="text-blue-600 hover:text-blue-800 hover:underline">
                      2 related issues
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500">No timeline data available</div>
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
                { label: 'Assertions', to: '/session-replay/assertions' },
                { label: assertion?.flowName || 'Unknown Assertion' },
              ]}
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {getStatusDisplay(assertion?.status || 'untested')}
                </span>
              </div>
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
                <div className="w-full bg-[#fafafa] rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Mock Pinterest Header - Full Width */}
                  <div className="w-full bg-white border-b border-gray-200 rounded-t-lg sticky top-0 z-10 shadow-sm">
                    <div className="max-w-[1280px] mx-auto">
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-lg">P</span>
                          </div>
                          <h1 className="text-xl font-bold text-gray-900">MockPin</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="text-gray-700 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                      <div className="px-6 py-3 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button className="text-gray-700 hover:text-gray-900 font-medium">Home</button>
                          <button className="text-gray-700 hover:text-gray-900 font-medium">Today</button>
                          <button className="text-gray-700 hover:text-gray-900 font-medium">Following</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area - Centered with Max Width */}
                  <div className="p-8">
                    <div className="max-w-2xl mx-auto">
                      {id === '2' ? (
                        <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">A</span>
                              </div>
                              <h1 className="text-2xl font-bold text-gray-900">Acme Store</h1>
                            </div>
                            <div className="text-sm text-gray-500">Secure Checkout</div>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-[#f0f2f5] rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h3>
                            <div className="flex justify-between mb-2 text-gray-700">
                              <span>Premium Plan (Annual)</span>
                              <span>${originalPrice.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                              <div className="flex justify-between text-green-600 mb-2">
                                <span>Discount ({discount}% off)</span>
                                <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
                              </div>
                            )}
                            <div className="border-t border-gray-200 pt-2 mt-2">
                              <div className="flex justify-between font-medium text-gray-900">
                                <span>Total</span>
                                <span>${finalPrice.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Promo Code Input */}
                          <div>
                            <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
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
                                  className={`w-full rounded-3xl border ${error ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm`}
                                />
                                {error && (
                                  <div className="flex items-center mt-2 text-red-600 text-sm">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                    {error}
                                  </div>
                                )}
                                {appliedCode && (
                                  <p className="text-green-600 text-sm mt-2">
                                    Promo code {appliedCode} applied successfully! (20% discount)
                                  </p>
                                )}
                              </div>
                              <button 
                                id="apply-promo"
                                onClick={handleApplyPromoCode}
                                className="px-6 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors font-medium shadow-sm"
                              >
                                Apply
                              </button>
                            </div>
                          </div>

                          {/* Purchase Button */}
                          <button 
                            className="w-full px-6 py-3 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors font-medium text-lg shadow-sm"
                          >
                            Complete Purchase
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">A</span>
                              </div>
                              <h1 className="text-2xl font-bold text-gray-900">Acme App</h1>
                            </div>
                            <div className="text-sm text-gray-500">Create Account</div>
                          </div>

                          <form className="space-y-6">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base bg-white"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base bg-white"
                                placeholder="Enter your password"
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="marketingConsent"
                                checked={marketingConsent}
                                onChange={(e) => setMarketingConsent(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <label htmlFor="marketingConsent" className="ml-2 block text-sm text-gray-700">
                                I want to receive marketing emails
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="tos"
                                checked={tos}
                                onChange={(e) => setTos(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <label htmlFor="tos" className="ml-2 block text-sm text-gray-700">
                                I agree to the Terms of Service
                              </label>
                            </div>
                            <button
                              type="submit"
                              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-3xl shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Create Account
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
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
};

export default AssertionDetail; 