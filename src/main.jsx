import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/index.scss";
import "./i18.js";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { registerSW } from "virtual:pwa-register";
import {
  requestFirebaseNotificationPermission,
  onMessageListener,
} from "./firebase";

// تسجيل الـ Service Worker (PWA)
registerSW();

// طلب إذن الإشعارات والحصول على FCM token
const setupNotifications = async () => {
  try {
    const token = await requestFirebaseNotificationPermission();
    if (token) {
      // console.log("FCM Token ready:", token);

      const userId = localStorage.getItem("access_token");
      if (userId) {
        // console.log({ userId });
        // يمكنك هنا إرسال التوكن إلى الخادم عبر axios مثلًا
      } else {
        console.warn("No userId found in localStorage");
      }
    } else {
      console.warn("No FCM token received");
    }
  } catch (error) {
    console.error("Notification setup error:", error);
  }

  // استقبال الإشعارات أثناء فتح الموقع (Foreground)
  onMessageListener().then((payload) => {
    // console.log("New foreground message: ", payload);
    const { title, body, icon } = payload.notification;
    if (Notification.permission === "granted") {
      console.log("first");
      new Notification(title, {
        icon,
        body,
      });
    }
  });
};

setupNotifications();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
