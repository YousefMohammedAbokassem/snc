import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDMPMuM2HR7o2yip0AqIOM_Dt31JH4S4zY",
  authDomain: "the-snc.firebaseapp.com",
  projectId: "the-snc",
  storageBucket: "the-snc.appspot.com",
  messagingSenderId: "666571447093",
  appId: "1:666571447093:web:b7f0cf90a926d5c34cca7c",
  measurementId: "G-FVTKX1HK4L",
};

const app = initializeApp(firebaseConfig);
let messaging;

const initMessaging = async () => {
  if (await isSupported()) {
    return getMessaging(app);
  }
  return null;
};

messaging = await initMessaging();
// messaging =  initMessaging();

export const requestFirebaseNotificationPermission = async () => {
  if (!messaging) {
    console.warn("Messaging not supported");
    return null;
  }

  try {
    // تسجيل Service Worker يدويًا
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      {
        scope: "/firebase-cloud-messaging-push-scope",
      }
    );

    const permission = await Notification.requestPermission();
    console.log("Permission status:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BPgGzvklAjnxZPdu_CODBH_LHoAAWm2ud-8o0WP31BJaJgHUBmZZJXAjEZP21KVNe_npFGC-6D1-MtPkdDcUXHA",
        serviceWorkerRegistration: registration,
      });
      console.log("FCM Token:", token);
      return token;
    }
    return null;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};

export const onMessageListener = () => {
  if (!messaging) return Promise.resolve(null);

  return new Promise((resolve) => {
    const unsubscribe = onMessage(messaging, (payload) => {
      unsubscribe();
      resolve(payload);
    });
  });
};
