import ButtonLink from "@/components/shared/buttons/ButtonLink";
import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zjednoczeni | Dokumenty",
};

const JoinPage = () => {
  return (
    <>
      {" "}
      <TopSection
        header="Dołącz do działań"
        paragraph="Część dokumentów wymaga kontaktu z przedstawicielem związku w zakładzie. Poniżej lista dokumentów możliwych do pobrania."
      />
      <section>
        {" "}
        <div className="container">
          <div className="flex  sm:flex-row gap-6 mt-6">
            <ButtonLink
              link={"/contact"}
              className="w-fit "
              variant="primary-empty"
            >
              Zbieraj podpisy
            </ButtonLink>
            <ButtonLink
              link={"for-members"}
              className="w-fit "
              variant="primary"
            >
              Dołącz do związku zawodowego
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinPage;
