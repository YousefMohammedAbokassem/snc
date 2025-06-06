import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import NoDataFounded from "../NoDataFounded/NoDataFounded";

export default function StoresSlider() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_events?perPage=50`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setStores(res.data?.data?.data || []);
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
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
        <span className="font-bold text-lg">{t("stores")}</span>
        <Link to="/allEvents" className="opacity-40 text-lg">
          {t("showAll")}
        </Link>
      </div>

      {/* Swiper Slider */}
      <Swiper
        loop={true}
        autoplay={{ delay: 2000 }}
        grabCursor={true}
        spaceBetween={20}
        breakpoints={{
          1024: { slidesPerView: 7 },
          640: { slidesPerView: 5 },
          450: { slidesPerView: 3 },
          0: { slidesPerView: 2 },
        }}
        modules={[Autoplay]}
        className="w-full"
        dir="rtl"
      >
        {loading
          ? Array(7)
              .fill(null)
              .map((_, index) => (
                <SwiperSlide key={index} className="w-auto">
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-24 h-5 mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </SwiperSlide>
              ))
          : stores.map((store, index) => (
              <SwiperSlide
                key={store.id || index}
                className="w-auto cursor-pointer"
                onClick={() => navigate(`/allEvents/${store.id}`)}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={`${import.meta.env.VITE_API_URL_IMAGE}/${store.logo}`}
                    alt={store.name}
                    className="w-32 h-32 rounded-full "
                  />
                  <span className="mt-2 text-xl">{store.name}</span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      {loading ? "" : stores.length > 0 ? "" : <NoDataFounded />}
    </div>
  );
}
