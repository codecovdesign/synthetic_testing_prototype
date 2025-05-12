import React, { useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const getStatusColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'page load':
      return 'bg-blue-500';
    case 'click':
      return 'bg-green-500';
    case 'navigation':
      return 'bg-purple-500';
    case 'input':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

interface FlowBreadcrumbsProps {
  steps: Array<{
    id: string;
    type: string;
    name: string;
    timestamp: string;
  }>;
  onSelectStart: (id: string) => void;
  onSelectEnd: (id: string) => void;
  selectedStartId: string | null;
  selectedEndId: string | null;
  onFlowRangeSelected?: () => void;
}

const FlowBreadcrumbs: React.FC<FlowBreadcrumbsProps> = ({
  steps,
  onSelectStart,
  onSelectEnd,
  selectedStartId,
  selectedEndId,
  onFlowRangeSelected
}) => {
  const isInSelectedRange = (stepId: string) => {
    if (!selectedStartId || !selectedEndId) return false;
    const startIndex = steps.findIndex(step => step.id === selectedStartId);
    const endIndex = steps.findIndex(step => step.id === selectedEndId);
    const currentIndex = steps.findIndex(step => step.id === stepId);
    return currentIndex >= Math.min(startIndex, endIndex) && 
           currentIndex <= Math.max(startIndex, endIndex);
  };

  useEffect(() => {
    if (selectedStartId && selectedEndId && onFlowRangeSelected) {
      onFlowRangeSelected();
    }
  }, [selectedStartId, selectedEndId, onFlowRangeSelected]);

  return (
    <div className="flex flex-col space-y-1">
      {steps.map((step, index) => {
        const isStart = step.id === selectedStartId;
        const isEnd = step.id === selectedEndId;
        const inRange = isInSelectedRange(step.id);
        
        return (
          <div
            key={step.id}
            className={`
              flex items-center justify-between p-2 rounded-md cursor-pointer
              ${inRange ? 'bg-blue-50' : 'hover:bg-gray-50'}
              ${isStart || isEnd ? 'font-medium' : ''}
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center min-w-[100px]">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(step.type)}`} />
                <span className="ml-2 text-sm text-gray-600">{step.type}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{step.name}</span>
              <span className="text-sm text-gray-500">{step.timestamp}</span>
            </div>
            <div className="flex items-center space-x-2">
              {isStart && (
                <div className="flex items-center text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">Flow Start</span>
                </div>
              )}
              {isEnd && (
                <div className="flex items-center text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">Flow End</span>
                </div>
              )}
              <button
                onClick={() => onSelectStart(step.id)}
                className={`text-xs px-2 py-1 rounded ${
                  isStart ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Flow Start
              </button>
              <button
                onClick={() => onSelectEnd(step.id)}
                className={`text-xs px-2 py-1 rounded ${
                  isEnd ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Flow End
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlowBreadcrumbs; 