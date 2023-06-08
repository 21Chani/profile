import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const srcDir = new URL('./src', import.meta.url).pathname
const iconsDir = new URL('./src/icons', import.meta.url).pathname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': srcDir,
      '@icons': iconsDir,
    },
  },
})
