import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Settings from "./navComponents/Settings";
import Search from "./navComponents/Search";
import { MenuIcon, XIcon } from "lucide-react";

export default function Nav() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authenticate") === "true"
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticate");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/home");
  };

  return (
    <nav className="bg-[#275963] z-50 shadow-lg px-6 py-3 rounded-b-lg mb-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* شعار الموقع */}
        <div className="w-20">
          <img src={`/icons/dark.svg`} className="w-full h-full" alt="logo" />
        </div>

        {/* القائمة الرئيسية */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to="/home"
          >
            {t("home")}
          </NavLink>
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to={
              localStorage.getItem("authenticate") === "true"
                ? "/office?table=home"
                : "/signIn"
            }
          >
            {t("office")}
          </NavLink>
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to="/events"
          >
            {t("eventsييييي")}
          </NavLink>
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to="/contactUs"
          >
            {t("contactUs")}
          </NavLink>
        </div>

        {/* أدوات البحث والإعدادات */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <Search /> */}
          <Settings />
          {localStorage.getItem("authenticate") === "true" ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-m m-0"
            >
              {t("logout")}
            </button>
          ) : (
            <NavLink
              to="/signIn"
              className="bg-white text-[#275963] px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-md font-medium m-0"
            >
              {t("login")}
            </NavLink>
          )}
        </div>

        {/* زر القائمة الجانبية (هامبرغر) للأجهزة الصغيرة */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* القائمة الجانبية للأجهزة الصغيرة */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to="/home"
            onClick={() => setIsOpen(false)}
          >
            {t("home")}
          </NavLink>
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition "
            to={
              localStorage.getItem("authenticate") === "true"
                ? "/office?table=home"
                : "/signIn"
            }
            onClick={() => setIsOpen(false)}
          >
            {t("office")}
          </NavLink>
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to="/events"
            onClick={() => setIsOpen(false)}
          >
            {t("events")}
          </NavLink>
          <NavLink
            className="text-white font-medium hover:text-gray-300 transition"
            to="/contactUs"
            onClick={() => setIsOpen(false)}
          >
            {t("contactUs")}
          </NavLink>
          {/* <Search /> */}
          <Settings />
          {localStorage.getItem("authenticate") === "true" ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
            >
              {t("logout")}
            </button>
          ) : (
            <NavLink
              to="/signIn"
              className="bg-white text-[#275963] px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-md font-medium"
            >
              {t("login")}
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
