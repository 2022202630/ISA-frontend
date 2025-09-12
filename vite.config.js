// vite.config.js
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    host: true, // allows network access
    allowedHosts: ['dnd.witchbrewsoft.com'], // allow this host
  },
});
