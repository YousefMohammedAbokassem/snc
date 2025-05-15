import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CryptoJS from "crypto-js";
import axios from "axios";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FromInternToIntern({ commision }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    receiver_phone_number: "",
    display_name: "",
    amount: "",
    password: "",
    country_code: "963",
  });
  const [currentCountry, setCurrentCountry] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [commission, setCommission] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countrySend, setCountrySend] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "amount") {
      const amountValue = parseFloat(e.target.value) || 0;
      const commissionPercentage =
        commision.find((item) => item.key === "international_transfer_fee")
          ?.value || 0;
      const commissionValue = amountValue * (commissionPercentage / 100);
      setCommission(commissionValue);
      setTotalAmount(amountValue + commissionValue);
    }
  };

  const encryptData = (data) => {
    const KEY = CryptoJS.enc.Utf8.parse(
      import.meta.env.VITE_API_URL_CRYPT.substring(7, 39)
    );
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
  };

  const sendTransfare = async () => {
    setLoading(true);
    const encrypted = encryptData(
      JSON.stringify({
        receiver_phone_number: formData.receiver_phone_number,
        display_name: formData.display_name,
        amount: formData.amount,
        password: formData.password,
        country_code: formData.country_code,
      })
    );

    const payload = new FormData();
    payload.append("encrypted_data", encrypted);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}international/send_money_transfers`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم إرسال الحوالة بنجاح",
        confirmButtonText: "حسنًا",
      });
    } catch (error) {
      // console.log(error);
      if (error.response?.status === 401) {
        // dispatch(logoutUser());
      }

      Swal.fire({
        icon: "error",
        title: "فشل",
        text: "لم يتم إرسال الحوالة",
        confirmButtonText: "حسنًا",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value, country) => {
    const selectedCountry = country.name.toUpperCase();
    setCurrentCountry(selectedCountry);
    setFormData({
      ...formData,
      receiver_phone_number: value,
      country_code: country.dialCode,
    });
  };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}countries`);
      setCountries(res.data.data.map((ele) => ele.iso.toLowerCase()));
      // setCountrySend(res.data.data);
      setPhoneLoading(true);
      setIsLoading(false);
    } catch (error) {
      setPhoneLoading(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* حقل رقم الهاتف مع Skeleton */}
      <div className="flex gap-2 flex-col mt-6">
        {isLoading ? (
          <Skeleton height={56} className="rounded-md" />
        ) : (
          <PhoneInput
            country={"sy"}
            countryCodeEditable={true}
            onlyCountries={countries}
            inputProps={{
              name: "receiver_phone_number",
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
            buttonStyle={{ background: "transparent" }}
            dropdownStyle={{ zIndex: 1000 }}
            value={formData.receiver_phone_number}
            onChange={handlePhoneChange}
          />
        )}
        {currentCountry && !isLoading && (
          <div className="text-sm text-gray-600">
            {t("country")}: {currentCountry} - {t("international_transfer")}
          </div>
        )}
      </div>

      {/* حقل المبلغ مع Skeleton */}
      {isLoading ? (
        <Skeleton height={48} className="rounded-md" />
      ) : (
        <input
          type="number"
          step={1000}
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder={t("amount")}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline focus:outline-2 focus:outline-[#275963]"
        />
      )}

      {/* تفاصيل العمولة مع Skeleton */}
      {isLoading ? (
        <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
          <Skeleton height={24} count={3} />
        </div>
      ) : formData.amount ? (
        <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
          <div className="flex justify-between">
            <span>{t("base_amount")}:</span>
            <span>
              {formData.amount} {t("currency_unit")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              {t("commission")} (
              {commision.find(
                (item) => item.key === "international_transfer_fee"
              )?.value || 0}
              % ):
            </span>
            <span>
              {commission.toFixed()} {t("currency_unit")}
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>{t("total_amount")}:</span>
            <span>
              {totalAmount.toFixed()} {t("currency_unit")}
            </span>
          </div>
        </div>
      ) : null}

      {/* حقل الاسم التعريفي مع Skeleton */}
      {isLoading ? (
        <Skeleton height={48} className="rounded-md" />
      ) : (
        <input
          type="text"
          name="display_name"
          value={formData.display_name}
          onChange={handleChange}
          placeholder={t("display_name")}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline focus:outline-2 focus:outline-[#275963]"
        />
      )}

      {/* حقل كلمة المرور مع Skeleton */}
      {isLoading ? (
        <Skeleton height={48} className="rounded-md" />
      ) : (
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t("password")}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline focus:outline-2 focus:outline-[#275963]"
        />
      )}

      {/* زر التحويل مع Skeleton */}
      {isLoading ? (
        <Skeleton height={56} className="rounded-md" />
      ) : (
        <button
          type="button"
          className="border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145] border-[1px] dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold flex items-center justify-center"
          disabled={loading}
          onClick={sendTransfare}
        >
          {loading ? <FaSpinner className="animate-spin" /> : t("transfer")}
        </button>
      )}
    </div>
  );
}
