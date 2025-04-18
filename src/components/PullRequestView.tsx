import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CommentActions = () => (
  <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
    <button className="hover:text-blue-600">👍</button>
    <button className="hover:text-blue-600">👎</button>
    <button className="hover:text-blue-600">😄</button>
    <button className="hover:text-blue-600">🎉</button>
    <button className="hover:text-blue-600">❤️</button>
    <button className="hover:text-blue-600">🚀</button>
    <button className="hover:text-blue-600">👀</button>
    <span className="mx-2">•</span>
    <button className="hover:text-blue-600">Reply</button>
  </div>
);

const PullRequestView = () => {
  const { id } = useParams();

  useEffect(() => {
    // Update page title
    document.title = `PR-#${id} · turing-corp`;
    
    // Add GitHub favicon if not already present
    if (!document.querySelector("link[rel='icon']")) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = 'https://github.com/favicon.ico';
      document.head.appendChild(favicon);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GitHub-style navbar */}
      <nav className="bg-gray-900 px-4 py-3">
        <div className="max-w-screen-2xl mx-auto flex items-center">
          <Link to="/" className="text-white">
            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" className="fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </Link>
          <div className="ml-4 text-white text-sm">
            <Link to="/" className="hover:text-gray-300">turing-corp</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-400">pull request</span>
            <span className="mx-1">/</span>
            <span className="text-gray-400">#{id}</span>
          </div>
        </div>
      </nav>

      {/* PR Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Fix Checkout Bug</h1>
            <span className="font-mono text-gray-600">#{id}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Open</span>
            <span>adalovelace</span>
            <span>opened this pull request 2 hours ago</span>
          </div>
        </div>
      </header>

      {/* PR Content */}
      <main className="max-w-screen-xl mx-auto py-6 px-4">
        <div className="flex gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-grow max-w-[calc(100%-256px)]">
            <div>
              {/* Description Comment */}
              <div className="relative flex mb-8">
                <div className="absolute left-[72px] top-[40px] h-[calc(100%+32px)] w-[2px] bg-gray-200"></div>
                <div className="w-10 flex-shrink-0">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg" 
                    alt="Ada Lovelace" 
                    className="w-10 h-10 rounded-full relative z-10"
                  />
                </div>
                <div className="flex-1 min-w-0 ml-3 relative z-10">
                  <div className="bg-white px-4 py-2 border border-gray-200 rounded-t-md">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">adalovelace</span>
                      <span className="text-gray-500">commented 2 hours ago</span>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-4 prose max-w-none border-l border-r border-b border-gray-200 rounded-b-md">
                    <p>This pull request fixes a critical bug in the checkout flow where promo codes were not being properly validated against the Redis cache. The issue was causing intermittent failures during high-traffic periods.</p>
                    
                    <h3 className="mt-4">Changes</h3>
                    <ul>
                      <li>Added proper error handling for Redis connection timeouts</li>
                      <li>Improved error messages for better debugging</li>
                      <li>Updated test suite to cover edge cases</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sentry Comment */}
              <div className="relative flex">
                <div className="w-10 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#362D59] flex items-center justify-center relative z-10 pl-1.5">
                    <svg viewBox="0 0 72 66" className="h-5 w-5 text-white">
                      <path fill="currentColor" d="M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0 ml-3">
                  <div className="bg-white px-4 py-2 border border-gray-200 rounded-t-md">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Sentry</span>
                      <span className="text-gray-500">commented 5 minutes ago</span>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-4 prose max-w-none border-l border-r border-b border-gray-200 rounded-b-md">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mt-0">
                      🛠 Browser Test Report
                    </h2>
                    
                    <ul className="mt-4 space-y-1 list-none pl-0">
                      <li className="flex items-center gap-2">
                        <span>❌</span> <strong>1 test failed</strong> – Review the issue before merging.
                      </li>
                      <li className="flex items-center gap-2">
                        <span>⚠️</span> <strong>Related existing issue:</strong> <a href="https://sentry.io/your-project/issues/1245/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Issue #1245</a>
                      </li>
                    </ul>

                    <div className="mt-4">
                      <Link to="/browser-tests" className="text-blue-600 hover:text-blue-800">
                        🔍 Open Preview & Create Test
                      </Link>
                    </div>

                    <details className="mt-4">
                      <summary className="cursor-pointer font-medium">Test Summary</summary>
                      <div className="mt-2 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test Name</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 py-2 text-sm">Apply SAVE20 Discount</td>
                              <td className="px-3 py-2 text-sm">✅ Passed</td>
                              <td className="px-3 py-2 text-sm">Verified discount application</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-sm">Apply SAVE50 Discount</td>
                              <td className="px-3 py-2 text-sm">❌ Failed</td>
                              <td className="px-3 py-2 text-sm">"Apply Discount" button missing</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-sm">Purchase Completion</td>
                              <td className="px-3 py-2 text-sm">✅ Passed</td>
                              <td className="px-3 py-2 text-sm">Order processed successfully</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metadata */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-4">
              {/* Assignees */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900">Assignees</h3>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <img className="h-6 w-6 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg" alt="Ada Lovelace" />
                    <span className="text-sm text-gray-600">adalovelace</span>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900">Labels</h3>
                <div className="mt-2 space-y-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">bug</span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">needs-review</span>
                </div>
              </div>

              {/* Development */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900">Development</h3>
                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>All checks have passed</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <svg className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <span>3 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PullRequestView; 