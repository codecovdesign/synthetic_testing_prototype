import React, { useState, useEffect } from 'react';
import BrowserTestsPage from '../SyntheticTests/BrowserTestsPage';
import AssertionsPanel from '../SessionReplay/AssertionsPanel';
import SuggestedFlowsPanel from './SuggestedFlowsPanel';
import CreateAssertionModal from '../SessionReplay/CreateAssertionModal';
import { useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Prevent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browser-tests' | 'flows'>('browser-tests');
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(false);
  const [initialAction, setInitialAction] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromSuggestedFlow) {
      setActiveTab('flows');
    } else if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleCreateFlow = (data: { startingUrl: string; firstInteraction: string }) => {
    setInitialAction(data.firstInteraction);
    setShowCreateFlowModal(true);
  };

  const handleWatchReplay = (flowId: string) => {
    // TODO: Implement replay viewing functionality
    console.log('Watching replay for flow:', flowId);
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <div className="sticky top-0 bg-white z-40">
          <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Prevent</h1>
          </div>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('browser-tests')}
                className={`py-4 px-1 text-sm font-medium ${
                  activeTab === 'browser-tests'
                    ? 'border-[#584774] text-[#584774] border-b-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Browser Tests
              </button>
              <button
                onClick={() => setActiveTab('flows')}
                className={`py-4 px-1 text-sm font-medium ${
                  activeTab === 'flows'
                    ? 'border-[#584774] text-[#584774] border-b-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Flows
              </button>
            </nav>
          </div>
        </div>
        <main className="bg-gray-50 min-h-[calc(100vh-128px)] p-4">
          <div className="flex-1 overflow-auto">
            {activeTab === 'browser-tests' ? (
              <BrowserTestsPage hideHeader={true} hideHeaderAndActions={true} />
            ) : (
              <div className="flex h-full">
                <div className="flex-1">
                  <AssertionsPanel />
                </div>
                <div className="w-80">
                  <SuggestedFlowsPanel onWatchReplay={handleWatchReplay} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {showCreateFlowModal && (
        <CreateAssertionModal
          isOpen={showCreateFlowModal}
          onClose={() => {
            setShowCreateFlowModal(false);
            setInitialAction('');
          }}
          onSubmit={(data) => {
            console.log('Creating flow with data:', data);
            setShowCreateFlowModal(false);
            setInitialAction('');
          }}
          initialData={{
            flowName: '',
            prompt: initialAction,
            assertions: [],
            genericAssertions: []
          }}
        />
      )}
    </div>
  );
};

export default Prevent; 