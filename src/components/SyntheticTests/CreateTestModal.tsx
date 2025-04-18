import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testName: string, environments: string[]) => void;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [testName, setTestName] = useState('');
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

  const environments = [
    { id: 'staging', name: 'Staging' },
    { id: 'production', name: 'Production' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testName.trim() && selectedEnvironments.length > 0) {
      onSubmit(testName, selectedEnvironments);
      setTestName('');
      setSelectedEnvironments([]);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Create New Test
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
                Test Name
              </label>
              <input
                type="text"
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#584774] focus:ring-[#584774] sm:text-sm"
                placeholder="Enter test name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Environments
              </label>
              <div className="space-y-2">
                {environments.map((env) => (
                  <label key={env.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEnvironments.includes(env.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEnvironments([...selectedEnvironments, env.id]);
                        } else {
                          setSelectedEnvironments(selectedEnvironments.filter(id => id !== env.id));
                        }
                      }}
                      className="h-4 w-4 text-[#584774] focus:ring-[#584774] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{env.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!testName.trim() || selectedEnvironments.length === 0}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[#584774] hover:bg-[#473661] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Test
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateTestModal; 