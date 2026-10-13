import TopSection from "@/components/shared/TopSection";
import { getTranslations } from "next-intl/server";

const HousingPage = async () => {
  const t = await getTranslations("HousingPage");
  return (
    <>
      <TopSection header={t(`header`)} paragraph={t(`subHeader`)} />
      <div>filtry</div>
      list wpisów
    </>
  );
};

export default HousingPage;
