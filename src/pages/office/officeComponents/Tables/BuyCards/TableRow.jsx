import React from "react";
import { useTranslation } from "react-i18next";

export default function TableRow({ currentData }) {
  const { t } = useTranslation();
  // console.log({currentData})
  return (
    <>
      {currentData.map((item, i) => (
        <tr
          key={i + 1}
          className="odd:bg-[#E1E2E3] even:bg-[#fff] border-b border-gray-200 hover:bg-[#D1D2D3]"
        >
          <td className="px-6 py-4 text-center text-[#275963] dark:text-[#E1B145]">
            {item.serial_number}
          </td>
          <td className="px-6 py-4 text-center">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                item.card_type === "Bronze"
                  ? "bg-amber-100 text-amber-800"
                  : item.card_type === "Silver"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {item.card_type}
            </span>
          </td>
          <td className="px-6 py-4 text-center font-mono">
            {item.card_number}
          </td>
          {/* <td className="px-6 py-4 text-center">
            {item.date || '-'}
          </td>
          <td className="px-6 py-4 text-center">
            {item.time || '-'}
          </td> */}
          <td className="px-6 py-4 text-center">SNC {item.price}</td>
          <td className="px-6 py-4 text-center">SNC {item.commission}</td>
          <td className="px-6 py-4 text-center">
            {item.is_active ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                فعالة
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                لم تفعل بعد
              </span>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
