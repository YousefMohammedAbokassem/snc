import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EventInfo() {
  const [profile, setProfile] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoadingProfile(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}profile/get`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProfile(res.data?.data);
      // console.log(res.data?.data);
      setBackground(
        `${import.meta.env.VITE_API_URL_IMAGE}${res.data?.data?.background}`
      );
      setLogo(`${import.meta.env.VITE_API_URL_IMAGE}${res.data?.data?.logo}`);
      setName(res.data?.data?.name);
      setAddress(res.data?.data?.address);
      setCategory(res.data?.data?.market_category_id);
    } catch (error) {
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
      //
      if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
    } finally {
      setLoadingProfile(false);
    }
  };
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    setLoadingProfile(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_market_categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCategories(res.data?.data);
    } catch (error) {
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
      //
      if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(
    `${import.meta.env.VITE_API_URL_IMAGE}${profile?.logo}`
  );
  const [background, setBackground] = useState(
    `${import.meta.env.VITE_API_URL_IMAGE}${profile?.background}`
  );
  const [name, setName] = useState(profile?.name);
  const [address, setAddress] = useState(profile?.address);
  const [category, setCategory] = useState(profile?.market_category_id);
  const [isDragging, setIsDragging] = useState(false);
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };
  const handleSave = () => {
    const eventData = {
      name,
      address,
      category,
    };
  };

  const [loading, setLoading] = useState(false);
  const sendTransfare = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", name);
    formData.append("address", address);
    formData.append("market_category_id", category);
    if (
      background !== `${import.meta.env.VITE_API_URL_IMAGE}${profile?.logo}`
    ) {
      formData.append("background", background);
    }
    if (logo !== `${import.meta.env.VITE_API_URL_IMAGE}${profile?.logo}`) {
      formData.append("logo", logo);
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}profile/edit_profile`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
      //
      if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  return (
<div className="px-8 py-6">
  {/* قسم الصور */}
  <div className="infoImages grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    {/* قسم الشعار */}
    <div className="logo bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h5 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t("logo")}</h5>
      <div className="logoImage flex flex-col sm:flex-row items-center gap-6">
        {loadingProfile ? (
          <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
        ) : (
          <div className="relative">
            <img 
              src={logo} 
              alt="logo" 
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          </div>
        )}
      </div>
    </div>

    {/* قسم صورة الخلفية */}
    <div className="background bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h5 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t("backgroundImage")}</h5>
      {loadingProfile ? (
        <div className="h-52 w-full bg-gray-200 dark:bg-gray-600 animate-pulse rounded-lg" />
      ) : (
        <div
          className={`relative h-52 w-full rounded-lg overflow-hidden border-2 border-dashed ${
            isDragging ? 'border-[#275963] bg-gray-100 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'
          } transition-colors duration-200 flex items-center justify-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label htmlFor="background" className="absolute inset-0 flex items-center justify-center cursor-pointer">
            {background ? (
              <img
                src={background}
                alt="backgroundEvent"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="icon mb-3">
                  <svg
                    width="44"
                    height="39"
                    viewBox="0 0 44 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 dark:text-gray-500"
                  >
                    <path
                      d="M16.2981 12.2236C16.2981 14.4739 14.4739 16.2981 12.2236 16.2981C9.97326 16.2981 8.14904 14.4739 8.14904 12.2236C8.14904 9.97326 9.97326 8.14904 12.2236 8.14904C14.4739 8.14904 16.2981 9.97326 16.2981 12.2236Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.43269 0C2.4323 0 0 2.4323 0 5.43269V32.5962C0 35.5965 2.4323 38.0288 5.43269 38.0288H38.0288C41.0292 38.0288 43.4615 35.5965 43.4615 32.5962V5.43269C43.4615 2.4323 41.0292 0 38.0288 0H5.43269ZM38.0288 2.71635C39.529 2.71635 40.7452 3.9325 40.7452 5.43269V23.089L30.4872 17.7997C29.9643 17.5382 29.3328 17.6407 28.9194 18.0541L18.8414 28.1322L11.6188 23.3171C11.0801 22.958 10.3628 23.029 9.90501 23.4868L2.71635 29.8798V5.43269C2.71635 3.9325 3.9325 2.71635 5.43269 2.71635H38.0288Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="text-[#275963] dark:text-[#E1B145] text-lg font-medium">
                  {t("drag_and_drop_or_browse")}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {t("recommended_size")}
                </span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="background"
            className="hidden"
            onChange={handleBackgroundChange}
            accept="image/*"
          />
        </div>
      )}
    </div>
  </div>

  {/* معلومات الحدث */}
  <div className="eventInfo bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
    <h5 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{t("eventInfo")}</h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* حقل الاسم */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          {t("name")}
        </label>
        {loadingProfile ? (
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-600 animate-pulse rounded-lg" />
        ) : (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#275963] dark:focus:ring-[#E1B145] focus:border-transparent outline-none transition"
          />
        )}
      </div>

      {/* حقل العنوان */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          {t("address")}
        </label>
        {loadingProfile ? (
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-600 animate-pulse rounded-lg" />
        ) : (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#275963] dark:focus:ring-[#E1B145] focus:border-transparent outline-none transition"
          />
        )}
      </div>

      {/* حقل التصنيف */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          {t("category")}
        </label>
        {loadingProfile ? (
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-600 animate-pulse rounded-lg" />
        ) : (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#275963] dark:focus:ring-[#E1B145] focus:border-transparent outline-none appearance-none transition"
          >
            <option value="" disabled>{t("select_category")}</option>
            {loading ? (
              <option disabled>{t("loading")}...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        )}
      </div>
    </div>
  </div>
</div>
  );
}
