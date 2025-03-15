import React from 'react';

interface SelectorData {
  id: string;
  project: string;
  element: string;
  selector: string;
  ariaLabel: string;
  deadClicks: number;
  rageClicks: number;
}

const mockSelectors: SelectorData[] = [
  { id: '1', project: 'enigma', element: 'Button', selector: '.submit-button', ariaLabel: 'Submit Form', deadClicks: 145, rageClicks: 23 },
  { id: '2', project: 'enigma', element: 'Input', selector: '#email-input', ariaLabel: 'Email Address', deadClicks: 89, rageClicks: 12 },
  { id: '3', project: 'getsentry', element: 'Link', selector: '.nav-link', ariaLabel: 'Navigation Menu', deadClicks: 234, rageClicks: 45 },
  { id: '4', project: 'sentry', element: 'Button', selector: '.checkout-btn', ariaLabel: 'Proceed to Checkout', deadClicks: 167, rageClicks: 56 },
  { id: '5', project: 'enigma', element: 'Dropdown', selector: '.filter-dropdown', ariaLabel: 'Filter Results', deadClicks: 78, rageClicks: 8 },
  { id: '6', project: 'getsentry', element: 'Tab', selector: '.dashboard-tab', ariaLabel: 'Dashboard Tab', deadClicks: 112, rageClicks: 15 },
  { id: '7', project: 'sentry', element: 'Modal', selector: '.error-modal', ariaLabel: 'Error Message', deadClicks: 45, rageClicks: 67 },
  { id: '8', project: 'enigma', element: 'Form', selector: '#login-form', ariaLabel: 'Login Form', deadClicks: 198, rageClicks: 34 },
  { id: '9', project: 'getsentry', element: 'Button', selector: '.save-changes', ariaLabel: 'Save Changes', deadClicks: 156, rageClicks: 28 },
  { id: '10', project: 'sentry', element: 'Input', selector: '#search-input', ariaLabel: 'Search Box', deadClicks: 245, rageClicks: 19 },
  { id: '11', project: 'enigma', element: 'Link', selector: '.help-link', ariaLabel: 'Help Center', deadClicks: 67, rageClicks: 5 },
  { id: '12', project: 'getsentry', element: 'Button', selector: '.delete-btn', ariaLabel: 'Delete Item', deadClicks: 89, rageClicks: 78 },
  { id: '13', project: 'sentry', element: 'Checkbox', selector: '.terms-checkbox', ariaLabel: 'Accept Terms', deadClicks: 134, rageClicks: 23 },
  { id: '14', project: 'enigma', element: 'Select', selector: '#country-select', ariaLabel: 'Select Country', deadClicks: 167, rageClicks: 12 },
  { id: '15', project: 'getsentry', element: 'Radio', selector: '.payment-radio', ariaLabel: 'Payment Method', deadClicks: 78, rageClicks: 9 },
  { id: '16', project: 'sentry', element: 'Button', selector: '.submit-payment', ariaLabel: 'Submit Payment', deadClicks: 289, rageClicks: 45 },
  { id: '17', project: 'enigma', element: 'Link', selector: '.profile-link', ariaLabel: 'User Profile', deadClicks: 145, rageClicks: 16 },
  { id: '18', project: 'getsentry', element: 'Input', selector: '#password-input', ariaLabel: 'Password Field', deadClicks: 178, rageClicks: 34 },
  { id: '19', project: 'sentry', element: 'Button', selector: '.logout-btn', ariaLabel: 'Logout Button', deadClicks: 56, rageClicks: 7 },
  { id: '20', project: 'enigma', element: 'Menu', selector: '.dropdown-menu', ariaLabel: 'Settings Menu', deadClicks: 234, rageClicks: 28 }
];

const SelectorsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Element
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Selector
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ARIA Label
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dead Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rage Clicks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSelectors.map((selector) => (
              <tr key={selector.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selector.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selector.element}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{selector.selector}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selector.ariaLabel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selector.deadClicks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selector.rageClicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectorsPanel; 