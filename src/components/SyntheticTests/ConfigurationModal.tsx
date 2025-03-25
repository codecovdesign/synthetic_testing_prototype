import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Environment {
  id: string;
  name: string;
  baseUrl: string;
  gitBranch: string;
  delay: number;
}

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockEnvironments: Environment[] = [
  {
    id: '1',
    name: 'Staging',
    baseUrl: 'https://staging.example.com',
    gitBranch: 'develop',
    delay: 10
  },
  {
    id: '2',
    name: 'Production',
    baseUrl: 'https://app.example.com',
    gitBranch: 'main',
    delay: 30
  }
];

const delayOptions = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hr' }
];

const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ isOpen, onClose }) => {
  const [environments, setEnvironments] = useState<Environment[]>(mockEnvironments);
  const [showNewEnvironment, setShowNewEnvironment] = useState(false);
  const [newEnvironment, setNewEnvironment] = useState<Partial<Environment>>({
    name: '',
    baseUrl: '',
    gitBranch: '',
    delay: 10
  });

  const handleSave = () => {
    if (newEnvironment.name && newEnvironment.baseUrl && newEnvironment.gitBranch) {
      setEnvironments([...environments, { ...newEnvironment, id: Date.now().toString() } as Environment]);
      setShowNewEnvironment(false);
      setNewEnvironment({
        name: '',
        baseUrl: '',
        gitBranch: '',
        delay: 10
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Configuration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Existing Environments */}
          <div className="space-y-6">
            {environments.map((env) => (
              <div key={env.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">🔧</span>
                  <h3 className="text-lg font-medium text-gray-900">{env.name}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Base URL: {env.baseUrl}</div>
                  <div>Git Branch: {env.gitBranch}</div>
                  <div>Delay: {env.delay} minutes</div>
                </div>
              </div>
            ))}
          </div>

          {/* Create New Environment */}
          {!showNewEnvironment ? (
            <button
              onClick={() => setShowNewEnvironment(true)}
              className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
            >
              + Create New Environment
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Environment Name</label>
                  <input
                    type="text"
                    value={newEnvironment.name}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                    placeholder="e.g., Staging"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Base URL</label>
                  <input
                    type="text"
                    value={newEnvironment.baseUrl}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, baseUrl: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Git Branch</label>
                  <input
                    type="text"
                    value={newEnvironment.gitBranch}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, gitBranch: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                    placeholder="e.g., develop"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Delay</label>
                <select
                  value={newEnvironment.delay}
                  onChange={(e) => setNewEnvironment({ ...newEnvironment, delay: Number(e.target.value) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                >
                  {delayOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={() => {
              setShowNewEnvironment(false);
              setNewEnvironment({
                name: '',
                baseUrl: '',
                gitBranch: '',
                delay: 10
              });
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#584774] hover:bg-[#4a3b5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationModal; 