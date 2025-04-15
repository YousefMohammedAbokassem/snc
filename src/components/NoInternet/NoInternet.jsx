import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function NoInternetPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [checking, setChecking] = useState(false);
  const location = useLocation();

  const handleRetry = () => {
    setChecking(true);

    setTimeout(() => {
      if (navigator.onLine) {
        setChecking(false);
        Swal.fire({
          icon: "success",
          title: t("backOnline"),
          text: t("youAreConnected"),
          // timer: 1000,
          showConfirmButton: true,
        }).then(() => {
          // if (localStorage.getItem("location") !== "/noInternet") {
            navigate(localStorage.getItem("location")); // ✅ يتم التنقل بعد إغلاق التنبيه
          // }
        });
      } else {
        setChecking(false);
        Swal.fire({
          icon: "error",
          title: t("stillOffline"),
          text: t("pleaseCheckConnection"),
        });
      }
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen gap-2">
        <p className="text-3xl text-[#414651] dark:text-[#ddd]">
          {t("noInternet")}
        </p>
        <p className="opacity-50 text-[#414651] dark:text-[#ddd]">
          {t("pleaseCheckConnection")}
        </p>
        <button
          type="button"
          className="border-[#CDCDCD] mt-4 w-2/4 bg-[#275963] text-white dark:bg-[#E1B145] border-[1px] dark:text-white rounded-md px-3 py-5 focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold"
          onClick={handleRetry}
          disabled={checking}
        >
          {checking ? t("checking") + "..." : t("retryConnection")}
        </button>
      </div>
    </div>
  );
}
