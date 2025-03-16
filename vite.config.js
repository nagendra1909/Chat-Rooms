import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
    }
  }
})