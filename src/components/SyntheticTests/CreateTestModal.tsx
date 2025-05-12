import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testName: string, environments: string[], addedAssertions: string) => void;
}

const predefinedAssertions = [
  { id: 'toBeAttached', label: 'await expect(locator).toBeAttached()', description: 'Element is attached' },
  { id: 'toBeChecked', label: 'await expect(locator).toBeChecked()', description: 'Checkbox is checked' },
  { id: 'toBeDisabled', label: 'await expect(locator).toBeDisabled()', description: 'Element is disabled' },
  { id: 'toBeEditable', label: 'await expect(locator).toBeEditable()', description: 'Element is editable' },
  { id: 'toBeEmpty', label: 'await expect(locator).toBeEmpty()', description: 'Container is empty' },
  { id: 'toBeEnabled', label: 'await expect(locator).toBeEnabled()', description: 'Element is enabled' },
  { id: 'toBeFocused', label: 'await expect(locator).toBeFocused()', description: 'Element is focused' },
  { id: 'toBeHidden', label: 'await expect(locator).toBeHidden()', description: 'Element is not visible' },
  { id: 'toBeInViewport', label: 'await expect(locator).toBeInViewport()', description: 'Element intersects viewport' },
  { id: 'toBeVisible', label: 'await expect(locator).toBeVisible()', description: 'Element is visible' },
  { id: 'toContainText', label: 'await expect(locator).toContainText()', description: 'Element contains text' },
  { id: 'toHaveAccessibleDescription', label: 'await expect(locator).toHaveAccessibleDescription()', description: 'Element has a matching accessible description' },
  { id: 'toHaveAccessibleName', label: 'await expect(locator).toHaveAccessibleName()', description: 'Element has a matching accessible name' },
  { id: 'toHaveAttribute', label: 'await expect(locator).toHaveAttribute()', description: 'Element has a DOM attribute' },
  { id: 'toHaveClass', label: 'await expect(locator).toHaveClass()', description: 'Element has a class property' },
  { id: 'toHaveCount', label: 'await expect(locator).toHaveCount()', description: 'List has exact number of children' },
  { id: 'toHaveCSS', label: 'await expect(locator).toHaveCSS()', description: 'Element has CSS property' },
  { id: 'toHaveId', label: 'await expect(locator).toHaveId()', description: 'Element has an ID' },
  { id: 'toHaveJSProperty', label: 'await expect(locator).toHaveJSProperty()', description: 'Element has a JavaScript property' },
  { id: 'toHaveRole', label: 'await expect(locator).toHaveRole()', description: 'Element has a specific ARIA role' },
  { id: 'toHaveScreenshot', label: 'await expect(locator).toHaveScreenshot()', description: 'Element has a screenshot' },
  { id: 'toHaveText', label: 'await expect(locator).toHaveText()', description: 'Element matches text' },
  { id: 'toHaveValue', label: 'await expect(locator).toHaveValue()', description: 'Input has a value' },
  { id: 'toHaveValues', label: 'await expect(locator).toHaveValues()', description: 'Select has options selected' },
  { id: 'pageToHaveScreenshot', label: 'await expect(page).toHaveScreenshot()', description: 'Page has a screenshot' },
  { id: 'pageToHaveTitle', label: 'await expect(page).toHaveTitle()', description: 'Page has a title' },
  { id: 'pageToHaveURL', label: 'await expect(page).toHaveURL()', description: 'Page has a URL' },
  { id: 'toBeOK', label: 'await expect(response).toBeOK()', description: 'Response has an OK status' },
  { id: 'toBe', label: 'expect(value).toBe()', description: 'Value is the same' },
  { id: 'toBeCloseTo', label: 'expect(value).toBeCloseTo()', description: 'Number is approximately equal' },
  { id: 'toBeDefined', label: 'expect(value).toBeDefined()', description: 'Value is not undefined' },
  { id: 'toBeFalsy', label: 'expect(value).toBeFalsy()', description: 'Value is falsy, e.g. false, 0, null, etc.' },
  { id: 'toBeGreaterThan', label: 'expect(value).toBeGreaterThan()', description: 'Number is more than' },
  { id: 'toBeGreaterThanOrEqual', label: 'expect(value).toBeGreaterThanOrEqual()', description: 'Number is more than or equal' },
  { id: 'toBeInstanceOf', label: 'expect(value).toBeInstanceOf()', description: 'Object is an instance of a class' },
  { id: 'toBeLessThan', label: 'expect(value).toBeLessThan()', description: 'Number is less than' },
  { id: 'toBeLessThanOrEqual', label: 'expect(value).toBeLessThanOrEqual()', description: 'Number is less than or equal' },
  { id: 'toBeNaN', label: 'expect(value).toBeNaN()', description: 'Value is NaN' },
  { id: 'toBeNull', label: 'expect(value).toBeNull()', description: 'Value is null' },
  { id: 'toBeTruthy', label: 'expect(value).toBeTruthy()', description: 'Value is truthy, i.e. not false, 0, null, etc.' },
  { id: 'toBeUndefined', label: 'expect(value).toBeUndefined()', description: 'Value is undefined' },
  { id: 'toContain', label: 'expect(value).toContain()', description: 'String contains a substring or Array contains an element' },
  { id: 'toContainEqual', label: 'expect(value).toContainEqual()', description: 'Array or set contains a similar element' },
  { id: 'toEqual', label: 'expect(value).toEqual()', description: 'Value is similar (deep equality and pattern matching)' },
  { id: 'toHaveLength', label: 'expect(value).toHaveLength()', description: 'Array or string has length' },
  { id: 'toHaveProperty', label: 'expect(value).toHaveProperty()', description: 'Object has a property' },
  { id: 'toMatch', label: 'expect(value).toMatch()', description: 'String matches a regular expression' },
  { id: 'toMatchObject', label: 'expect(value).toMatchObject()', description: 'Object contains specified properties' },
  { id: 'toStrictEqual', label: 'expect(value).toStrictEqual()', description: 'Value is similar, including property types' },
  { id: 'toThrow', label: 'expect(value).toThrow()', description: 'Function throws an error' },
  { id: 'any', label: 'expect(value).any()', description: 'Matches any instance of a class/primitive' },
  { id: 'anything', label: 'expect(value).anything()', description: 'Matches anything' },
  { id: 'arrayContaining', label: 'expect(value).arrayContaining()', description: 'Array contains specific elements' },
  { id: 'closeTo', label: 'expect(value).closeTo()', description: 'Number is approximately equal' },
  { id: 'objectContaining', label: 'expect(value).objectContaining()', description: 'Object contains specific properties' },
  { id: 'stringContaining', label: 'expect(value).stringContaining()', description: 'String contains a substring' },
  { id: 'stringMatching', label: 'expect(value).stringMatching()', description: 'String matches a regular expression' }
];

interface AssertionInput {
  id: string;
  search: string;
  selectedAssertion: string | null;
  isOpen: boolean;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [testName, setTestName] = useState('');
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);
  const [assertionInputs, setAssertionInputs] = useState<AssertionInput[]>([]);
  const [highlightedIndices, setHighlightedIndices] = useState<{ [key: string]: number }>({});
  const dropdownRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const environments = [
    { id: 'staging', name: 'Staging' },
    { id: 'production', name: 'Production' }
  ];

  // Handle click outside to close dropdowns
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setAssertionInputs(prev => 
            prev.map(input => input.id === id ? { ...input, isOpen: false } : input)
          );
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addNewAssertionInput = () => {
    const newId = `assertion-${Date.now()}`;
    setAssertionInputs(prev => [...prev, {
      id: newId,
      search: '',
      selectedAssertion: null,
      isOpen: false
    }]);
  };

  const handleAssertionSearch = (id: string, value: string) => {
    setAssertionInputs(prev => 
      prev.map(input => input.id === id ? { 
        ...input, 
        search: value, 
        isOpen: true,
        // Clear selection if user starts typing
        selectedAssertion: value === '' ? null : input.selectedAssertion 
      } : input)
    );
    setHighlightedIndices(prev => ({ ...prev, [id]: -1 }));
  };

  const handleAssertionSelect = (id: string, assertion: typeof predefinedAssertions[0]) => {
    setAssertionInputs(prev => 
      prev.map(input => input.id === id ? {
        ...input,
        selectedAssertion: assertion.label,
        search: assertion.label,
        isOpen: false
      } : input)
    );
    setHighlightedIndices(prev => ({ ...prev, [id]: -1 }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    const input = assertionInputs.find(i => i.id === id);
    if (!input?.isOpen) return;

    const filtered = predefinedAssertions.filter(a => 
      a.label.toLowerCase().includes(input.search.toLowerCase()) ||
      a.description.toLowerCase().includes(input.search.toLowerCase())
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndices(prev => ({
          ...prev,
          [id]: Math.min((prev[id] ?? -1) + 1, filtered.length - 1)
        }));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndices(prev => ({
          ...prev,
          [id]: Math.max((prev[id] ?? -1) - 1, 0)
        }));
        break;
      case 'Enter':
        e.preventDefault();
        const highlightedIndex = highlightedIndices[id] ?? -1;
        if (highlightedIndex >= 0) {
          handleAssertionSelect(id, filtered[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setAssertionInputs(prev => 
          prev.map(input => input.id === id ? { ...input, isOpen: false } : input)
        );
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testName.trim() && selectedEnvironments.length > 0) {
      const assertionString = assertionInputs
        .filter(input => input.selectedAssertion)
        .map(input => input.selectedAssertion)
        .join(' AND ');
      onSubmit(testName, selectedEnvironments, assertionString);
      setTestName('');
      setSelectedEnvironments([]);
      setAssertionInputs([]);
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
              Create New Flow
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assertions
              </label>
              <div className="space-y-3">
                {assertionInputs.map((input) => (
                  <div key={input.id} className="relative">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        {input.selectedAssertion ? (
                          <div className="flex items-center space-x-2 bg-gray-50 rounded-md px-3 py-2">
                            <span className="font-mono text-sm text-gray-900">{input.selectedAssertion}</span>
                            <button
                              type="button"
                              onClick={() => setAssertionInputs(prev => 
                                prev.map(i => i.id === input.id ? { ...i, selectedAssertion: null, search: '' } : i)
                              )}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={input.search}
                              onChange={(e) => handleAssertionSearch(input.id, e.target.value)}
                              onFocus={() => setAssertionInputs(prev => 
                                prev.map(i => i.id === input.id ? { ...i, isOpen: true } : i)
                              )}
                              onKeyDown={(e) => handleKeyDown(e, input.id)}
                              placeholder="Type to search assertions..."
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#584774] focus:ring-[#584774] sm:text-sm"
                            />
                            {input.isOpen && (
                              <div
                                ref={el => dropdownRefs.current[input.id] = el}
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
                              >
                                {predefinedAssertions
                                  .filter(a => 
                                    a.label.toLowerCase().includes(input.search.toLowerCase()) ||
                                    a.description.toLowerCase().includes(input.search.toLowerCase())
                                  )
                                  .map((assertion, index) => (
                                    <div
                                      key={assertion.id}
                                      className={`cursor-pointer select-none relative py-2 px-3 ${
                                        index === (highlightedIndices[input.id] ?? -1) ? 'bg-[#584774] text-white' : 'hover:bg-gray-100'
                                      }`}
                                      onClick={() => handleAssertionSelect(input.id, assertion)}
                                      onMouseEnter={() => setHighlightedIndices(prev => ({ ...prev, [input.id]: index }))}
                                    >
                                      <div className="flex flex-col">
                                        <span className={`font-mono text-sm ${index === (highlightedIndices[input.id] ?? -1) ? 'text-white' : ''}`}>
                                          {assertion.label}
                                        </span>
                                        <span className={`text-xs ${index === (highlightedIndices[input.id] ?? -1) ? 'text-gray-200' : 'text-gray-500'}`}>
                                          {assertion.description}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNewAssertionInput}
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#584774]"
                >
                  Add Assertion
                </button>
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
                Create Flow
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateTestModal; 