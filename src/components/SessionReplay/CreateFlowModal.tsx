import React, { useState } from 'react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';

interface Flow {
  name: string;
  description: string;
  startingAction: string;
  assertions: Assertion[];
  genericAssertions: string[];
}

interface Assertion {
  type: 'page' | 'locator';
  selector?: string;
  assertion: string;
}

interface CreateFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (flow: Flow) => Promise<void>;
}

const CreateFlowModal = ({ isOpen, onClose, onSave }: CreateFlowModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingAction, setStartingAction] = useState('');
  const [assertions, setAssertions] = useState<Assertion[]>([]);
  const [genericAssertions, setGenericAssertions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAssertionDropdown, setShowAssertionDropdown] = useState(false);
  const [assertionType, setAssertionType] = useState<'page' | 'locator' | null>(null);
  const [locatorSelector, setLocatorSelector] = useState('');

  const availableStartingActions = [
    { id: 'login_click', label: 'User clicks Login' },
    { id: 'checkout_load', label: 'Page loads /checkout' },
    { id: 'signup_click', label: 'User clicks Sign Up' },
    { id: 'cart_click', label: 'User clicks Cart' },
  ];

  const pageAssertions = [
    { id: 'toHaveUrl', label: 'toHaveUrl', example: "expect(page).toHaveUrl('/dashboard')" },
    { id: 'toContainText', label: 'toContainText', example: "expect(page).toContainText('Success')" },
    { id: 'toHaveTitle', label: 'toHaveTitle', example: "expect(page).toHaveTitle('Welcome')" },
  ];

  const locatorAssertions = [
    { id: 'toBeVisible', label: 'toBeVisible', example: "expect(locator('#submit')).toBeVisible()" },
    { id: 'toHaveText', label: 'toHaveText', example: "expect(locator('#submit')).toHaveText('Submit')" },
    { id: 'toBeEnabled', label: 'toBeEnabled', example: "expect(locator('#submit')).toBeEnabled()" },
  ];

  const availableGenericAssertions = [
    { id: 'no_console_errors', label: 'No console errors' },
    { id: 'no_network_errors', label: 'No network errors' },
    { id: 'no_js_errors', label: 'No JavaScript errors' },
    { id: 'no_404s', label: 'No 404 errors' },
    { id: 'no_500s', label: 'No 500 errors' },
  ];

  const handleAddAssertion = (type: 'page' | 'locator', assertion: string, selector?: string) => {
    setAssertions([...assertions, { type, assertion, selector }]);
    setAssertionType(null);
    setLocatorSelector('');
    setShowAssertionDropdown(false);
  };

  const handleRemoveAssertion = (index: number) => {
    setAssertions(assertions.filter((_, i) => i !== index));
  };

  const handleToggleGenericAssertion = (assertionId: string) => {
    if (genericAssertions.includes(assertionId)) {
      setGenericAssertions(genericAssertions.filter(a => a !== assertionId));
    } else {
      setGenericAssertions([...genericAssertions, assertionId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave({
        name,
        description,
        startingAction,
        assertions,
        genericAssertions,
      });
      onClose();
    } catch (error) {
      console.error('Error creating flow:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Flow
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Flow Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="startingAction" className="block text-sm font-medium text-gray-700 mb-1">
              Starting Action
            </label>
            <select
              id="startingAction"
              value={startingAction}
              onChange={(e) => setStartingAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
              required
            >
              <option value="">Select a starting action</option>
              {availableStartingActions.map((action) => (
                <option key={action.id} value={action.id}>
                  {action.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Assertions
              </label>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                  onClick={() => setShowAssertionDropdown(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#584774] hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                >
                  Add Assertion
                  <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setAssertionType('page')}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                        >
                          Page Assertion
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setAssertionType('locator')}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                        >
                          Locator Assertion
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>

            {assertionType === 'page' && (
              <div className="mt-2 space-y-2">
                {pageAssertions.map((assertion) => (
                  <button
                    key={assertion.id}
                    onClick={() => handleAddAssertion('page', assertion.example)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {assertion.example}
                  </button>
                ))}
              </div>
            )}

            {assertionType === 'locator' && (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Enter element selector (e.g., #submit)"
                  value={locatorSelector}
                  onChange={(e) => setLocatorSelector(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                />
                {locatorAssertions.map((assertion) => (
                  <button
                    key={assertion.id}
                    onClick={() => handleAddAssertion('locator', assertion.example, locatorSelector)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {assertion.example}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 space-y-2">
              {assertions.map((assertion, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <code className="text-sm text-gray-700">{assertion.assertion}</code>
                  <button
                    onClick={() => handleRemoveAssertion(index)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generic Assertions
            </label>
            <div className="space-y-2">
              {availableGenericAssertions.map((assertion) => (
                <label key={assertion.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={genericAssertions.includes(assertion.id)}
                    onChange={() => handleToggleGenericAssertion(assertion.id)}
                    className="h-4 w-4 text-[#584774] focus:ring-[#584774] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{assertion.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-[#584774] rounded-md hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774] disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Flow'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlowModal; 