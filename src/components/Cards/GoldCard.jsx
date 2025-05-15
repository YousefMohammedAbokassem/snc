import React from "react";
import { useTranslation } from "react-i18next";

export default function GoldCard() {
  const { t } = useTranslation();

  return (
    <div className="mt-3">
      <h4 className="text-lg font-bold">{t("cardProperties")}:</h4>
      <ul className="list-[square] marker:text-[#275963]">
        {/* 1 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("firstService")}</h5>
          <div className="text-lg mt-2">{t("firstServiceDesc")}</div>
        </li>
        {/* 2 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("secondService")}</h5>
          <div className="text-lg mt-2">{t("secondServiceDesc")}</div>
        </li>
        {/* 3 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("thirdService")}</h5>
          <div className="text-lg mt-2">
            <p className="text-xl">{t("thirdServiceDesc")}</p>
            <ul className="mt-2 list-disc list-inside">
              <li>{t("thirdServiceList.0")}</li>
              <li>{t("thirdServiceList.1")}</li>
              <li>{t("thirdServiceList.2")}</li>
              <li>{t("thirdServiceList.3")}</li>
            </ul>
          </div>
        </li>
        {/* 4 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("fourthService")}</h5>
          <div className="text-lg mt-2">{t("fourthServiceDesc")}</div>
        </li>
        {/* 5 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("fifthService")}</h5>
          <div className="text-lg mt-2">{t("fifthServiceDesc")}</div>
        </li>
        {/* 6 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("sixthService")}</h5>
          <div className="text-lg mt-2">{t("sixthServiceDesc")}</div>
        </li>
        {/* 7 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("seventhService")}</h5>
          <div className="text-lg mt-2">{t("seventhServiceDesc")}</div>
        </li>
        {/* 8 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("eighthService")}</h5>
          <div className="text-lg mt-2">{t("eighthServiceDesc")}</div>
        </li>
        {/* 9 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("ninthService")}</h5>
          <div className="text-lg mt-2">{t("ninthServiceDesc")}</div>
        </li>
        {/* 10 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("tenthService")}</h5>
          <div className="text-lg mt-2">{t("tenthServiceDesc")}</div>
        </li>
        {/* 11 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("eleventhService")}</h5>
          <div className="text-lg mt-2">{t("eleventhServiceDesc")}</div>
        </li>
        {/* 12 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("twelfthService")}</h5>
          <div className="text-lg mt-2">
            <p>{t("twelfthServiceDesc")}</p>
            <p className="text-[#C92C2C] text-xl mt-2">{t("twelfthNote")}</p>
          </div>
        </li>
        {/* 13 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("therteenthService")}</h5>
          <div className="text-lg mt-2">
            <p>{t("therteenthServiceDesc")}</p>
            <p className="text-[#C92C2C] text-xl mt-2">{t("therteenthNote")}</p>
          </div>
        </li>
        {/* manage */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("manageSite")}</h5>
          <div className="text-lg mt-2">{t("manageSiteDesc")}</div>
        </li>
      </ul>
    </div>
  );
}
