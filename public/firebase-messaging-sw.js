importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// إعدادات التفعيل التلقائي
self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log('Service Worker installed');
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  console.log("Service Worker activated");
});

// تهيئة Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDMPMuM2HR7o2yip0AqIOM_Dt31JH4S4zY",
  authDomain: "the-snc.firebaseapp.com",
  projectId: "the-snc",
  messagingSenderId: "666571447093",
  appId: "1:666571447093:web:b7f0cf90a926d5c34cca7c",
});

const messaging = firebase.messaging();

// معالجة الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received message:", payload);
  const notificationTitle = payload.notification?.title || "رسالة جديدة";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "/images/PNG.png",
    data: payload.data || {},
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
