import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function EventInfo() {
  const [profile, setProfile] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
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
      setBackground(
        `${import.meta.env.VITE_API_URL_IMAGE}${res.data?.data?.background}`
      );
      setLogo(`${import.meta.env.VITE_API_URL_IMAGE}${res.data?.data?.logo}`);
      setName(res.data?.data?.name);
      setAddress(res.data?.data?.address);
      setCategory(res.data?.data?.market_category_id);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
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
      if (error.response?.status === 401) {
        dispatch(logoutUser());
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
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="px-8">
      <div className="infoImages grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="logo">
          <h5 className="text-xl mb-4">اللوغو</h5>
          <div className="logoImage h-full flex items-center gap-5">
            <div className="image h-24 w-24 rounded-full">
              {loadingProfile ? (
                <div className="h-24 w-24 rounded-full bg-gray-300 animate-pulse" />
              ) : (
                <img src={logo} alt="logo" className="h-24 w-24 rounded-full" />
              )}
            </div>
            <label htmlFor="logo">
              <div className="flex items-center cursor-pointer justify-center gap-2 border border-[#BBBBBB] px-10 py-1 rounded-md">
                <div className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3601 3.07866L14.2869 2.15178C15.8226 0.616073 18.3125 0.616073 19.8482 2.15178C21.3839 3.68748 21.3839 6.17734 19.8482 7.71305L18.9213 8.63992M13.3601 3.07866C13.3601 3.07866 13.4759 5.04828 15.2138 6.78617C16.9517 8.52406 18.9213 8.63992 18.9213 8.63992M13.3601 3.07866L11 5.43872M18.9213 8.63992L13.6607 13.9006L10.5613 17"
                      stroke="#275963"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-[#275963] text-lg">تغيير الصورة</span>
              </div>
              <input type="file" id="logo" hidden onChange={handleLogoChange} />
            </label>
          </div>
        </div>

        <div className="background">
          <h5 className="text-xl mb-4">صورة الغلاف</h5>
          {loadingProfile ? (
            <div className="h-full w-full bg-gray-300 animate-pulse" />
          ) : (
            // <img src={background} alt="background" className="w-full h-full " />
            <div
              className={`logoImage h-52 flex items-center justify-center gap-5 w-full border border-[#BBBBBB] ${
                isDragging ? "bg-gray-300" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label
                htmlFor="background"
                className="w-full h-full block cursor-pointer"
              >
                {background ? (
                  <img
                    src={background}
                    alt="backgroundEvent"
                    className="w-full h-full "
                  />
                ) : (
                  <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="icon">
                      <svg
                        width="44"
                        height="39"
                        viewBox="0 0 44 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.2981 12.2236C16.2981 14.4739 14.4739 16.2981 12.2236 16.2981C9.97326 16.2981 8.14904 14.4739 8.14904 12.2236C8.14904 9.97326 9.97326 8.14904 12.2236 8.14904C14.4739 8.14904 16.2981 9.97326 16.2981 12.2236Z"
                          fill="#919EAB"
                        />
                        <path
                          d="M5.43269 0C2.4323 0 0 2.4323 0 5.43269V32.5962C0 35.5965 2.4323 38.0288 5.43269 38.0288H38.0288C41.0292 38.0288 43.4615 35.5965 43.4615 32.5962V5.43269C43.4615 2.4323 41.0292 0 38.0288 0H5.43269ZM38.0288 2.71635C39.529 2.71635 40.7452 3.9325 40.7452 5.43269V23.089L30.4872 17.7997C29.9643 17.5382 29.3328 17.6407 28.9194 18.0541L18.8414 28.1322L11.6188 23.3171C11.0801 22.958 10.3628 23.029 9.90501 23.4868L2.71635 29.8798V5.43269C2.71635 3.9325 3.9325 2.71635 5.43269 2.71635H38.0288Z"
                          fill="#919EAB"
                        />
                      </svg>
                    </div>
                    <span className="text-[#275963] text-lg">
                      اسحب الصورة هنا أو تصفح الملفات
                    </span>
                  </div>
                )}
                <input
                  readOnly
                  type="file"
                  id="background"
                  hidden
                  onChange={handleBackgroundChange}
                />
              </label>
            </div>
          )}
        </div>
      </div>
      {/* هنا */}

      <h5 className="text-xl my-4">معلومات الفعالية</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-lg mb-2">الاسم</label>
          {loadingProfile ? (
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded-md" />
          ) : (
            <input
              readOnly
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md focus:border-[#275963] focus:outline-none"
            />
          )}
        </div>
        <div>
          <label className="block text-lg mb-2">العنوان</label>
          {loadingProfile ? (
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded-md" />
          ) : (
            <input
              readOnly
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded-md focus:border-[#275963] focus:outline-none"
            />
          )}
        </div>
        <div>
          <label className="block text-lg mb-2">التصنيف</label>
          {loadingProfile ? (
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded-md" />
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded-md focus:border-[#275963] focus:outline-none"
            >
              <option value="">اختر تصنيفًا</option>
              {loading ? (
                <option disabled>جارٍ التحميل...</option>
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
      {/* <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-[#275963] text-white rounded-md hover:bg-[#16383f] w-full"
      >
        {loading ? (
          <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
        ) : (
          t("حفظ التغييرات") // عرض نص "تسجيل الدخول"
        )}
      </button> */}
      {/*  */}
    </div>
  );
}
