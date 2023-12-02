import { fileURLToPath, URL } from 'node:url';
import fs from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    https: {
      key: fs.readFileSync('C:\\Users\\14434\\Desktop\\Programming Projects\\TenantGossip2\\backend\\crypto\\localhost.key'),
      cert: fs.readFileSync('C:\\Users\\14434\\Desktop\\Programming Projects\\TenantGossip2\\backend\\crypto\\localhost.cert'),
    },
  },
});
