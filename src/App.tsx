import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PullRequestView from './components/PullRequestView';
import SessionReplayView from './components/SessionReplay/SessionReplayView';
import SessionReplayDetail from './components/SessionReplay/SessionReplayDetail';
import BrowserTestsPage from './components/SyntheticTests/BrowserTestsPage';
import BrowserTestsLayout from './components/SyntheticTests/BrowserTestsLayout';
import IssuesPage from './components/Issues/IssuesPage';
import BrowserTestDetail from './components/SyntheticTests/BrowserTestDetail';
import CreateTestPage from './components/SyntheticTests/CreateTestPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/pr/:id/browser-tests" element={<PullRequestView />} />
          <Route path="/pr/:id" element={<PullRequestView />} />
          <Route path="/session-replay/:id" element={<SessionReplayDetail />} />
          <Route path="/session-replay" element={<SessionReplayView />} />
          <Route path="/browser-tests" element={
            <Layout>
              <BrowserTestsLayout>
                <BrowserTestsPage />
              </BrowserTestsLayout>
            </Layout>
          } />
          <Route path="/browser-tests/create" element={
            <Layout>
              <CreateTestPage />
            </Layout>
          } />
          <Route path="/browser-tests/:testId" element={
            <Layout>
              <BrowserTestDetail />
            </Layout>
          } />
          <Route path="/" element={<Layout />} index />
          <Route path="/issues" element={
            <Layout>
              <IssuesPage />
            </Layout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;