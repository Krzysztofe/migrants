import ButtonLink from "./shared/buttons/ButtonLink";
import Icon from "./shared/Icon";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-gray-light    border-t-6 border-accent">
      <div className="container bg-gray-light  py-26 flex flex-col gap-20 md:flex-row">
        <div>
          <h2 className="md:w-1/2">{t("header")}</h2>
          <p className="mt-10">{t("subheader")}</p>
        </div>
        <div className="">
          <div className="mt-10 w-full">
            <Image
              src="/images/ministry.png"
              alt="Logo ministerstwa"
              width={1200}
              height={400}
              className="h-auto w-full"
              sizes="100vw"
            />
          </div>
          <p className="mt-10">{t("ministryMessage")}</p>
          <ButtonLink
            target="_blank"
            link={
              "https://www.gov.pl/web/rodzina/ogloszenie-konkursu-ofert-razem-mozemy-wiecej-w-ramach-resortowego-programu-aktywizacyjnego-dla-cudzoziemcow-na-rok-2026"
            }
            variant="underline"
          >
            {t("ministryLink")}
            {
              <Icon
                icon={"arrow"}
                size={15}
                className={`bg-accent -rotate-90`}
              />
            }
          </ButtonLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
