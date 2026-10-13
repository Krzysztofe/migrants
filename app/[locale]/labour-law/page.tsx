import TopSection from "@/components/shared/TopSection";
import { getTranslations } from "next-intl/server";

const LabourLawPage = async () => {
  const t = await getTranslations("LabourLawPage");
  return (
    <>
      <TopSection header={t(`header`)} paragraph={t(`subHeader`)} />
      <div>filtry</div>
      list wpisów
    </>
  );
};

export default LabourLawPage;
