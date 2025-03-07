import React from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6">
      <h4 className="text-center font-bold text-2xl mb-6">{t("profile")}</h4>
      
      <div className="grid grid-cols-2 gap-6 text-right">
        <div>
          <p className="text-gray-600">{t("firstName")}</p>
          <p className="border border-gray-300 p-3 rounded-md">أحمد الحسن</p>
        </div>
        <div>
          <p className="text-gray-600">{t("lastName")}</p>
          <p className="border border-gray-300 p-3 rounded-md">Jenny Wilson</p>
        </div>
        <div>
          <p className="text-gray-600">{t("gender")}</p>
          <p className="border border-gray-300 p-3 rounded-md">ذكر</p>
        </div>
        <div>
          <p className="text-gray-600">{t("phoneNumber")}</p>
          <p className="border border-gray-300 p-3 rounded-md">930-233-181</p>
        </div>
        <div>
          <p className="text-gray-600">{t("address")}</p>
          <p className="border border-gray-300 p-3 rounded-md">سوريا، دمشق، مول فاشون</p>
        </div>
        <div>
          <p className="text-gray-600">{t("birthDate")}</p>
          <p className="border border-gray-300 p-3 rounded-md">7 - 8 - 2003</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">{t("save")}</button>
      </div>
    </div>
  );
}