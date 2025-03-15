import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface BrowserTestsLayoutProps {
  children: React.ReactNode;
}

export default function BrowserTestsLayout({ children }: BrowserTestsLayoutProps) {
  const location = useLocation();
  const isTestDetails = location.pathname.includes('/browser-tests/');
  const testId = isTestDetails ? location.pathname.split('/').pop() : null;

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Browser Tests</h1>
          {isTestDetails && (
            <>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <div className="flex items-center space-x-4">
                <Link
                  to="/browser-tests"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  All Tests
                </Link>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900">
                  Test #{testId}
                </span>
              </div>
            </>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-hidden bg-gray-50">
        {children}
      </main>
    </div>
  );
} 