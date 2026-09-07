import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alineados con jsconfig.json — regla 6 de reglas.md
      '@':          fileURLToPath(new URL('./src', import.meta.url)),
      '@shared':    fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@features':  fileURLToPath(new URL('./src/features', import.meta.url)),
      '@app':       fileURLToPath(new URL('./src/app', import.meta.url)),
    },
  },
})
