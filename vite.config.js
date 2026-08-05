import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: "/Docify/",
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 8000,
    strictPort: false,
    hmr: {
      host: 'localhost',
      port: 8000,
      protocol: 'ws'
    }
  },
  preview: {
    port: 8000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
});
