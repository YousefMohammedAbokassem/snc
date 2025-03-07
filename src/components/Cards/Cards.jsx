import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Cards() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}card_type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCards(res.data?.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        dispatch(logoutUser());
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
          {t("buyCardsSection")}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="cards">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[200px] bg-gray-300 animate-pulse rounded-lg"
                ></div>
              ))
          : cards.map((card) => (
              <div
                key={card.id}
                className="relative cursor-pointer"
                // onClick={() => navigate(`/home/${card.type.toLowerCase()}Card`)}
                onClick={() =>
                  navigate(`/home/${card.type.toLowerCase()}Card?id=${card.id}`)
                }
              >
                <img
                  src={`/Elements/${card.type.toLowerCase()}Card.png`}
                  className="w-full h-[200px] object-cover rounded-lg"
                  alt={card.type}
                />
                <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
                  {t(`${card.type.toLowerCase()}Card`)}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
