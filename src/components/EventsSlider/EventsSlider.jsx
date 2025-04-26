import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./styles.scss";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import NoDataFounded from "../NoDataFounded/NoDataFounded";
import { useNavigate } from "react-router-dom";

export default function EventsSlider() {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}banners`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setBanners(res.data?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
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
    <>
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper HomeSwiper"
        dir="rtl"
      >
        {loading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <SwiperSlide key={index} className="swiperSlide">
                  <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-lg"></div>
                </SwiperSlide>
              ))
          : banners.map((banner) => (
              <SwiperSlide key={banner.id} className="swiperSlide">
                <img
                  src={`${import.meta.env.VITE_API_URL_IMAGE}${banner.image}`}
                  alt=""
                  className="w-full h-[300px]  rounded-lg"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
      </Swiper>
      {loading ? "" : banners.length > 0 ? "" : <NoDataFounded />}
    </>
  );
}
