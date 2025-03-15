import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PullRequestView from './components/PullRequestView';
import SessionReplayView from './components/SessionReplay/SessionReplayView';
import SessionReplayDetail from './components/SessionReplay/SessionReplayDetail';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/pr/:id/browser-tests" element={<PullRequestView />} />
          <Route path="/pr/:id" element={<PullRequestView />} />
          <Route path="/session-replay/:id" element={<SessionReplayDetail />} />
          <Route path="/session-replay" element={<SessionReplayView />} />
          <Route path="/" element={<Layout />} index />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App; 