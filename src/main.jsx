import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/index.scss";
import "./i18.js";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'; // استيراد السمة التي أنشأناها
import { registerSW } from "virtual:pwa-register";
import {
  requestFirebaseNotificationPermission,
  onMessageListener,
} from "./firebase";

registerSW();

// طلب الإذن للإشعارات والحصول على التوكن
requestFirebaseNotificationPermission().then((token) => {
  if (token) {
    console.log("FCM Token ready:", token);
    const userId = localStorage.getItem("access_token");
    if (userId) {
      console.log({userId})
    } else {
      console.warn("No userId found in localStorage");
    }
  } else {
    console.warn("No FCM token received");
  }
});

// استقبال الإشعارات أثناء فتح الموقع (Foreground)
onMessageListener().then((payload) => {
  console.log("New foreground message: ", payload);
  const { title, body, icon } = payload.notification;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon,
    });
  }
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider theme={theme}> {/* إضافة ThemeProvider هنا */}
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
);