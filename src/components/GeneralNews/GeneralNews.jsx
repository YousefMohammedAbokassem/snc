import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function GeneralNews() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] my-6 ">
        <span className="font-bold text-lg text-[#1D1D1D] dark:text-[#fff]">
          {t("generalNews")}
        </span>
        <Link
          to="/Categories"
          className="opacity-40 text-lg text-[#1D1D1D] dark:text-[#fff] dark:opacity-70"
        >
          {t("showAll")}
        </Link>
      </div>
      <div className="flex flex-col border rounded-sm border-[#B1B1B1]">
        <div className="flex p-8  gap-4 border-b border-b-[#B1B1B1]">
          <div className="date w-[10%] flex items-center justify-center">29 اوكتوبر 2024</div>
          <div className="info flex-1">
            <span className="coin bg-[#CC992C] px-4 py-1 text-white font-bold mb-3 inline-block">الليرة السورية</span>
            <div className="desc">
              شهد سعر صرف الليرة السورية خلال اليومين الماضيين ارتفاعاً ملحوظاً،
              حيث تراوح بين 11.500 و 12.500 ليرة مقابل الدولار.{" "}
            </div>
          </div>
        </div>
        <div className="flex p-8  gap-4">
          <div className="date w-[10%] flex items-center justify-center">29 اوكتوبر 2024</div>
          <div className="info flex-1">
            <span className="coin bg-[#99A00F] px-4 py-1 text-white font-bold mb-3 inline-block">الليرة السورية</span>
            <div className="desc">
              شهد سعر صرف الليرة السورية خلال اليومين الماضيين ارتفاعاً ملحوظاً،
              حيث تراوح بين 11.500 و 12.500 ليرة مقابل الدولار.{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
