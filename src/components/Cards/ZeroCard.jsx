import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ZeroCard({ cardType }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="mt-3">
      <h4 className="text-lg font-bold">{t("cardProperties")}:</h4>
      <ul className="list-[square] marker:text-[#275963]">
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("firstService")}
          </h5>
          <div className="text-lg mt-2">
            {t("firstServiceDescription")}
          </div>
        </li>
        {/* 2 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("secondService")}
          </h5>
          <div className="text-lg mt-2">
            {t("secondServiceDescription")}
          </div>
        </li>
        {/* 3 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("thirdService")}
          </h5>
          <div className="text-lg mt-2">
            <p className="text-xl">
              {t("thirdServiceDescription")}
            </p>
            <ul className="mt-2">
              <li>{t("thirdServicePoint1")}</li>
              <li>{t("thirdServicePoint2")}</li>
              <li>{t("thirdServicePoint3")}</li>
              <li>{t("thirdServicePoint4")}</li>
            </ul>
            <p className="text-[#C92C2C] text-xl mt-2">
              {t("thirdServiceDisclaimer")}
            </p>
          </div>
        </li>
        {/* 4 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("fourthService")}
          </h5>
          <div className="text-lg mt-2">
            {t("fourthServiceDescription")}
          </div>
        </li>
        {/* 5 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("fifthService")}
          </h5>
          <div className="text-lg mt-2">
            {t("fifthServiceDescription")}
          </div>
        </li>

        {/* 6 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("sixthService")}
          </h5>
          <div className="text-lg mt-2">
            {t("sixthServiceDescription")}
          </div>
        </li>

        {/* 7 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("seventhService")}
          </h5>
          <div className="text-lg mt-2">
            {t("seventhServiceDescription")}
          </div>
        </li>

        {/* 8 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("eighthService")}
          </h5>
          <div className="text-lg mt-2">
            {t("eighthServiceDescription")}
          </div>
        </li>

        {/* 9 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("ninthService")}
          </h5>
          <div className="text-lg mt-2">
            {t("ninthServiceDescription")}
          </div>
          <p className="text-[#C92C2C] text-xl mt-2">
            {t("ninthServiceDisclaimer")}
          </p>
        </li>
        {/* 10 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("tenthService")}
          </h5>
          <div className="text-lg mt-2">
            <p>{t("tenthServiceDescription")}</p>
            <p className="text-[#C92C2C] text-xl mt-2">
              <span className="font-bold">{t("note")}</span> {t("tenthServiceDisclaimer")}
            </p>
          </div>
        </li>
        {/* 11 */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("manageSite")}
          </h5>
          <div className="text-lg mt-2">
            <p>{t("siteSecurityDescription")}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
