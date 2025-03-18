import React, { useState } from "react";

export default function AddProduct({ colors, loadingM, loadingC, measures }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    images: [],
  });

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };
  
  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full mx-auto">
      {/* المعلومات الأساسية */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="اسم المنتج"
          value={product.name}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={product.price}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="السعر بعد الخصم"
          value={product.discountPrice}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        />
        <textarea
          name="description"
          placeholder="الوصف"
          value={product.description}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full col-span-2"
        />
      </div>

      {/* رفع الصور */}
      <div className="mb-4">
        <p className="font-semibold mb-2">صور المنتج</p>
        <label className="border-2 border-dashed p-6 w-full text-center rounded-md cursor-pointer block text-gray-500">
          اسحب الصورة هنا أو اضغط لرفع الملفات
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* عرض الصور المرفوعة */}
      <div className="grid grid-cols-4 gap-2">
        {product.images.length > 0
          ? product.images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="منتج"
                className="w-full h-16 object-cover rounded-md"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-16 bg-gray-200 rounded-md flex items-center justify-center"
              >
                📷
              </div>
            ))}
      </div>

      {/* زر النشر */}
      <button className="bg-[#275963] text-white px-4 py-2 rounded-md mt-4 w-full">
        نشر
      </button>
    </div>
  );
}
