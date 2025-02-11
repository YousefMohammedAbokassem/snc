import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-[#1D1D1D] mb-6">
          <ul className="flex gap-2 opacity-25">
            <li className="cursor-pointer" onClick={() => navigate("/Events")}>
              <span className="font-bold text-lg">{t("events")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t("categories")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t(">")}</span>
            </li>
            <li>
              <span className="font-bold text-lg">{t("showAll")}</span>
            </li>
          </ul>
        </div>

        {/* Grid Layout - Responsive */}
        <div className="text-center text-2xl font-bold mb-5">{t("categories")}</div>
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Item */}

          <div className="bg-[#F3F5F7] p-5 flex rounded-md">
            <div className="flex flex-row-reverse w-full">
              {/* Info Section */}
              <div className="info flex flex-col justify-center items-center self-end mb-4 w-[100px]">
                <h3 className="font-bold text-lg">Wooden</h3>
                <a
                  href="#"
                  className="flex items-center gap-1 underline categoryShop"
                >
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.16699 10H15.8337"
                        stroke="#141718"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.833 15L15.833 10"
                        stroke="#141718"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.833 5L15.833 10"
                        stroke="#141718"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{t("shopNow")}</span>
                </a>
              </div>

              {/* Image Section */}
              <div className="image w-full">
                <img
                  src="/images/Elements/Paste image.png"
                  alt="noImage"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <button
          type="button"
          className="more border-solid border border-[#CDCDCD] block w-full my-10 p-4 font-bold text-xl cursor-pointer rounded-md  text-[#275963]"
        >
          {t("more")}
        </button>
      </div>
      <Footer />
    </>
  );
}
