"use client";
import FirstStep from "./forgetPassword/FirtsStep";
import SecondStep from "./forgetPassword/SecondStep";
import ThirdStep from "./forgetPassword/ThirdStep";
import Stepper from "./forgetPassword/Stepper";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import CryptoJS from "crypto-js";
const people = [
  {
    id: 1,
    gender: "male",
  },
  {
    id: 2,
    gender: "female",
  },
];

export default function Page() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState(people[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [national_id, setNational_id] = useState("");
  const [gender, setGender] = useState(people[0]);
  const [place_of_birth, setPlace_of_birth] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [birthday, setBirthday] = useState("");
  const [card_number, setCard_number] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showIsChecked, setShowIsChecked] = useState(isChecked);
  const [otp, setOtp] = useState("");
  const [progressLog, setProgressLog] = useState(false);
  const [address, setAddress] = useState("");
  const [country_code, setCountry_code] = useState("963");
  const [errors, setErrors] = useState({
    address,
    birthday,
    card_number,
    country_code,
    display_name,
    first_name,
    last_name,
    national_id,
    password,
    phone_number,
    place_of_birth,
    gender,
  });

  // استرجاع البيانات من sessionStorage عند تحميل الصفحة
  useEffect(() => {
    const savedData = sessionStorage.getItem("signUpData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setFirst_name(data.first_name || "");
      setAddress(data.address || "");
      setCountry_code(data.country_code || "");
      setLast_name(data.last_name || "");
      // setDisplay_name(data.display_name || "");
      setPhone_number(data.phone_number || "");
      // setPassword(data.password || "");
      // setPassword_confirmation(data.password_confirmation || "");
      setNational_id(data.national_id || "");
      setGender(data.gender || people[0]);
      setPlace_of_birth(data.place_of_birth || "");
      setCountry_id(data.country_id || "");
      setBirthday(data.birthday || "");
      // setCard_number(data.card_number || "");
      setIsChecked(data.isChecked || false);
      setOtp(data.otp || "");
      setCurrentStep(data.currentStep || 0);
    }
  }, []);

  // حفظ البيانات في sessionStorage عند تغيير أي من الحقول
  useEffect(() => {
    const data = {
      first_name,
      last_name,
      // display_name,
      phone_number,
      // password,
      // password_confirmation,
      national_id,
      gender,
      place_of_birth,
      country_id,
      birthday,
      // card_number,
      isChecked,
      otp,
      currentStep,
      address,
      country_code,
    };
    sessionStorage.setItem("signUpData", JSON.stringify(data));
  }, [
    first_name,
    last_name,
    // display_name,
    phone_number,
    // password,
    // password_confirmation,
    national_id,
    gender,
    place_of_birth,
    country_id,
    birthday,
    // card_number,
    isChecked,
    otp,
    currentStep,
    address,
    country_code,
  ]);

  const goToNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const checkIfDisable = () => {
    if (
      currentStep === 0 &&
      gender.length &&
      birthday.length &&
      first_name.length &&
      last_name.length &&
      national_id.length &&
      place_of_birth.length
    ) {
      return false;
    }
    return true;
  };
  // sing up logic
  const signUp = async (e) => {
    e.preventDefault();
    setProgressLog(true);

    const formData = new FormData(); // استخدام FormData لإرسال البيانات
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("display_name", display_name);
    formData.append("phone_number", phone_number.slice(country_code.length));

    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("national_id", national_id);
    formData.append("gender", gender.gender === "male" ? "m" : "f");
    formData.append("place_of_birth", place_of_birth);
    formData.append("country_id", 1);
    formData.append("birthday", moment(birthday).format("YYYY-MM-DD"));
    // const aa = moment(birthday).format('YYYY-MM-DD')
    const secretKey = "N2PRVPj2dQoK60vBxURUXZ/OH9UWFQkurx6ySVGEuWo=";

    const ciphertext = CryptoJS.AES.encrypt(card_number, secretKey).toString();
    // console.log(card_number);
    console.log(ciphertext);
    const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000"); // IV ثابت
    const key = CryptoJS.enc.Base64.parse(secretKey);
    const encrypted = CryptoJS.AES.encrypt(card_number, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC, // وضع التشفير
      padding: CryptoJS.pad.Pkcs7, // padding
    }).toString();
    console.log(encrypted);

    formData.append("card_number", encrypted);
    formData.append("country_code", country_code);
    formData.append("address", address);
    if (isChecked === false) {
      setShowIsChecked(true);
      return null;
    } else {
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}register`,
        formData
      );
      console.log(res.data);
      setProgressLog(false);
    } catch (error) {
      setProgressLog(false);
      setErrors(error?.response?.data.errors);
      console.log(error);
      goToNextStep();
    }
  };
  // sing up logic

  return (
    <div className="signUp flex items-center ">
      <div className="FormAccount w-full sm:w-[60%] md:w-[50%] px-5 md:px-10">
        <div className="relative">
          <div
            className={`absolute -top-8 ${
              localStorage.getItem("i18next") === "ar" ? "-right-2" : "-left-2"
            } cursor-pointer  ${currentStep === 0 && "hidden"}`}
            onClick={goToPreviousStep}
          >
            {localStorage.getItem("i18next") === "ar" ? (
              <ChevronRightIcon className="w-10 h-10 text-[#85878B] dark:text-[#FFFFFF]" />
            ) : (
              <ChevronLeftIcon className="w-10 h-10 text-[#85878B] dark:text-[#FFFFFF]" />
            )}
          </div>
          <form className="createAn">
            <h1 className="text-[#1D1D1D] dark:text-[#fff] flex items-center justify-center text-2xl font-bold mt-12 mb-4">
              {t("createAnAcoount")}
            </h1>
          </form>
          <Stepper
            lng={localStorage.getItem("i18next")}
            currentStep={currentStep}
          />
          {currentStep === 0 && (
            <FirstStep
              lng={localStorage.getItem("i18next")}
              card_number={card_number}
              setCard_number={setCard_number}
              country_id={country_id}
              setCountry_id={setCountry_id}
              password={password}
              password_confirmation={password_confirmation}
              setPassword={setPassword}
              setPassword_confirmation={setPassword_confirmation}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              address={address}
              setAddress={setAddress}
              country_code={country_code}
              setCountry_code={setCountry_code}
              phone_number={phone_number}
              setPhone_number={setPhone_number}
              errors={errors}
              setErrors={setErrors}
              showIsChecked={showIsChecked}
              setShowIsChecked={setShowIsChecked}
            />
          )}
          {currentStep === 1 && (
            <SecondStep
              lng={localStorage.getItem("i18next")}
              otp={otp}
              setOtp={setOtp}
            />
          )}
          {currentStep === 2 && (
            <ThirdStep
              lng={localStorage.getItem("i18next")}
              card_number={card_number}
              setCard_number={setCard_number}
              country_id={country_id}
              setCountry_id={setCountry_id}
              password={password}
              password_confirmation={password_confirmation}
              setPassword={setPassword}
              setPassword_confirmation={setPassword_confirmation}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              address={address}
              setAddress={setAddress}
              country_code={country_code}
              setCountry_code={setCountry_code}
              phone_number={phone_number}
              setPhone_number={setPhone_number}
              errors={errors}
              setErrors={setErrors}
              showIsChecked={showIsChecked}
              setShowIsChecked={setShowIsChecked}
            />
          )}

          <div className="mt-6">
            {/* ${
                  currentStep === 2 &&
                  "opacity-90 pointer-events-none cursor-not-allowed"
                } */}
            <button
              type="button"
              className={`border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]
                 font-bold`}
              onClick={
                currentStep === 0
                  ? goToNextStep
                  : currentStep === 1
                  ? (e) => signUp(e)
                  : ""
              }
              // disabled={currentStep === 2}
            >
              {currentStep === 0
                ? t("send")
                : currentStep === 1
                ? t("verification")
                : t("save")}
            </button>
          </div>
        </div>
      </div>
      <div className="image hidden sm:block sm:w-[40%] md:w-[50%] h-full fixed left-0 top-0">
        <img
          src="/images/SingUp.jpg"
          alt="signUp image"
          className="w-full h-full"
        />
      </div>
      {/* <div className="image w-[60%]"></div> */}
    </div>
  );
}
