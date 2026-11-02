import { WageFormSchema } from "@/lib/zod-schema/wageFormSchema";

export const emptyPlaceholders: Record<
  Exclude<keyof WageFormSchema, "contactType">,
  string
> = {
  place: "Miejscowość",
  date: "Data",
  name: "Imię",
  surname: "Nazwisko",
  phone: "Telefon",
  email: "Email",
  userCity: "Miejscowość",
  userStreet: "Ulica",
  userHouseNomber: "Nr budynku",
  userFlatNomber: "Nr lokalu",
  userPostCode: "Kod pocztowy",
  accountNumber: "Numer rachunku bankowego",
  companyName: "Nazwa przedsiębiorstwa",
  companyCity: "Miejscowość",
  companyStreet: "Ulica",
  companyHouseNomber: "Nr budynku",
  companyFlatNomber: "Nr lokalu",
  companyPostCode: "Kod pocztowy",
  contractType: "Rodzaj umowy",
  contractStartDate: "Data zawarcia umowy",
  workStart: "Data rozpoczęcia",
  workEnd: "Data zakończenia",
  hours: "Liczba godzin",
  money: "Kwota",
};
