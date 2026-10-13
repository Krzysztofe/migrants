import { getTranslations } from "next-intl/server";
import TopSection from "@/components/shared/TopSection";

const ResidencePage = async () => {
  const t = await getTranslations("ResidencePage");
  return (
    <>
      <TopSection header={t(`header`)} paragraph={t(`subHeader`)} />
      <div>filtry</div>
      list wpisów
    </>
  );
};

export default ResidencePage;
