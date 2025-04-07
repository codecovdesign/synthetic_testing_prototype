import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Flow {
  name: string;
  description: string;
  startingAction: string;
  validOutcomes: string[];
  genericAssertions: string[];
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
  const [validOutcomes, setValidOutcomes] = useState<string[]>([]);
  const [newOutcome, setNewOutcome] = useState('');
  const [genericAssertions, setGenericAssertions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave({
        name,
        description,
        startingAction,
        validOutcomes,
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
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
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#584774] focus:border-[#584774]"
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
              disabled={isSubmitting || !name.trim() || !startingAction}
              className="px-4 py-2 text-sm font-medium text-white bg-[#584774] rounded-md hover:bg-[#4a3d63] disabled:opacity-50 disabled:cursor-not-allowed"
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