import React, { useEffect, useState } from "react";
import FromInternToIntern from "./FromInternToIntern";
import FromInternToOuter from "./FromInternToOuter";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

export default function TransfareEvent() {
  const { t } = useTranslation();
  const [transferType, setTransferType] = useState("internal");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [commision, setCommision] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}huns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
        },
      });
      setData(res.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);

      if (
        error.response?.data?.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        setError(new Error(t("requests_restricted")));
      } else if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        setError(new Error(t("data_fetch_error")));
      }
    }
  };

  const fetchCommision = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}value_commission/get`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCommision(res.data?.data);
    } catch (error) {
      console.error("Error fetching commission:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCommision();
  }, []);

  return (
    <div className="mx-auto p-6">
      {/* Skeleton للراديو بوتون */}
      {loading ? (
        <div className="flex justify-between gap-4 mb-4">
          <Skeleton width={120} height={24} />
          <Skeleton width={120} height={24} />
        </div>
      ) : (
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
            {t("internal_transfers")}
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
            {t("external_transfers")}
          </label>
        </div>
      )}

      {/* Skeleton للمحتوى الرئيسي */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton height={56} className="rounded-md" /> {/* حقل الهاتف */}
          <Skeleton height={48} className="rounded-md" /> {/* حقل المبلغ */}
          <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
            <Skeleton height={24} count={3} /> {/* تفاصيل العمولة */}
          </div>
          <Skeleton height={48} className="rounded-md" /> {/* الاسم التعريفي */}
          <Skeleton height={48} className="rounded-md" /> {/* كلمة المرور */}
          <Skeleton height={56} className="rounded-md" /> {/* زر التحويل */}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          {error.message || t("fetch_error")}
        </div>
      ) : transferType === "internal" ? (
        <FromInternToIntern data={data} commision={commision} />
      ) : (
        <FromInternToOuter data={data} commision={commision} />
      )}
    </div>
  );
}
