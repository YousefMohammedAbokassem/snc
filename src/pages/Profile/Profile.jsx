import React from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h4 className="my-3 text-center font-bold text-xl">{t("profile")}</h4>
    </div>
  );
}
