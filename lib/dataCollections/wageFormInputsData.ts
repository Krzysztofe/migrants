import {
  InputData,
  InputType,
} from "@/components/inputs/input-fields/InputField";

export const dataInputsHeader = [
  {
    label: "Miejscowość",
    name: "place",
    placeholder: "Warszawa",
    type: InputType.TEXT,
    required: true,
  },
  {
    label: "Data pisma",
    name: "date",
    type: InputType.DATE,
    required: true,
  },
];

export const dataInputsUser = [
  {
    label: "Imię",
    name: "name",
    placeholder: "Anna",
    type: InputType.TEXT,
    required: true,
  },
  {
    label: "Nazwisko",
    name: "surname",
    placeholder: "Kowalska",
    type: InputType.TEXT,
    required: true,
  },
  {
    label: "Telefon",
    name: "phone",
    placeholder: "111-111-111",
    type: InputType.TEXT,
  },
  {
    label: "E-mail",
    name: "email",
    placeholder: "wwww@ww.pl",
    type: InputType.EMAIL,
    required: true,
  },
];

export const contactTypeOptions = [
  { label: "E-mail", value: "email" },
  { label: "Na adres fizyczny", value: "adress" },
];

export const dataInputsUserAdress = [
  {
    label: "Miejscowość",
    name: "userCity",
    placeholder: "Warszawa",
    type: InputType.TEXT,
    required: true,
  },
  {
    label: "Ulica",
    name: "userStreet",
    placeholder: "Matejki",
    type: InputType.TEXT,
  },
  {
    label: "Nr budynku",
    name: "userHouseNomber",
    placeholder: "10",
    type: InputType.TEXT,
  },
  {
    label: "Nr mieszkania",
    name: "userFlatNomber",
    placeholder: "10",
    type: InputType.TEXT,
  },
  {
    label: "Kod pocztowy",
    name: "userPostCode",
    placeholder: "11-111",
    type: InputType.TEXT,
  },
];
export const dataAccount = [
  {
    label: "Numer konta bankowego ",
    name: "accountNumber",
    placeholder: "26 cyfr",
    type: InputType.TEXT,
    required: true,
  },
];

export const dataInputsEmployer = [
  {
    label: "Nazwa przedsiębiorstwa",
    name: "companyName",
    placeholder: "Firma",
    type: InputType.TEXT,
    required: true,
  },
  {
    label: "Miejscowość siedziby firmy",
    name: "companyCity",
    placeholder: "Kowalska",
    type: InputType.TEXT,
    required: true,
  },
  {
    label: "Ulica",
    name: "companyStreet",
    placeholder: "Matejki",
    type: InputType.TEXT,
  },
  {
    label: "Nr budynku",
    name: "companyHouseNomber",
    placeholder: "10",
    type: InputType.TEXT,
  },
  {
    label: "Nr lokalu",
    name: "companyFlatNomber",
    placeholder: "10",
    type: InputType.TEXT,
  },
  {
    label: "Kod pocztowy",
    name: "companyPostCode",
    placeholder: "11-111",
    type: InputType.TEXT,
  },
];

export const dataInputsContract = [
  {
    label: "Data zawarcia umowy",
    name: "contractStartDate",
    type: InputType.DATE,
    required: true,
  },
];

export const contractOptions = [
  { label: "Umowa zlecenia", value: "umowy zlecenia" },
  { label: "Umowa o pracę", value: "umowy o pracę" },
  { label: "Umowa o dzieło", value: "umowy o dzieło" },
  {
    label: "Bez pisemnej umowy (praca na czarno)",
    value: "pracy na czarno",
  },
  { label: "Inna (wpisz jaka)", value: "other" },
];

export const dataInputsWage: InputData[] = [
  {
    label: "Okres pracy od",
    name: "workStart",
    type: InputType.DATE,
    required: true,
  },
  {
    label: "do",
    name: "workEnd",
    type: InputType.DATE,
    required: true,
  },
  {
    label: "Nieopłacone godziny ",
    name: "hours",
    placeholder: "100",
    type: InputType.NUMBER,
    required: true,
  },
  {
    label: "Zaległa kwota (zł)",
    name: "money",
    placeholder: "100",
    type: InputType.NUMBER,
    required: true,
  },
];
