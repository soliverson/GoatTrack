import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is set correctly
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['/client/src/styles.css'], // Adjust the path to match your project structure
    },
  },
  server: {
    port: 3000,
  },
});
