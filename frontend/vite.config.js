import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwind from '@tailwindcss/vite'; // Note: No `tailwindcss` default import

export default defineConfig({
  plugins: [tailwind(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with your actual backend port if different
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
