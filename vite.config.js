import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  server: {
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' https://www.gstatic.com",
    },
  },
  registerType: "prompt",
  srcDir: "public",
  filename: "firebase-messaging-sw.js", // 🔥 ملف FCM
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "src.png"],
  manifest: {
    name: "SNC APP",
    short_name: "SNC",
    description: "this is th syrian new coin",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "./favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "icon",
      },
      {
        src: "./src.png",
        type: "image/png",
      },
      {
        src: "icons/dark.svg",
      },
      {
        src: "images/SingUp.jpg",
      },
      {
        src: "images/sy2.jpg",
      },
      {
        src: "snc.png",
        type: "image/png",
      },
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
