import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../store/slices/auth/authSlice";
import TableSkeleton from "../../../../../components/TableSkeleton";

const head = [
  { content: "sequence" },
  { content: "date" },
  { content: "Timing" },
  { content: "هاتف المستقبل" },
  // { content: "المرسل اليه" },
  { content: "digitTheExport" },
  { content: "Value" },
  { content: "commission" },
  { content: "discountedAmount" },
];

export default function ExportIntern() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [body, setBody] = useState({
    current_page: 1,
    data: [],
    total: 3,
  });

  // حساب عدد الصفحات الكلي
  const totalPages = Math.ceil(body.data.length / itemsPerPage);

  // استخراج البيانات التي ستظهر في الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = body.data.slice(indexOfFirstItem, indexOfLastItem);

  // تغيير الصفحة التالية
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // تغيير الصفحة السابقة
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // تغيير عدد العناصر في الصفحة
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // إعادة الصفحة إلى الأولى عند تغيير عدد العناصر
  };
  const [loading, setLoading] = useState({});
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }international/get_money_sended_transfers?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setBody(res.data?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-[#1D1D1D] dark:text-[#fff]">
            <thead>
              <tr className="bg-[#fff] dark:bg-[#26292C] border-y dark:border-gray-700 border-gray-200">
                {head.map((item) => (
                  <th
                    scope="col"
                    className="px-6 py-8 text-center"
                    key={item.content}
                  >
                    {t(item.content)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TableRow currentData={currentData} />
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination flex items-center justify-between h-10 mt-4 p-6">
            <div className="items flex items-center gap-2">
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {t("itemsPerPage")}
              </p>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-[6px] px-2 mx-2 rounded-sm"
              >
                {/* <option value="5">5</option> */}
                <option value="10">100</option>
                {/* <option value="20">20</option> */}
              </select>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, body.data.length)} من{" "}
                {body.data.length} عنصر
              </p>
            </div>
            <div className="pages flex items-center gap-4">
              <div className="taps flex items-center gap-2">
                <button
                  className={`previous py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff] ${
                    currentPage === 1
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  } `}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <button
                  className={`next py-1 px-3 font-bold rounded-sm bg-[#275963] dark:bg-[#E1B145] text-[#fff]  ${
                    // currentPage === totalPages
                    currentPage >= totalPages
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  } `}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-[#275963] dark:bg-[#E1B145] text-[#fff] py-[6px] px-2 mx-2 rounded-sm"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <p className="text-[#1D1D1D] dark:text-[#fff]">
                {t("from")} {totalPages} {t("pages")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
