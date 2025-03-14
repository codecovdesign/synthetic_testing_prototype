import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Browser Tests</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span>Preview & Deploy</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="font-medium text-gray-900">PR-1234: Fix Checkout Bug</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-[#584774] text-white rounded-md hover:bg-[#6C5B8E] transition-colors">
          Deploy Changes
        </button>
      </div>
    </header>
  );
};

export default Header; 