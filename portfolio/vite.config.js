import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Vite config — served at https://hannasamborska.no (custom domain on GitHub Pages). */
export default defineConfig({
  base: '/',
  plugins: [react()],
})
