import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';

export interface Assertion {
  type: 'page' | 'locator' | 'combined';
  selector?: string;
  assertion: string;
  pageAssertion?: {
    type: string;
    value: string;
  };
  locatorAssertion?: {
    selector: string;
    type: string;
    value?: string;
  };
}

interface CreateAssertionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (flowName: string, prompt: string, assertions: Assertion[], genericAssertions: string[]) => void;
  initialData?: {
    flowName: string;
    prompt: string;
    assertions: Assertion[];
    genericAssertions: string[];
  };
}

const CreateAssertionModal: React.FC<CreateAssertionModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [flowName, setFlowName] = useState(initialData?.flowName || 'Login');
  const [prompt, setPrompt] = useState(initialData?.prompt || '');
  const [assertions, setAssertions] = useState<Assertion[]>(initialData?.assertions || []);
  const [genericAssertions, setGenericAssertions] = useState<string[]>(initialData?.genericAssertions || []);
  const [assertionType, setAssertionType] = useState<'page' | 'locator' | 'combined' | null>(null);
  const [currentInputValue, setCurrentInputValue] = useState('');
  const [selectedAssertion, setSelectedAssertion] = useState<{ type: 'page' | 'locator' | 'combined', id: string } | null>(null);
  const [combinedAssertion, setCombinedAssertion] = useState({
    pageType: 'toHaveUrl',
    pageValue: '',
    locatorSelector: '',
    locatorType: 'toBeVisible',
    locatorValue: ''
  });
  const [showExamples, setShowExamples] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('User enters credentials and lands on dashboard');
  const [isUpdatingSuggestion, setIsUpdatingSuggestion] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestionApplied, setSuggestionApplied] = useState(false);
  const [lastGeneratedAssertion, setLastGeneratedAssertion] = useState<string | null>(null);
  const [generatedAssertions, setGeneratedAssertions] = useState([
    "expect(page).toHaveURL('/dashboard')",
    "expect(locator('#welcome-message')).toContainText('Welcome back')"
  ]);
  const [copied, setCopied] = useState(false);

  const DYNAMIC_ASSERTION_INDEX = 2;  // Index where we'll always put the dynamic assertion

  const pageAssertionTypes = [
    { id: 'toHaveUrl', label: 'toHaveUrl', placeholder: '/dashboard' },
    { id: 'toHaveTitle', label: 'toHaveTitle', placeholder: 'Checkout Page' }
  ];

  const locatorAssertionTypes = [
    { id: 'toBeVisible', label: 'toBeVisible' },
    { id: 'toContainText', label: 'toContainText', placeholder: 'Expected text' },
    { id: 'toHaveValue', label: 'toHaveValue', placeholder: 'Expected value' }
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
      setAssertions(initialData.assertions);
      setGenericAssertions(initialData.genericAssertions);
    }
  }, [initialData]);

  useEffect(() => {
    // Pre-populate the prompt with the AI suggestion
    if (!initialData?.prompt) {
      setPrompt(aiSuggestion);
    }
  }, [initialData]);

  const handleAddAssertion = (type: 'page' | 'locator' | 'combined', assertion: string, selector?: string) => {
    setAssertions([...assertions, { type, assertion, selector }]);
    setCurrentInputValue('');
    setSelectedAssertion(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(flowName, prompt, assertions, genericAssertions);
    setFlowName('');
    setPrompt('');
    setAssertions([]);
    setGenericAssertions([]);
    setAssertionType(null);
    onClose();
  };

  const handleUpdateSuggestion = () => {
    setIsUpdatingSuggestion(true);
    setTimeout(() => {
      setIsUpdatingSuggestion(false);
    }, 1500);
  };

  const handleFlowNameBlur = () => {
    if (flowName.trim()) {
      setIsGenerating(true);
      setTimeout(() => {
        const newAssertion = `expect(locator('#${flowName.toLowerCase()}-button')).toBeVisible()`;
        setGeneratedAssertions(prev => {
          const newAssertions = [...prev];
          if (newAssertions.length > DYNAMIC_ASSERTION_INDEX) {
            newAssertions[DYNAMIC_ASSERTION_INDEX] = newAssertion;
          } else {
            newAssertions.push(newAssertion);
          }
          return newAssertions;
        });
        setIsGenerating(false);
      }, 1500);
    }
  };

  const handleFlowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFlowName(newName);
    setIsGenerating(true);
    setTimeout(() => {
      const newAssertion = `expect(locator('#${newName.toLowerCase()}-button')).toBeVisible()`;
      setGeneratedAssertions(prev => {
        const newAssertions = [...prev];
        if (newAssertions.length > DYNAMIC_ASSERTION_INDEX) {
          newAssertions[DYNAMIC_ASSERTION_INDEX] = newAssertion;
        } else {
          newAssertions.push(newAssertion);
        }
        return newAssertions;
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handlePromptBlur = () => {
    if (prompt.trim()) {
      setIsGenerating(true);
      setTimeout(() => {
        const newAssertion = 'expect(value).toBe(user-password)';
        setGeneratedAssertions(prev => {
          const newAssertions = [...prev];
          newAssertions.push(newAssertion);
          return newAssertions;
        });
        setIsGenerating(false);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8 flex flex-col">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
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
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            <div className="pt-4">
              <label htmlFor="flowName" className="block text-sm font-medium text-gray-700 mb-1">
                Flow Name
              </label>
              <input
                type="text"
                id="flowName"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                required
              />
            </div>

            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                onBlur={handlePromptBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                rows={3}
                placeholder="Describe what this assertion should verify"
              />
            </div>

            <div className="mt-4 relative">
              <div className="space-y-2">
                {generatedAssertions.map((assertion, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded">
                    <input
                      type="text"
                      value={assertion}
                      onChange={(e) => {
                        const newAssertions = [...generatedAssertions];
                        newAssertions[index] = e.target.value;
                        setGeneratedAssertions(newAssertions);
                      }}
                      className="w-full bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774] px-2 py-1"
                    />
                  </div>
                ))}
              </div>
              {isGenerating && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="animate-pulse">✨</span>
                    <span>Generating suggestions...</span>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-4 gap-2">
                {suggestionApplied ? (
                  <>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-1"
                      disabled
                    >
                      Suggestion applied ✅
                    </button>
                    <button
                      type="button"
                      onClick={() => setSuggestionApplied(false)}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => {
                        setIsGenerating(false);
                        setSuggestionApplied(true);
                      }, 1000);
                    }}
                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-1"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-1">
                        <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      <span>✨ Use Suggestion</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Manual Assertions
                </label>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button
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
                            type="button"
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
                            type="button"
                            onClick={() => setAssertionType('locator')}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                          >
                            Locator Assertion
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setAssertionType('combined')}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                          >
                            Combined Assertion
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>

              {assertionType === 'page' && (
                <div className="mt-2 space-y-2">
                  {pageAssertionTypes.map((assertion) => (
                    <div key={assertion.id} className="flex flex-col space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAssertion({ type: 'page', id: assertion.id });
                          setCurrentInputValue(assertion.placeholder || '');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {assertion.label}
                      </button>
                      {assertion.id === 'toHaveUrl' && selectedAssertion?.id === assertion.id && (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={currentInputValue}
                            placeholder={assertion.placeholder}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                            onChange={(e) => setCurrentInputValue(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newExample = assertion.label.replace(
                                assertion.placeholder || '',
                                currentInputValue
                              );
                              handleAddAssertion('page', newExample);
                            }}
                            className="px-4 py-2 text-sm text-white bg-[#584774] rounded-md hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                          >
                            Add Page Assertion
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {assertionType === 'locator' && (
                <div className="mt-2 space-y-2">
                  {locatorAssertionTypes.map((assertion) => (
                    <div key={assertion.id} className="flex flex-col space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAssertion({ type: 'locator', id: assertion.id });
                          setCurrentInputValue(assertion.placeholder || '');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {assertion.label}
                      </button>
                      {assertion.id === 'toBeVisible' && selectedAssertion?.id === assertion.id && (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={currentInputValue}
                            placeholder={assertion.placeholder}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                            onChange={(e) => setCurrentInputValue(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newExample = assertion.label.replace(
                                assertion.placeholder || '',
                                currentInputValue
                              );
                              handleAddAssertion('locator', newExample, currentInputValue);
                            }}
                            className="px-4 py-2 text-sm text-white bg-[#584774] rounded-md hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                          >
                            Add Locator Assertion
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {assertionType === 'combined' && (
                <div className="mt-4 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Page Assertion</h3>
                    <div className="flex space-x-2">
                      <select
                        value={combinedAssertion.pageType}
                        onChange={(e) => setCombinedAssertion({ ...combinedAssertion, pageType: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                      >
                        {pageAssertionTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={combinedAssertion.pageValue}
                        onChange={(e) => setCombinedAssertion({ ...combinedAssertion, pageValue: e.target.value })}
                        placeholder={pageAssertionTypes.find(t => t.id === combinedAssertion.pageType)?.placeholder}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Locator Assertion</h3>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={combinedAssertion.locatorSelector}
                        onChange={(e) => setCombinedAssertion({ ...combinedAssertion, locatorSelector: e.target.value })}
                        placeholder="Element selector (e.g., #submit-button)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                      />
                      <select
                        value={combinedAssertion.locatorType}
                        onChange={(e) => setCombinedAssertion({ ...combinedAssertion, locatorType: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                      >
                        {locatorAssertionTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {combinedAssertion.locatorType !== 'toBeVisible' && (
                        <input
                          type="text"
                          value={combinedAssertion.locatorValue}
                          onChange={(e) => setCombinedAssertion({ ...combinedAssertion, locatorValue: e.target.value })}
                          placeholder={locatorAssertionTypes.find(t => t.id === combinedAssertion.locatorType)?.placeholder}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#584774] focus:border-[#584774]"
                        />
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const pageAssertion = `expect(page).${combinedAssertion.pageType}('${combinedAssertion.pageValue}')`;
                      const locatorAssertion = combinedAssertion.locatorType === 'toBeVisible'
                        ? `expect(locator('${combinedAssertion.locatorSelector}')).toBeVisible()`
                        : `expect(locator('${combinedAssertion.locatorSelector}')).${combinedAssertion.locatorType}('${combinedAssertion.locatorValue}')`;
                      
                      const combinedAssertionString = `${pageAssertion} && ${locatorAssertion}`;
                      
                      setAssertions([...assertions, {
                        type: 'combined',
                        assertion: combinedAssertionString,
                        pageAssertion: {
                          type: combinedAssertion.pageType,
                          value: combinedAssertion.pageValue
                        },
                        locatorAssertion: {
                          selector: combinedAssertion.locatorSelector,
                          type: combinedAssertion.locatorType,
                          value: combinedAssertion.locatorValue
                        }
                      }]);

                      // Reset the form but keep the modal open
                      setCombinedAssertion({
                        pageType: 'toHaveUrl',
                        pageValue: '',
                        locatorSelector: '',
                        locatorType: 'toBeVisible',
                        locatorValue: ''
                      });
                    }}
                    className="w-full px-4 py-2 text-sm text-white bg-[#584774] rounded-md hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                  >
                    Add Combined Assertion
                  </button>
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
          </div>
          <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200 px-6 pb-6">
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
                className="px-4 py-2 text-white bg-[#584774] rounded-md hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
              >
                Create Assertion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssertionModal; 