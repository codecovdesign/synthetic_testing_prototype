import React from 'react';

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
  { id: '1', flowName: 'Login Flow', status: 'passed', lastSeen: '2h ago', lastChecked: 'Release 2.1.0', failures: null, linkedIssues: null },
  { id: '2', flowName: 'Checkout Flow', status: 'failed', lastSeen: '4h ago', lastChecked: 'Release 2.1.0', failures: 3, linkedIssues: 'ISSUE-123' },
  { id: '3', flowName: 'User Registration', status: 'passed', lastSeen: '1d ago', lastChecked: 'Release 2.0.5', failures: null, linkedIssues: null },
  { id: '4', flowName: 'Password Reset', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null },
  { id: '5', flowName: 'Profile Update', status: 'failed', lastSeen: '6h ago', lastChecked: 'Release 2.1.0', failures: 2, linkedIssues: 'ISSUE-456' },
  { id: '6', flowName: 'Payment Processing', status: 'passed', lastSeen: '3h ago', lastChecked: 'Release 2.1.0', failures: null, linkedIssues: null },
  { id: '7', flowName: 'Order History', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null },
  { id: '8', flowName: 'Search Functionality', status: 'failed', lastSeen: '1h ago', lastChecked: 'Release 2.1.0', failures: 5, linkedIssues: 'ISSUE-789' },
  { id: '9', flowName: 'Settings Management', status: 'passed', lastSeen: '5h ago', lastChecked: 'Release 2.0.5', failures: null, linkedIssues: null },
  { id: '10', flowName: 'Notification System', status: 'untested', lastSeen: '—', lastChecked: '—', failures: null, linkedIssues: null }
];

const AssertionsPanel = () => {
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
              <tr key={assertion.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.flowName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getStatusDisplay(assertion.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.lastSeen}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.lastChecked}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.failures || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assertion.linkedIssues || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-blue-600 hover:text-blue-800">View Replay</button>
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