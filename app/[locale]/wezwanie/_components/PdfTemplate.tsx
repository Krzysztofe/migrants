"use client";

import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";
import { useFormContext, useWatch, useFormState } from "react-hook-form";
import { RefObject } from "react";
import { emptyPlaceholders } from "@/lib/dataCollections/wageDocumentPlaceholders";
import { formatDateWithDots } from "@/utils/date";
import { numberToPolishWords } from "@/app/utils/numberToPolishWords";

const dateFields: (keyof WageFormSchema)[] = [
  "date",
  "contractStartDate",
  "workStart",
  "workEnd",
];
type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
};

const PdfTemplate = ({ previewRef }: Props) => {
  const { control } = useFormContext<WageFormSchema>();
  const formValues = useWatch({ control });
  const { errors } = useFormState({ control });

  const value = (field: keyof WageFormSchema) => {
    const fieldValue = formValues[field];
    const hasError = !!errors[field];

    return !hasError && typeof fieldValue === "string" && fieldValue.trim()
      ? fieldValue
      : "";
  };

  const PreviewValue = ({
    field,
  }: {
    field: Exclude<keyof WageFormSchema, "contactType">;
  }) => {
    const fieldValue = value(field);
    const isDate = dateFields.includes(field);

    const displayValue = fieldValue
      ? isDate
        ? formatDateWithDots(fieldValue)
        : fieldValue
      : isDate
        ? formatDateWithDots(emptyPlaceholders[field])
        : emptyPlaceholders[field];

    return fieldValue ? (
      <span>{displayValue}</span>
    ) : (
      <span className="font-medium italic text-error">{displayValue}</span>
    );
  };

  const money = value("money");

  const moneyInWords = money ? numberToPolishWords(money) : "";

  return (
    <div className=" mt-8">
      <article
        id="print-area"
        ref={previewRef}
        className="mx-auto box-shadow  w-full max-w-[794px] bg-white px-5 py-8 text-[14px] leading-relaxed text-black  sm:px-12"
      >
        <p className="mb-8 text-right">
          <PreviewValue field="place" />, <PreviewValue field="date" />
        </p>

        <div className="mb-6">
          <p>
            <PreviewValue field="name" /> <PreviewValue field="surname" />
          </p>
          <p>
            ul. <PreviewValue field="userStreet" />{" "}
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
          {value("phone") && (
            <p>
              tel. <PreviewValue field="phone" />
            </p>
          )}

          {value("email") && (
            <p>
              e-mail <PreviewValue field="email" />
            </p>
          )}
        </div>

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

        <h2 className="mb-8 text-center text-base font-bold uppercase">
          OSTATECZNE PRZEDSĄDOWE WEZWANIE DO ZAPŁATY
        </h2>

        <div className="space-y-5 text-justify">
          <p className="indent-8">
            Niniejszym, w imieniu własnym, wzywam Państwa do zapłaty kwoty{" "}
            <PreviewValue field="money" /> zł (słownie:{" "}
            <span
              className={moneyInWords ? "" : "font-medium italic text-error"}
            >
              {moneyInWords || "Kwota słownie"}
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
            bankowy: <PreviewValue field="name" />{" "}
            <PreviewValue field="surname" />, nr{" "}
            <PreviewValue field="accountNumber" />.
          </p>
          {value("contactType") === "adress" ? (
            <p className="indent-8">
              Odpowiedź na niniejsze pismo proszę przesłać na mój adres:&nbsp;
              <PreviewValue field="name" /> <PreviewValue field="surname" />,
              ul. <PreviewValue field="userStreet" />{" "}
              <PreviewValue field="userHouseNomber" />
              {value("userFlatNomber") && (
                <>
                  {" "}
                  / <PreviewValue field="userFlatNomber" />
                </>
              )}{" "}
              <PreviewValue field="userPostCode" />{" "}
              <PreviewValue field="userCity" />
            </p>
          ) : (
            <p className="indent-8">
              Odpowiedź na niniejsze pismo proszę przesłać drogą elektroniczną
              na mój adres e-mail: <PreviewValue field="email" />.
            </p>
          )}

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

        <div className="mt-12 text-right">
          <p>Z poważaniem,</p>
          <p className="mt-6">……………………………</p>
        </div>
      </article>
      <p className="mt-8 mx-auto w-full max-w-[794px]">
        Miejsca zaznaczone kolorem należy uzupełnić. Treść odpowiada wzorowi
        związku. Plik Word możesz po zapisaniu dowolnie poprawić.
      </p>
    </div>
  );
};

export default PdfTemplate;
