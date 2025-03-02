import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";

const stores = [
  {
    name: "شركة محتوى للتسويق الرقمي.",
    date: "03 نوفمبر 2025",
    logo: "/images/Elements/Paste image.png",
  },
  {
    name: "شركة محتوى للتسويق الرقمي.",
    date: "03 نوفمبر 2025",
    logo: "/images/Elements/Paste image.png",
  },
  {
    name: "شركة محتوى للتسويق الرقمي.",
    date: "03 نوفمبر 2025",
    logo: "/images/Elements/Paste image.png",
  },
  {
    name: "شركة محتوى للتسويق الرقمي.",
    date: "03 نوفمبر 2025",
    logo: "/images/Elements/Paste image.png",
  },
  {
    name: "شركة محتوى للتسويق الرقمي.",
    date: "03 نوفمبر 2025",
    logo: "/images/Elements/Paste image.png",
  },
];

export default function AdSlider() {
  const { t } = useTranslation();
  const swiperRef = useRef(null); // مرجع للتحكم في السلايدر

  return (
    <div className="container mx-auto relative">
      {/* أزرار التنقل الخارجية */}
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-0 left-0  z-10 bg-[#275963] h-[80%] flex items-center justify-center p-3 cursor-pointer"
      >
        <button className="text-white rounded-full">
          <svg
            width="21"
            height="36"
            viewBox="0 0 21 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 18L21 0L21 36L0 18Z" fill="white" />
          </svg>
        </button>
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-0 right-0 z-10 bg-[#275963] h-[80%] flex items-center justify-center p-3 cursor-pointer"
      >
        <button
        //   onClick={() => swiperRef.current?.slideNext()}
          className=" text-white rounded-full"
        >
          <svg
            width="21"
            height="36"
            viewBox="0 0 21 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 18L0 36L0 0L21 18Z" fill="white" />
          </svg>
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        loop={true}
        autoplay={{ delay: 20000 }}
        grabCursor={true}
        spaceBetween={10}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // تعيين المرجع للسوايبر
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
        {stores.map((store, index) => (
          <SwiperSlide key={index} className="w-auto">
            <div className="flex flex-col">
              <div className="image h-3/4">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="rounded-lg shadow-md w-full h-full"
                />
              </div>
              <span className="mt-2 text-lg opacity-50">{store.date}</span>
              <span className="mt-2 text-xl">{store.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
