import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Categories from "../../components/Categories/Categories";
import StoresSlider from "../../components/StoresSlider/StoresSlider";
import ModernProducts from "../../components/ModernProducts/ModernProducts";
import Offers from "../../components/Offers/Offers";
import Footer from "../../components/Footer/Footer";
export default function Office() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("office")}</title>
      </Helmet>
      <HomeSlider />
      <Categories />
      <StoresSlider />
      <ModernProducts />
      <Offers />
      <Footer />
    </>
  );
}
