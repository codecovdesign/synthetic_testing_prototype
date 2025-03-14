import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import AppPreview from './components/AppPreview/AppPreview';
import SyntheticTestsPanel from './components/SyntheticTests/SyntheticTestsPanel';

const App = () => {
  const [currentTest, setCurrentTest] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('checkout');

  const handleTestPlay = (testName: string) => {
    setCurrentTest(testName);
    setIsPlaying(true);
  };

  const handleTestComplete = () => {
    setIsPlaying(false);
    setCurrentTest(undefined);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen flex">
      <div className="w-16 flex-shrink-0 fixed left-0 top-0 h-full bg-white z-50 border-r border-gray-200">
        <Navbar />
      </div>
      <div className="flex-1 ml-16"> {/* Reduced margin from ml-20 to ml-16 */}
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <Header />
        </div>
        <main className="flex bg-gray-50 h-[calc(100vh-64px)] gap-4 p-4">
          <div className="flex-1">
            <AppPreview
              currentTest={currentTest}
              isPlaying={isPlaying}
              onTestComplete={handleTestComplete}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="w-[400px]"> {/* Fixed width for browser tests panel */}
            <SyntheticTestsPanel
              onTestPlay={handleTestPlay}
              currentTest={currentTest}
              currentPage={currentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App; 