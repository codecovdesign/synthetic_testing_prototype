import React from 'react';
import { EyeIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface SuggestedFlow {
  id: string;
  title: string;
  insight: string;
  replayCount: number;
  timeFrame: string;
}

interface SuggestedFlowsPanelProps {
  onWatchReplay: (flowId: string) => void;
}

const mockSuggestedFlows: SuggestedFlow[] = [
  {
    id: '1',
    title: '/login → /dashboard',
    insight: 'High success rate with consistent pattern',
    replayCount: 134,
    timeFrame: '7 days'
  },
  {
    id: '2',
    title: 'Replay #124',
    insight: 'Multiple payment validation failures',
    replayCount: 42,
    timeFrame: '3 days'
  },
  {
    id: '3',
    title: '/search page interaction',
    insight: 'High engagement with filters',
    replayCount: 89,
    timeFrame: '5 days'
  },
  {
    id: '4',
    title: '203.0.113.5 session',
    insight: 'Rage clicks detected during checkout',
    replayCount: 67,
    timeFrame: '7 days'
  },
  {
    id: '5',
    title: 'Replay #217 — /settings form',
    insight: 'Long time spent on profile fields',
    replayCount: 56,
    timeFrame: '7 days'
  },
  {
    id: '6',
    title: 'Replay #112',
    insight: 'Common mobile nav interaction pattern',
    replayCount: 112,
    timeFrame: '7 days'
  },
  {
    id: '7',
    title: '/reset-password',
    insight: 'High error rate on validation',
    replayCount: 38,
    timeFrame: '7 days'
  }
];

const SuggestedFlowsPanel: React.FC<SuggestedFlowsPanelProps> = ({ onWatchReplay }) => {
  const navigate = useNavigate();

  const handleWatchReplay = (flow: SuggestedFlow) => {
    navigate(`/prevent/suggested-flow/${flow.id}`, { state: { flowTitle: flow.title } });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="space-y-3">
            {mockSuggestedFlows.map((flow) => (
              <div key={flow.id} className="bg-gray-50 rounded-lg p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-1">{flow.title}</h3>
                <p className="text-xs text-gray-600 mb-1">{flow.insight}</p>
                <p className="text-xs text-gray-500 mb-2">
                  Seen in {flow.replayCount} replays in the last {flow.timeFrame}
                </p>
                <button
                  onClick={() => handleWatchReplay(flow)}
                  className="w-full flex items-center justify-center space-x-2 px-2 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                >
                  <PlayIcon className="h-3 w-3" />
                  <span>Watch Replay</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedFlowsPanel; 