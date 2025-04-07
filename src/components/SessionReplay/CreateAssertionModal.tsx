import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface CreateAssertionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (flowName: string, prompt: string, conditionType: string, conditionValue: string, startingAction: string, validOutcomes: string[], genericAssertions: string[]) => void;
  initialData?: {
    flowName: string;
    prompt: string;
    conditionType: string;
    conditionValue: string;
    startingAction: string;
    validOutcomes: string[];
    genericAssertions: string[];
  };
}

const CreateAssertionModal: React.FC<CreateAssertionModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [flowName, setFlowName] = useState(initialData?.flowName || '');
  const [prompt, setPrompt] = useState(initialData?.prompt || '');
  const [conditionType, setConditionType] = useState(initialData?.conditionType || 'ends-on-url');
  const [conditionValue, setConditionValue] = useState(initialData?.conditionValue || '');
  const [startingAction, setStartingAction] = useState(initialData?.startingAction || '');
  const [validOutcomes, setValidOutcomes] = useState<string[]>(initialData?.validOutcomes || []);
  const [newOutcome, setNewOutcome] = useState('');
  const [genericAssertions, setGenericAssertions] = useState<string[]>(initialData?.genericAssertions || []);

  const availableStartingActions = [
    { id: 'login_click', label: 'User clicks Login' },
    { id: 'checkout_load', label: 'Page loads /checkout' },
    { id: 'signup_click', label: 'User clicks Sign Up' },
    { id: 'cart_click', label: 'User clicks Cart' },
  ];

  const availableGenericAssertions = [
    { id: 'no_console_errors', label: 'No console errors' },
    { id: 'no_network_errors', label: 'No network errors' },
    { id: 'no_js_errors', label: 'No JavaScript errors' },
    { id: 'no_404s', label: 'No 404 errors' },
    { id: 'no_500s', label: 'No 500 errors' },
  ];

  useEffect(() => {
    if (initialData) {
      setFlowName(initialData.flowName);
      setPrompt(initialData.prompt);
      setConditionType(initialData.conditionType);
      setConditionValue(initialData.conditionValue);
      setStartingAction(initialData.startingAction);
      setValidOutcomes(initialData.validOutcomes);
      setGenericAssertions(initialData.genericAssertions);
    }
  }, [initialData]);

  const handleAddOutcome = () => {
    if (newOutcome.trim() && !validOutcomes.includes(newOutcome.trim())) {
      setValidOutcomes([...validOutcomes, newOutcome.trim()]);
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (outcome: string) => {
    setValidOutcomes(validOutcomes.filter(o => o !== outcome));
  };

  const handleToggleGenericAssertion = (assertionId: string) => {
    if (genericAssertions.includes(assertionId)) {
      setGenericAssertions(genericAssertions.filter(a => a !== assertionId));
    } else {
      setGenericAssertions([...genericAssertions, assertionId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(flowName, prompt, conditionType, conditionValue, startingAction, validOutcomes, genericAssertions);
    setFlowName('');
    setPrompt('');
    setConditionType('ends-on-url');
    setConditionValue('');
    setStartingAction('');
    setValidOutcomes([]);
    setGenericAssertions([]);
    onClose();
  };

  const handleSuggestionClick = () => {
    if (!prompt.trim()) {
      setPrompt('Account creation fields entered correctly and successful submission');
    }
  };

  const getConditionInputPlaceholder = () => {
    switch (conditionType) {
      case 'ends-on-url':
        return 'e.g., /dashboard';
      case 'no-errors':
        return '';
      case 'contains-action':
        return 'e.g., #submit-button';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Flow' : 'Create Flow'}
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
            <label htmlFor="flowName" className="block text-sm font-medium text-gray-700 mb-1">
              Flow Name
            </label>
            <input
              type="text"
              id="flowName"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              placeholder="e.g. Login Flow, Checkout Flow"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              required
            />
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Optional Description (Prompt)
            </label>
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what should happen in this flow (e.g. ends on /dashboard)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
            />
            <button
              type="button"
              onClick={handleSuggestionClick}
              className="mt-2 px-3 py-1 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
            >
              Suggestion: "Account creation fields entered correctly and successful submission"
            </button>
          </div>

          <div>
            <label htmlFor="startingAction" className="block text-sm font-medium text-gray-700 mb-1">
              Starting Action
            </label>
            <select
              id="startingAction"
              value={startingAction}
              onChange={(e) => setStartingAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valid Outcomes
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Add a valid outcome (e.g. /dashboard)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              />
              <button
                type="button"
                onClick={handleAddOutcome}
                className="px-4 py-2 text-sm font-medium text-white bg-[#584774] rounded-md hover:bg-[#4a3d63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
              >
                Add
              </button>
            </div>
            {validOutcomes.length > 0 && (
              <div className="mt-2 space-y-1">
                {validOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                    <span className="text-sm text-gray-700">{outcome}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOutcome(outcome)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="conditionType" className="block text-sm font-medium text-gray-700 mb-1">
              Condition Type
            </label>
            <select
              id="conditionType"
              value={conditionType}
              onChange={(e) => setConditionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
            >
              <option value="ends-on-url">Ends on URL</option>
              <option value="no-errors">No errors in replay</option>
              <option value="contains-action">Contains user action (click/input)</option>
            </select>
          </div>

          {conditionType !== 'no-errors' && (
            <div>
              <label htmlFor="conditionValue" className="block text-sm font-medium text-gray-700 mb-1">
                Condition Value
              </label>
              <input
                type="text"
                id="conditionValue"
                value={conditionValue}
                onChange={(e) => setConditionValue(e.target.value)}
                placeholder={getConditionInputPlaceholder()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generic Assertions
            </label>
            <div className="space-y-2">
              {availableGenericAssertions.map((assertion) => (
                <div key={assertion.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={assertion.id}
                    checked={genericAssertions.includes(assertion.id)}
                    onChange={() => handleToggleGenericAssertion(assertion.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#584774] focus:ring-[#584774]"
                  />
                  <label htmlFor={assertion.id} className="ml-2 text-sm text-gray-700">
                    {assertion.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!flowName.trim() || !startingAction}
              className="px-4 py-2 text-sm font-medium text-white bg-[#584774] rounded-md hover:bg-[#4a3d63] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initialData ? 'Save Changes' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssertionModal; 