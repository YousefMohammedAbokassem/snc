import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import Nav from "../nav/Nav";
import NoDataFounded from "../../components/NoDataFounded/NoDataFounded";
import { FaSpinner } from "react-icons/fa";

export default function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }get_market_categories?paginate=1&perPage=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCategories(res.data?.data || []);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [LoadingButton, setLoadingButton] = useState(false);
  const [page, setPage] = useState(8);
  const fetchMore = async (newPage) => {
    setLoadingButton(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }get_market_categories?paginate=1&perPage=${newPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCategories(res.data?.data || []);
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
      setLoadingButton(false);
    }
  };
  return (
    <>
      {/* <Nav /> */}
      <div className="container mx-auto px-4 pb-12">
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
              <span className="font-bold text-lg">{t("showAll")}</span>
            </li>
          </ul>
        </div>

        <div className="text-center text-2xl font-bold mb-5">
          {t("categories")}
        </div>

        {/* Skeleton أثناء تحميل البيانات */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-[#F3F5F7] p-5 flex rounded-md">
                <div className="flex flex-row-reverse w-full animate-pulse">
                  {/* Skeleton المعلومات */}
                  <div className="info flex flex-col justify-center items-center self-end mb-4 w-[100px]">
                    <div className="w-20 h-6 bg-gray-300 rounded-md"></div>
                    <div className="w-16 h-4 bg-gray-300 mt-2 rounded-md"></div>
                  </div>

                  {/* Skeleton الصورة */}
                  <div className="image w-full">
                    <div className="w-full h-[200px] bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* عرض الفئات باستخدام map */}
            {categories?.data?.map((category) => (
              <div
                key={category.id}
                className="bg-[#F3F5F7] p-5 flex rounded-md"
              >
                <div className="flex flex-row-reverse w-full">
                  {/* قسم المعلومات */}
                  <div className="info flex flex-col justify-center items-center self-end mb-4 w-[100px]">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <Link
                      to={`/Categories/${category.id}?category=${category.name}`}
                      className="flex items-center gap-1 underline categoryShop"
                    >
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.16699 10H15.8337"
                            stroke="#141718"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.833 15L15.833 10"
                            stroke="#141718"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.833 5L15.833 10"
                            stroke="#141718"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{t("shopNow")}</span>
                    </Link>
                  </div>

                  {/* قسم الصورة */}
                  <div className="image w-full">
                    <img
                      src={`${import.meta.env.VITE_API_URL_IMAGE}${
                        category.image
                      }`}
                      alt={category.name}
                      className="w-full h-[200px]  rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {loading ? (
          ""
        ) : categories.data?.length > 0 ? (
          <button
            type="button"
            className={`more border-solid border border-[#CDCDCD] flex justify-center w-full mt-10 p-4 font-bold text-xl cursor-pointer rounded-md text-[#275963] 
            ${categories?.next_page_url === null ? "cursor-no-drop" : ""}`}
            onClick={() => {
              setPage((prev) => {
                fetchMore(prev + 8);
                return prev + 8;
              });
            }}
            disabled={LoadingButton || categories?.next_page_url === null}
          >
            {LoadingButton ? (
              <FaSpinner className="animate-spin" />
            ) : categories?.next_page_url === null ? (
              t("لا يوجد المزيد")
            ) : (
              t("more")
            )}
          </button>
        ) : (
          <NoDataFounded />
        )}
      </div>
      <Footer />
    </>
  );
}
