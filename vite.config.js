// Utilities
import { resolve } from 'path'
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cowboy: resolve(__dirname, 'src/pages/for-fun/cowboy-font.html'),
        kinda: resolve(__dirname, 'src/pages/for-fun/kinda-sans-serif.html'),
        revealText: resolve(__dirname, 'src/pages/for-fun/reveal-text.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  // root: './',
  // optimizeDeps: {
  //   disabled: true,
  // },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //         }
  //       }
  //     }
  //   }
  // }
});
