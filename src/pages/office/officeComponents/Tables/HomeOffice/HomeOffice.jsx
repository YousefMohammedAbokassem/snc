import React from "react";
import Cards from "../../../../../components/Cards/Cards";
import Currencies from "./Currencies";
import Charts from "../../../../../components/Charts/Charts";

export default function HomeOffice() {
  return (
    <>
      <Currencies />
      <Cards />
      <Charts />
    </>
  );
}
