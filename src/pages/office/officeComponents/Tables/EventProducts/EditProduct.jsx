import React, { useState } from "react";
import axios from "axios";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FaSpinner } from "react-icons/fa";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddProduct({
  loadingM,
  loadingC,
  loadingP,
  colors,
  measures,
  productsCategory,
  setShowEditProduct,
  item,
}) {
  console.log(item);
  const [product, setProduct] = useState({
    name: item.name,
    price: item.price_in_hun,
    discount: item.discount,
    description: item.description,
    // image: null,
    product_category_id: item.product_category_id,
    measure_ids: [],
    color_ids: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    formData.append("_method", "PUT");
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
    console.log(product);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}product/update/${item.id}`,
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
            console.log(`Upload Progress: ${percent}%`);
          },
        }
      );
      setProgressLog(false);
      console.log(res.data.data);
      console.log(res.data);
      setUploadProgress(0);
      // setProductsCategory((prev) => ({ ...prev, [name]: value }));

      setShowEditProduct(false);
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
            placeholder="اسم المنتج"
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
            placeholder="السعر"
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
            placeholder="الخصم"
            value={product.discount}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="col-span-2">
          <textarea
            name="description"
            placeholder="الوصف"
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
        <p className="font-semibold mb-2">فئة المنتج</p>
        <select
          name="product_category_id"
          value={product.product_category_id}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="">اختر الفئة</option>
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
          <InputLabel>الألوان</InputLabel>
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
          <InputLabel>القياسات</InputLabel>
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
      {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

      {/* {product.image && (
        <div className="grid grid-cols-1 gap-2">
          <img
            src={URL.createObjectURL(product.image)}
            alt="منتج"
            className="w-full h-16 object-cover rounded-md"
          />
        </div>
      )} */}

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
          "نشر"
        )}
      </button>
    </div>
  );
}
