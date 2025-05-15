import React from "react";
import { useTranslation } from "react-i18next";

export default function BronzeCard() {
  const { t } = useTranslation();

  return (
    <div className="mt-3">
      <h4 className="text-lg font-bold">{t("cardProperties")}:</h4>
      <ul className="list-[square] marker:text-[#275963] space-y-6 mt-4">
        {Array.from({ length: 14 }, (_, i) => (
          <li key={i}>
            <h5 className="text-2xl font-bold text-[#275963]">
              {t(`bronzeDesc${i + 1}.title`)}
            </h5>
            <div
              className="text-lg mt-2"
              dangerouslySetInnerHTML={{
                __html: t(`bronzeDesc${i + 1}.content`),
              }}
            />
          </li>
        ))}
        {/* Manage site security section */}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">
            {t("manageSite.title")}
          </h5>
          <div className="text-lg mt-2">{t("manageSite.content")}</div>
        </li>
      </ul>
    </div>
  );
}
