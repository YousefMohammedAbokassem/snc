import React, { useState, useEffect } from "react";

export default function NoInternet() {
  const [isOnline, setIsOnline] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // دالة للتحقق من الاتصال الفعلي
  const checkConnection = async () => {
    try {
      const response = await fetch("https://www.google.com/favicon.ico", {
        method: "HEAD",
        mode: "no-cors",
      });
      handleOnline();
    } catch (err) {
      handleOffline();
    }
  };

  const handleOnline = () => {
    console.log("on");
    setIsOnline(true);
    setMessage("🌐 الإنترنت عاد");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleOffline = () => {
    console.log("off");
    setIsOnline(false);
    setMessage("🚫 الإنترنت مقطوع");
    setShowMessage(true);
  };

  useEffect(() => {
    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", handleOffline);

    // ✅ تحقق فورًا عند فتح الصفحة
    // checkConnection();

    // تحقق دوري كل 5 ثوانٍ
    const interval = setInterval(checkConnection, 5000);

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);   

  return (
    <>
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: isOnline ? "#4CAF50" : "#F44336",
            color: "#FFF",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 9999,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {message}
        </div>
      )}
    </>
  );
}
