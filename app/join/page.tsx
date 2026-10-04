import ButtonLink from "@/components/shared/buttons/ButtonLink";
import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";
import DocumentsTable from "./_components/DocumentsTable";
import AccentHeader from "@/components/shared/headers/AccentHeader";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";
import Icon from "@/components/shared/Icon";

export const metadata: Metadata = {
  title: "Zjednoczeni | Dokumenty",
};

const JoinPage = () => {
  return (
    <>
      {" "}
      <TopSection header="Dołącz do działań" />
      <section className="bg-accent  pb-32">
        {" "}
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-6 ">
            <ButtonLink link={"/contact"} className="w-fit " variant="primary">
              <div className="flex items-center gap-4">
                <div className="text-lg-plus">1</div>{" "}
                <div className="text-left">Zbieraj podpisy</div>
              </div>
            </ButtonLink>
            <ButtonLink
              link={"for-members"}
              className="w-fit "
              variant="primary"
            >
              <div className="flex items-center gap-4">
                <div className="text-lg-plus">2</div>{" "}
                <div className="text-left">Dołącz do związku zawodowego</div>
              </div>
            </ButtonLink>
          </div>
        </div>
      </section>
      <section>
        <div className="container py-20">
          <div className="md:!w-2/3">
            <h2 className="font-extrabold text-xl">
              {" "}
              <span className="ml-8 text-accent text-2xl ">1</span> Zbieraj
              podpisy
            </h2>
            <p className="text-lg">
              Każdy może zbierać podpisy na rzecz Komitetu Inicjatywy
              Ustawodawczej „Dość zakazów strajku – przywróćmy wolność
              strajkowania”. To bardzo proste: wystarczy wydrukować dwa
              dokumenty, zebrać podpisy i wysłać je na adres wskazany w
              instrukcji.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <DocumentsTable />
          <p className="text-sm">
            Wszystkie powyższe dokumenty pochodzą ze strony Komitetu Inicjatywy
            Ustawodawczej.
          </p>
        </div>
      </section>
      <section>
        {" "}
        <div className="container my-30">
          <AccentHeader
            message={
              <div>
                <div>Chcesz zbierać podpisy?"</div>
                <div className="text-gray text-base  mt-8">
                  Napisz do nas: strajkuj.pl@proton.me
                </div>
              </div>
            }
          />
          <h2 className="text-xl mb-20">Gdzie zbierac podpisy?</h2>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="border-2 border-gray p-10 flex-1">
              <Icon icon={"house"} size={50} className={`!bg-accent mb-8`} />
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Wśród sąsiadów
              </h3>
              <p>
                Przejdź się po sąsiadach i porozmawiaj o tym, dlaczego warto się
                podpisać.
              </p>
            </div>
            <div className="border-2 border-gray p-10 flex-1">
              <Icon icon={"users"} size={50} className={`!bg-accent mb-8`} />
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Rodzina i współpracownicy
              </h3>
              <p>Zbierz podpisy od rodziny i osób, z którymi pracujesz.</p>
            </div>
            <div className="border-2 border-gray p-10 flex-1">
              <Icon icon={"store"} size={50} className={`!bg-accent mb-8`} />
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Stoisko w miejscu publicznym
              </h3>
              <p>Rozstaw stoisko w dowolnym miejscu publicznym.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinPage;
