import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";
import GeneralNews from "../../components/GeneralNews/GeneralNews";
import GeneralAdvertisements from "../../components/GeneralAdvertisements/GeneralAdvertisements";
import Nav from "../nav/Nav";
import Charts from "../../components/Charts/Charts";
export default function Events() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("home")}</title>
      </Helmet>
      {/* <Nav /> */}
      <HomeSlider />
      <Cards />
      <GeneralNews />
      <GeneralAdvertisements />
      <Charts />
      <Footer />
    </>
  );
}
