"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import axios from "axios";

export default function Example({
  lng,
  errorsVerify,
  errors,
  otp,
  setOtp,
  progressLog,
  // setProgressLog,
  setErrorsVerify,
  setErrors,
}) {
  const { t } = useTranslation(lng);
  const [countdown, setCountdown] = useState(20);
  const [isResending, setIsResending] = useState(false);

  // عد تنازلي تلقائي عند تحميل المكون
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = async () => {
    if (countdown > 0 || isResending) return;

    try {
      setIsResending(true);
      // setProgressLog(true);
      // setErrorsVerify("");
      // setErrors("");

      const formData = new FormData();
      formData.append("phone_number", localStorage.getItem("phone"));
      formData.append("country_code", localStorage.getItem("code"));

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}send_code`,
        formData
      );

      // إعادة تعيين العد التنازلي بعد الإرسال الناجح
      setCountdown(20);
      console.log(res.data);
    } catch (error) {
      console.error("Error resending code:", error);
      // setErrorsVerify(error.response?.data.message);
      // setErrors(error?.response?.data?.errors);
    } finally {
      setIsResending(false);
      // setProgressLog(false);
    }
  };

  return (
    <div className="">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => (
          <input
            {...props}
            className="custom-input text-[#1D1D1D] dark:text-[#fff] mx-2 focus:dark:outline-[#E1B145] focus:outline-[#275963] caret-[#275963] dark:caret-[#E1B145]"
          />
        )}
        inputStyle={{
          flex: "1",
          padding: "10px 5px",
          background: "transparent",
          width: "calc(100% / 6)",
          height: "90px",
          border: "1px solid #828282",
          borderRadius: "10px",
          fontSize: "25px",
          marginTop: "100px",
        }}
      />

      {errorsVerify === "Invalid or expired OTP" && (
        <p className="text-red-500 dark:text-red-400 mt-4 text-center">
          {t("رمز التحقق غير صالح أو منتهي")}
        </p>
      )}

      {errors && (
        <p className="text-red-500 dark:text-red-400 mt-4 text-center">
          {t(errors.code)}
        </p>
      )}

      <p className="text-[#1D1D1D] dark:text-[#fff] mt-10">
        {t("youDidNot")}{" "}
        <u
          className={`${
            countdown === 0
              ? "text-[#275963] dark:text-[#E1B145]"
              : "text-gray-400"
          } cursor-pointer`}
          onClick={handleResendCode}
          style={{ pointerEvents: countdown > 0 ? "none" : "auto" }}
        >
          {isResending ? t("جاري الإرسال...") : t("reSend")}
        </u>
      </p>

      <div className="mx-auto text-center mt-20 text-[#1D1D1D] dark:text-[#fff]">
        {countdown > 0
          ? `${t("new_code")} 0:${countdown.toString().padStart(2, "0")}`
          : t("يمكنك طلب رمز جديد")}
      </div>
    </div>
  );
}
