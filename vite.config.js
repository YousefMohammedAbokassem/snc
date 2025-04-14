import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // يعني أنه سيتم تحديث الـ Service Worker تلقائيًا عند تغييره.
      includeAssets: [
        '/snc.png',
        '/offline.html'  // تأكد من إضافة ملف offline.html إذا كنت تستخدمه.
      ],
      manifest: {
        name: 'snc',
        short_name: 'snc',
        description: 'snc',
        theme_color: '#111',
        icons: [
          {
            src: 'snc.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'snc.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              networkTimeoutSeconds: 3,
              fallbackURL: '/offline.html'  // تأكد من أن هذا الملف موجود في مجلد public.
            }
          }
        ]
      }
    })
  ]
})
