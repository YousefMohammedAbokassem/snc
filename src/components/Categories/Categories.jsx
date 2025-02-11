import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Categories() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center text-[#1D1D1D] mb-6 ">
        <span className="font-bold text-lg">{t("categories")}</span>
        <Link to="/Categories" className="opacity-40 text-lg">
          {t("showAll")}
        </Link>
      </div>
      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Remaining Items - Each 2 Items Take 1/3 */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {/* Item 1 */}
          <div className="bg-[#F3F5F7] p-5 h-full flex">
            <div className="flex flex-row-reverse h-full">
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
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 15L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 5L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{t("shopNow")}</span>
                </a>
              </div>
              <div className="image h-full w-full">
                <img
                  src="/images/Elements/Paste image.png"
                  alt="noImage"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F3F5F7] p-5 h-full flex">
            <div className="flex flex-row-reverse h-full">
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
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 15L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 5L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{t("shopNow")}</span>
                </a>
              </div>
              <div className="image h-full w-full">
                <img
                  src="/images/Elements/Paste image.png"
                  alt="noImage"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F3F5F7] p-5 h-full flex">
            <div className="flex flex-row-reverse h-full">
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
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 15L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 5L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{t("shopNow")}</span>
                </a>
              </div>
              <div className="image h-full w-full">
                <img
                  src="/images/Elements/Paste image.png"
                  alt="noImage"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F3F5F7] p-5 h-full flex">
            <div className="flex flex-row-reverse h-full">
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
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 15L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.833 5L15.833 10"
                        stroke="#141718"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{t("shopNow")}</span>
                </a>
              </div>
              <div className="image h-full w-full">
                <img
                  src="/images/Elements/Paste image.png"
                  alt="noImage"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>

          {/* Item 2 */}
        </div>
        {/* First Item - Takes 1/3 */}
        <div className="col-span-1 bg-[#F3F5F7] p-5 h-full">
          <div className="flex flex-col h-full">
            <div className="info self-end flex flex-col justify-center items-center">
              <h3 className="font-bold text-lg">Furniture</h3>
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
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.833 15L15.833 10"
                      stroke="#141718"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.833 5L15.833 10"
                      stroke="#141718"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span>{t("shopNow")}</span>
              </a>
            </div>
            <div className="image h-full w-full">
              <img
                src="/images/Elements/Elements/Paste image.png"
                alt="noImage"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
