import { WageLanguageProvider } from "@/context/WageLanguageContext";
import PdfTemplate from "./_components/PdfTemplate";
import WageForm from "./_components/WageForm";
import WageLanguageSwitcher from "./_components/WageLanguageSwitcher";
import Hero from "./_components/Hero";

export const metadata = { title: "Wezwanie do zapłaty" };

export default function PageWezwanie() {
  return (
    <WageLanguageProvider>
      <section>
        <div className="container my-8">
          <WageLanguageSwitcher />
        </div>
      </section>
      <section>
        <div className="container md:flex md:justify-between md:items-center">
          <Hero />
        </div>
      </section>

      <section className="mt-8">
        <div className="container flex flex-col gap-8 lg:flex-row">
          <WageForm />
        </div>
      </section>
      <section>
        <div className="container my-20">
          <p className="md:w-[80rem] ">
            Formularz pomaga przygotować pismo, ale nie jest poradą prawną.
            Roszczenia o wynagrodzenie przedawniają się po 3 latach. Jeśli
            pracodawca nie zapłaci w terminie, możesz złożyć pozew do sądu pracy
            (przy umowie o pracę) albo do sądu cywilnego (przy umowie zlecenia
            lub o dzieło) i zawiadomić Państwową Inspekcję Pracy.
          </p>
        </div>
      </section>
    </WageLanguageProvider>
  );
}
