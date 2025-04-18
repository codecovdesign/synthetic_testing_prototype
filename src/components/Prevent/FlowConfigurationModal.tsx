import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Environment {
  id: string;
  name: string;
  baseUrl: string;
  authType: 'none' | 'basic' | 'token' | 'custom';
  authToken?: string;
  username?: string;
  password?: string;
  headerKey?: string;
  headerValue?: string;
  startPath?: string;
}

interface FlowConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockEnvironments: Environment[] = [
  {
    id: '2',
    name: 'Production',
    baseUrl: 'https://app.example.com',
    authType: 'token',
    authToken: 'Bearer ••••••••',
    startPath: '/dashboard'
  }
];

const authTypeOptions = [
  { value: 'none', label: 'None' },
  { value: 'basic', label: 'Basic Auth' },
  { value: 'token', label: 'Token' },
  { value: 'custom', label: 'Custom Header' }
];

const FlowConfigurationModal: React.FC<FlowConfigurationModalProps> = ({ isOpen, onClose }) => {
  const [environments, setEnvironments] = useState<Environment[]>(mockEnvironments);
  const [showNewEnvironment, setShowNewEnvironment] = useState(false);
  const [newEnvironment, setNewEnvironment] = useState<Partial<Environment>>({
    name: '',
    baseUrl: '',
    authType: 'none',
    startPath: ''
  });

  const handleSave = () => {
    if (newEnvironment.name && newEnvironment.baseUrl) {
      setEnvironments([...environments, { ...newEnvironment, id: Date.now().toString() } as Environment]);
      setShowNewEnvironment(false);
      setNewEnvironment({
        name: '',
        baseUrl: '',
        authType: 'none',
        startPath: ''
      });
      onClose();
    }
  };

  const renderAuthFields = () => {
    switch (newEnvironment.authType) {
      case 'basic':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={newEnvironment.username || ''}
                onChange={(e) => setNewEnvironment({ ...newEnvironment, username: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={newEnvironment.password || ''}
                onChange={(e) => setNewEnvironment({ ...newEnvironment, password: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                placeholder="Enter password"
              />
            </div>
          </div>
        );
      case 'token':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Auth Token</label>
            <input
              type="text"
              value={newEnvironment.authToken || ''}
              onChange={(e) => setNewEnvironment({ ...newEnvironment, authToken: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
              placeholder="Enter auth token"
            />
          </div>
        );
      case 'custom':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Header Key</label>
              <input
                type="text"
                value={newEnvironment.headerKey || ''}
                onChange={(e) => setNewEnvironment({ ...newEnvironment, headerKey: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                placeholder="Enter header key"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Header Value</label>
              <input
                type="text"
                value={newEnvironment.headerValue || ''}
                onChange={(e) => setNewEnvironment({ ...newEnvironment, headerValue: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                placeholder="Enter header value"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Flow Configuration</h2>
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
                  <div>Auth Type: {env.authType === 'none' ? 'None' : 
                    env.authType === 'basic' ? 'Basic Auth' :
                    env.authType === 'token' ? 'Token' : 'Custom Header'}</div>
                  {env.authType === 'token' && (
                    <div>Auth Token: {env.authToken}</div>
                  )}
                  <div>Start Path: {env.startPath}</div>
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
              Edit Production Details
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Environment Name</label>
                  <input
                    type="text"
                    value={newEnvironment.name}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                    placeholder="e.g., Preview"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Base URL</label>
                  <input
                    type="text"
                    value={newEnvironment.baseUrl}
                    onChange={(e) => setNewEnvironment({ ...newEnvironment, baseUrl: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                    placeholder="https://preview.example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Authentication Type</label>
                <select
                  value={newEnvironment.authType}
                  onChange={(e) => setNewEnvironment({ ...newEnvironment, authType: e.target.value as Environment['authType'] })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                >
                  {authTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {renderAuthFields()}
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Path (optional)</label>
                <input
                  type="text"
                  value={newEnvironment.startPath || ''}
                  onChange={(e) => setNewEnvironment({ ...newEnvironment, startPath: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#584774] focus:border-[#584774] sm:text-sm"
                  placeholder="/home"
                />
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
                authType: 'none',
                startPath: ''
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

export default FlowConfigurationModal; 