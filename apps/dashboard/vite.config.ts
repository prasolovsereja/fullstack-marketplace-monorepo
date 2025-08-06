import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: './',
  server: {
    proxy: {
      '/api': 'http://localhost:4000/',
    }
  },
  publicDir: 'public'
})