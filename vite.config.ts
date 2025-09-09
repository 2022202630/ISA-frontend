import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
console.log('Vite config FUCKING loaded')
export default defineConfig({
  plugins: [angular()],
  server: {
    host: true,            // listen on 0.0.0.0
    port: 4200,
    strictPort: true,
    allowedHosts: [
      'dnd.witchbrewsoft.com', // your public domain
      'localhost',
      '127.0.0.1'
    ]
  }
});
