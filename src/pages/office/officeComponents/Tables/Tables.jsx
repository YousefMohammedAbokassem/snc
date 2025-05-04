import React from "react";
import InComingNational from "./InComingNational/InComingNational";
import ExportNational from "./ExportNational/ExportNational";
import InInter from "./InInter/InInter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ExportIntern from "./ExportIntern/ExportIntern";
import ExportEventsNational from "./ExportEventsNational/ExportEventsNational";
import ExportEventsInter from "./ExportEventsInter/ExportEventsInter";
import InComingEvents from "./InComingEvents/InComingEvents";
import FinancialCommission from "./FinancialCommission/FinancialCommission";
import CompletedReward from "./CompletedReward.jsx/CompletedReward";
import TransfareEvent from "./TransfareEvent/TransfareEvent";
import EventInfo from "./EventInfo/EventInfo";
import EventProducts from "./EventProducts/EventProducts";
import HomeOffice from "./HomeOffice/HomeOffice";
import ExportMyEvents from "./ExportMyEvents/ExportMyEvents";

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
      ) : theTable === "inComingEvents" && localStorage.getItem("role") == 3 ? (
        <InComingEvents />
      ) : theTable === "exportEventsNational" &&
        localStorage.getItem("role") == 3 ? (
        <ExportMyEvents />
      ) : theTable === "financialCommission" ? (
        <FinancialCommission />
      ) : theTable === "completedReward" ? (
        <CompletedReward />
      ) : theTable === "transfareEvent" ? (
        <TransfareEvent />
      ) : theTable === "eventInfo" && localStorage.getItem("role") == 3 ? (
        <EventInfo />
      ) : theTable === "eventProducts" && localStorage.getItem("role") == 3 ? (
        <EventProducts />
      ) : theTable === "home" ? (
        <HomeOffice />
      ) : (
        ""
      )}
    </>
  );
}
