import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite is the tool that runs the dev server and builds the site.
// We plug in React (so it understands JSX) and Tailwind (so it understands our classes).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@" points at src/, which is what shadcn/ui components import through.
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
