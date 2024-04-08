// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
console.log('fileURLToPath', fileURLToPath);

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  build: {
    outDir: './dist'
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
