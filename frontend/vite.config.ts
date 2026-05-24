<<<<<<< Updated upstream
import { defineConfig } from 'vite'
=======
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
>>>>>>> Stashed changes
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< Updated upstream
})
=======
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',

    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],

    exclude: [
      'node_modules',
      'dist',
      'e2e',
    ]
  }
})
>>>>>>> Stashed changes
