import React from "react";
import { useTranslation } from "react-i18next";

export default function TableRow({ currentData }) {
  const { t } = useTranslation();
  return (
    <>
      {currentData.map((item) => (
        <tr
          key={item.serial_number}
          className="odd:bg-[#E1E2E3] even:bg-[#fff] border-b border-gray-200 hover:bg-[#D1D2D3]"
        >
          <td className="px-6 py-8 text-center text-[#275963] dark:text-[#E1B145]">
            {item.serial_number}
          </td>
          <td className="px-6 py-8 text-center">{item.date}</td>
          <td className="px-6 py-8 text-center">{item.time}</td>
          <td className="px-6 py-8 text-center">
            {item.receiver_phone_number}
          </td>
          <td className="px-6 py-8 text-center">{item.full_name}</td>
          <td className="px-6 py-8 text-center">{item.number_of_process}</td>
          <td className="px-6 py-8 text-center">{item.amount}</td>
          <td className="px-6 py-8 text-center">{item.commission}</td>
          <td className="px-6 py-8 text-center">{item.discount}%</td>
          <td className="px-6 py-8 text-center">{item.tax}</td>
          <td className="px-6 py-8 text-center">{item.amount}</td>
        </tr>
      ))}
    </>
  );
}
