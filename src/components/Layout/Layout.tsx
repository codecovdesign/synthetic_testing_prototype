import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import AppPreview from '../AppPreview/AppPreview';
import SyntheticTestsPanel from '../SyntheticTests/SyntheticTestsPanel';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600">
          <h2>Something went wrong.</h2>
          <pre className="mt-2 text-sm">{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Layout = () => {
  const location = useLocation();
  const [currentTest, setCurrentTest] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('checkout');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize the component
    setIsLoaded(true);
    document.title = 'Browser Tests';
  }, []);

  useEffect(() => {
    // Reset state when location changes
    if (location.pathname === '/') {
      setCurrentTest(undefined);
      setIsPlaying(false);
      setCurrentPage('checkout');
    }
  }, [location.pathname]);

  const handleTestPlay = (testId: string) => {
    setCurrentTest(testId);
    setIsPlaying(true);
  };

  const handleTestComplete = () => {
    setIsPlaying(false);
    setCurrentTest(undefined);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  if (!isLoaded) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex">
      <div className="w-16 flex-shrink-0 fixed left-0 top-0 h-full bg-white z-50 border-r border-gray-200">
        <Navbar />
      </div>
      <div className="flex-1 ml-16">
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <Header />
        </div>
        <main className="flex bg-gray-50 h-[calc(100vh-64px)] gap-4 p-4">
          <ErrorBoundary>
            <div className="flex-1">
              <AppPreview
                key={`${currentTest}-${currentPage}`}
                currentTest={currentTest}
                isPlaying={isPlaying}
                onTestComplete={handleTestComplete}
                onPageChange={handlePageChange}
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
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default Layout; 