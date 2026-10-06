import ButtonLink from "@/components/shared/buttons/ButtonLink";
import CallToAction from "@/components/shared/CallToAction";
import AccentHeader from "@/components/shared/headers/AccentHeader";
import Icon from "@/components/shared/Icon";
import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dość zakazu strajków | Podpisz się",
};

const cities = [
  "WARSZAWA",
  "ŁÓDŹ",
  "WROCŁAW",
  "POZNAŃ",
  "KRAKÓW",
  "TRÓJMIASTO",
  "GNIEZNO",
];

const SignInPage = () => {
  return (
    <>
      <TopSection
        header="Podpisz się pod wolnością strajkowania!"
        paragraph="Jako oddolna grupa działaczy i działaczek związków zawodowych oraz organizacji społecznych wspieramy Komitet Inicjatywy Ustawodawczej „Dość zakazów strajku – przywróćmy wolność strajkowania” w zbiórce podpisów."
      />
      <section id="1" className="bg-accent  pb-32">
        {" "}
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-6 ">
            <ButtonLink link={"#1"} className="w-fit " variant="primary">
              Kto może się podpisać?
            </ButtonLink>
            <ButtonLink link={"#2"} className="w-fit " variant="primary">
              Gdzie można się podpisać?
            </ButtonLink>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className=" mt-30 lg:flex  gap-10">
            <div className="flex-1 ">
              <AccentHeader message="Kto może złożyć podpis?" />
            </div>
            <div className="flex-1">
              <p className="mb-20">
                Podpisać się może każda osoba, która spełnia dwa warunki. Podpis
                trzeba złożyć osobiście.
              </p>
            </div>
          </div>{" "}
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="border-accent border-t-8 p-10 flex-1 bg-gray-light flex flex-col">
              <div className="text-accent text-xl font-extrabold">18+</div>

              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Ukończone 18 lat
              </h3>
              <p className="mt-auto">
                Podpis może złożyć każda osoba pełnoletnia.
              </p>
            </div>
            <div className="border-accent border-t-8 p-10 flex-1 bg-gray-light flex flex-col">
              <div className="text-accent text-xl font-extrabold">PL</div>
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Obywatelstwo polskie
              </h3>
              <p className="mt-auto">
                Podpisać się może obywatel lub obywatelka Polski.
              </p>
            </div>
            <div className="border-accent border-t-8 p-10 flex-1 bg-gray-light flex flex-col">
              <div className="text-accent text-xl font-extrabold">LIVE</div>
              <h3 className="font-extrabold text-lg-plus leading-none mb-8">
                Podpis na żywo
              </h3>
              <p id="2" className="mt-auto">
                Trzeba się podpisać osobiście, na miejscu, podczas zbiórki.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container grid md:grid-cols-2 gap-20 my-40">
          <div className="min-h-100">
            <div className="relative h-full">
              <Image
                src="/images/collecting-img.jpg"
                alt="Demonstracja"
                fill
                className="object-cover"
              />{" "}
            </div>{" "}
            <p className="text-right text-xs">Fot. Julia Różańska</p>
          </div>

          <div className="text-lg [&>p]:mt-10">
            <h2 className="text-xl">Gdzie nas znajdziesz?</h2>
            <p>
              Zbieramy podpisy na żywo, tam gdzie spotykają się ludzie
              zaangażowani społecznie:
            </p>
            <p className="relative pl-16 before:absolute before:left-0 before:top-1/2 before:size-8 before:-translate-y-1/2 before:bg-accent">
              na demonstracjach
            </p>
            <p className="relative pl-16 before:absolute before:left-0 before:top-1/2 before:size-8 before:-translate-y-1/2 before:bg-accent">
              na konferencjach
            </p>
            <p className="relative pl-16 before:absolute before:left-0 before:top-1/2 before:size-8 before:-translate-y-1/2 before:bg-accent">
              na kongresach
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {cities.map((city) => {
              return (
                <div className=" p-10 flex-1 border-gray border-2 flex flex-col h-[19rem]">
                  <h3 className="font-extrabold text-lg leading-none">
                    {city}
                  </h3>

                  <p className="mt-auto relative pl-8 before:absolute before:left-0 before:top-1/2 before:size-5 before:-translate-y-1/2 before:bg-accent before:rounded-full">
                    Terminy wkrótce
                  </p>
                </div>
              );
            })}
            <div className=" p-10 flex-1 border-black border-2 bg-black text-white h-[19rem]">
              <h3 className="font-extrabold text-lg leading-none mb-16">
                Brakuje Towjego miasta?
              </h3>

              <p>Napisz do nas</p>
              <p>strajkuj.pl@proton.me</p>
            </div>
          </div>
          <AccentHeader
            className="bg-gray-light py-8 mt-20"
            message={
              <div className="flex items-center">
                <Icon
                  icon={"clock"}
                  size={50}
                  className={`!bg-accent shrink-0`}
                />
                <div className=" text-lg  ml-6">
                  Niebawem znajdziesz tutaj spis stałych miejsc i terminów
                  zbiórek podpisów w poszczególnych miastach.
                </div>
              </div>
            }
          />
        </div>
      </section>{" "}
      <CallToAction
        message="Chcesz pomóc zbierać podpisy?"
        subtitle="Dołącz do działań w swoim mieście lub w swoim miejscu pracy."
        buttonMessage="join"
      />{" "}
    </>
  );
};

export default SignInPage;
