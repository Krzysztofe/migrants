import AccentHeader from "@/components/shared/headers/AccentHeader";
import AccentHeaderSmall from "@/components/shared/headers/AccentHeaderSmall";
import CountHeader from "@/components/shared/headers/CountHeader";
import SideBorder from "@/components/shared/SideBorder";
import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";
import TimelineWrapper from "./_components/TimelineWrapper";
import Image from "next/image";
import heroImg from "@/public/images/hero-img.png";
import ButtonLink from "@/components/shared/buttons/ButtonLink";

export const metadata: Metadata = {
  title: "Zjednoczeni | O związku",
};

const headers = [
  "niskie płace",
  "rażąco niski stopień uzwiązkowienia",
  "przymusowe nadgodziny",
  "jeden z najdłuższych tygodni pracy",
  "zatrzęsienie śmieciówek",
  "łamanie prawa pracy na potęgę",
  "antyzwiązkowe kancelarie prawnicze zamiast dialogu",
  "sprawy w sądach pracy ciągnące się latami",
];

const countHeaders = [
  "Znieść wymóg referendum strajkowego",
  "Oddzielić strajk od procedury sporu zbiorowego",
  "Wolność strajkowania dla pracowników budżetówki",
  "Wolność strajkowania bez represji",
  "Wolność organizacji strajków politycznych!",
];

const btns = [
  {
    message: "OZZ Inicjatywy Pracowniczej",
    link: "https://www.facebook.com/InicjatywaPracownicza",
  },
  {
    message: "Konfederacja Pracy",
    link: "https://www.facebook.com/opzzkp",
  },
  {
    message: "NSZZ „Solidarność”",
    link: "https://www.facebook.com/solidarnosc",
  },
  {
    message: "WZZ „Sierpień 80”",
    link: "https://www.facebook.com/KomisjaKrajowaSierpnia80",
  },
  {
    message: "KNSZZ „Ad Rem”",
    link: "https://www.facebook.com/zzasystentow",
  },
  {
    message: "KZZ w ZUS „Niezależni”",
    link: "https://www.facebook.com/OZZPZUSNiezalezni",
  },
];

const AboutPage = () => {
  return (
    <>
      <TopSection
        header="Kim jesteśmy i o co walczymy?"
        paragraph="Strajk jest podstawowym demokratycznym prawem i jedynym realnym narzędziem pracowników do obrony przed atakami ze strony rządów i wielkiego biznesu."
      />

      <section>
        <div className="container-sm  py-30 [&>p]:mt-10">
          <AccentHeader message="PRAWO TYLKO NA PAPIERZE" />{" "}
          <p>
            Strajk jest podstawowym demokratycznym prawem i jedynym realnym
            narzędziem pracowników do obrony przed atakami ze strony rządów i
            wielkiego biznesu.
          </p>{" "}
          <p>
            {" "}
            Jak pokazują jednak doświadczenia związków zawodowych, w Polsce
            prawo do strajku mamy tylko na papierze. Wciąż podlegamy
            restrykcjom, które Jaruzelski wprowadził w stanie wojennym, żeby
            uniemożliwić strajki i złamać “Solidarność” lat 80. Nowe władze III
            RP z chęcią podtrzymały te restrykcje, gdy wprowadzały “nową” ustawę
            o rozwiązywaniu sporów zbiorowych w 1991 roku.
          </p>
          <p>
            Ustawa ta obowiązuje do dziś i dalej uniemożliwia strajkowanie
            większości pracowników w naszym kraju. Ograniczenia ze stanu
            wojennego jeszcze skuteczniej blokują dziś strajki, bo zupełnie nie
            przystają do realiów współczesnego rynku pracy. Mediacje i rokowania
            to proceduralna fikcja wykorzystywana przez pracodawców, by
            zastraszyć załogę oraz nielegalnie zwolnić działaczy związkowych i
            zasypać ich absurdalnymi pozwami. Referendum strajkowe to nie
            demokracja, ale młot na strajki – gdyby takie same wymagania jak
            wobec pracowników stosować wobec władz kraju, połowa rządów w III RP
            byłaby nielegalna. Kolejne rządy wycierają sobie gęby legendą
            “Solidarności”, ale w rzeczywistości boją się zjednoczonych
            pracowników bardziej niż dyktatury.{" "}
          </p>
          <p className="font-bold ">
            W efekcie mamy jeden z najgorszych rynków pracy w całej Europie:
          </p>
          <div className="grid gap-4 xl:grid-cols-2 mt-10">
            {headers.map((header) => {
              return <AccentHeaderSmall key={header} message={header} />;
            })}
          </div>
          <p>
            Dialog z pracodawcami jest bardzo nierówny lub niemożliwy. Stał się
            pustym frazesem, którym zasłaniają się zarządy, by wszelkimi
            dostępnymi środkami miażdżyć każdy przejaw pracowniczego oporu i
            represjonować każdego, kto odważy się wychylić. Strajk, wywierając
            na pracodawcę presję ekonomiczną, jest jedynym narzędziem zdolnym
            zmusić firmy do negocjacji.
          </p>
          <p className="font-bold">
            Bez wolności strajkowania jesteśmy jako pracownicy pozbawieni
            podstawowego narzędzia walki o nasze prawa, o dobre miejsca pracy i
            godne życie.
          </p>
          <div className="mt-30">
            <SideBorder />
          </div>
        </div>{" "}
      </section>
      <section>
        {" "}
        <div className="container-sm  [&>p]:mt-10">
          {" "}
          <AccentHeader message="O co walczymy?" />{" "}
          <p>
            Mamy tego dość. Chcemy praw pracowniczych na miarę „dwudziestej
            gospodarki świata”. W gronie wielu związków zawodowych, stowarzyszeń
            lokatorskich i organizacji społecznych zawiązaliśmy w 2025 roku
            Koordynację Solidarności i Walk (KSW), by wspólnie walczyć o naszą
            godność, sprawiedliwość i prawdziwą demokrację, która obejmuje
            pracowników, a nie tylko zarządy. Od kwietnia 2026 roku głośno
            żądamy zmiany prawa regulującego strajki.
          </p>
          <p className="font-bold">
            Wiosną 2026 roku wypracowaliśmy wspólne postulaty:
          </p>{" "}
          <div className="mt-10 mb-30">
            {countHeaders.map((header, idx) => {
              return (
                <CountHeader key={header} message={header} idx={idx + 1} />
              );
            })}
          </div>
          <AccentHeader message="Komitet Inicjatywy Ustawodawczej" />{" "}
          <p>
            We wrześniu 2026 roku zawiązał się Komitet Inicjatywy Ustawodawczej
            „Dość zakazu strajków – przywróćmy wolność strajkowania”. Ruszyliśmy
            ze zbiórką podpisów na rzecz Komitetu, bo zaproponowany przez niego
            projekt zmiany prawnej w obecnej formie spełnia wszystkie nasze
            postulaty. Grono popierających inicjatywę Komitetu szeroko wykracza
            już poza KSW: dołączają do niego kolejne związki, organizacje
            społeczne oraz osoby niezrzeszone.
          </p>
          <p>
            Jeśli chcemy być traktowani z szacunkiem, potrzebujemy zmiany
            prawnej i silnego ruchu pracowniczego, który potrafi się bronić
            przed atakami ze strony rządów i biznesmenów. Historia już pokazała,
            że żaden polityk nie zagwarantuje nam prawa do strajku ze swojej
            dobrej woli.
          </p>
          <p>
            Sami musimy stworzyć taką presję, aby rządzący byli zmuszeni znieść
            restrykcje ciążące na strajku. Nikt tego za nas nie zrobi.
          </p>
          <div className="mt-30">
            <SideBorder />
          </div>
        </div>
      </section>
      <section>
        <div className="container-sm mt-30 mb-60 ">
          <AccentHeader message="Przebieg naszej walki o wolność strajkowania" />

          <TimelineWrapper day="30" month="KWI 2026">
            <h3 className="font-bold text-lg-plus">
              Spotkanie w Zespole Sejmowym ds. Pracy
            </h3>
            <p>
              30 kwietnia 2026 uczestniczyliśmy w spotkaniu Zespołu Sejmowego
              ds. Pracy w gronie przedstawicieli związków zawodowych z całej
              Polski, m.in.:
            </p>
            <div className="flex gap-4 flex-wrap mt-10">
              {btns.map(({ message, link }) => {
                return (
                  <ButtonLink
                    link={link}
                    className="w-fit "
                    variant="primary-empty"
                  >
                    {message}
                  </ButtonLink>
                );
              })}
            </div>
            <p>
              Rozmawialiśmy o represjach, które dotykają na co dzień związkowców
              i związkowczynie. Z doświadczenia wiemy, że najbardziej nasilone
              taktyki zwalczania związków pracodawcy stosują w trakcie sporu
              zbiorowego i przy okazji strajku. Działacze są zwalniani,
              zastraszani, zasypywani sprawami karnymi za realizowanie swoich
              praw konstytucyjnych: prawa do zrzeszania się i prawa do strajku.
            </p>
            <p>
              Reprezentacja ze strony Ministerstwa Pracy potwierdziła, że pewne
              kancelarie prawne w Polsce otwarcie stosują metody zwalczania
              związków zawodowych i że jest to niezgodne z prawem. W Sejmie
              podnieśliśmy nasze postulaty dotyczące zmiany prawa regulującego w
              Polsce organizację strajków.
            </p>
          </TimelineWrapper>

          <TimelineWrapper day="1" month="MAJ 2026">
            <h3 className="font-bold text-lg-plus">
              Marsz „Dość zakazu strajków”
            </h3>
            <Image
              src={heroImg}
              alt="Demonstracja"
              className="w-full h-auto mt-10"
            />
            <p>
              1 maja 2026 przeszliśmy ulicami Warszawy pod hasłem „Dość zakazu
              strajków”.
            </p>
            <p className="font-bold">Pod semjem</p>
            <p>
              Zebrało się około tysiąca osób. Zespół prawny IP, związkowcy IP
              Zalando oraz Konfederacji Pracy Dino przedstawili zasadnicze
              problemy z ustawą o sporach zbiorowych: wymóg wysokiej frekwencji
              w referendum i uwikłanie strajku w warunek długich negocjacji.
            </p>
            <p className="font-bold">Pod Ministerstwem Sprawiedliwości</p>
            <p>
              Związkowcy z Amazon, Jeremias i Komisji Pracowników
              Latynoamerykańskich zabrali głos na temat rosnących represji na
              związki przy pomocy państwa: dotowania pracy więźniów i prawników
              zwalczających związki, sądowych zakazów wypowiedzi dla związkowców
              czy wciąż zbyt licznych umów śmieciowych.
            </p>
            <p className="font-bold">Marszałkowska 66</p>
            <p>
              Marsz zakończył się pod sprywatyzowaną kamienicą komunalną.
              Organizacje lokatorskie opowiedziały o swojej walce z rosnącym
              wyzyskiem czynszowym i eksmisjami w Poznaniu, Warszawie i w Łodzi.
            </p>
          </TimelineWrapper>

          <TimelineWrapper day="1" month="MAJ 2026">
            <h3 className="font-bold text-lg-plus">List otwarty do premiera</h3>
            <p>
              Ponadto 1 maja skierowaliśmy do premiera Donalda Tuska list
              otwarty, w którym domagamy się pilnych zmian w ustawie o sporach
              zbiorowych. List został podpisany przez dziesiątki komisji
              zakładowych związków zawodowych z całej Polski.
            </p>
          </TimelineWrapper>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
