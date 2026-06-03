import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'landing-assets/[hash].js',
        entryFileNames: 'landing-assets/[hash].js',
        assetFileNames: 'landing-assets/[hash][extname]',
      },
    },
  },
})
