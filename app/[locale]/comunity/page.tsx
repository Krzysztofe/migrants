import ButtonLink from "@/components/shared/buttons/ButtonLink";
import Columns from "@/components/shared/Columns";
import Icon from "@/components/shared/Icon";
import TopSection from "@/components/shared/TopSection";
import { getTranslations } from "next-intl/server";

// const columnsData = [
//   {
//     header: "columns.1.header",
//     content: (
//       <div>
//         <p>
//           Znajdź lokalny kontakt, zapytaj o wsparcie pracownicze lub dowiedz
//           się, jak dołączyć do związku.
//         </p>
//         <ButtonLink
//           target="_blank"
//           link={
//             "https://www.gov.pl/web/rodzina/ogloszenie-konkursu-ofert-razem-mozemy-wiecej-w-ramach-resortowego-programu-aktywizacyjnego-dla-cudzoziemcow-na-rok-2026"
//           }
//           variant="underline"
//         >
//           {<Icon icon={"arrow"} size={15} className={`bg-accent -rotate-90`} />}
//         </ButtonLink>
//       </div>
//     ),
//   },

//   {
//     header: "columns.2.header",
//     content: (
//       <div>
//         <p>
//           Znajdź lokalny kontakt, zapytaj o wsparcie pracownicze lub dowiedz
//           się, jak dołączyć do związku.
//         </p>
//         <ButtonLink
//           target="_blank"
//           link={
//             "https://www.gov.pl/web/rodzina/ogloszenie-konkursu-ofert-razem-mozemy-wiecej-w-ramach-resortowego-programu-aktywizacyjnego-dla-cudzoziemcow-na-rok-2026"
//           }
//           variant="underline"
//         >
//           {<Icon icon={"arrow"} size={15} className={`bg-accent -rotate-90`} />}
//         </ButtonLink>
//       </div>
//     ),
//   },
// ];

const columnsData = [
  {
    id: "1",
    header: "columns.1.header",
    subHeader: "columns.1.subHeader",
    btnMsg: "columns.1.btnMsg",
    link: "https://ozzip.pl/kontakty-lokalne",
  },
  {
    id: "2",
    header: "columns.2.header",
    subHeader: "columns.2.subHeader",
    btnMsg: "columns.2.btnMsg",
    link: "https://www.gov.pl/web/nieodplatna-pomoc/pomoc-dla-cudzoziemcow.",
  },
  {
    id: "3",
    header: "columns.3.header",
    subHeader: "columns.3.subHeader",
    btnMsg: "columns.3.btnMsg",
    link: "https://www.gov.pl/web/udsc/urzedy-wojewodzkie--kontakt",
  },
];

const ComunityPage = async () => {
  const t = await getTranslations("ComunityPage");
  return (
    <>
      <TopSection header={t(`header`)} paragraph={t(`subHeader`)} />
      <section>
        <div className="container py-20">
          <Columns columns={columnsData} />
        </div>
      </section>
      <div>filtry</div>
      list wpisów
    </>
  );
};

export default ComunityPage;
