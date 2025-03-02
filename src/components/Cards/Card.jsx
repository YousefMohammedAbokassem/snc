import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import ZeroCard from "./ZeroCard";
import BronzeCard from "./BronzeCard";
import EventCard from "./EventCard";
import GoldCard from "./GoldCard";
import SilverCard from "./SilverCard";
import VipCard from "./VipCard";
import Footer from "../Footer/Footer";

export default function Card() {
  const { t } = useTranslation();
  const { cardType } = useParams();
  const navigate = useNavigate();

  const validCards = [
    "zeroCard",
    "bronzeCard",
    "eventCard",
    "goldCard",
    "silverCard",
    "vipCard",
  ];

  // إذا لم يكن cardType صالحًا، قم بالتوجيه مباشرة
  useEffect(() => {
    if (!validCards.includes(cardType)) {
      navigate("/NotFound");
    }
  }, [cardType, navigate]);

  const renderCard = () => {
    switch (cardType) {
      case "zeroCard":
        return <ZeroCard cardType={cardType} />;
      case "bronzeCard":
        return <BronzeCard cardType={cardType} />;
      case "eventCard":
        return <EventCard cardType={cardType} />;
      case "goldCard":
        return <GoldCard cardType={cardType} />;
      case "silverCard":
        return <SilverCard cardType={cardType} />;
      case "vipCard":
        return <VipCard cardType={cardType} />;
      default:
        return null;
    }
  };

  return (
    <>
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
          <img
            src={`/public/Elements/${cardType}.png`}
            alt={cardType}
            className="w-full h-full"
          />
          <div className="absolute right-0 bottom-0 text-white text-lg  mb-2 flex items-center justify-between w-full">
            <span className="mx-2">{t("nationalPrice")} 1000000 ل.س</span>
            <span className="mx-2">{t("internationalPrice")} : 1000$</span>
          </div>
        </div>
        {renderCard()}
      </div>
      <Footer />
    </>
  );
}
