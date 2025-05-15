import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <footer className="bg-[#275963] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Logo */}
          <div
            className="mb-4 md:-mb-2 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <img src="/images/WHITE.png" alt="Logo" className="h-16" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
            <Link
              to="/"
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              to="/whoUs"
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              {t("whoUsNav")}
            </Link>
            <Link
              to="/office?table=home"
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              {t("office")}
            </Link>
            <Link
              to="/events"
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              {t("events")}
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-sm">
            {t("all_rights_reserved")} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
