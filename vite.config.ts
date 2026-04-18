import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')(require('./tailwind.config.cjs')),
        require('autoprefixer')(),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    sourcemap: true,
    reportCompressedSize: true,
  },
});

