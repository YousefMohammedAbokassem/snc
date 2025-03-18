import React from "react";

export default function NoDataFounded() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="text-[#5c7c93] text-6xl font-bold">😕</div>
      <h2 className="text-2xl font-semibold text-[#5c7c93] mt-4">
        لا توجد بيانات متاحة
      </h2>
      <p className="text-gray-600 mt-2">
        حاول مرة أخرى لاحقًا أو تأكد من توفر البيانات.
      </p>
    </div>
  );
}
