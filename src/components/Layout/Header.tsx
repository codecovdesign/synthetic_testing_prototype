import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { GitHubIcon } from '../../components/Icons';

interface HeaderProps {
  isSessionReplay?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSessionReplay = false }) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-6 ${isSessionReplay ? 'h-20' : 'h-16'} flex items-center justify-between`}>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {isSessionReplay ? (
          <span className="text-lg font-semibold">Session Replay</span>
        ) : (
          <>
            <span>Browser Tests</span>
            <ChevronRightIcon className="h-4 w-4" />
            <span>Preview & Deploy</span>
            <ChevronRightIcon className="h-4 w-4" />
            <Link to="/pr/1234" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <GitHubIcon className="h-5 w-5" />
              <span>PR-1234: Fix Checkout Bug</span>
            </Link>
          </>
        )}
      </div>
      {!isSessionReplay && (
        <div className="flex items-center space-x-4">
          <a 
            href="/pr/1234"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <GitHubIcon className="h-5 w-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header; 