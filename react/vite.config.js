import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Alineados con jsconfig.json — regla 6 de reglas.md
      // Los alias específicos van primero para que '@' no capture '@features' ni '@shared'
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
