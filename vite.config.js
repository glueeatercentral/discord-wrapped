import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages - change 'discord-wrapped' to your repo name
  base: process.env.NODE_ENV === 'production' ? '/discord-wrapped/' : '/',
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
