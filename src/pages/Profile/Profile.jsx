import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Nav from "../nav/Nav";
import { logoutUser } from "../../store/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxOption,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
// import { Dialog } from "@headlessui/react";
// import { Listbox } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/solid";
export default function Profile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    place_of_birth: "",
    address: "",
    birthday: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}my_profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProfile(res.data?.data || null);
    } catch (error) {
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
      //
      if (
        error?.message === "Network Error" ||
        error?.message === "timeout exceeded"
      ) {
        if (location.pathname !== "/noInternet") {
          localStorage.setItem("location", location.pathname + location.search);
          navigate("/noInternet");
        }
      }
      if (
        error.response.data.message ===
        "the requests are restricted between 11:45 PM and 12:45 AM."
      ) {
        alert(
          "يتم تقييد الطلبات بين الساعة 11:45 مساءً و 12:45 صباحًا. بتوقيت جرينتش"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const people = [
    { id: 1, gender: "male" },
    { id: 2, gender: "female" },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (selectedGender) => {
    setFormData((prev) => ({
      ...prev,
      gender: selectedGender.gender === "male" ? "m" : "f",
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}edit_profile`,
        {
          _method: "PUT",
          gender: formData.gender,
          place_of_birth: formData.place_of_birth,
          address: formData.address,
          birthday: formData.birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setIsOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  console.log(profile);
  return (
    <>
      {/* <Nav /> */}
      <div className="container mx-auto p-6">
        <h4 className="text-center font-bold text-2xl mb-6">{t("profile")}</h4>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right animate-pulse">
            {Array(10)
              .fill("")
              .map((_, index) => (
                <div key={index}>
                  <p className="text-gray-400 bg-gray-200 h-4 w-32 mb-2 rounded"></p>
                  <p className="border border-gray-300 p-3 rounded-md bg-gray-200 h-8"></p>
                </div>
              ))}
          </div>
        ) : profile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div>
              <p className="text-gray-600">الاسم الأول</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.first_name}
              </p>
            </div>
            <div>
              <p className="text-gray-600">اسم العائلة</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.last_name}
              </p>
            </div>
            <div>
              <p className="text-gray-600">الجنس</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.gender === "m" ? "ذكر" : "أنثى"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">رقم الهاتف</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.phone_number}+
              </p>
            </div>
            <div>
              <p className="text-gray-600">العنوان</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.address}
              </p>
            </div>
            <div>
              <p className="text-gray-600">تاريخ الميلاد</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.birthday}
              </p>
            </div>
            <div>
              <p className="text-gray-600">الرقم الوطني</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.national_id}
              </p>
            </div>
            <div>
              <p className="text-gray-600">مكان الولادة</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.place_of_birth}
              </p>
            </div>
            <div>
              <p className="text-gray-600">الرصيد المحلي</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.local_financial_balance}
              </p>
            </div>
            <div>
              <p className="text-gray-600">الرصيد الدولي</p>
              <p className="border border-gray-300 p-3 rounded-md">
                SNC {profile.international_financial_balance}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500">
            حدث خطأ أثناء تحميل البيانات
          </div>
        )}

        {/* <div className="mt-6 text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            تعديل الملف الشخصي
          </button>
        </div> */}
      </div>
      {/* Dialog for Editing Profile */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center"
      >
        {/* الخلفية السوداء مع إمكانية إغلاق الـ Dialog عند النقر عليها */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        />

        <DialogPanel className="relative bg-white p-6 rounded-md shadow-lg max-w-md mx-auto w-full">
          <DialogTitle className="text-lg font-semibold mb-4 text-center">
            تعديل الملف الشخصي
          </DialogTitle>

          <form>
            {/* الجنس */}
            <div>
              <label className="block text-gray-700">الجنس</label>
              <Listbox value={formData.gender} onChange={handleGenderChange}>
                <Listbox.Button className="border px-4 py-2 w-full text-right rounded-md">
                  {formData.gender
                    ? formData.gender === "m"
                      ? "ذكر"
                      : "أنثى"
                    : "اختر الجنس"}
                </Listbox.Button>
                <Listbox.Options className="border rounded-md mt-1 bg-white shadow-lg">
                  {people.map((person) => (
                    <ListboxOption key={person.id} value={person}>
                      {({ active }) => (
                        <span
                          className={`block px-4 py-2 cursor-pointer ${
                            active ? "bg-teal-600 text-white" : ""
                          }`}
                        >
                          {person.gender === "male" ? "ذكر" : "أنثى"}
                        </span>
                      )}
                    </ListboxOption>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* مكان الولادة */}
            <div className="mt-4">
              <label className="block text-gray-700">مكان الولادة</label>
              <input
                type="text"
                name="place_of_birth"
                value={formData.place_of_birth}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            {/* العنوان */}
            <div className="mt-4">
              <label className="block text-gray-700">العنوان</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            {/* تاريخ الميلاد */}
            <div className="mt-4">
              <label className="block text-gray-700">تاريخ الميلاد</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            {/* رقم الهاتف */}
            <div className="mt-4">
              <label className="block text-gray-700">رقم الهاتف</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            {/* الاسم الأول */}
            <div className="mt-4">
              <label className="block text-gray-700">الاسم الأول</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            {/* اسم العائلة */}
            <div className="mt-4">
              <label className="block text-gray-700">اسم العائلة</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            {/* زر الحفظ */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                حفظ التغييرات
              </button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>

      <Footer />
    </>
  );
}
