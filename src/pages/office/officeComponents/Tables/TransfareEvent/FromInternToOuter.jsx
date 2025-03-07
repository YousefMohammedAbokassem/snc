import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CryptoJS from "crypto-js";
import axios from "axios";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function FromInternToOuter() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    receiver_phone_number: "",
    display_name: "",
    amount: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encryptData = (data) => {
    const KEY = CryptoJS.enc.Utf8.parse(
      import.meta.env.VITE_API_URL_CRYPT.substring(7, 39)
    ); // Mimics Laravel's substr(7, 32)
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const encryptedPayload = CryptoJS.enc.Base64.stringify(
      iv.concat(encrypted.ciphertext)
    );
    // setEncryptedData(encryptedPayload);
    return encryptedPayload;
    // In your case, you would send encryptedPayload directly to Laravel here
    // For this example, we're just logging it to demonstrate the result.
  };
  const [loading, setLoading] = useState(false);
  const sendTransfare = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("encrypted_data", encryptData(JSON.stringify(formData)));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}international/send_money_transfers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col mt-6">
        <PhoneInput
          country={"sy"}
          inputProps={{
            name: "receiver_phone_number",
            required: true,
            placeholder: "رقم الهاتف المستلم",
            className:
              "border-[#CDCDCD] border-[1px] text-black dark:text-white rounded-md bg-transparent px-16 py-2 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145]",
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
          value={formData.receiver_phone_number}
          onChange={(value) =>
            setFormData({ ...formData, receiver_phone_number: value })
          }
        />
      </div>
      <input
        type="number"
        step={1000}
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="المبلغ"
        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline focus:outline-2 focus:outline-[#275963]"
      />
      <input
        type="text"
        name="display_name"
        value={formData.display_name}
        onChange={handleChange}
        placeholder="الاسم التعريفي"
        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline focus:outline-2 focus:outline-[#275963]"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="كلمة المرور"
        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline focus:outline-2 focus:outline-[#275963]"
      />
      <button
        type="button"
        className={`border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold flex items-center justify-center`}
        disabled={loading}
        onClick={sendTransfare}
      >
        {loading ? (
          <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
        ) : (
          "تحويل"
        )}
      </button>
    </div>
  );
}
