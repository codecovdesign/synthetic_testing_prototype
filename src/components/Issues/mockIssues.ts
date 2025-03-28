export const mockIssues = [
  {
    id: '1',
    title: 'SAVE50 promo code not working',
    status: 'open' as const,
    priority: 'high' as const,
    category: 'browser tests',
    assignedTo: 'John Doe',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    description: 'The SAVE50 promo code is not being applied correctly in the checkout process',
    steps: [
      'Navigate to checkout page',
      'Enter SAVE50 promo code',
      'Click Apply button',
      'Observe error message'
    ],
    environment: 'Staging',
    browser: 'Chrome 122',
    screenshot: 'https://example.com/screenshot1.png',
    video: 'https://example.com/video1.mp4',
    logs: 'Error: Redis connection timeout\nStack trace: ...',
    relatedTests: ['Apply SAVE50']
  },
  {
    id: '2',
    title: 'Product not being added to cart',
    status: 'in_progress' as const,
    priority: 'high' as const,
    category: 'browser tests',
    assignedTo: 'Jane Smith',
    createdAt: '2024-03-19',
    updatedAt: '2024-03-20',
    description: 'Clicking "Add to Cart" button does not add the product to the cart',
    steps: [
      'Navigate to products page',
      'Click "Add to Cart" button',
      'Observe product not being added'
    ],
    environment: 'Production',
    browser: 'Firefox 123',
    screenshot: 'https://example.com/screenshot2.png',
    video: 'https://example.com/video2.mp4',
    logs: 'Error: Cart API timeout\nStack trace: ...',
    relatedTests: ['Click adds product to cart']
  },
  {
    id: '3',
    title: 'Checkout validation failing',
    status: 'open' as const,
    priority: 'medium' as const,
    category: 'browser tests',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-03-18',
    updatedAt: '2024-03-20',
    description: 'Form validation in checkout process is not working correctly',
    steps: [
      'Fill out checkout form with invalid data',
      'Submit form',
      'Observe no validation errors'
    ],
    environment: 'Staging',
    browser: 'Chrome 122',
    screenshot: 'https://example.com/screenshot3.png',
    video: 'https://example.com/video3.mp4',
    logs: 'Error: Form validation not triggered\nStack trace: ...',
    relatedTests: ['Checkout validation']
  }
]; 