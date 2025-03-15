/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sentry-purple': 'var(--sentry-purple)',
        'sentry-purple-light': 'var(--sentry-purple-light)',
        'sentry-gray': 'var(--sentry-gray)',
        'sentry-gray-light': 'var(--sentry-gray-light)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 