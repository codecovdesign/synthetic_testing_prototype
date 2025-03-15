import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { GitHubIcon } from '../../components/Icons';
import Breadcrumb from './Breadcrumb';

interface HeaderProps {
  isSessionReplay?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSessionReplay }) => {
  const location = useLocation();
  const { id } = useParams();
  const isDetailView = location.pathname.includes('/session-replay/') && id && !location.pathname.includes('/selectors');

  const mockReplays = {
    '4': 'Account Creation',
    '1': 'Checkout Flow Error',
    '2': 'Login Failure',
  };

  const getReplayName = (id: string) => {
    return mockReplays[id as keyof typeof mockReplays] || 'Unknown Replay';
  };

  const prTitle = "Fix Account Creation Flow";
  const prNumber = "1234";
  const prUrl = `/pull/${prNumber}`;

  if (isSessionReplay) {
    if (isDetailView) {
      return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center">
          <Breadcrumb
            items={[
              { label: 'Session Replay', to: '/session-replay' },
              { label: getReplayName(id!) },
            ]}
          />
        </header>
      );
    }
    return (
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Session Replay
        </h1>
      </header>
    );
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <Breadcrumb
        items={[
          { label: 'Browser Tests' },
          { label: prTitle }
        ]}
      />
      <Link 
        to={`/pr/${prNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <GitHubIcon className="h-5 w-5" />
        <span>View PR-{prNumber}</span>
      </Link>
    </header>
  );
};

export default Header; 