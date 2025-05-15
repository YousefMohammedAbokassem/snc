import React from "react";
import { useTranslation } from "react-i18next";

export default function vipCard({ cardType }) {
  const { t } = useTranslation();

  return (
    <div className="mt-3">
      <h4 className="text-lg font-bold">{t("cardProperties")}:</h4>
      <ul className="list-[square] marker:text-[#275963]">
        {[...Array(13)].map((_, i) => (
          <li className="mt-4" key={i}>
            <h5 className="text-2xl font-bold text-[#275963]">
              {t(`vipCardDes.service${i + 1}.title`)}
            </h5>
            <div className="text-lg mt-2">
              {Array.isArray(t(`vipCardDes.service${i + 1}.desc`, { returnObjects: true }))
                ? t(`vipCardDes.service${i + 1}.desc`, { returnObjects: true }).map((p, idx) => (
                    <p
                      key={idx}
                      className={`${
                        p.includes("ملاحظة") || p.includes("تنويه") || p.includes("Note")
                          ? "text-[#C92C2C] text-xl mt-2"
                          : "text-xl"
                      }`}
                    >
                      {p}
                    </p>
                  ))
                : t(`vipCardDes.service${i + 1}.desc`)}
            </div>
          </li>
        ))}
        <li className="mt-4">
          <h5 className="text-2xl font-bold text-[#275963]">{t("vipCardDes.manage.title")}</h5>
          <div className="text-lg mt-2">
            <p>{t("vipCardDes.manage.desc")}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
