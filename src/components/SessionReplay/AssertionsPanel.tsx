import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AssertionData {
  id: string;
  flowName: string;
  status: 'passed' | 'failed' | 'untested';
  lastSeen: string;
  lastChecked: string;
  failures: number | null;
  linkedIssues: string | null;
}

const mockAssertions: AssertionData[] = [
  { id: '1', flowName: 'Login Flow', status: 'passed', lastSeen: '8fd23c1 – Release 1.32.0', lastChecked: 'Release 2.1.0', failures: null, linkedIssues: null },
  { id: '2', flowName: 'Checkout Flow', status: 'failed', lastSeen: 'a4b5c6d – Release 1.31.0', lastChecked: 'Release 2.1.0', failures: 3, linkedIssues: 'ISSUE-123' },
  { id: '3', flowName: 'User Registration', status: 'passed', lastSeen: 'e7f8g9h – Release 1.30.0', lastChecked: 'Release 2.0.5', failures: null, linkedIssues: null },
  { id: '4', flowName: 'Password Reset', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null },
  { id: '5', flowName: 'Profile Update', status: 'failed', lastSeen: 'i1j2k3l – Release 1.32.0', lastChecked: 'Release 2.1.0', failures: 2, linkedIssues: 'No issues detected' },
  { id: '6', flowName: 'Payment Processing', status: 'passed', lastSeen: 'm4n5o6p – Release 1.31.0', lastChecked: 'Release 2.1.0', failures: null, linkedIssues: null },
  { id: '7', flowName: 'Order History', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null },
  { id: '8', flowName: 'Search Functionality', status: 'failed', lastSeen: 'q7r8s9t – Release 1.32.0', lastChecked: 'Release 2.1.0', failures: 5, linkedIssues: 'ISSUE-789' },
  { id: '9', flowName: 'Settings Management', status: 'passed', lastSeen: 'u1v2w3x – Release 1.30.0', lastChecked: 'Release 2.0.5', failures: null, linkedIssues: null },
  { id: '10', flowName: 'Notification System', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null }
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

  const handleRowClick = (assertion: AssertionData) => {
    navigate(`/assertion/${assertion.id}`, { state: { assertion } });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flow Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Seen
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Checked
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Failures
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Linked Issues
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.flowName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getStatusDisplay(assertion.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assertion.lastSeen === '—' ? (
                    '—'
                  ) : (
                    <>
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Handle commit link click
                        }}
                      >
                        {assertion.lastSeen.split(' – ')[0]}
                      </a>
                      {' – ' + assertion.lastSeen.split(' – ')[1]}
                    </>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.lastChecked}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.failures || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.linkedIssues || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle view replay action
                    }}
                  >
                    View Replay
                  </button>
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