import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Vite config — see repo README for GitHub Pages `base` options. */
export default defineConfig({
  // Relative base works with gh-pages; use '/repo-name/' if assets 404 on deploy.
  base: './',
  plugins: [react()],
})
