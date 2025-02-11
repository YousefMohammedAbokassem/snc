import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const stores = [
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Paste image.png" },
  { name: "Belle Store", logo: "/images/Elements/Elements/Paste image.png" },
];

export default function StoresSlider() {
  const { t } = useTranslation();

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
          1024: { slidesPerView: 7 }, // 7 شرائح في الشاشات الكبيرة
          640: { slidesPerView: 5 }, // 3 شرائح في الشاشات المتوسطة
          450: { slidesPerView: 3 }, // 3 شرائح في الشاشات المتوسطة
          0: { slidesPerView: 2}, // شريحتان في الشاشات الصغيرة
        }}
        modules={[Autoplay]}
        className="w-full"
        dir="rtl"
      >
        {stores.map((store, index) => (
          <SwiperSlide key={index} className="w-auto">
            <div className="flex flex-col items-center">
              <img
                src={store.logo}
                alt={store.name}
                className=" w-32 h-32 rounded-full"
              />
              <span className="mt-2 text-xl ">{store.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
