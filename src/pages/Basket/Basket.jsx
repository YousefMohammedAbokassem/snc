import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import Nav from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { FaSpinner } from "react-icons/fa";
import NoDataFounded from "../../components/NoDataFounded/NoDataFounded";
import Swal from "sweetalert2";
export default function Basket() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  // const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}order/cart/get`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(res.data.data);
      setItems(res.data?.data || []);
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [amount, setAmount] = useState([]);

  const fetchAmount = async () => {
    setLoadingAmount(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}order/cart/get_price`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setAmount(res.data?.data || []);
    } catch (error) {
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
    } finally {
      setLoadingAmount(false);
    }
  };
  useEffect(() => {
    fetchAmount();
  }, []);
  // console.log(amount);
  const [items, setItems] = useState([]);
  const timeout = useRef(null); // تحديد timeout باستخدام useRef

  const updateQuantity = (id, change) => {
    setDisabledBuy(true);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );

    // إلغاء المؤقت القديم إذا كان موجودًا
    clearTimeout(timeout.current);

    // تعيين مؤقت جديد لتحديث الكمية بعد ثانية واحدة من آخر تعديل
    timeout.current = setTimeout(() => {
      setItems((prevItems) => {
        const itemToUpdate = prevItems.find((item) => item.id === id);
        if (itemToUpdate) {
          update(itemToUpdate.id, itemToUpdate.quantity); // إرسال التحديث إلى الخادم
        }
        return prevItems;
      });

      setDisabledBuy(false);
    }, 1000);
  };
  // update quantity
  const [loadingAmount, setLoadingAmount] = useState(false);
  const [disabledBuy, setDisabledBuy] = useState(false);
  const [error, setError] = useState("");
  const update = async (id, quantity) => {
    setError("");
    setLoadingAmount(true);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("quantity", quantity);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}order/cart/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      fetchAmount();
    } catch (error) {
      setError(error?.response?.data?.message);
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/signIn");
      }
      setLoadingAmount(false);
    }
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // لتخزين معرف العنصر المراد حذفه
  const [openDialog, setOpenDialog] = useState(false); // للتحكم في الـ Dialog

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setLoadingDelete(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}order/cart/delete/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setItems((prev) => prev.filter((item) => item.id !== deleteId)); // حذف العنصر من القائمة بعد الحذف
      setOpenDialog(false); // إغلاق النافذة
      fetchAmount();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "حاول لاحقًا",
        confirmButtonText: "حسنًا",
      });
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/signIn");
      }
    } finally {
      setLoadingDelete(false);
      setDeleteId(null);
    }
  };
  //
  const [loadingPay, setLoadingPay] = useState(false);

  const payBasket = async () => {
    setError("");
    setLoadingPay(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}order/cart/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLoadingPay(false);
      Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم الشراء بنجاح",
        confirmButtonText: "حسنًا",
      });
      navigate("/home");
    } catch (error) {
      setError(error?.response?.data?.message);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: error?.response?.data?.message,
        confirmButtonText: "حسنًا",
      });
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/signIn");
      }
      setLoadingPay(false);
    }
  };
  return (
    <>
      {/* <Nav /> */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
          <ul className="flex gap-2 opacity-25">
            <li className="cursor-pointer" onClick={() => navigate("/home")}>
              <span className="font-bold text-lg">{t("home")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">
                {t("cart.breadcrumb.arrow")}
              </span>
            </li>
            <li>
              <span className="font-bold text-lg">
                {t("cart.breadcrumb.current")}
              </span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-12 text-center ">
          {t("cart.title")}
        </h2>

        <div>
          <table className="w-full border-collapse text-center">
            <thead className="border-b">
              <tr>
                <th className="p-3">{t("cart.table.headers.products")}</th>
                <th className="p-3">{t("cart.table.headers.price")}</th>
                <th className="p-3">{t("cart.table.headers.quantity")}</th>
                <th className="p-3">{t("cart.table.headers.remove")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="text-center border-b">
                  <td className="p-3 flex justify-center">
                    <div className="w-[150px] h-[200px] bg-gray-300 animate-pulse"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-6 bg-gray-300 w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 w-1/2 animate-pulse"></div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                      <div className="w-8 h-6 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-8 h-8 bg-gray-300 border rounded-full animate-pulse"></div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="text-center border-b">
                    <td className="p-3 flex justify-center">
                      <img
                        src={`${import.meta.env.VITE_API_URL_IMAGE}${
                          item.image
                        }`}
                        alt={item.name}
                        className="w-[150px] h-[200px]"
                      />
                    </td>
                    <td className="p-3">
                      {localStorage.getItem("authenticate") == "true" && (
                        <p className="priceLocal my-2">
                          {t("cart.price.local")}
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
                            <span>{item?.price_in_country}</span>
                          )}
                        </p>
                      )}

                      <p className="priceInter my-2 text-[#275963]">
                        {t("cart.price.international")}
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
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="w-8 h-8 text-white text-xl bg-[#275963] flex items-center justify-center font-bold rounded-full"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="w-8 h-8 border border-black text-xl flex items-center justify-center font-bold rounded-full"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setDeleteId(item.id);
                          setOpenDialog(true);
                        }}
                      >
                        <MdDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* المجموع والدفع */}
        {loadingAmount ? (
          <div className="mt-6 text-right flex flex-col items-center">
            <div className="h-6 bg-gray-300 w-3/4 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 w-1/2 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 w-3/4 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 w-2/3 mb-4 animate-pulse"></div>
            <div className="w-1/2 bg-gray-300 h-10 rounded-lg animate-pulse"></div>
          </div>
        ) : items.length > 0 ? (
          <div className="mt-6 text-right flex flex-col items-center">
            <p className="text-xl font-bold">
              {t("cart.total.title")}
              <span className="text-[#275963]">
                {`${t("cart.total.international")}: ${
                  amount.international_total
                }`}
              </span>
              <br />
              <span className="text-[#275963]">
                {`${t("cart.total.local")}: ${amount.local_total}`}
              </span>
              <br />
              <span className="text-[#275963]">
                {`${t("cart.total.commissions")}: ${
                  amount.totalCommissionsAsValue
                }`}
              </span>
              <br />
              <span className="text-[#275963]">
                {`${t("cart.total.taxes")}: ${amount.totalTaxesAsValue}`}
              </span>
            </p>
            <button
              className="mt-4 w-1/2 bg-[#275963] text-white px-6 py-2 rounded-lg"
              disabled={disabledBuy || loadingPay}
              onClick={payBasket}
            >
              {loadingPay ? (
                <FaSpinner className="animate-spin" />
              ) : (
                t("cart.pay")
              )}
            </button>
          </div>
        ) : (
          <NoDataFounded />
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{t("cart.delete.confirm.title")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("cart.delete.confirm.text")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              {t("cart.delete.cancel")}
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("cart.delete.confirm")
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
