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
      usePolling: true,
      interval: 1000,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.vite/**',
        '**/coverage/**',
        '**/.DS_Store'
      ]
    },
    hmr: {
      overlay: true,
      timeout: 30000,
      protocol: 'ws',
      host: 'localhost',
      port: 5175,
      clientPort: 5175,
      path: '/hmr'
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
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
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  logLevel: 'info'
}) 