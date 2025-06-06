import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdSlider() {
  const { t } = useTranslation();
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}adds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setAds(res.data?.data || []);
    } catch (error) {
      console.error(error);
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
    <div className="container mx-auto relative">
      {/* أزرار التنقل الخارجية */}
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-0 left-0 z-10 bg-[#275963] h-[73%] flex items-center justify-center p-1 sm:p-2 cursor-pointer"
      >
        <button className="text-white rounded-full">
          <svg
            width="21"
            height="36"
            viewBox="0 0 21 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[16px] h-[28px] sm:w-[21px] sm:h-[36px]"
          >
            <path d="M0 18L21 0L21 36L0 18Z" fill="white" />
          </svg>
        </button>
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-0 right-0 z-10 bg-[#275963] h-[73%] flex items-center justify-center p-1 sm:p-2 cursor-pointer"
      >
        <button className="text-white rounded-full">
          <svg
            width="21"
            height="36"
            viewBox="0 0 21 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[16px] h-[28px] sm:w-[21px] sm:h-[36px]"
          >
            <path d="M21 18L0 36L0 0L21 18Z" fill="white" />
          </svg>
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        loop={true}
        autoplay={{ delay: 2000 }}
        grabCursor={true}
        spaceBetween={10}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
        modules={[Autoplay, Navigation]}
        className="w-full"
        dir="rtl"
      >
        {loading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <SwiperSlide key={index} className="w-auto">
                  <div className="flex flex-col animate-pulse">
                    <div className="image h-48 bg-gray-300 rounded-lg"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mt-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                  </div>
                </SwiperSlide>
              ))
          : ads.map((ad) => (
              <SwiperSlide key={ad.id} className="w-auto">
                <div className="flex flex-col">
                  <div className="image h-48">
                    <img
                      src={`${import.meta.env.VITE_API_URL_IMAGE}${ad.image}`}
                      alt={ad.title}
                      className="rounded-lg shadow-md w-full h-full "
                    />
                  </div>
                  <span className="mt-2 text-lg opacity-50">
                    {/* {new Date(ad.date).toLocaleDateString("ar-EG")} */}
                    {new Date(ad.date).toLocaleDateString("en")}
                  </span>
                  <span className="mt-2 text-xl">{ad.title}</span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
