import PdfTemplate from "./_components/PdfTemplate";
import WageForm from "./_components/WageForm";

export const metadata = { title: "Wezwanie do zapłaty" };

export default function PageWezwanie() {
  return (
    <>
      <section>
        <div className="container md:flex md:justify-between md:items-center">
          <div className="flex-1">
            <p className="text-sm text-accent">
              Przedsądowe wezwanie do zapłaty
            </p>
            <h1 className=" font-bold">Pracodawca nie wypłacił pensji?</h1>
            <p className="">
              Wypełnij formularz, a pismo do pracodawcy powstanie obok. Zapisz
              je jako plik Word albo PDF, wydrukuj, podpisz i wyślij listem
              poleconym za potwierdzeniem odbioru. Zachowaj kopię i
              potwierdzenie nadania.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">logo</div>
        </div>
      </section>

      <section className="mt-8">
        <div className="container flex flex-col gap-8 md:flex-row md:justify-between">
          <WageForm />
        </div>
      </section>
      <section>
        <div className="container mt-8">
          Formularz pomaga przygotować pismo, ale nie jest poradą prawną.
          Roszczenia o wynagrodzenie przedawniają się po 3 latach. Jeśli
          pracodawca nie zapłaci w terminie, możesz złożyć pozew do sądu pracy
          (przy umowie o pracę) albo do sądu cywilnego (przy umowie zlecenia lub
          o dzieło) i zawiadomić Państwową Inspekcję Pracy.
        </div>
      </section>
    </>
  );
}
