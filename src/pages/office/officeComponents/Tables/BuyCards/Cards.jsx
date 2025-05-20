import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Cards({ onSelectCard, selectedCardId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  // console.log(selectedCardId);
  //   const [cardTypeId, setCardTypeId] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}card_type`, {
        //   const res = await axios.get(`${import.meta.env.VITE_API_URL}card_type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setCards(res.data?.data);
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
    if (selectedCardId) {
      // جلب البيانات فقط عندما يكون cardTypeId محدداً
      fetchData();
    }
  }, []); // إضافة cardTypeId إلى dependencies
  //   }, [currentPage, cardTypeId]); // إضافة cardTypeId إلى dependencies

  return (
    <div className="container mx-auto mb-8">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("buyCardsSection")}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[120px] bg-gray-300 animate-pulse rounded-lg"
                ></div>
              ))
          : cards.map((card) => (
              <div
                key={card.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedCardId === card.id
                    ? "ring-4 ring-[#275963] dark:ring-[#E1B145] transform scale-105"
                    : "hover:shadow-lg"
                }`}
                onClick={() => onSelectCard(card.id)}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL_IMAGE}${card?.image}`}
                  className="w-full h-[120px] rounded-lg"
                  alt={card.type}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    selectedCardId === card.id ? "bg-black bg-opacity-30" : ""
                  }`}
                >
                  {selectedCardId === card.id && (
                    <span className="text-white font-bold text-lg">
                      {t(`${card.type.toLowerCase()}Card`)}
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
