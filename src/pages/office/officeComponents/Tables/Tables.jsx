import React from "react";
import InComingNational from "./InComingNational/InComingNational";
import ExportNational from "./ExportNational/ExportNational";
import InInter from "./InInter/InInter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ExportIntern from "./ExportIntern/ExportIntern";
import ExportEventsNational from "./ExportEventsNational/ExportEventsNational";
import ExportEventsInter from "./ExportEventsInter/ExportEventsInter";

export default function Tables({ theTable }) {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t(theTable)}</title>
      </Helmet>
      {theTable === "inComingNational" ? (
        <InComingNational />  
      ) : theTable === "exportNational" ? (
        <ExportNational />
      ) : theTable === "inInter" ? (
        <InInter />
      ) : theTable === "exportIntern" ? (
        <ExportIntern />
      ) : theTable === "exportEvents" ? (
        <ExportEventsNational />
      ) : theTable === "exportEventsInter" ? (
        <ExportEventsInter />
      ) : (
        ""
      )}
    </>
  );
}
