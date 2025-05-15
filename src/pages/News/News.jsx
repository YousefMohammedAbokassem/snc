import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/auth/authSlice";
import axios from "axios";

export default function News() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}updates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setNews(res.data?.data);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] my-6">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("generalNews")}
        </span>
      </div>

      {/* News Container */}
      <div className="flex flex-col border rounded-sm border-[#B1B1B1]">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex p-8 gap-4 border-b border-b-[#B1B1B1] animate-pulse"
                >
                  <div className="w-[10%] h-6 bg-gray-300 rounded"></div>
                  <div className="flex-1">
                    <div className="w-32 h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              ))
          : news?.map((item) => (
              <div
                key={item.id}
                className="flex p-8 gap-4 border-b border-b-[#B1B1B1] last:border-b-0"
              >
                <div className="date w-[10%] flex items-center justify-center text-gray-600">
                  {new Date(item.date).toLocaleDateString("en")}
                </div>
                <div className="info flex-1">
                  <span
                    className="px-4 py-1 text-white font-bold mb-3 inline-block rounded"
                    style={{ backgroundColor: item.color_code }}
                  >
                    {item.title}
                  </span>
                  <div className="desc text-gray-800 dark:text-gray-300">
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
