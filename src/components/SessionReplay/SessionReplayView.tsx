import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Layout/Header';
import Navbar from '../Layout/Navbar';
import SessionReplayPanel from './SessionReplayPanel';
import SelectorsPanel from './SelectorsPanel';
import AssertionsPanel from './AssertionsPanel';

const SessionReplayView = () => {
  const [selectedRepos, setSelectedRepos] = useState(['enigma']);
  const [selectedEnvs, setSelectedEnvs] = useState(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'replays' | 'selectors' | 'assertions'>('replays');
  const location = useLocation();

  useEffect(() => {
    // Set the active tab based on the URL path
    if (location.pathname === '/session-replay/assertions') {
      setActiveTab('assertions');
    } else if (location.pathname === '/session-replay/selectors') {
      setActiveTab('selectors');
    } else {
      setActiveTab('replays');
    }
  }, [location.pathname]);

  useEffect(() => {
    document.title = activeTab === 'selectors' ? 'Sentry - Selectors' : 
                    activeTab === 'assertions' ? 'Sentry - Assertions' : 
                    'Sentry - Session Replays';
  }, [activeTab]);

  const renderFilters = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center gap-4">
      <div className="relative w-64">
        <select
          value={selectedRepos[0]}
          onChange={(e) => setSelectedRepos([e.target.value])}
          className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
        >
          <option value="enigma">enigma</option>
          <option value="getsentry">getsentry</option>
          <option value="sentry">sentry</option>
        </select>
      </div>
      <div className="relative w-48">
        <select
          value={selectedEnvs[0]}
          onChange={(e) => setSelectedEnvs([e.target.value])}
          className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
        >
          <option value="all">All Environments</option>
          <option value="production">Production</option>
          <option value="staging">Staging</option>
          <option value="development">Development</option>
        </select>
      </div>
      <div className="relative w-48">
        <select
          value="14d"
          className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="14d">Last 14 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder={activeTab === 'selectors' ? "Filter selectors..." : activeTab === 'assertions' ? "Filter assertions..." : "Filter replays..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
        />
      </div>
    </div>
  );

  return (
    <div className="h-screen flex">
      <div className="w-16 flex-shrink-0 fixed left-0 top-0 h-full bg-white z-50 border-r border-gray-200">
        <Navbar />
      </div>
      <div className="flex-1 ml-16">
        <div className="sticky top-0 bg-white z-40">
          <Header isSessionReplay />
          <div className="px-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('replays')}
                className={`py-4 px-1 text-sm font-medium ${
                  activeTab === 'replays'
                    ? 'border-[#584774] text-[#584774] border-b-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Replays
              </button>
              <button
                onClick={() => setActiveTab('selectors')}
                className={`py-4 px-1 text-sm font-medium ${
                  activeTab === 'selectors'
                    ? 'border-[#584774] text-[#584774] border-b-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Selectors
              </button>
              <button
                onClick={() => setActiveTab('assertions')}
                className={`py-4 px-1 text-sm font-medium ${
                  activeTab === 'assertions'
                    ? 'border-[#584774] text-[#584774] border-b-2'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Assertions
              </button>
            </nav>
          </div>
        </div>
        <main className="bg-gray-50 min-h-[calc(100vh-128px)] p-4">
          {renderFilters()}
          {activeTab === 'replays' ? <SessionReplayPanel /> : activeTab === 'selectors' ? <SelectorsPanel /> : <AssertionsPanel />}
        </main>
      </div>
    </div>
  );
};

export default SessionReplayView; 