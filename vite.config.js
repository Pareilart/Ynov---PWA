import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'rd-pwa',
      short_name: 'rd-pwa',
      description: 'rd-pwa',
      theme_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,json}'],
      navigateFallback: 'index.html',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      runtimeCaching: [{
        urlPattern: /^https:\/\/newsapi\.org\/v2\/top-headlines/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'news-api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 // 1 heure
          }
        }
      }]
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})