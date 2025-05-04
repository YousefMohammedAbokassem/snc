importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDMPMuM2HR7o2yip0AqIOM_Dt31JH4S4zY",
  authDomain: "the-snc.firebaseapp.com",
  projectId: "the-snc",
  messagingSenderId: "666571447093",
  appId: "1:666571447093:web:b7f0cf90a926d5c34cca7c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});