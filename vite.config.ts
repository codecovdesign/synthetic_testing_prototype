import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: true,
    host: true,
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    hmr: {
      overlay: true,
      timeout: 30000,
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    sourcemap: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@headlessui/react', '@heroicons/react'],
    exclude: []
  }
}) 