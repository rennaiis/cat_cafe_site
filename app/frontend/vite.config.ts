import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  
  plugins: [react()],
  envDir: path.resolve(__dirname, "../")
})
