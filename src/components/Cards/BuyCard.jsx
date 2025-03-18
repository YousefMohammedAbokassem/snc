import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Nav from "../../pages/nav/Nav";

export default function BuyCard() {
  const { cardType } = useParams();
  const { t } = useTranslation();

  return (
    <>
    <Nav/>
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
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t("buyCard")}</span>
            </li>
          </ul>
        </div>
        <h2 className="text-center p-3 my-3 text-2xl font-bold">
          {t("buyCard")}
        </h2>
      </div>
    </>
  );
}
