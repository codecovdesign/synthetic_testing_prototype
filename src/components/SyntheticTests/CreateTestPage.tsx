import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import AppPreview from '../AppPreview/AppPreview';
import SyntheticTestsPanel from './SyntheticTestsPanel';

const CreateTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('checkout');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    document.title = 'Create New Test';
  }, []);

  const handlePageChange = (page: string) => {
    console.log('Page changed to:', page); // Debug log
    setCurrentPage(page);
  };

  const handleTestPlay = (testId: string) => {
    setCurrentTest(testId);
    setIsPlaying(true);
  };

  const handleTestComplete = () => {
    setIsPlaying(false);
    setCurrentTest(undefined);
  };

  if (!isLoaded) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-500 p-4">
            <button onClick={() => navigate('/prevent')} className="hover:text-gray-700">
              Browser Tests
            </button>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-gray-900">Create New Test</span>
          </div>
        </div>
        <main className="flex bg-gray-50 h-[calc(100vh-64px)] gap-4 p-4">
          <div className="flex-1">
            <AppPreview
              key={`${currentTest}-${currentPage}`}
              currentTest={currentTest}
              isPlaying={isPlaying}
              onTestComplete={handleTestComplete}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
          <div className="w-[400px]">
            <SyntheticTestsPanel
              key={`${currentTest}-${currentPage}`}
              onTestPlay={handleTestPlay}
              onTestComplete={handleTestComplete}
              currentTest={currentTest}
              currentPage={currentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTestPage; 