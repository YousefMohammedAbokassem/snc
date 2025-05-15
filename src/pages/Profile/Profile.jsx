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
          "Accept-Language": localStorage.getItem("i18nextLng"), // إضافة header للغة العربية
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
  // console.log(profile);
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
              <p className="text-gray-600">{t("gender")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.gender === "m" ? t("male") : t("female")}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("phone_number")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.phone_number}+
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("address")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.address}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("birthday")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.birthday}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("national_id")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.national_id}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("place_of_birth")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.place_of_birth}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("local_balance")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                {profile.local_financial_balance}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{t("international_balance")}</p>
              <p className="border border-gray-300 p-3 rounded-md">
                SNC {profile.international_financial_balance}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500">{t("loading_error")}</div>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        />

        <DialogPanel className="relative bg-white p-6 rounded-md shadow-lg max-w-md mx-auto w-full">
          <DialogTitle className="text-lg font-semibold mb-4 text-center">
            {t("edit_profile")}
          </DialogTitle>

          <form>
            {/* الجنس */}
            <div>
              <label className="block text-gray-700">{t("gender")}</label>
              <Listbox value={formData.gender} onChange={handleGenderChange}>
                <Listbox.Button className="border px-4 py-2 w-full text-right rounded-md">
                  {formData.gender
                    ? formData.gender === "m"
                      ? t("male")
                      : t("female")
                    : t("select_gender")}
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
                          {person.gender === "male" ? t("male") : t("female")}
                        </span>
                      )}
                    </ListboxOption>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">
                {t("place_of_birth")}
              </label>
              <input
                type="text"
                name="place_of_birth"
                value={formData.place_of_birth}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">{t("address")}</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">{t("birthday")}</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">{t("phone_number")}</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">{t("first_name")}</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">{t("last_name")}</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleFormChange}
                className="border w-full px-4 py-2 rounded-md text-right"
              />
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              >
                {t("save_changes")}
              </button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>

      <Footer />
    </>
  );
}
