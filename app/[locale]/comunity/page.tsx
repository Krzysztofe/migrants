import TopSection from "@/components/shared/TopSection";
import { getTranslations } from "next-intl/server";

const ComunityPage = async () => {
  const t = await getTranslations("ComunityPage");
  return (
    <>
      <TopSection header={t(`header`)} paragraph={t(`subHeader`)} />
      <div>filtry</div>
      list wpisów
    </>
  );
};

export default ComunityPage;
