import React from 'react';
import { DocumentTextIcon, FolderIcon, ChartBarIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';
import { SentryLogo } from '../../components/Icons';

const Navbar = () => {
  const location = useLocation();
  const isSessionReplay = location.pathname.startsWith('/session-replay');
  const isBrowserTests = location.pathname.startsWith('/browser-tests') && !location.pathname.includes('/issues');
  const isIssues = location.pathname === '/issues' || 
                  location.pathname.includes('/issues') || 
                  location.pathname === '/assertion-issues';
  const isPrevent = location.pathname === '/prevent';

  return (
    <nav className="h-full flex flex-col items-center py-4 bg-[#584774]">
      <div className="mb-8 text-white">
        <SentryLogo />
      </div>
      <div className="flex flex-col items-center gap-6">
        <Link 
          to="/issues" 
          className={`text-white ${isIssues ? 'opacity-100 bg-white/10 p-2 rounded-lg' : 'opacity-60 hover:opacity-100'}`}
        >
          <DocumentTextIcon className="h-6 w-6" />
        </Link>
        <button className="text-white opacity-60 hover:opacity-100">
          <FolderIcon className="h-6 w-6" />
        </button>
        <button className="text-white opacity-60 hover:opacity-100">
          <ChartBarIcon className="h-6 w-6" />
        </button>
        <Link 
          to="/session-replay" 
          className={`text-white ${isSessionReplay ? 'opacity-100 bg-white/10 p-2 rounded-lg' : 'opacity-60 hover:opacity-100'}`}
        >
          <LightBulbIcon className="h-6 w-6" />
        </Link>
        <Link 
          to="/prevent" 
          className={`text-white ${isPrevent ? 'opacity-100 bg-white/10 p-2 rounded-lg' : 'opacity-60 hover:opacity-100'}`}
        >
          <ShieldCheckIcon className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 