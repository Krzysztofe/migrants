import AccentHeader from "@/components/shared/AccentHeader";
import TopSection from "@/components/shared/TopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zjednoczeni | O związku",
};

const AboutPage = () => {
  return (
    <>
      <TopSection
        header="Kim jesteśmy i o co walczymy?"
        paragraph="Strajk jest podstawowym demokratycznym prawem i jedynym realnym narzędziem pracowników do obrony przed atakami ze strony rządów i wielkiego biznesu."
      />

      <section>
        <div className="container  pb-30">
          <AccentHeader message="PRAWO TYLKO NA PAPIERZE" />{" "}
          <p>
            Strajk jest podstawowym demokratycznym prawem i jedynym realnym
            narzędziem pracowników do obrony przed atakami ze strony rządów i
            wielkiego biznesu. Jak pokazują jednak doświadczenia związków
            zawodowych, w Polsce prawo do strajku mamy tylko na papierze. Wciąż
            podlegamy restrykcjom, które Jaruzelski wprowadził w stanie
            wojennym, żeby uniemożliwić strajki i złamać “Solidarność” lat 80.
            Nowe władze III RP z chęcią podtrzymały te restrykcje, gdy
            wprowadzały “nową” ustawę o rozwiązywaniu sporów zbiorowych w 1991
            roku.
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
          <p className="font-bold">
            W efekcie mamy jeden z najgorszych rynków pracy w całej Europie:
          </p>
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
        </div>{" "}
      </section>
      <section>
        {" "}
        <div className="container">
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
        </div>
      </section>
      <section>
        <div className="container">
          <AccentHeader message="Przebieg naszej walki o wolność strajkowania" />{" "}
        </div>
      </section>
    </>
  );
};

export default AboutPage;
