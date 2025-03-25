import React from 'react';
import { format, subDays } from 'date-fns';
import { Link } from 'react-router-dom';

interface DailyTestResult {
  date: Date;
  passed: number;
  failed: number;
  skipped: number;
  hasIssues: boolean;
}

interface TestResultsChartProps {
  openIssuesCount: number;
  dailyResults: DailyTestResult[];
}

const TestResultsChart: React.FC<TestResultsChartProps> = ({ openIssuesCount, dailyResults }) => {
  const maxTests = Math.max(...dailyResults.map(day => day.passed + day.failed + day.skipped));
  const chartHeight = 150;
  const barPadding = 20;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-8">
        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          <Link to="/issues" className="text-4xl font-bold text-blue-600 hover:text-blue-800">
            {openIssuesCount}
          </Link>
          <div className="text-sm text-gray-500">Open Issues</div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="relative pb-6" style={{ height: chartHeight }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
              <span>{maxTests}</span>
              <span>{Math.floor(maxTests / 2)}</span>
              <span>0</span>
            </div>

            {/* Chart bars */}
            <div className="ml-8 flex items-end h-full" style={{ paddingTop: barPadding }}>
              {dailyResults.map((day, index) => {
                const total = day.passed + day.failed + day.skipped;
                const availableHeight = chartHeight - barPadding;
                const passedHeight = (day.passed / maxTests) * availableHeight;
                const failedHeight = (day.failed / maxTests) * availableHeight;
                const skippedHeight = (day.skipped / maxTests) * availableHeight;

                return (
                  <div key={index} className="relative group flex-1 mx-0.5">
                    <div className="flex flex-col h-full">
                      <div
                        className="w-full bg-green-500"
                        style={{ height: passedHeight }}
                      />
                      <div
                        className="w-full bg-yellow-500"
                        style={{ height: skippedHeight }}
                      />
                      <div
                        className="w-full bg-red-500"
                        style={{ height: failedHeight }}
                      />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        <div className="font-semibold">{format(day.date, 'MMM d')}</div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 mr-1"></div>
                          {day.passed} passed
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-500 mr-1"></div>
                          {day.skipped} skipped
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 mr-1"></div>
                          {day.failed} failed
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="ml-8 mt-2 flex">
              {dailyResults.map((day, index) => (
                index % 7 === 0 && (
                  <div key={index} className="flex-1 text-xs text-gray-500">
                    {format(day.date, 'MMM d')}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsChart; 