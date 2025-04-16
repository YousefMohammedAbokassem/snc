import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function EventInfo() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const fetchData = async () => {
    setLoadingProfile(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}get_cities`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCities(res.data?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
      if (error?.message === "Network Error") {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
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
      if (error?.message === "Network Error") {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);
  console.log(cities);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(``);
  const [logoSend, setLogoSend] = useState(``);
  const [background, setBackground] = useState(``);
  const [backgroundSend, setBackgroundSend] = useState(``);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    setLogoSend(file);
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };
  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    setBackgroundSend(file);
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  const handleDragOverLogo = (event) => {
    event.preventDefault();
    setIsDraggingLogo(true);
  };

  const handleDragLeaveLogo = () => {
    setIsDraggingLogo(false);
  };

  const handleDropLogo = (event) => {
    event.preventDefault();
    setIsDraggingLogo(false);
    const file = event.dataTransfer.files[0];
    setLogoSend(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };
  // back
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
    setBackgroundSend(file);
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

  const [loadingBuild, setLoadingBuild] = useState(false);
  const [errors, setErrors] = useState({});
  const [messageError, setMessageError] = useState("");
  const build = async () => {
    setLoadingBuild(true);
    const formData = new FormData();
    // formData.append("_method", "PUT");
    formData.append("logo", logoSend);
    formData.append("name", name);
    formData.append("city_id", city);
    formData.append("background", backgroundSend);
    formData.append("license", license);
    formData.append("purpose", purpose);
    formData.append("description", description);
    formData.append("market_category_id", category);
    formData.append("employ_password", password);
    formData.append("employ_password_confirmation", confirmPassword);
    console.log(city);
    console.log(category);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}subscribe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      localStorage.setItem("role", 3);
      console.log(res.data);
      navigate("/office?table=eventInfo");
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.errors || {});
      setMessageError(error?.res?.data?.message);
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
      if (error?.message === "Network Error") {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
    } finally {
      setLoadingBuild(false);
    }
  };
  // const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log(logo);
  return (
    <div className="px-8">
      <div className="infoImages grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="logo">
          <h5 className="text-xl mb-4">اللوغو</h5>
          <div
            className={`logoImage h-52 flex items-center justify-center gap-5 w-full border border-[#BBBBBB] ${
              isDraggingLogo ? "bg-gray-300" : ""
            }`}
            onDragOver={handleDragOverLogo}
            onDragLeave={handleDragLeaveLogo}
            onDrop={handleDropLogo}
          >
            <label
              htmlFor="background"
              className="w-full h-full  flex cursor-pointer"
            >
              {logo ? (
                <img
                  src={logo}
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
                type="file"
                id="background"
                hidden
                onChange={handleLogoChange}
              />
            </label>
          </div>
        </div>

        <div className="background">
          <h5 className="text-xl mb-4">صورة الغلاف</h5>
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
              className="w-full h-full  flex cursor-pointer"
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
                type="file"
                id="background"
                hidden
                onChange={handleBackgroundChange}
              />
            </label>
          </div>
        </div>
      </div>
      {/* هنا */}

      <h5 className="text-xl my-4">معلومات الفعالية</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TextField
          label="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={!!errors?.name}
          helperText={errors?.name ? errors.name[0] : ""}
        />
        <TextField
          label="الترخيص"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          fullWidth
          error={!!errors?.license}
          helperText={errors?.license ? errors.license[0] : ""}
        />
        <TextField
          label="الغرض"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          fullWidth
          error={!!errors?.purpose}
          helperText={errors?.purpose ? errors.purpose[0] : ""}
        />
        <TextField
          label="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          error={!!errors?.description}
          helperText={errors?.description ? errors.description[0] : ""}
        />
        <select
          className={`w-full border px-3 py-2 rounded-md ${
            errors?.market_category_id ? "border-red-500" : ""
          }`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">اختر تصنيفًا</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors?.market_category_id && (
          <p className="text-red-500 text-sm">{errors.market_category_id[0]}</p>
        )}

        <select
          className={`w-full border px-3 py-2 rounded-md ${
            errors?.city_id ? "border-red-500" : ""
          }`}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">اختر مدينة</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {errors?.city_id && (
          <p className="text-red-500 text-sm">{errors.city_id[0]}</p>
        )}

        <TextField
          label="كلمة المرور"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={!!errors?.employ_password}
          helperText={errors?.employ_password ? errors.employ_password[0] : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="تأكيد كلمة المرور"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <button
        onClick={build}
        className="mt-4 px-6 py-2 bg-[#275963] text-white rounded-md hover:bg-[#16383f] w-full"
      >
        {loadingBuild ? (
          <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
        ) : (
          t("حفظ التغييرات") // عرض نص "تسجيل الدخول"
        )}
      </button>
      {/*  */}
    </div>
  );
}
