"use client";

import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";
import DocumentEditor, { emptyPlaceholders } from "./DocumentEditor";
import { RefObject } from "react";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const PdfTemplate = ({ previewRef }: Props) => {
  const { control } = useFormContext<WageFormSchema>();

  const formValues = useWatch({
    control,
  });

  const value = (field: keyof WageFormSchema) => {
    const fieldValue = formValues[field];

    return typeof fieldValue === "string" && fieldValue.trim()
      ? fieldValue
      : "";
  };

  const PreviewValue = ({ field }: { field: keyof WageFormSchema }) => {
    const fieldValue = value(field);

    return fieldValue ? (
      <span>{fieldValue}</span>
    ) : (
      <span className="font-medium italic text-red-600">
        [{emptyPlaceholders[field]}]
      </span>
    );
  };

  return (
    <div className="flex-1  min-w-0">
      <article
        ref={previewRef}
        className="mx-auto w-full max-w-[794px] bg-white px-5 py-8 text-[14px] leading-relaxed text-black shadow-md sm:px-12 sm:py-12 md:px-[80px] md:py-[70px]"
      >
        {/* Miejscowość i data */}
        <p className="mb-8 text-right">
          <PreviewValue field="place" />, <PreviewValue field="date" />
        </p>

        {/* Nadawca */}
        <div className="mb-6">
          <p>
            <PreviewValue field="name" /> <PreviewValue field="surname" />
          </p>
          <p>
            <PreviewValue field="userStreet" />{" "}
            <PreviewValue field="userHouseNomber" />
            {value("userFlatNomber") && (
              <>
                {" "}
                / <PreviewValue field="userFlatNomber" />
              </>
            )}
          </p>
          <p>
            <PreviewValue field="userPostCode" />{" "}
            <PreviewValue field="userCity" />
          </p>
        </div>

        {/* Adresat */}
        <div className="mb-10 text-right">
          <p>
            <PreviewValue field="companyName" />
          </p>
          <p>
            <PreviewValue field="companyStreet" />{" "}
            <PreviewValue field="companyHouseNomber" />
            {value("companyFlatNomber") && (
              <>
                {" "}
                / <PreviewValue field="companyFlatNomber" />
              </>
            )}
          </p>
          <p>
            <PreviewValue field="companyPostCode" />{" "}
            <PreviewValue field="companyCity" />
          </p>
        </div>

        {/* Tytuł */}
        <h2 className="mb-8 text-center text-base font-bold uppercase">
          OSTATECZNE PRZEDSĄDOWE WEZWANIE DO ZAPŁATY
        </h2>

        {/* Treść */}
        <div className="space-y-5 text-justify">
          <p className="indent-8">
            Niniejszym, w imieniu własnym, wzywam Państwa do zapłaty kwoty{" "}
            <PreviewValue field="money" /> zł (słownie:{" "}
            <span className="font-medium italic text-red-600">
              [Kwota słownie]
            </span>
            ), tytułem zaległego wynagrodzenia z tytułu{" "}
            <PreviewValue field="contractType" /> zawartej w dniu{" "}
            <PreviewValue field="contractStartDate" /> roku. Wynagrodzenie to
            jest należne za <PreviewValue field="hours" /> godzin,
            przepracowanych przeze mnie w okresie od dnia{" "}
            <PreviewValue field="workStart" /> roku do dnia{" "}
            <PreviewValue field="workEnd" /> roku.
          </p>

          <p className="indent-8">
            Należność proszę uregulować w nieprzekraczalnym terminie 7 dni od
            dnia otrzymania niniejszego pisma. Kwotę należy uiścić na rachunek
            bankowy nr <PreviewValue field="accountNumber" />.
          </p>

          <p>Odpowiedź na niniejsze pismo proszę przesłać na mój adres:</p>

          <p>
            <PreviewValue field="name" />, <PreviewValue field="surname" />,{" "}
            <PreviewValue field="userCity" />
          </p>

          <p className="indent-8">
            Jednocześnie informuję, iż nieuregulowanie należności w wyżej
            wskazanym terminie spowoduje skierowanie sprawy do sądu, co narazi
            Państwa firmę na dodatkowe koszty związane z koniecznością
            prowadzenia postępowania sądowego, a następnie egzekucyjnego.
          </p>

          <p className="indent-8">
            Dodatkowo skierowany zostanie wniosek o objęcie niniejszej sprawy
            nadzorem przez Ogólnopolski Związek Zawodowy Inicjatywa Pracownicza.
          </p>

          <p className="indent-8">
            Niniejsze pismo należy traktować jako próbę polubownego rozwiązania
            sporu w rozumieniu art. 187 §1 punkt 3 k.p.c.
          </p>
        </div>

        {/* Zakończenie */}
        <div className="mt-12 text-right">
          <p>Z poważaniem,</p>
          <p className="mt-6">……………………………</p>
        </div>
      </article>
    </div>
  );
};

export default PdfTemplate;
