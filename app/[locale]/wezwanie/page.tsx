import { WageLanguageProvider } from "@/context/WageLanguageContext";
import PdfTemplate from "./_components/PdfTemplate";
import WageForm from "./_components/WageForm";
import WageLanguageSwitcher from "./_components/WageLanguageSwitcher";
import Hero from "./_components/Hero";
import Warning from "./_components/Warning";
import FormLink from "./_components/SiteLink";
import SiteLink from "./_components/SiteLink";

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
          <SiteLink />
        </div>
      </section>
      <section>
        <div className="container my-20">
          <Warning />
        </div>
      </section>
    </WageLanguageProvider>
  );
}
