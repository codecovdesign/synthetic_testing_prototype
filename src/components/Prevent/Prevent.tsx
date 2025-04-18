import React, { useState, useEffect } from 'react';
import BrowserTestsPage from '../SyntheticTests/BrowserTestsPage';
import AssertionsPanel from '../SessionReplay/AssertionsPanel';
import SuggestedFlowsPanel from './SuggestedFlowsPanel';
import CreateAssertionModal from '../SessionReplay/CreateAssertionModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Prevent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browser-tests' | 'flows'>('browser-tests');
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(false);
  const [initialAction, setInitialAction] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.fromSuggestedFlow) {
      setActiveTab('flows');
    } else if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleCreateFlow = (type: 'replay' | 'environment') => {
    if (type === 'replay') {
      navigate('/prevent/create-from-replay');
    } else {
      navigate('/prevent/create-from-environment');
    }
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
                <div className="w-1/3 bg-white border-l border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <Menu as="div" className="relative inline-block text-left w-64">
                      <Menu.Button className="w-full flex items-center justify-between px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#584774] hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]">
                        <span className="text-left">Create Flow</span>
                        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleCreateFlow('replay')}
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                              >
                                From existing session replay
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleCreateFlow('environment')}
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                              >
                                From production
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Suggested Flows</h2>
                  </div>
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