"use client";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { FaSpinner } from "react-icons/fa"; // استيراد أيقونة التحميل
import { logIn } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import Nav from "../nav/Nav";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import {
  requestFirebaseNotificationPermission,
  // storeFCMToken,
} from "../../firebase";

export default function Page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [progressLog, setProgressLog] = useState(false);
  const [errors, setErrors] = useState({}); // إضافة حالة الأخطاء
  const [MessageError, setMessageError] = useState(""); // إضافة حالة الأخطاء
  const signIn = async (e) => {
    e.preventDefault();
    setProgressLog(true);
    setErrors({});
    setMessageError("");
    // const fcmToken = await requestFirebaseNotificationPermission();
    // console.log({fcmToken});
    try {
      const formData = new FormData();
      formData.append("phone_number", phone_number.slice(country_code?.length));
      formData.append("country_code", country_code);
      // formData.append("password", password.trim());
      // formData.append("display_name", display_name.trim());

      // أولاً: الحصول على FCM Token

      // إذا وجدنا Token، نضيفه لبيانات تسجيل الدخول
      // if (fcmToken) {
      //   formData.append("device_token", fcmToken);
      //   // console.log(fcmToken);
      // }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}change_password`,
        formData
      );

      // بعد نجاح تسجيل الدخول
      setProgressLog(false);
      // dispatch(logIn());
      // // console.log(res.data);
      // localStorage.setItem("access_token", res.data.data.token);
      // localStorage.setItem("user_id", res.data.data.role_id);

      navigate("/home");
    } catch (error) {
      setProgressLog(false);
      console.error("Login error:", error);
      setErrors(error?.response?.data?.errors || {});
      setMessageError(error?.response?.data?.message);
    }
  };
  //
  // countries

  const [phoneLoading, setPhoneLoading] = useState(false);
  const [country_code, setCountry_code] = useState("");
  const [countries, setCountries] = useState([]);
  const [countrySend, setCountrySend] = useState("");
  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}countries`);
      // console.log(res.data.data);
      setPhoneLoading(false);
      setCountries([""]);
      res.data.data.map((ele) => {
        setCountries(res.data.data.map((ele) => ele.iso.toLowerCase()));
        setCountrySend(res.data.data.map((ele) => ele));
        setCountry_code(res.data.data[0].code);
      });
      setPhoneLoading(true);
    } catch (error) {
      setPhoneLoading(true);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  // console.log(phone_number);
  // console.log(country_code);
  return (
    <>
      <Helmet>
        <title>{t("didYouForget")}</title>
      </Helmet>
      {/* <Nav /> */}
      <div className="signUp flex items-start ">
        <div className="FormAccount w-full sm:w-[60%] md:w-[50%] px-5 md:px-10 ">
          <div className="relative">
            <form className="createAn">
              <h1 className="text-[#1D1D1D] dark:text-[#fff] flex items-center justify-center text-2xl font-bold mt-10 mb-4">
                {t("didYouForget")}
              </h1>
              <div className="">
                {/* حقل رقم الهاتف */}
                {phoneLoading ? (
                  <div className="flex gap-2 flex-col mt-6">
                    <PhoneInput
                      country={"sy"}
                      onlyCountries={countries}
                      inputProps={{
                        name: "phone_number",
                        required: true,
                        placeholder: t("phone_number"),
                        className:
                          "border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-16 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]",
                      }}
                      containerClass={`w-full ${
                        localStorage.getItem("i18next") === "ar"
                          ? "phoneDirAr"
                          : "phoneDirEn"
                      }`}
                      buttonStyle={{
                        background: "transparent",
                      }}
                      dropdownStyle={{
                        zIndex: 1000,
                      }}
                      value={phone_number}
                      onChange={(value, country, e, formattedValue) => {
                        setPhone_number(value);
                        setCountry_code(country.dialCode);
                      }}
                    />
                    {errors?.phone_number && (
                      <p className="text-red-500 text-sm font-bold">
                        {t(errors.phone_number[0])}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex flex-col space-y-2 w-full">
                        <div className="h-14 w-full bg-gray-300 rounded-md"></div>{" "}
                      </div>
                    </div>
                  </div>
                )}

                {MessageError && (
                  <p className="my-1 text-red-500 text-sm font-bold">
                    {t("theInfoIsIncorrect")}
                  </p>
                )}
              </div>
            </form>
            <div className="mt-6">
              <button
                type="button"
                className={`border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold flex items-center justify-center`}
                disabled={progressLog}
                onClick={signIn}
              >
                {progressLog ? (
                  <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
                ) : (
                  t("send") // عرض نص "تسجيل الدخول"
                )}
              </button>
            </div>

            <div className="flex items-center justify-center m-10">
              <Link
                to={"/SignUp"}
                className="text-[#1D1D1D] dark:text-[#FFFFFF]"
              >
                {t("didnotYou")}{" "}
                <u className=" dark:text-[#E1B145] text-[#275963]">
                  {t("createAnAcoount")}
                </u>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`image hidden sm:block sm:w-[40%] md:w-[50%] h-full fixed ${
            localStorage.getItem("i18nextLng") === "ar" ? "left-0 " : "right-0 "
          } top-0 -z-10`}
        >
          <img
            src="/images/SingUp.jpg"
            alt="signUp image"
            width={700}
            height={700}
            className="w-full h-full "
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
