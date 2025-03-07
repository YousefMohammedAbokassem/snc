import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";

export default function AllEvents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}get_events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setEvents(res.data?.data?.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
        {/* filter */}
        <div className="flex items-center justify-between my-4">
          <span className="text-xl">{t("doyYouWantCreate")}</span>
          <div className="flex items-center justify-between gap-2">
            <span className="opacity-80 text-xl">{t("filterBy")}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_486_272)">
                <path
                  d="M40 27.5H32.5V0H27.5L27.5 27.5H20V30L30 40L40 30V27.5Z"
                  fill="#275963"
                />
                <path
                  d="M20 12.5H12.5L12.5 40L7.5 40L7.5 12.5H1.09278e-07L0 10L10 0L20 10L20 12.5Z"
                  fill="#275963"
                />
              </g>
              <defs>
                <clipPath id="clip0_486_272">
                  <rect
                    width="40"
                    height="40"
                    fill="white"
                    transform="matrix(0 -1 1 0 0 40)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        {/* Grid Layout - Responsive */}
        <div className="text-center text-2xl font-bold mb-5">
          {t("categories")}
        </div>
        {/*  */}
        <div className="flex flex-wrap justify-center items-center gap-5">
          {loading
            ? Array(7)
                .fill(null)
                .map((_, index) => (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-24 h-5 mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                ))
            : events.map((event) => (
                <div
                  className="flex flex-col items-center cursor-pointer"
                  key={event.id}
                  onClick={() => navigate(`/allEvents/${event.id}`)}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL_IMAGE}${event.logo}`}
                    alt={event.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <span className="mt-2 text-xl ">{event.name}</span>
                </div>
              ))}
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
