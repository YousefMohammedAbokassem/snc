import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import EventsSlider from "../../components/EventsSlider/EventsSlider";
import Categories from "../../components/Categories/Categories";
import StoresSlider from "../../components/StoresSlider/StoresSlider";
import ModernProducts from "../../components/ModernProducts/ModernProducts";
import Offers from "../../components/Offers/Offers";
import Footer from "../../components/Footer/Footer";
export default function Events() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("events")}</title>
      </Helmet>
      <EventsSlider />
      <Categories />
      <StoresSlider />
      <ModernProducts />
      <Offers />
      <Footer />
    </>
  );
}
