import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6 ">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("buyCardsSection")}
        </span>
      </div>
      {/* cards */}
      <div className="cards">
        <div
          className="image relative cursor-pointer"
          onClick={() => navigate("/home/zeroCard")}
        >
          <img
            src="/Elements/zeroCard.png"
            className="w-full h-full"
            alt="zeroImage"
          />
          <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
            {t("zeroCard")}
          </span>
        </div>
        <div
          className="image relative cursor-pointer"
          onClick={() => navigate("/home/bronzeCard")}
        >
          <img
            src="/Elements/bronzeCard.png"
            className="w-full h-full"
            alt="bronzeImage"
          />
          <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
            {t("bronzeCard")}
          </span>
        </div>
        <div
          className="image relative cursor-pointer"
          onClick={() => navigate("/home/vipCard")}
        >
          <img
            src="/Elements/vipCard.png"
            className="w-full h-full"
            alt="vipImage"
          />
          <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
            {t("vipCard")}
          </span>
        </div>
        <div
          className="image relative cursor-pointer"
          onClick={() => navigate("/home/silverCard")}
        >
          <img
            src="/Elements/silverCard.png"
            className="w-full h-full"
            alt="silverImage"
          />
          <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
            {t("silverCard")}
          </span>
        </div>
        <div
          className="image relative cursor-pointer"
          onClick={() => navigate("/home/goldCard")}
        >
          <img
            src="/Elements/goldCard.png"
            className="w-full h-full"
            alt="goldImage"
          />
          <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
            {t("goldCard")}
          </span>
        </div>
        {/* تعديل لاحقا */}
        <div
          className="image relative cursor-pointer"
          onClick={() => navigate("/home/eventCard")}
        >
          <img
            src="/Elements/eventCard.png"
            className="w-full h-full"
            alt="eventImage"
          />
          <span className="absolute right-0 bottom-0 text-white text-lg mx-4 mb-2">
            {t("eventCard")}
          </span>
        </div>
      </div>
    </div>
  );
}
