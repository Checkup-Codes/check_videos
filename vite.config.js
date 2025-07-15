import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts', 'resources/js/ssr.ts'],
      refresh: true,
      ssr: 'resources/js/ssr.ts',
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      ziggy: path.resolve('vendor/tightenco/ziggy/dist/vue.es.js'),
    },
  },
});
