import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
export const messaging = getMessaging(app);

// دالة طلب الإذن والحصول على التوكن (تبقى كما هي)
export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BPgGzvklAjnxZPdu_CODBH_LHoAAWm2ud-8o0WP31BJaJgHUBmZZJXAjEZP21KVNe_npFGC-6D1-MtPkdDcUXHA",
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error("FCM Token Error:", error);
    return null;
  }
};

// دالة استقبال الإشعارات (تبقى كما هي)
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
