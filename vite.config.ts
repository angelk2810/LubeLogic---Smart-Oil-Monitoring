import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/LubeLogic---Smart-Oil-Monitoring/', // your repo name
  plugins: [
    react(),
    tailwindcss(),   // ⚠ THIS IS REQUIRED
  ],
})
