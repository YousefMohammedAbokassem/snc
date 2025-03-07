import React, { useState } from "react";
import FromInternToIntern from "./FromInternToIntern";
import FromInternToOuter from "./FromInternToOuter";

export default function TransfareEvent() {
  const [transferType, setTransferType] = useState("internal");

  return (
    <div className=" mx-auto p-6 ">
      <div className="flex justify-between gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transferType"
            value="internal"
            checked={transferType === "internal"}
            onChange={() => setTransferType("internal")}
            className="accent-[#275963]"
          />
          مشترك (عملية تحويل بين مشتركين وطنية)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="transferType"
            value="external"
            checked={transferType === "external"}
            onChange={() => setTransferType("external")}
            className="accent-[#275963]"
          />
          حوالة (عملية تحويل بين مشترك وفعالية وطنية)
        </label>
      </div>
      {transferType === "internal" ? (
        <FromInternToIntern />
      ) : (
        <FromInternToOuter />
      )}
    </div>
  );
}
