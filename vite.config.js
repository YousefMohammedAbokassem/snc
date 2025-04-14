// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'اسم التطبيق',
//         short_name: 'اسم قصير',
//         description: 'وصف التطبيق',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       }
//     })
//   ]
// })


// 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'snc.png',
        'snc.png',
        'snc.png',
        'snc.png',
        'offline.html' // 👈 نضيفها هنا
      ],
      manifest: {
        name: 'snc',
        short_name: 'snc',
        description: 'snc',
        theme_color: '#ffffff',
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
              fallbackURL: '/offline.html'
            }
          }
        ]
      }
    })
  ]
})
