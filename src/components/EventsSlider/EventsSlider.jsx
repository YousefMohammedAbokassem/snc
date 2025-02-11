import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // استيراد تأثير الفيد
import "./styles.scss";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

export default function Office() {
  const { t } = useTranslation();

  return (
    <>
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{
          delay: 3000, // التوقيت بين التبديلات (بالملي ثانية)
          disableOnInteraction: false, // الاستمرار في التشغيل حتى بعد التفاعل مع الـ Swiper
        }}
        effect="fade" // تطبيق تأثير الفيد
        loop={true} // تفعيل الـ loop اللا نهائي
        modules={[Pagination, Autoplay, EffectFade]} // إضافة الوحدات المطلوبة
        className="mySwiper EventsSlider "
        dir="rtl"
      >
        <SwiperSlide className="swiperSlide">
          <img src="/images/Rectangle.png" alt="" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src="/images/Rectangle2.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
