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
        <div className="container pt-10">
          <div className="flex flex-col sm:flex-row gap-6 ">
            <ButtonLink link={"#1"} className="w-fit " variant="primary">
              <div className="flex items-center gap-8">
                <div className="">1</div>{" "}
                <div className="text-left">Zbieraj podpisy</div>
              </div>
            </ButtonLink>
            <ButtonLink link={"#2"} className="w-fit " variant="primary">
              <div className="flex items-center gap-8">
                <div className="">2</div>{" "}
                <div className="text-left">Dołącz do związku zawodowego</div>
              </div>
            </ButtonLink>
          </div>
        </div>
      </section>
      <section id="1">
        <div className="container py-20">
          <div className="md:!w-2/3">
            <h2 className="font-extrabold text-xl flex items-center gap-10">
              {" "}
              <div className=" text-accent text-3xl ">1</div> Zbieraj podpisy
            </h2>

            <p>
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
            className="bg-gray-light py-10"
            message={
              <div className="">
                <div>Chcesz zbierać podpisy?</div>
                <div className=" text-base  mt-8">
                  Napisz do nas: strajkuj.pl@proton.me
                </div>
              </div>
            }
          />
          <h2 className="text-xl mb-14 pt-20">Gdzie zbierac podpisy?</h2>
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
      <section>
        {" "}
        <div className="container mb-30">
          <div className="bg-black border-t-6 border-accent p-20 sm:p-30 ">
            <div className="flex flex-col md:flex-row justify-between gap-20">
              <div className="text-white font-black text-center">
                <div className="text-3xl">100</div>
                <p>PODPISÓW</p>
              </div>
              <div className="text-white font-black text-center">
                <div className="text-3xl text-accent-light">20</div>
                <p>PODPISÓW</p>
              </div>
              <div className="text-white font-black text-center">
                <div className="text-3xl text-accent">5</div>
                <p>PODPISÓW</p>
              </div>{" "}
            </div>

            <h3 className="text-xl text-white font-extrabold leading-none mt-20">
              Każdy podpis zbliża nas do celu!
            </h3>
          </div>
        </div>
      </section>
      <section className="bg-gray-light" id="2">
        <div className="container py-40">
          <h2 className="font-extrabold text-xl flex items-center gap-10">
            {" "}
            <div className=" text-accent text-3xl ">2</div> Dołącz do związku
            zawodowego w swoim miejscu pracy
          </h2>
          <p className="mt-16 md:!w-2/3">
            Poza zbieraniem podpisów na rzecz zmiany prawnej musimy także
            budować silny ruch pracowniczy, który będzie bronił swoich zdobyczy
            przed atakami polityków i biznesmenów. Jeśli tak jak my chcesz
            wolności strajkowania, zbieraj z nami podpisy i dołącz do związku
            zawodowego w swoim miejscu pracy lub go załóż!
          </p>

          <div className="flex flex-col md:flex-row gap-10 mt-20">
            <div className="border-2 border-gray bg-white p-10 flex-1">
              <Icon icon={"userPlus"} size={50} className={`!bg-accent mb-8`} />
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Dołącz do związku
              </h3>
              <p>
                Wstąp do związku zawodowego działającego w Twoim miejscu pracy.
              </p>
            </div>
            <div className="border-2 border-gray bg-white p-10 flex-1">
              <Icon icon={"flag"} size={50} className={`!bg-accent mb-8`} />
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Załóż związek
              </h3>
              <p>
                Jeśli takiego związku nie ma, załóż go razem z koleżankami i
                kolegami.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinPage;
