import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegura que Vite escuche en todas las interfaces
    port: 3000,        // Puerto donde correrá el frontend
  },
});
