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
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.vite/**'
      ]
    },
    hmr: {
      overlay: true,
      timeout: 30000,
      protocol: 'ws',
      host: 'localhost',
      port: 5175
    },
    cors: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@headlessui/react',
      '@heroicons/react',
      'react-router-dom'
    ],
    exclude: [],
    force: true,
    esbuildOptions: {
      target: 'es2020'
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
}) 