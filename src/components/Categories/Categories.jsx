import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import NoDataFounded from "../NoDataFounded/NoDataFounded";

export default function Categories() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }get_market_categories?paginate=1&perPage=5`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(res.data);
      setCategories(res.data?.data?.data || []);
      // console.log(categories);
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

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("categories")}
        </span>
        <Link
          to="/Categories"
          className="opacity-40 text-lg text-[#1D1D1D] dark:text-[#fff] dark:opacity-70"
        >
          {t("showAll")}
        </Link>
      </div>

      {/* ✅ تحديد عدد الأعمدة بناءً على عدد الفئات */}
      <div
        className={`grid ${
          categories.length < 5 ? "grid-cols-2" : "grid-cols-3"
        } gap-4`}
      >
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {loading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></div>
                  </div>
                ))
            : categories.slice(0, 4).map((category) => (
                <div
                  key={category.id}
                  className="bg-[#F3F5F7] dark:bg-[#2e2e2e] dark:text-white p-5 h-full flex cursor-pointer rounded-lg"
                >
                  <div className="flex flex-row-reverse h-full gap-4 w-full">
                    <div className="info flex flex-col justify-center items-center self-end mb-4 w-[100px]">
                      <h3 className="font-bold text-lg text-center">
                        {category.name}
                      </h3>
                      <Link
                        to={`/Categories/${category.id}?category=${category.name}`}
                        className="flex items-center gap-1 underline categoryShop"
                      >
                        <span>{t("shopNow")}</span>
                      </Link>
                    </div>
                    <div className="image h-full w-full">
                      <img
                        src={`${import.meta.env.VITE_API_URL_IMAGE}${
                          category.logo
                        }`}
                        alt={category.name}
                        className="h-full w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {loading ? (
          <div className="col-span-1 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg h-full"></div>
        ) : (
          categories.length > 4 && (
            <div className="col-span-1 bg-[#F3F5F7] dark:bg-[#2e2e2e] dark:text-white p-5 h-full rounded-lg">
              <div className="flex flex-col h-full">
                <div className="info self-end flex flex-col justify-center items-center">
                  <h3 className="font-bold text-lg text-center">
                    {categories[4].name}
                  </h3>
                  <Link
                    to={`/Categories/${categories[4].id}?category=${categories[4].name}`}
                    className="flex items-center gap-1 underline categoryShop"
                  >
                    <span>{t("shopNow")}</span>
                  </Link>
                </div>
                <div className="image h-full w-full">
                  <img
                    src={`${import.meta.env.VITE_API_URL_IMAGE}/${
                      categories[4].logo
                    }`}
                    alt={categories[4].name}
                    className="h-full w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {loading ? "" : categories.length > 0 ? "" : <NoDataFounded />}
    </div>
  );
}
