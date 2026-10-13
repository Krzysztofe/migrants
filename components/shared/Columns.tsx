import { getTranslations } from "next-intl/server";
import ButtonLink from "./buttons/ButtonLink";

type Column = {
  id: string;
  header: string;
  subHeader: string;
  btnMsg: string;
  link: string;
};

type Props = {
  columns: Column[];
};

const Columns = async ({ columns }: Props) => {
  const t = await getTranslations("ComunityPage");
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10">
      {columns.map(({ id, header, subHeader, btnMsg, link }) => {
        return (
          <div className="border-accent p-10 flex-1 bg-gray-light flex flex-col">
            {/* <div className="text-accent text-xl font-extrabold">18+</div> */}

            <h3 className="font-extrabold text-lg-plus leading-none mb-8">
              {t(header)}
            </h3>
            <p className="mt-auto">{t(subHeader)}</p>
            <ButtonLink target="_blank" link={t(link)} variant="underline">
              {t(btnMsg)}
            </ButtonLink>
          </div>
        );
      })}
    </div>
  );
};

export default Columns;
