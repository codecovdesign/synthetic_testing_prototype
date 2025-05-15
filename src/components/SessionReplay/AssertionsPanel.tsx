import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';

interface AssertionData {
  id: string;
  flowName: string;
  status: 'passed' | 'failed' | 'untested';
  lastSeen: string;
  lastChecked: string;
  failures: number | null;
  linkedIssues: string | null;
  createdBy?: {
    type: 'user' | 'ai';
    name?: string;
  };
}

const mockAssertions: AssertionData[] = [
  { id: '1', flowName: 'Login Flow', status: 'passed', lastSeen: '8fd23c1 – Release 1.32.0', lastChecked: 'Release 2.1.0', failures: null, linkedIssues: null, createdBy: { type: 'ai' } },
  { id: '2', flowName: 'Checkout Flow', status: 'failed', lastSeen: 'a4b5c6d – Release 1.31.0', lastChecked: 'Release 2.1.0', failures: 3, linkedIssues: 'ISSUE-123', createdBy: { type: 'ai' } },
  { id: '3', flowName: 'User Registration', status: 'passed', lastSeen: 'e7f8g9h – Release 1.30.0', lastChecked: 'Release 2.0.5', failures: null, linkedIssues: null, createdBy: { type: 'user', name: 'Emily Brown' } },
  { id: '4', flowName: 'Password Reset', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null, createdBy: { type: 'ai' } },
  { id: '5', flowName: 'Profile Update', status: 'failed', lastSeen: 'i1j2k3l – Release 1.32.0', lastChecked: 'Release 2.1.0', failures: 2, linkedIssues: 'No issues detected', createdBy: { type: 'ai' } },
  { id: '6', flowName: 'Payment Processing', status: 'passed', lastSeen: 'm4n5o6p – Release 1.31.0', lastChecked: 'Release 2.1.0', failures: null, linkedIssues: null, createdBy: { type: 'ai' } },
  { id: '7', flowName: 'Order History', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null, createdBy: { type: 'ai' } },
  { id: '8', flowName: 'Search Functionality', status: 'failed', lastSeen: 'q7r8s9t – Release 1.32.0', lastChecked: 'Release 2.1.0', failures: 5, linkedIssues: 'ISSUE-789', createdBy: { type: 'user', name: 'John Smith' } },
  { id: '9', flowName: 'Settings Management', status: 'passed', lastSeen: 'u1v2w3x – Release 1.30.0', lastChecked: 'Release 2.0.5', failures: null, linkedIssues: null, createdBy: { type: 'ai' } },
  { id: '10', flowName: 'Notification System', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null, createdBy: { type: 'ai' } }
];

const AssertionsPanel = () => {
  const navigate = useNavigate();

  const getStatusDisplay = (status: AssertionData['status']) => {
    switch (status) {
      case 'passed':
        return '✅ Passed';
      case 'failed':
        return '❌ Failed';
      case 'untested':
        return '🕓 Untested';
      default:
        return status;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleRowClick = (assertion: AssertionData) => {
    navigate(`/assertion/${assertion.id}`, { state: { assertion } });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="pl-8 pr-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
                Flow Name
              </th>
              <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Created By
              </th>
              <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Last Seen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockAssertions.map((assertion) => (
              <tr 
                key={assertion.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(assertion)}
              >
                <td className="pl-8 pr-4 py-4 whitespace-nowrap text-sm text-gray-900 w-full">{assertion.flowName}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {assertion.createdBy?.type === 'user' ? (
                    <Tooltip.Provider delayDuration={0}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div 
                            className="flex items-center justify-end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div 
                              className="w-8 h-8 rounded-full bg-[#584774] flex items-center justify-center text-white font-medium text-sm"
                            >
                              {getInitials(assertion.createdBy.name || '')}
                            </div>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="TooltipContent bg-gray-800 text-white px-2 py-1 text-sm rounded shadow-lg"
                            sideOffset={5}
                          >
                            {assertion.createdBy.name}
                            <Tooltip.Arrow className="fill-gray-800" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  ) : (
                    <Tooltip.Provider delayDuration={0}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div 
                            className="flex items-center justify-end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div 
                              className="w-8 h-8 rounded-full bg-[#584774] flex items-center justify-center text-white font-medium text-sm"
                            >
                              AI
                            </div>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="TooltipContent bg-gray-800 text-white px-2 py-1 text-sm rounded shadow-lg"
                            sideOffset={5}
                          >
                            AI-generated
                            <Tooltip.Arrow className="fill-gray-800" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  )}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{getStatusDisplay(assertion.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {assertion.lastSeen === '—' ? (
                    '—'
                  ) : (
                    <a 
                      href={`/session-replay/${assertion.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      onClick={e => e.stopPropagation()}
                    >
                      {assertion.lastSeen.split(' – ')[0]}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssertionsPanel; 