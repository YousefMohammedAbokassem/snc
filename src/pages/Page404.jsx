import React from "react";
import { useTranslation } from "react-i18next";

export default function Page404() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen gap-2">
        <p className="text-3xl text-[#414651] dark:text-[#ddd]">{t("Oops! the page not found.")}</p>
        <p className=" opacity-50 text-[#414651] dark:text-[#ddd]">
          {t("Or simply leverage the expertise of our consultation team.")}
        </p>
        <button
          type="button"
          className={`border-[#CDCDCD] mt-4 w-2/4 bg-[#275963] text-white dark:bg-[#E1B145]  border-[1px]  dark:text-white rounded-md px-3 py-5 focus:outline focus:outline-[3px] focus:outline-[#275963] dark:focus:outline-[#E1B145] font-bold`}
        >
          {t("Back to Home Page")}
        </button>
      </div>
      <span className="page404 text-[300px] pointer-events-none text-[#414651] dark:text-[#ddd]">404</span>
    </div>
  );
}
