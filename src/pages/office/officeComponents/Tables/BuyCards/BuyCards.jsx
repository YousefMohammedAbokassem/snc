import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import TableSkeleton from "../../../../../components/TableSkeleton";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";

const head = [
  { content: "serial_number" },     // الرقم التسلسلي
  { content: "card_type" },        // نوع البطاقة
  { content: "card_number" },      // رقم البطاقة
  { content: "price" },            // السعر
  { content: "commission" },       // العمولة
  { content: "is_active" }         // الحالة (نشط/غير نشط)
];

export default function InComingNational() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cardTypeId, setCardTypeId] = useState(1);

  const [body, setBody] = useState({
    current_page: 1,
    data: [],
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
    per_page: 10,
    prev_page_url: null,
    next_page_url: null
  });

  // حساب عدد الصفحات الكلي من الاستجابة
  const totalPages = body.last_page || 1;

  // تغيير الصفحة التالية
  const handleNextPage = () => {
    if (body.next_page_url) {
      setCurrentPage(currentPage + 1);
    }
  };

  // تغيير الصفحة السابقة
  const handlePrevPage = () => {
    if (body.prev_page_url) {
      setCurrentPage(currentPage - 1);
    }
  };

  // تغيير عدد العناصر في الصفحة
  const handleItemsPerPageChange = (e) => {
    const newPerPage = Number(e.target.value);
    setItemsPerPage(newPerPage);
    setCurrentPage(1);
  };

  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}get_cards/${cardTypeId}?page=${currentPage}&per_page=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setBody(res.data?.data);
    } catch (error) {
      if (error.response?.data?.message === "the requests are restricted between 11:45 PM and 12:45 AM.") {
        alert("يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش");
      }
      if (error?.message === "Network Error" || error?.message === "timeout exceeded") {
        if (window.location.pathname !== "/noInternet") {
          localStorage.setItem("location", window.location.pathname + window.location.search);
          navigate("/noInternet");
        }
      }
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cardTypeId, currentPage, itemsPerPage]);

  return (
    <>
      <Cards
        onSelectCard={setCardTypeId}
        selectedCardId={cardTypeId}
      />
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-[#1D1D1D] dark:text-[#fff]">
                  <thead>
                    <tr className="bg-[#fff] dark:bg-[#26292C] border-y dark:border-gray-700 border-gray-200">
                      {head.map((item) => (
                        <th
                          scope="col"
                          className="px-3 py-4 text-center whitespace-nowrap"
                          key={item.content}
                        >
                          {t(item.content)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow currentData={body.data || []} />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="pagination flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 p-4 sm:p-6">
              <div className="items flex items-center gap-2 order-2 sm:order-1">
                <p className="text-[#1D1D1D] dark:text-[#fff] text-sm">
                  {t("itemsPerPage")}
                </p>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-1 px-2 text-sm rounded-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <p className="text-[#1D1D1D] dark:text-[#fff] text-sm">
                  {body.from} - {body.to} من {body.total} عنصر
                </p>
              </div>
              <div className="pages flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
                <div className="taps flex items-center gap-2">
                  <button
                    className={`previous py-1 px-3 text-sm font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                      !body.prev_page_url ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                    }`}
                    onClick={handlePrevPage}
                    disabled={!body.prev_page_url}
                  >
                    {"<"}
                  </button>
                  <button
                    className={`next py-1 px-3 text-sm font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                      !body.next_page_url ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                    }`}
                    onClick={handleNextPage}
                    disabled={!body.next_page_url}
                  >
                    {">"}
                  </button>
                </div>
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-1 px-2 text-sm rounded-sm"
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <p className="text-[#1D1D1D] dark:text-[#fff] text-sm">
                  {t("from")} {totalPages} {t("pages")}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}