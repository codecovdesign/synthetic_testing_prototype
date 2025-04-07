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
      {location.pathname === '/browser-tests' && (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Browser Tests</h1>
        </header>
      )}
      <main className="flex-1 overflow-hidden bg-gray-50">
        {children}
      </main>
    </div>
  );
} 