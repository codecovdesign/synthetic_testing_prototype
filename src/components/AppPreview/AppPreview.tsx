import React, { useState, useRef, useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { GlobeAltIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import MouseCursor from '../MouseCursor';

const PAGES = {
  checkout: {
    url: 'https://www.turing-corp.com/checkout',
    title: 'Checkout'
  },
  products: {
    url: 'https://www.turing-corp.com/products',
    title: 'Products'
  },
  cart: {
    url: 'https://www.turing-corp.com/cart',
    title: 'Shopping Cart'
  },
  account: {
    url: 'https://www.turing-corp.com/account',
    title: 'My Account'
  }
};

type PageKey = keyof typeof PAGES;

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ clipPath: 'inset(0)' }}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <div className="flex justify-end absolute top-2 right-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface AppPreviewProps {
  currentTest?: string;
  isPlaying?: boolean;
  onTestComplete?: () => void;
  onPageChange?: (page: string) => void;
}

const AppPreview: React.FC<AppPreviewProps> = ({ currentTest, isPlaying = false, onTestComplete, onPageChange }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);
  const [currentPage, setCurrentPage] = useState<PageKey>('checkout');
  const [showUrlDropdown, setShowUrlDropdown] = useState(false);
  
  const promoInputRef = useRef<HTMLInputElement>(null);
  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const purchaseButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const originalPrice = 99.99;
  const orderNumber = 'TC-2024-0392847';
  const mockAddress = {
    street: '525 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUrlDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isPlaying && currentTest) {
      if (currentTest === 'Apply SAVE20') {
        // Reset states
        setError('');
        setDiscount(0);
        setAppliedCode('');
        setPromoCode('');
        
        // Move to input
        setCurrentTarget(promoInputRef.current);
        
        // Wait for cursor to arrive at input
        setTimeout(() => {
          // Type "SAVE"
          setPromoCode('S');
          setTimeout(() => setPromoCode('SA'), 200);
          setTimeout(() => setPromoCode('SAV'), 400);
          setTimeout(() => setPromoCode('SAVE'), 600);
          
          // Type "20"
          setTimeout(() => setPromoCode('SAVE2'), 800);
          setTimeout(() => {
            setPromoCode('SAVE20');
            
            // Move to apply button after typing
            setTimeout(() => {
              setCurrentTarget(applyButtonRef.current);
              
              // Click apply and show success message
              setTimeout(() => {
                const code = 'SAVE20';
                setAppliedCode(code);
                setDiscount(20);
                setError('');
                setPromoCode('');
                
                // Keep success state visible
                setTimeout(() => {
                  setCurrentTarget(null);
                  if (onTestComplete) onTestComplete();
                }, 2000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      } else if (currentTest === 'Apply SAVE50') {
        // Focus input first
        setCurrentTarget(promoInputRef.current);
        setTimeout(() => {
          // Type SAVE50
          setPromoCode('SAVE50');
          // Move to apply button
          setCurrentTarget(applyButtonRef.current);
          setTimeout(() => {
            // Click apply and show error
            handleApplyPromoCode();
            // Wait to show the error state
            setTimeout(() => {
              setCurrentTarget(null);
              if (onTestComplete) onTestComplete();
            }, 1500); // Give time to see the error message
          }, 1000);
        }, 1000);
      } else if (currentTest === 'Purchase Completion' || (!currentTest.startsWith('Apply'))) {
        // Click purchase button, show confirmation for Purchase Completion test and any new recorded test
        setCurrentTarget(purchaseButtonRef.current);
        setTimeout(() => {
          setShowConfirmation(true);
          setTimeout(() => {
            setShowConfirmation(false);
            setCurrentTarget(null);
            if (onTestComplete) onTestComplete();
          }, 1500);
        }, 1000);
      }
    }
  }, [isPlaying, currentTest]);

  const handleApplyPromoCode = () => {
    const code = promoCode.toLowerCase();
    if (code === 'save20') {
      setAppliedCode(promoCode); // Set this first to show the message
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

  const finalPrice = originalPrice * (1 - discount / 100);

  const renderPageContent = () => {
    switch (currentPage) {
      case 'checkout':
        return (
          <div className="space-y-6">
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
                    ref={promoInputRef}
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
                  ref={applyButtonRef}
                  onClick={handleApplyPromoCode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Purchase Button */}
            <button 
              ref={purchaseButtonRef}
              onClick={() => setShowConfirmation(true)}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Complete Purchase
            </button>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-900">Our Products</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 border border-blue-100 rounded-lg bg-white">
                  <div className="h-32 bg-blue-50 rounded-md mb-4"></div>
                  <h4 className="font-medium text-blue-900">Product {i}</h4>
                  <p className="text-sm text-blue-600">$99.99</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cart':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-900">Shopping Cart</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-blue-100 rounded-lg bg-white">
                  <div className="h-20 w-20 bg-blue-50 rounded-md"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900">Product {i}</h4>
                    <p className="text-sm text-blue-600">$99.99</p>
                  </div>
                  <button className="text-red-600 text-sm">Remove</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-900">My Account</h3>
            <div className="p-4 border border-blue-100 rounded-lg bg-white">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Email</label>
                  <input type="text" value="user@example.com" readOnly className="w-full px-3 py-2 bg-gray-50 border border-blue-200 rounded-md text-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Subscription</label>
                  <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md">Premium Plan (Active)</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col overflow-hidden">
      <div className="relative flex flex-col flex-1">
        <div className="absolute inset-0 pointer-events-none">
          <MouseCursor
            isVisible={isPlaying && currentTarget !== null}
            targetElement={currentTarget}
            onComplete={onTestComplete}
          />
        </div>
        
        {/* URL Bar */}
        <div className="flex-shrink-0 border-b border-gray-200 p-2 flex items-center bg-gray-50">
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              onClick={() => setShowUrlDropdown(!showUrlDropdown)}
              className="flex items-center w-full bg-white rounded px-3 py-1.5 border border-gray-300 hover:border-gray-400"
            >
              <GlobeAltIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 flex-1 text-left">{PAGES[currentPage].url}</span>
              <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2" />
            </button>
            
            {showUrlDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {Object.entries(PAGES).map(([key, { url, title }]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentPage(key as PageKey);
                      setShowUrlDropdown(false);
                      onPageChange?.(key);
                    }}
                    className={`flex items-center w-full px-3 py-2 text-sm ${
                      currentPage === key ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium mr-2">{title}</span>
                    <span className="text-gray-500 text-xs">{url}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto relative">
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-6 border border-blue-100">
                {renderPageContent()}
              </div>
            </div>
          </div>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)}>
              <div className="text-center pt-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Order Confirmed!</h3>
                <p className="text-blue-800 mb-4">Order #{orderNumber}</p>
                <div className="text-left bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-blue-900 mb-2">Shipping Address:</h4>
                  <p className="text-blue-800 text-sm">
                    {mockAddress.street}<br />
                    {mockAddress.city}, {mockAddress.state} {mockAddress.zip}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Need assistance? Contact our support team at<br />
                  <a href="mailto:support@turing-corp.com" className="text-blue-600 hover:text-blue-700">
                    support@turing-corp.com
                  </a>
                </p>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPreview; 