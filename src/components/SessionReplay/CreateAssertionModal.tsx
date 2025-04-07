import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface CreateAssertionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (flowName: string, prompt: string, conditionType: string, conditionValue: string) => void;
  initialData?: {
    flowName: string;
    prompt: string;
    conditionType: string;
    conditionValue: string;
  };
}

const CreateAssertionModal: React.FC<CreateAssertionModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [flowName, setFlowName] = useState(initialData?.flowName || '');
  const [prompt, setPrompt] = useState(initialData?.prompt || '');
  const [conditionType, setConditionType] = useState(initialData?.conditionType || 'ends-on-url');
  const [conditionValue, setConditionValue] = useState(initialData?.conditionValue || '');

  useEffect(() => {
    if (initialData) {
      setFlowName(initialData.flowName);
      setPrompt(initialData.prompt);
      setConditionType(initialData.conditionType);
      setConditionValue(initialData.conditionValue);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(flowName, prompt, conditionType, conditionValue);
    setFlowName('');
    setPrompt('');
    setConditionType('ends-on-url');
    setConditionValue('');
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
              Assertion Flow Name
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
              disabled={!flowName.trim()}
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