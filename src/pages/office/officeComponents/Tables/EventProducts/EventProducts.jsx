import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EyeIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import AddProduct from "./AddProduct";
import NoDataFounded from "../../../../../components/NoDataFounded/NoDataFounded";
import { useNavigate } from "react-router-dom";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
export default function EventProducts() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}product/get_my_products`,
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

  const [loadingM, setLoadingM] = useState(true);
  const [measures, setMeasures] = useState([]);

  const fetchMeasure = async () => {
    setLoadingM(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_measures`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMeasures(res.data?.data || []);
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
      setLoadingM(false);
    }
  };
  const [colors, setColors] = useState([]);
  const [loadingC, setLoadingC] = useState(true);

  const fetchColors = async () => {
    setLoadingC(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}get_colors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setColors(res.data?.data || []);
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
      setLoadingC(false);
    }
  };
  const [productsCategory, setProductsCategory] = useState([]);
  const [loadingP, setLoadingP] = useState(true);

  const fetchProductsCategory = async () => {
    setLoadingP(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProductsCategory(res.data?.data || []);
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
      setLoadingP(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchMeasure();
    fetchColors();
    fetchProductsCategory();
  }, []);

  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // دالة الحذف
  const handleDeleteProduct = async () => {
    try {
      setLoadingD(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}product/delete/${productToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setProducts(
          products.filter((product) => product.id !== productToDelete.id)
        );
        setShowDeleteConfirm(false);
        toast.success("تم حذف المنتج بنجاح");
        setLoadingD(false);
      } else {
        throw new Error("فشل في حذف المنتج");
      }
    } catch (error) {
      setLoadingD(false);
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "حدث خطأ أثناء حذف المنتج");
    }
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  // console.log(products);
  return (
    <div className="px-8">
      <button
        onClick={() => setShowAddProduct(!showAddProduct)}
        className="bg-[#275963] text-white px-4 py-2 rounded-md mb-4 mr-auto block w-full"
      >
        {showAddProduct ? t("Back to Products") : t("Add Product")}
      </button>

      {!showAddProduct && !showEditProduct && (
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
                    <div className="show flex items-center justify-between my-2 cursor-pointer">
                      <div className="reviews">
                        <span className="opacity-50">
                          {item?.number_of_reviews} {t("reviews")}
                        </span>
                      </div>
                    </div>

                    <p className="type my-2 font-semibold text-md">
                      {item?.name}
                    </p>

                    {localStorage.getItem("authenticate") == "true" && (
                      <p className="priceLocal my-2">
                        {t("Local Price")}:
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
                          <span>{item?.price_in_country} SNC</span>
                        )}
                      </p>
                    )}

                    <p className="priceInter my-2 text-[#275963]">
                      {t("International Price")}:
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

                    <div className="flex justify-between items-center gap-2">
                      {localStorage.getItem("authenticate") == "true" && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedProduct(item);
                              setShowEditProduct(true);
                            }}
                            className="bg-[#275963] flex-1 justify-center text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            {t("Edit")}
                          </button>
                          <button
                            onClick={() => {
                              setProductToDelete(item);
                              setShowDeleteConfirm(true);
                            }}
                            className="bg-red-500 flex-1 justify-center text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            {t("Delete")}
                          </button>
                        </>
                      )}
                    </div>

                    {showDeleteConfirm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                          <h3 className="text-lg font-semibold mb-4">
                            {t("Confirm Deletion")}
                          </h3>
                          <p className="mb-6">
                            {t("Are you sure you want to delete")} "
                            {productToDelete?.name}"؟
                          </p>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-4 py-2 border border-gray-300 rounded-md"
                            >
                              {t("Cancel")}
                            </button>
                            <button
                              onClick={handleDeleteProduct}
                              className="px-4 py-2 bg-red-500 text-white rounded-md"
                              disabled={loadingD}
                            >
                              {loadingD ? t("Deleting...") : t("Yes, Delete")}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>
      )}

      {!showAddProduct &&
        !showEditProduct &&
        (loading ? "" : products?.length > 0 ? "" : <NoDataFounded />)}

      {showAddProduct && (
        <AddProduct
          setProductsCategory={setProductsCategory}
          setShowAddProduct={setShowAddProduct}
          colors={colors}
          loadingM={loadingM}
          loadingC={loadingC}
          measures={measures}
          productsCategory={productsCategory}
          loadingP={loadingP}
        />
      )}

      {showEditProduct && (
        <EditProduct
          item={selectedProduct}
          setShowEditProduct={setShowEditProduct}
          setProductsCategory={setProductsCategory}
          colors={colors}
          loadingM={loadingM}
          loadingC={loadingC}
          measures={measures}
          productsCategory={productsCategory}
          loadingP={loadingP}
        />
      )}
    </div>
  );
}
