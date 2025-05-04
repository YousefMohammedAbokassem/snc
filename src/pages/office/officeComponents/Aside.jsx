import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

// مصفوفة تحتوي على العناصر
const menuItems = [
  "home",
  "inComingNational",
  "exportNational",
  "exportEvents",
  "exportEventsInter",
  "inComingEvents",
  "exportEventsNational",
  "inInter",
  "exportIntern",
  "financialCommission",
  "completedReward",
  // "buyCards",
  "transfareEvent",
  "eventInfo",
  "eventProducts",
];

export default function Aside() {
  const { t } = useTranslation();
  const location = useLocation();
  const [table, setTable] = useState("");

  // استخدام useEffect لتحديث المتغير عند تغيير الـ query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tableParam = params.get("table");
    if (tableParam) {
      setTable(tableParam); // تخزين القيمة في المتغير
    }
  }, [location]);
  return (
    <aside className="w-[20%] aside bg-[#275963]  text-white">
      <ul>
        {menuItems.map((item, index) => {
          if (
            localStorage.getItem("role") != 3 &&
            (item === "eventInfo" ||
              item === "eventProducts" ||
              item === "inComingEvents" ||
              item === "exportEventsNational")
          ) {
            return null;
          }
          return (
            <li key={index}>
              <NavLink
                to={`/office?table=${item}`}
                className={`${
                  table === item ? "isActive" : ""
                } p-6 asideRoutes block cursor-pointer text-start hover:bg-[#E1B145] hover:font-bold  `}
              >
                {t(item)}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
