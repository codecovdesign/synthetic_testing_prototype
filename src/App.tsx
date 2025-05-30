import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PullRequestView from './components/PullRequestView';
import RetroTestingPullRequestView from './components/RetroTestingPullRequestView';
import SessionReplayView from './components/SessionReplay/SessionReplayView';
import SessionReplayDetail from './components/SessionReplay/SessionReplayDetail';
import BrowserTestsPage from './components/SyntheticTests/BrowserTestsPage';
import BrowserTestsLayout from './components/SyntheticTests/BrowserTestsLayout';
import IssuesPage from './components/Issues/IssuesPage';
import BrowserTestDetail from './components/SyntheticTests/BrowserTestDetail';
import CreateTestPage from './components/SyntheticTests/CreateTestPage';
import BrowserTestIssuesPage from './components/Issues/BrowserTestIssuesPage';
import AssertionDetail from './components/SessionReplay/AssertionDetail';
import AssertionIssuesPage from './components/Issues/AssertionIssuesPage';
import Prevent from './components/Prevent/Prevent';
import SuggestedFlowReview from './components/Prevent/SuggestedFlowReview';
import FlowCreationReplay from './components/Prevent/FlowCreationReplay';
import FlowCreationEnvironment from './components/Prevent/FlowCreationEnvironment';
import PRFlowView from './components/PRFlow/PRFlowView';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/pr/:id/browser-tests" element={<PullRequestView />} />
          <Route path="/pr/:id" element={<PullRequestView />} />
          <Route path="/retro-pr/:id" element={<RetroTestingPullRequestView />} />
          <Route path="/prflow/:id" element={<PRFlowView />} />
          <Route path="/session-replay/:id" element={<SessionReplayDetail />} />
          <Route path="/session-replay" element={<SessionReplayView />} />
          <Route path="/session-replay/assertions" element={<SessionReplayView />} />
          <Route path="/assertion/:id" element={<AssertionDetail />} />
          <Route path="/assertion-issues" element={
            <Layout>
              <AssertionIssuesPage />
            </Layout>
          } />
          <Route path="/prevent" element={
            <Layout>
              <Prevent />
            </Layout>
          } />
          <Route path="/prevent/suggested-flow/:id" element={<SuggestedFlowReview />} />
          <Route path="/prevent/create-from-replay" element={<FlowCreationReplay />} />
          <Route path="/prevent/create-from-environment" element={<FlowCreationEnvironment />} />
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
          <Route path="/browser-tests/:id" element={
            <Layout>
              <BrowserTestsLayout>
                <BrowserTestDetail />
              </BrowserTestsLayout>
            </Layout>
          } />
          <Route path="/browser-test-issues" element={
            <Layout>
              <BrowserTestIssuesPage />
            </Layout>
          } />
          <Route path="/issues" element={
            <Layout>
              <IssuesPage />
            </Layout>
          } />
          <Route path="/" element={<Navigate to="/prevent" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;