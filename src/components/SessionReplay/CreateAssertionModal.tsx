import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronDownIcon, SparklesIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Menu, Dialog } from '@headlessui/react';

export interface Assertion {
  selector: string;
  type: 'exists' | 'visible' | 'enabled' | 'contains';
  value?: string;
}

interface EndAssertion {
  type: string;
  target: string;
}

interface AssertionInput {
  id: string;
  value: string;
}

interface CreateAssertionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (flowName: string, assertions: Assertion[]) => void;
  initialData?: {
    flowName: string;
    assertions: Assertion[];
  };
  flowRange?: {
    start: {
      type: string;
      name: string;
      timestamp: string;
    };
    end: {
      type: string;
      name: string;
      timestamp: string;
    };
  };
}

const CreateAssertionModal: React.FC<CreateAssertionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {
    flowName: '',
    assertions: []
  },
  flowRange
}) => {
  const [flowName, setFlowName] = useState(initialData.flowName);
  const [assertions, setAssertions] = useState<Assertion[]>(initialData.assertions);
  const [assertionInputs, setAssertionInputs] = useState<AssertionInput[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
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
  const [endAssertions, setEndAssertions] = useState<EndAssertion[]>([]);
  const [currentEndAssertion, setCurrentEndAssertion] = useState<EndAssertion>({ type: '', target: '' });
  const [showEndAssertionDropdown, setShowEndAssertionDropdown] = useState(false);
  const [showTargetInput, setShowTargetInput] = useState(false);
  const [tempTarget, setTempTarget] = useState('');

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

  const assertionTypes = [
    { id: 'toBeVisible', label: 'toBeVisible()', example: 'expect(locator).toBeVisible()' },
    { id: 'toHaveText', label: 'toHaveText()', example: 'expect(locator).toHaveText()' },
    { id: 'toBeEnabled', label: 'toBeEnabled()', example: 'expect(locator).toBeEnabled()' },
    { id: 'toHaveValue', label: 'toHaveValue()', example: 'expect(locator).toHaveValue()' },
    { id: 'toHaveUrl', label: 'toHaveUrl()', example: 'expect(page).toHaveUrl()' },
    { id: 'toHaveTitle', label: 'toHaveTitle()', example: 'expect(page).toHaveTitle()' },
    { id: 'toContainText', label: 'toContainText()', example: 'expect(page).toContainText()' },
  ];

  useEffect(() => {
    if (initialData) {
      setFlowName(initialData.flowName);
      setAssertions(initialData.assertions);
    }
  }, [initialData]);

  useEffect(() => {
    // Pre-populate the prompt with the AI suggestion
    if (!initialData?.assertions) {
      setAssertions([
        {
          selector: '',
          type: 'exists',
          value: aiSuggestion
        }
      ]);
    }
  }, [initialData]);

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addNewAssertionInput = (defaultValue: string = '') => {
    const newId = `assertion-${Date.now()}`;
    setAssertionInputs(prev => [...prev, {
      id: newId,
      value: defaultValue
    }]);
    setShowDropdown(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  };

  const handleAssertionSelect = (assertion: typeof assertionTypes[0]) => {
    addNewAssertionInput(assertion.example);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    const filtered = assertionTypes.filter(a => 
      a.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.example && a.example.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleAssertionSelect(filtered[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        break;
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setAssertionInputs(prev => 
      prev.map(input => input.id === id ? { ...input, value } : input)
    );
  };

  const handleRemoveAssertion = (id: string) => {
    setAssertionInputs(prev => prev.filter(input => input.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAssertions: Assertion[] = assertionInputs.map(input => ({
      selector: '',
      type: 'exists' as const,
      value: input.value
    }));
    onSubmit(flowName, formattedAssertions);
    setFlowName('');
    setAssertionInputs([]);
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

  const handlePromptBlur = () => {
    if (assertions && assertions[0]?.value?.trim()) {
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

  const generateFlowDescription = () => {
    if (!flowRange) return '';
    
    const startPath = flowRange.start.name;
    const endPath = flowRange.end.name;
    
    // Extract the main action from the end path
    const endAction = endPath.split('/').pop() || '';
    
    // Generate a natural language description
    return `User proceeds from ${startPath} through the flow and lands on ${endAction} page.`;
  };

  const handleUseSuggestion = () => {
    const description = generateFlowDescription();
    setAssertions([
      {
        selector: '',
        type: 'exists',
        value: description
      }
    ]);
  };

  const handleAddEndAssertion = () => {
    if (currentEndAssertion.type && currentEndAssertion.target) {
      setEndAssertions([...endAssertions, currentEndAssertion]);
      setCurrentEndAssertion({ type: '', target: '' });
      setShowEndAssertionDropdown(false);
    }
  };

  const handleRemoveEndAssertion = (index: number) => {
    setEndAssertions(endAssertions.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[100] overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 z-[100]" />
      <div className="flex items-center justify-center min-h-screen relative z-[100]">
        <Dialog.Panel className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Create New Flow
              </Dialog.Title>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Flow Range Display */}
            {flowRange && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-1">Flow Range:</div>
                  <div>Start: {flowRange.start.name}</div>
                  <div>End: {flowRange.end.name}</div>
                </div>
              </div>
            )}

            {/* Flow Name Input */}
            <div>
              <label htmlFor="flowName" className="block text-sm font-medium text-gray-700 mb-2">
                Flow Name
              </label>
              <input
                type="text"
                id="flowName"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774]"
                placeholder="Enter flow name"
                required
              />
            </div>

            {/* Assertions Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assertions
              </label>
              <div className="space-y-4">
                {assertionInputs.map((input, index) => (
                  <div key={input.id} className="relative">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={input.value}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="flex-1 font-mono px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774]"
                        placeholder="Enter assertion..."
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAssertion(input.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                    {index < assertionInputs.length - 1 && (
                      <div className="mt-2 text-sm font-medium text-gray-500 text-center">AND</div>
                    )}
                  </div>
                ))}

                {/* Add Assertion Button */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#584774] hover:bg-[#4a3c62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Assertion
                  </button>

                  {/* Assertion Dropdown */}
                  {showDropdown && (
                    <div className="absolute z-10 mt-2 w-96 bg-white rounded-md shadow-lg border border-gray-200">
                      <div className="p-2">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#584774]"
                          placeholder="Search assertions..."
                          autoFocus
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {assertionTypes
                          .filter(a => 
                            a.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (a.example && a.example.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .map((assertion, index) => (
                            <button
                              key={assertion.id}
                              onClick={() => handleAssertionSelect(assertion)}
                              className={`w-full text-left px-4 py-2 text-sm ${
                                index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="font-medium">{assertion.label}</div>
                              <div className="text-gray-500 font-mono text-xs mt-1">{assertion.example}</div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
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
                  Create Flow
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateAssertionModal; 