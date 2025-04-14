import React from "react";
import { useTranslation } from "react-i18next";

export default function TableRow({ currentData }) {
  const { t } = useTranslation();
  return (
    <>
      {currentData.map((item, i) => (
        <tr
          key={i + 1}
          className="odd:bg-[#E1E2E3] even:bg-[#fff] border-b border-gray-200 hover:bg-[#D1D2D3]"
        >
          <td className="px-6 py-8 text-center text-[#275963] dark:text-[#E1B145]">
            {i + 1}
          </td>
          <td className="px-6 py-8 text-center">{item.card_type}</td>
          <td className="px-6 py-8 text-center">{item.reason}</td>
          <td className="px-6 py-8 text-center">{item.quantity}</td>
          <td className="px-6 py-8 text-center">
            {item.receiver_phone_number}
          </td>
          <td className="px-6 py-8 text-center">{item.reward}</td>
          {/* <td className="px-6 py-8 text-center">{item.amount}</td> */}
          {/* <td className="px-6 py-8 text-center">{item.commission}</td>
          <td className="px-6 py-8 text-center">{item.discounted_amount}</td> */}
        </tr>
      ))}
    </>
  );
}
