import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

export const emptyPlaceholders: Record<
  Exclude<keyof WageFormSchema, "contactType">,
  string
> = {
  place: "Miejscowość",
  date: "Data pisma",
  name: "Imię",
  surname: "Nazwisko",
  phone: "Telefon",
  email: "Email",
  userCity: "Miejscowość zamieszkania",
  userStreet: "Ulica",
  userHouseNomber: "Nr budynku",
  userFlatNomber: "Nr lokalu",
  userPostCode: "Kod pocztowy",
  accountNumber: "Numer rachunku bankowego",
  companyName: "Nazwa przedsiębiorstwa",
  companyCity: "Miejscowość siedziby przedsiębiorstwa",
  companyStreet: "Ulica",
  companyHouseNomber: "Nr budynku",
  companyFlatNomber: "Nr lokalu",
  companyPostCode: "Kod pocztowy",
  contractType: "Rodzaj umowy",
  contractStartDate: "Data zawarcia umowy",
  workStart: "Okres pracy od",
  workEnd: "do",
  hours: "Neopłacone godziny",
  money: "Zaległa kwota",
};
