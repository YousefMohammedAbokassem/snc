import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../nav/Nav";
import { Button } from "@mui/material";
import NoDataFounded from "../../components/NoDataFounded/NoDataFounded";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
export default function Product() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const categoryStore = searchParams.get("categoryStore");
  const categoryProduct = searchParams.get("categoryProduct");
  const product_category = searchParams.get("product_category");
  const id = searchParams.get("product");
  const idEvent = searchParams.get("categoryStore");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }get_products/find_similar/${product_category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProducts(res.data?.data || []);
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
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [productData, setProductData] = useState([]);
  const fetchProduct = async () => {
    setLoadingProduct(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProductData(res.data?.data || []);
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
      setLoadingProduct(false);
    }
  };
  console.log(productData);
  useEffect(() => {
    fetchData();
    fetchProduct();
  }, [categoryStore, categoryProduct, id]);
  console.log(productData);
  // بيانات المنتج (يفترض أن تأتي من API)
  // const productData = {
  //   name: "product" || "برغر دبل مع الجبنة",
  //   price: "150,000 ل.س",
  //   oldPrice: "$50",
  //   store: "Ikea Store",
  //   image: "/images/burger.png", // استبدلها برابط الصورة الحقيقي
  //   description:
  //     "شريحة لحم مشوية مع جبنة شيدر، صوص خاص وخضار طازجة، يقدم مع البطاطس المقرمشة.",
  //   quantity: 1,
  // };
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const [loadingBuy, setLoadingBuy] = useState(false);
  const [error, setError] = useState("");
  const buyCard = async () => {
    setError("");
    setLoadingBuy(true);
    const formData = new FormData();
    formData.append("color_id", selectedColor);
    formData.append("measure_id", selectedSize);
    formData.append("quantity", quantity);
    formData.append("product_id", productData?.id);
    formData.append("event_id", productData?.event?.id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}order/cart/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم الإضافة للسلة بنجاح",
        confirmButtonText: "حسنًا",
      });
      navigate("/basket");
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "warning",
        title: "تنبيه",
        text: "قم بإكمال تحديد الخيارات",
        confirmButtonText: "حسنًا",
      });
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/signIn");
      }
    } finally {
      setLoadingBuy(false);
    }
  };
  return (
    <>
      {/* <Nav /> */}
      <div className="container mx-auto p-6">
        {/* مسار التصفح */}
        <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
          <ul className="flex gap-2 opacity-25">
            <li className="cursor-pointer" onClick={() => navigate("/Events")}>
              <span className="font-bold text-lg">{t("events")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t("categories")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{categoryProduct}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t("detailsProduct")}</span>
            </li>
          </ul>
        </div>

        {/* تفاصيل المنتج */}
        {loadingProduct ? (
          <div className="product flex flex-col md:flex-row bg-white py-3 rounded-lg p-5 gap-5">
            {/* Skeleton Loader for Product Image */}
            <div className="images w-full md:w-2/5 animate-pulse">
              <div className="image w-full h-full bg-gray-300 rounded-lg"></div>
            </div>

            {/* Skeleton Loader for Product Info */}
            <div className="info flex flex-col w-full md:w-3/5 space-y-3 animate-pulse">
              <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-6 bg-gray-300 rounded"></div>

              {/* Skeleton for Price */}
              <div className="priceLocal my-2 flex gap-3 items-center">
                <div className="w-2/4 h-6 bg-gray-300 rounded"></div>
                <div className="w-2/4 h-6 bg-gray-300 rounded"></div>
              </div>

              <div className="priceInter my-2 flex gap-3 items-center">
                <div className="w-2/4 h-6 bg-gray-300 rounded"></div>
                <div className="w-2/4 h-6 bg-gray-300 rounded"></div>
              </div>

              {/* Skeleton for Market */}
              <div className="market flex items-center gap-3 border-b pb-3 animate-pulse">
                <div className="imageMarket w-14 h-14 rounded-full bg-gray-300"></div>
                <div className="infoMarket flex flex-col">
                  <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Skeleton for Description */}
              <div className="description">
                <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                <div className="w-full h-6 bg-gray-300 rounded mt-2"></div>
                <div className="w-full h-6 bg-gray-300 rounded mt-2"></div>
              </div>

              {/* Skeleton for Amount */}
              <div className="amount">
                <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Skeleton for Button */}
              <div className="flex justify-between items-center gap-2">
                <div className="w-1/2 h-10 bg-gray-300 rounded"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="product flex flex-col md:flex-row bg-white py-3 rounded-lg p-5 gap-5">
            {/* صورة المنتج */}
            <div className="images w-full md:w-2/5">
              <div className="image w-full h-full">
                <img
                  src={`${import.meta.env.VITE_API_URL_IMAGE}${
                    productData?.image
                  }`}
                  alt="Product Image"
                  className="w-full h-full  rounded-lg"
                />
              </div>
            </div>

            {/* معلومات المنتج */}
            <div className="info flex flex-col w-full md:w-3/5 space-y-3">
              <h5 className="text-xl font-semibold text-gray-800">
                {productData?.name}
              </h5>

              {localStorage.getItem("authenticate") === "true" && (
                <p className="priceLocal my-2">
                  السعر الوطني:
                  {productData?.discount ? (
                    <>
                      <del className="text-red-500">
                        {parseFloat(productData?.price_in_country)}
                      </del>
                      <p className="ml-2">
                        {parseFloat(productData?.price_in_country) *
                          (1 - productData?.discount / 100)}{" "}
                      </p>
                    </>
                  ) : (
                    <span>{productData?.price_in_country}</span>
                  )}
                </p>
              )}

              <p className="priceInter my-2 text-[#275963]">
                السعر الدولي:
                {productData?.discount ? (
                  <>
                    <del className="text-red-500">
                      {parseFloat(productData?.price_in_hun)} SNC
                    </del>
                    <p className="ml-2">
                      {parseFloat(productData?.price_in_hun) *
                        (1 - productData?.discount / 100)}{" "}
                      SNC
                    </p>
                  </>
                ) : (
                  <span>{productData?.price_in_hun} SNC</span>
                )}
              </p>

              {/* المتجر */}
              <div className="market flex items-center gap-3 border-b pb-3">
                <div className="imageMarket w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL_IMAGE}${
                      productData?.event?.logo
                    }`}
                    alt="Market Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="infoMarket flex flex-col">
                  <span className="text-gray-700 font-semibold">
                    {productData?.event?.name}
                  </span>
                  <div
                    className="flex gap-1 items-center text-blue-600 cursor-pointer hover:text-blue-800 transition"
                    onClick={() =>
                      navigate(`/allEvents/${productData?.event?.id}`)
                    }
                  >
                    <span>انتقل إلى صفحة المتجر</span>
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 22 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.125 0.375H16.5L22 5.875L16.5 11.375H15.125V7.25H6.875C4.59683 7.25 2.75 9.09683 2.75 11.375C2.75 13.6532 4.59683 15.5 6.875 15.5H16.5V18.25H6.875C3.07805 18.25 0 15.1719 0 11.375C0 7.57805 3.07805 4.5 6.875 4.5H15.125V0.375Z"
                        fill="#275963"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* الوصف */}
              <div className="description">
                <p className="font-semibold text-gray-800">الوصف</p>
                <p className="text-gray-600 leading-6 opacity-80">
                  {productData?.description}
                </p>
              </div>

              {/* اختيار اللون */}
              <div className="colors">
                <p className="font-semibold text-gray-800">اختر اللون</p>
                <div className="flex gap-3">
                  {productData?.colors.map((color) => (
                    <button
                      key={color.id}
                      className={`px-4 py-2  rounded-md border-4 border-transparent ${
                        selectedColor === color.id ? "opacity-100" : ""
                      }`}
                      style={{
                        backgroundColor: color.code,
                        opacity: selectedColor === color.id ? 1 : 0.25,
                      }}
                      onClick={() => setSelectedColor(color.id)}
                    ></button>
                  ))}
                </div>
              </div>

              {/* اختيار القياس */}
              <div className="sizes">
                <p className="font-semibold text-gray-800">اختر القياس</p>
                <div className="flex gap-3">
                  {productData?.measures.map((size) => (
                    <button
                      key={size.id}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size.id
                          ? "bg-[#275963] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* الكمية */}
              <div className="amount">
                <p className="font-semibold text-gray-800">الكمية</p>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 text-white text-xl bg-[#275963] flex items-center justify-center font-bold rounded-full hover:bg-[#1d4049] transition"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    className="w-8 h-8 border border-gray-700 text-xl flex items-center justify-center font-bold rounded-full hover:bg-gray-200 transition"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* زر الشراء */}
              <div className="flex justify-between items-center gap-2">
                <button
                  className="bg-[#275963] flex justify-center items-center rounded-md flex-1 h-[40px] text-white font-bold hover:bg-[#1d4049] transition"
                  onClick={buyCard}
                  disabled={loadingBuy}
                >
                  {loadingBuy ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    t("shopNow")
                  )}{" "}
                </button>
                <svg
                  className="bg-[#275963] p-2 rounded-md hover:bg-[#1d4049] transition cursor-pointer"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.43437 3.34298C3.86449 3.14262 3.24011 3.44217 3.03975 4.01203C2.8394 4.5819 3.13894 5.20629 3.70882 5.40664L4.08975 5.54057C5.06335 5.88287 5.70319 6.10971 6.174 6.34073C6.61621 6.5577 6.81114 6.73332 6.93956 6.92125C7.07119 7.11388 7.17284 7.37845 7.2302 7.90833C7.29022 8.46281 7.29171 9.18499 7.29171 10.2641V14.0582C7.29171 18.348 7.38392 19.7636 8.64743 21.0964C9.91093 22.429 11.9445 22.429 16.0117 22.429H23.7451C26.0215 22.429 27.1598 22.429 27.9643 21.7734C28.7689 21.1177 28.9987 20.0029 29.4582 17.7733L30.1871 14.2372C30.6933 11.7011 30.9465 10.433 30.299 9.59144C29.6516 8.74986 27.4396 8.74986 24.9823 8.74986H9.46833C9.45857 8.35563 9.44007 7.99697 9.40499 7.67293C9.32664 6.94904 9.15686 6.28882 8.74564 5.68706C8.33121 5.0806 7.78018 4.69218 7.13759 4.37689C6.53664 4.08202 5.773 3.81357 4.87391 3.4975L4.43437 3.34298Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* similar */}
        <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
          <span className="font-bold text-lg">{t("منتجات مشابهة")}</span>
        </div>
        {/*  */}
        {/* map here */}
        <div className="modern">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 h-[400px] rounded-[8px]"
                />
              ))
            : products?.map((item, i) => (
                <div
                  key={i}
                  className=" h-[400px] rounded-[8px] pb-5 flex flex-col"
                >
                  <div className="image flex-1 cursor-pointer h-[40%]">
                    <img
                      src={`${import.meta.env.VITE_API_URL_IMAGE}${item.image}`}
                      className="w-full h-full"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-2 cursor-pointer">
                    <div className="show flex items-center justify-between my-2">
                      <div className="reviews">
                        <span className="opacity-50">
                          {item?.number_of_reviews} {t("reviews")}
                        </span>
                      </div>
                    </div>
                    {/* type */}
                    <p className="type my-2 font-semibold text-md">
                      {item?.name}
                    </p>
                    {localStorage.getItem("authenticate") == "true" && (
                      <p className="priceLocal my-2">
                        السعر الوطني:
                        {item?.discount ? (
                          <>
                            <del className="text-red-500">
                              {parseFloat(item?.price_in_country)}
                            </del>
                            <p className="ml-2">
                              {parseFloat(item?.price_in_country) *
                                (1 - item?.discount / 100)}{" "}
                            </p>
                          </>
                        ) : (
                          <span>{item?.price_in_country} LSL</span>
                        )}
                      </p>
                    )}

                    <p className="priceInter my-2 text-[#275963]">
                      السعر الدولي:
                      {item?.discount ? (
                        <>
                          <del className="text-red-500">
                            {parseFloat(item?.price_in_hun)} SNC
                          </del>
                          <p className="ml-2">
                            {parseFloat(item?.price_in_hun) *
                              (1 - item?.discount / 100)}{" "}
                            SNC
                          </p>
                        </>
                      ) : (
                        <span>{item?.price_in_hun} SNC</span>
                      )}
                    </p>

                    <div
                      className="flex justify-between items-center gap-2"
                      onClick={() =>
                        navigate(
                          `/Product?categoryProduct=${item?.product_category_name}&product=${item?.id}&product_category=${item?.product_category_id}&categoryStore=${item?.product_category_id}`
                        )
                      }
                    >
                      <button
                        className="bg-[#275963] flex justify-center rounded-sm flex-1 h-[30px] text-white font-bold"
                        type="button"
                      >
                        {t("shopNow")}
                      </button>
                      <svg
                        className="bg-[#275963] p-1 rounded-sm"
                        width="30"
                        height="30"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.43437 3.34298C3.86449 3.14262 3.24011 3.44217 3.03975 4.01203C2.8394 4.5819 3.13894 5.20629 3.70882 5.40664L4.08975 5.54057C5.06335 5.88287 5.70319 6.10971 6.174 6.34073C6.61621 6.5577 6.81114 6.73332 6.93956 6.92125C7.07119 7.11388 7.17284 7.37845 7.2302 7.90833C7.29022 8.46281 7.29171 9.18499 7.29171 10.2641V14.0582C7.29171 18.348 7.38392 19.7636 8.64743 21.0964C9.91093 22.429 11.9445 22.429 16.0117 22.429H23.7451C26.0215 22.429 27.1598 22.429 27.9643 21.7734C28.7689 21.1177 28.9987 20.0029 29.4582 17.7733L30.1871 14.2372C30.6933 11.7011 30.9465 10.433 30.299 9.59144C29.6516 8.74986 27.4396 8.74986 24.9823 8.74986H9.46833C9.45857 8.35563 9.44007 7.99697 9.40499 7.67293C9.32664 6.94904 9.15686 6.28882 8.74564 5.68706C8.33121 5.0806 7.78018 4.69218 7.13759 4.37689C6.53664 4.08202 5.773 3.81357 4.87391 3.4975L4.43437 3.34298ZM18.9587 12.0311C19.5627 12.0311 20.0524 12.5208 20.0524 13.1249V14.9478H21.8753C22.4794 14.9478 22.9691 15.4375 22.9691 16.0415C22.9691 16.6456 22.4794 17.1353 21.8753 17.1353H20.0524V18.9582C20.0524 19.5622 19.5627 20.0519 18.9587 20.0519C18.3546 20.0519 17.8649 19.5622 17.8649 18.9582V17.1353H16.042C15.438 17.1353 14.9483 16.6456 14.9483 16.0415C14.9483 15.4375 15.438 14.9478 16.042 14.9478H17.8649V13.1249C17.8649 12.5208 18.3546 12.0311 18.9587 12.0311Z"
                          fill="white"
                        />
                        <path
                          d="M10.9375 26.25C12.1456 26.25 13.125 27.2294 13.125 28.4375C13.125 29.6456 12.1456 30.625 10.9375 30.625C9.72937 30.625 8.75 29.6456 8.75 28.4375C8.75 27.2294 9.72937 26.25 10.9375 26.25Z"
                          fill="white"
                        />
                        <path
                          d="M24.0625 26.25C25.2706 26.25 26.25 27.2293 26.25 28.4375C26.25 29.6456 25.2706 30.625 24.0625 30.625C22.8544 30.625 21.875 29.6456 21.875 28.4375C21.875 27.2293 22.8544 26.25 24.0625 26.25Z"
                          fill="white"
                        />
                      </svg>
                      {/* <span className="">
            </span> */}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {loading ? null : products.length > 0 ? null : <NoDataFounded />}
      </div>
      <Footer />
    </>
  );
}
