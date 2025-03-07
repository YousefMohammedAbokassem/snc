import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Basket() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "مرآة حائط",
      price: "700.000 ل.س",
      euroPrice: "450.00€",
      quantity: 1,
      dimensions: "70*H30*W1*D",
      image: "/images/Rectangle.png",
    },
    {
      id: 2,
      name: "كرسي محمل",
      price: "900.000 ل.س",
      euroPrice: "1200€",
      quantity: 2,
      dimensions: "50*H30*W1*D",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "طاولة حديثة",
      price: "1.000.000 ل.س",
      euroPrice: "1200€",
      quantity: 2,
      dimensions: "22*H22*W2*D",
      image: "https://via.placeholder.com/50",
    },
  ]);

  // دالة زيادة/نقصان الكمية
  const updateQuantity = (id, change) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-right">السلة</h2>
      <table className="w-full border-collapse text-center">
        <thead className="border-b">
          <tr>
            <th className="p-3">المنتجات</th>
            <th className="p-3">السعر</th>
            <th className="p-3">الكمية</th>
            <th className="p-3">التفاصيل</th>
            <th className="p-3">إزالة</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center border-b">
              <td className="p-3 flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[150px] h-[200px]"
                />
              </td>
              <td className="p-3">
                {item.price} <br /> {item.euroPrice}
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="w-8 h-8 text-white text-xl bg-[#275963] flex items-center justify-center font-bold rounded-full"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="w-8 h-8 border border-black text-xl  flex items-center justify-center font-bold rounded-full"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                </div>
              </td>
              <td className="p-3">{item.dimensions}</td>
              <td className="p-3">
                <button className="text-red-500 hover:text-red-700">
                  <MdDelete size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* المجموع والدفع */}
      <div className="mt-6 text-right flex flex-col items-center">
        <p className="text-xl font-bold">
          المجموع:{" "}
          <span className="text-[#275963]">
            {items.reduce((total, item) => total + item.quantity * 450, 0)}€
          </span>
        </p>
        <button className="mt-4 w-1/2 bg-[#275963] text-white px-6 py-2 rounded-lg">
          الدفع
        </button>
      </div>
    </div>
  );
}
