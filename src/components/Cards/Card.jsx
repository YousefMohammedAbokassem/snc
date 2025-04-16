import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ZeroCard from "./ZeroCard";
import BronzeCard from "./BronzeCard";
import EventCard from "./EventCard";
import GoldCard from "./GoldCard";
import SilverCard from "./SilverCard";
import VipCard from "./VipCard";
import Footer from "../Footer/Footer";
import Nav from "../../pages/nav/Nav";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Card() {
  const { t } = useTranslation();
  const { cardType } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [quantity, setQuantity] = useState(1); // ✅ استخدام useState لإدارة الكمية

  const validCards = [
    "zeroCard",
    "bronzeCard",
    "eventCard",
    "goldCard",
    "silverCard",
    "vipCard",
  ];

  const fetchData = async () => {
    setLoading(true);
    console.log(id);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}card_type/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCard(res.data?.data);
    } catch (error) {
      console.error(error);
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
  // buy

  const [loadingBuy, setLoadingBuy] = useState(false);
  const [error, setError] = useState("");
  const buyCard = async () => {
    setError("");
    setLoadingBuy(true);
    const formData = new FormData();
    formData.append("card_type_id", id);
    formData.append("quantity", quantity);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}card/buy`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم الشراء بنجاح",
        confirmButtonText: "حسنًا",
      });
    } catch (error) {
      setError(error.response.data.message);
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        navigate("/signIn");
      }
    } finally {
      setLoadingBuy(false);
    }
  };
  useEffect(() => {
    if (!validCards.includes(cardType)) {
      navigate("/NotFound");
    }
    fetchData();
  }, [cardType, navigate]);

  const renderCard = () => {
    switch (cardType) {
      case "zeroCard":
        return <ZeroCard cardType={cardType} card={card} />;
      case "bronzeCard":
        return <BronzeCard cardType={cardType} card={card} />;
      case "eventCard":
        return <EventCard cardType={cardType} card={card} />;
      case "goldCard":
        return <GoldCard cardType={cardType} card={card} />;
      case "silverCard":
        return <SilverCard cardType={cardType} card={card} />;
      case "vipCard":
        return <VipCard cardType={cardType} card={card} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
          <ul className="flex gap-2 opacity-25">
            <li className="cursor-pointer" onClick={() => navigate("/home")}>
              <span className="font-bold text-lg">{t("home")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t("buyCardsSection")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(cardType)}</span>
            </li>
          </ul>
        </div>
        <h2 className="text-center p-3 my-3 text-2xl font-bold">
          {t(cardType)}
        </h2>
        <div className="image h-[350px] relative">
          {loading ? (
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          ) : (
            <>
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE}${card?.image}`}
                alt={cardType}
                className="w-full h-full"
              />
              <div className="absolute right-0 bottom-0 text-white text-lg mb-2 flex items-center justify-between w-full">
                <span className="mx-2">
                  {t("nationalPrice")} {card?.price_in_country}
                </span>
                <span className="mx-2">
                  {t("internationalPrice")} : {card?.price}
                </span>
              </div>
            </>
          )}
        </div>
        {renderCard()}
        {cardType === "eventCard" ? (
          ""
        ) : (
          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              className="my-8 border-[#CDCDCD] bg-[#275963] text-white dark:bg-[#E1B145] border-[1px] dark:text-white rounded-md px-3 py-5 w-full focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold flex items-center justify-center"
              disabled={loadingBuy}
              onClick={() => {
                if (localStorage.getItem("authenticate") !== "true") {
                  navigate("/signIn");
                } else {
                  buyCard();
                }
              }}
            >
              {loadingBuy ? (
                <FaSpinner className="animate-spin" /> // عرض أيقونة التحميل
              ) : (
                t("buyCard")
              )}
            </button>

            <div className="px-3 py-3 border-[#CDCDCD] border w-52 rounded-md flex justify-between items-center">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-2"
              >
                <Minus size={20} />
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-2"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-sm font-bold">{t(error)}</p>}
      </div>
      <Footer />
    </>
  );
}
