import React from "react";
import { useTranslation } from "react-i18next";

export default function NoDataFounded() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="text-[#5c7c93] text-6xl font-bold">😕</div>
      <h2 className="text-2xl font-semibold text-[#5c7c93] mt-4">
        {t("no_data")}
      </h2>
      <p className="text-gray-600 mt-2">
        {t("no_data_description")}
      </p>
    </div>
  );
}
