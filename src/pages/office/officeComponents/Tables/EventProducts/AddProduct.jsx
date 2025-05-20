import React, { useState } from "react";
import axios from "axios";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FaSpinner } from "react-icons/fa";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddProduct({
  loadingM,
  loadingC,
  loadingP,
  colors,
  measures,
  productsCategory,
  setShowAddProduct,
  setProductsCategory,
}) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    description: "",
    // image: null,
    product_category_id: "",
    measure_ids: [],
    color_ids: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e, key) => {
    setProduct({ ...product, [key]: e.target.value });
  };

  const [background, setBackground] = useState(``);
  const [backgroundSend, setBackgroundSend] = useState(``);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    setBackgroundSend(file);
    if (file) {
      setBackground(URL.createObjectURL(file));
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

  const [progressLog, setProgressLog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const publish = async () => {
    setErrors({});
    setProgressLog(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("product_category_id", product.product_category_id);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("description", product.description);
    if (backgroundSend) {
      formData.append("images[0]", backgroundSend);
    }
    product.measure_ids.forEach((id, index) =>
      formData.append(`measure_ids[${index}]`, id)
    );
    product.color_ids.forEach((id, index) =>
      formData.append(`color_ids[${index}]`, id)
    );
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}product/add`,
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
            // console.log(`Upload Progress: ${percent}%`);
          },
        }
      );
      setProgressLog(false);
      // console.log(res.data.data);
      // console.log(res.data);
      setUploadProgress(0);
      // setProductsCategory((prev) => ({ ...prev, [name]: value }));

      setShowAddProduct(false);
      Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم نشر المنتج بنجاح!",
        confirmButtonText: "رائع",
      });
    } catch (error) {
      setUploadProgress(0);
      console.log(error);
      if (
        error?.response?.data?.message ===
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
        error?.response?.data?.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
      setProgressLog(false);

      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("خطأ أثناء نشر المنتج", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder={t("productForm.name")}
            value={product.name}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name[0]}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder={t("productForm.price")}
            value={product.price}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price[0]}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            name="discount"
            placeholder={t("productForm.discount")}
            value={product.discount}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="col-span-2">
          <textarea
            name="description"
            placeholder={t("productForm.description")}
            value={product.description}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description[0]}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">{t("productForm.category")}</p>
        <select
          name="product_category_id"
          value={product.product_category_id}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="">{t("productForm.selectCategory")}</option>
          {productsCategory.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.product_category_id && (
          <p className="text-red-500 text-sm">
            {errors.product_category_id[0]}
          </p>
        )}
      </div>

      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>{t("productForm.colors")}</InputLabel>
          <Select
            multiple
            value={product.color_ids}
            onChange={(e) => handleSelectChange(e, "color_ids")}
          >
            {colors.map((color) => (
              <MenuItem key={color.id} value={color.id}>
                <span className="p-1" style={{ backgroundColor: color.code }}>
                  {color.code}
                </span>
              </MenuItem>
            ))}
          </Select>
          {errors.color_ids && (
            <p className="text-red-500 text-sm">{errors.color_ids[0]}</p>
          )}
        </FormControl>
      </div>

      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>{t("productForm.sizes")}</InputLabel>
          <Select
            multiple
            value={product.measure_ids}
            onChange={(e) => handleSelectChange(e, "measure_ids")}
          >
            {measures.map((measure) => (
              <MenuItem key={measure.id} value={measure.id}>
                {measure.name}
              </MenuItem>
            ))}
          </Select>
          {errors.measure_ids && (
            <p className="text-red-500 text-sm">{errors.measure_ids[0]}</p>
          )}
        </FormControl>
      </div>

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
              <div className="icon">{/* SVG here */}</div>
              <span className="text-[#275963] text-lg">
                {t("productForm.dropImage")}
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
      {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

      <button
        className="bg-[#275963] flex justify-center items-center gap-1 font-bold text-white px-4 py-2 rounded-md mt-4 w-full"
        onClick={publish}
        disabled={progressLog}
      >
        {progressLog ? (
          <>
            <FaSpinner className="animate-spin" />{" "}
            {uploadProgress == "100" ? uploadProgress - 1 : uploadProgress}%
          </>
        ) : (
          t("productForm.publish")
        )}
      </button>
    </div>
  );
}
