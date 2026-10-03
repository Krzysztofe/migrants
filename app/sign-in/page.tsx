import ButtonLink from "@/components/shared/buttons/ButtonLink";
import SideBorder from "@/components/shared/SideBorder";
import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zjednoczeni | Dla członków",
};

const SignInPage = () => {
  return (
    <>
      <TopSection
        header="Podpisz się pod wolnością strajkowania!"
        paragraph="Jako oddolna grupa działaczy i działaczek związków zawodowych oraz organizacji społecznych wspieramy Komitet Inicjatywy Ustawodawczej „Dość zakazów strajku – przywróćmy wolność strajkowania” w zbiórce podpisów."
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
              Gdzie można się podpisać?
            </ButtonLink>
            <ButtonLink
              link={"for-members"}
              className="w-fit "
              variant="primary"
            >
              Kto może się podpisać?
            </ButtonLink>
          </div>
        </div>
      </section>
      <section>
        {" "}
        <div className="container grid md:grid-cols-2 gap-6 pb-16">
          <div className="bg-white p-10">
            <h3 className="font-bold mb-6">Ochrona prawna</h3>
            <p>
              Twój głos jest częścią stanowiska związku przy ustalaniu układów
              zbiorowych i regulaminów.
            </p>
          </div>
          <div className="bg-white p-10">
            <h3 className="font-bold mb-6">Reprezentacja w negocjacjach</h3>
            <p>
              Wsparcie w sprawach pracowniczych - od rozmowy dyscyplinującej po
              spór sądowy.
            </p>
          </div>
          <div className="bg-white p-10">
            <h3 className="font-bold mb-6">Informacja z pierwszej ręki</h3>
            <p>
              Wiesz o zmianach w firmie zanim staną się plotką na korytarzu.
            </p>
          </div>
          <div className="bg-white p-10">
            <h3 className="font-bold mb-6">Anonimowe zgłaszanie problemów</h3>
            <p>
              Możesz zgłosić nieprawidłowość bez ujawniania swojego nazwiska
              pracodawcy.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {" "}
          <h2 className="font-bold text-xl">Jak dołączyć</h2>
          <SideBorder />
          <div className="flex my-20">
            <div className="text-xl text-accent mr-16">1</div>
            <div>
              <h3 className="font-bold mb-2">Skontaktuj się z nami</h3>
              <div>
                Zadzwoń pod numer 733 654 323 lub napisz przez formularz
                kontaktowy.
              </div>
            </div>
          </div>
          <div className="flex my-20">
            <div className="text-xl text-accent mr-16">2</div>
            <div>
              <h3 className="font-bold mb-2">
                Wypełnij deklarację członkowską
              </h3>
              <div>
                Formularz dostępny jest w zakładce Dokumenty oraz u
                przedstawicieli związku w Twoim zakładzie..
              </div>
            </div>
          </div>
          <div className="flex my-20">
            <div className="text-xl text-accent mr-16">3</div>
            <div>
              <h3 className="font-bold mb-2">
                Przekaż deklarację przedstawicielowi
              </h3>
              <div>
                Twoje członkostwo jest poufne - pracodawca nie jest informowany
                o przynależności związkowej.
              </div>
            </div>
          </div>
          <div className="flex my-20">
            <div className="text-xl text-accent mr-16">4</div>
            <div>
              <h3 className="font-bold mb-2">Zacznij korzystać ze wsparcia</h3>
              <div>
                Od tego momentu możesz zgłaszać sprawy i brać udział w
                spotkaniach związkowych.
              </div>
            </div>
          </div>
        </div>
      </section>
      Chcesz pomóc zbierać podpisy? Dołącz do działań w swoim mieście lub w
      swoim miejscu pracy.
    </>
  );
};

export default SignInPage;
