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
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setCities(res.data?.data);
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
            "Accept-Language": localStorage.getItem("i18nextLng"),
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
  // console.log(cities);
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
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    setLogoSend(file);
    if (file) {
      setLogo(URL.createObjectURL(file));
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
    setErrors({});
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
    // console.log(city);
    // console.log(category);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}subscribe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          onUploadProgress: (progress) => {
            const percent = Math.round(
              (progress.loaded * 100) / progress.total
            );
            setUploadProgress(percent);
          },
        }
      );
      localStorage.setItem("role", 3);
      // console.log(res.data);
      setUploadProgress(0);
      navigate("/office?table=eventInfo");
    } catch (error) {
      console.log(error);
      setErrors(error?.response?.data?.errors || {});
      setMessageError(error?.res?.data?.message);
      setUploadProgress(0);

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
      setLoadingBuild(false);
    }
  };
  // console.log(uploadProgress);
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
  // console.log(logo);
  return (
    <div className="px-4 md:px-8 py-6 bg-white rounded-lg shadow-sm">
      <div className="infoImages grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* لوغو الفعالية */}
        <div className="logo">
          <h5 className="text-xl font-medium text-gray-800 mb-4">
            {t("eventCardHead.logo")}
          </h5>
          <div
            className={`relative h-56 flex items-center justify-center w-full border-2 border-dashed rounded-lg transition-colors ${
              isDraggingLogo
                ? "bg-gray-100 border-[#275963]"
                : "border-gray-300 hover:border-[#275963]"
            }`}
            onDragOver={handleDragOverLogo}
            onDragLeave={handleDragLeaveLogo}
            onDrop={handleDropLogo}
          >
            <label
              htmlFor="logo"
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-4"
            >
              {logo ? (
                <img src={logo} alt="Event Logo" className="w-full h-full" />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="icon mb-3">[...]</div>
                  <span className="text-[#275963] text-lg font-medium">
                    {t("eventCardHead.uploadImage")}
                  </span>
                </div>
              )}
              <input
                type="file"
                id="logo"
                hidden
                onChange={handleLogoChange}
                accept="image/*"
              />
            </label>
          </div>
          {errors?.logo && (
            <p className="text-red-500 text-xs mt-1">{errors.logo[0]}</p>
          )}
        </div>

        {/* صورة الغلاف */}
        <div className="background">
          <h5 className="text-xl font-medium text-gray-800 mb-4">
            {t("eventCardHead.coverImage")}
          </h5>
          <div
            className={`relative h-56 flex items-center justify-center w-full border-2 border-dashed rounded-lg transition-colors ${
              isDragging
                ? "bg-gray-100 border-[#275963]"
                : "border-gray-300 hover:border-[#275963]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="background"
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-4"
            >
              {background ? (
                <img
                  src={background}
                  alt="Event Cover"
                  className="w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="icon mb-3">[...]</div>
                  <span className="text-[#275963] text-lg font-medium">
                    {t("eventCardHead.uploadImage")}
                  </span>
                </div>
              )}
              <input
                type="file"
                id="background"
                hidden
                onChange={handleBackgroundChange}
                accept="image/*"
              />
            </label>
          </div>
          {errors?.background && (
            <p className="text-red-500 text-xs mt-1">{errors.background[0]}</p>
          )}
        </div>
      </div>

      {/* معلومات الفعالية */}
      <div className="mt-8">
        <h5 className="text-xl font-medium text-gray-800 mb-6">
          {t("eventCardHead.infoTitle")}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <TextField
              label={t("eventCardHead.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors?.name}
              helperText={errors?.name ? errors.name[0] : ""}
              InputProps={{ className: "bg-gray-50" }}
            />
          </div>

          <div className="space-y-1">
            <TextField
              label={t("eventCardHead.license")}
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors?.license}
              helperText={errors?.license ? errors.license[0] : ""}
              InputProps={{ className: "bg-gray-50" }}
            />
          </div>

          <div className="space-y-1">
            <TextField
              label={t("eventCardHead.purpose")}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors?.purpose}
              helperText={errors?.purpose ? errors.purpose[0] : ""}
              InputProps={{ className: "bg-gray-50" }}
            />
          </div>

          <div className="space-y-1">
            <TextField
              label={t("eventCardHead.description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              variant="outlined"
              error={!!errors?.description}
              helperText={errors?.description ? errors.description[0] : ""}
              InputProps={{ className: "bg-gray-50" }}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("eventCardHead.category")}
            </label>
            <select
              className={`w-full border border-gray-300 rounded-md px-3 py-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#275963] focus:border-transparent ${
                errors?.market_category_id ? "border-red-500" : ""
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{t("eventCardHead.selectCategory")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors?.market_category_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.market_category_id[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("eventCardHead.city")}
            </label>
            <select
              className={`w-full border border-gray-300 rounded-md px-3 py-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#275963] focus:border-transparent ${
                errors?.city_id ? "border-red-500" : ""
              }`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">{t("eventCardHead.selectCity")}</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors?.city_id && (
              <p className="text-red-500 text-xs mt-1">{errors.city_id[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <TextField
              label={t("eventCardHead.password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors?.employ_password}
              helperText={
                errors?.employ_password ? errors.employ_password[0] : ""
              }
              InputProps={{
                className: "bg-gray-50",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="space-y-1">
            <TextField
              label={t("eventCardHead.confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                className: "bg-gray-50",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={build}
            disabled={loadingBuild}
            className="w-full px-6 py-3 bg-[#275963] text-white rounded-md hover:bg-[#1d4750] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#275963] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loadingBuild ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mx-2" />
                {uploadProgress == "100" ? uploadProgress - 1 : uploadProgress}%
              </div>
            ) : (
              t("createEvent")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
