import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AppPreview from '../AppPreview/AppPreview';
import SyntheticTestsPanel from '../SyntheticTests/SyntheticTestsPanel';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="ml-[90px]">
        <Header />
        <main className="p-6">
          <div className="flex gap-6 h-[calc(100vh-88px)]">
            <div className="flex-[2]">
              <AppPreview />
            </div>
            <div className="flex-1">
              <SyntheticTestsPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 