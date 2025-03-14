import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import AppPreview from './components/AppPreview/AppPreview';
import SyntheticTestsPanel from './components/SyntheticTests/SyntheticTestsPanel';
import Layout from './components/Layout/Layout';
import PullRequestView from './components/PullRequestView';

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
    <Router>
      <Routes>
        <Route path="/pr/:id" element={<PullRequestView />} />
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App; 