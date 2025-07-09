// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 👉 esto abre el navegador automáticamente
    port: 5173  // podés cambiarlo si querés
  }
})