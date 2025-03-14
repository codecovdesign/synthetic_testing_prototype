import React from 'react';
import { DocumentTextIcon, FolderIcon, ChartBarIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const SentryLogo = () => (
  <svg viewBox="0 0 72 66" className="h-6 w-6 text-white">
    <path
      fill="currentColor"
      d="M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
    />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="h-full flex flex-col items-center py-4 bg-[#584774]">
      <div className="mb-8">
        <SentryLogo />
      </div>
      <div className="flex flex-col items-center gap-6">
        <button className="text-white opacity-60 hover:opacity-100">
          <DocumentTextIcon className="h-6 w-6" />
        </button>
        <button className="text-white opacity-60 hover:opacity-100">
          <FolderIcon className="h-6 w-6" />
        </button>
        <button className="text-white opacity-60 hover:opacity-100">
          <ChartBarIcon className="h-6 w-6" />
        </button>
        <button className="text-white opacity-60 hover:opacity-100">
          <LightBulbIcon className="h-6 w-6" />
        </button>
        <button className="text-white opacity-60 hover:opacity-100">
          <ShieldCheckIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 