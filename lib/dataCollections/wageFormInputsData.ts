import {
  InputData,
  InputType,
} from "@/components/inputs/input-fields/InputField";
import { az } from "zod/locales";
import { WageInputLabels } from "./wageTranslations";

export const getdataInputsHeader = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.place,
      name: "place",
      placeholder: "Warszawa",
      type: InputType.TEXT,
      required: true,
    },
    {
      label: translations.date,
      name: "date",
      type: InputType.DATE,
      required: true,
    },
  ];
};

export const getdataInputsUser = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.name,
      name: "name",
      placeholder: "Anna",
      type: InputType.TEXT,
      required: true,
    },
    {
      label: translations.surname,
      name: "surname",
      placeholder: "Kowalska",
      type: InputType.TEXT,
      required: true,
    },
    {
      label: translations.phone,
      name: "phone",
      placeholder: "111-111-111",
      type: InputType.TEXT,
    },
    {
      label: translations.email,
      name: "email",
      placeholder: "wwww@ww.pl",
      type: InputType.EMAIL,
      required: true,
    },
    {
      label: translations.userCity,
      name: "userCity",
      placeholder: "Warszawa",
      type: InputType.TEXT,
      required: true,
    },
  ];
};

export const getdataContractTypeOptions = (translations: WageInputLabels) => {
  return [
    { label: translations.email, value: "email" },
    { label: translations.onAdress, value: "adress" },
  ];
};

export const getdataInputsUserAdress = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.userStreet,
      name: "userStreet",
      placeholder: "Matejki",
      type: InputType.TEXT,
    },
    {
      label: translations.userHouseNomber,
      name: "userHouseNomber",
      placeholder: "10",
      type: InputType.TEXT,
    },
    {
      label: translations.userFlatNomber,
      name: "userFlatNomber",
      placeholder: "10",
      type: InputType.TEXT,
    },
    {
      label: translations.userPostCode,
      name: "userPostCode",
      placeholder: "11-111",
      type: InputType.TEXT,
    },
  ];
};

export const getdataInputsAccount = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.accountNumber,
      name: "accountNumber",
      placeholder: translations.accountNumberPlaceholder,
      type: InputType.TEXT,
      required: true,
    },
  ];
};

export const getdataInputsEmployer = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.companyName,
      name: "companyName",
      placeholder: translations.companyNamePlaceholder,
      type: InputType.TEXT,
      required: true,
    },
    {
      label: translations.companyCity,
      name: "companyCity",
      placeholder: "Kowalska",
      type: InputType.TEXT,
      required: true,
    },
    {
      label: translations.companyStreet,
      name: "companyStreet",
      placeholder: "Matejki",
      type: InputType.TEXT,
    },
    {
      label: translations.companyHouseNomber,
      name: "companyHouseNomber",
      placeholder: "10",
      type: InputType.TEXT,
    },
    {
      label: translations.companyFlatNomber,
      name: "companyFlatNomber",
      placeholder: "10",
      type: InputType.TEXT,
    },
    {
      label: translations.companyPostCode,
      name: "companyPostCode",
      placeholder: "11-111",
      type: InputType.TEXT,
    },
  ];
};

export const getdataInputsContract = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.contractStartDate,
      name: "contractStartDate",
      type: InputType.DATE,
      required: true,
    },
  ];
};

export const getdataContractOptions = (translations: WageInputLabels) => {
  return [
    { label: translations.contractOptions.mandate, value: "umowy zlecenia" },
    { label: translations.contractOptions.employment, value: "umowy o pracę" },
    {
      label: translations.contractOptions.specificWork,
      value: "umowy o dzieło",
    },
    {
      label: translations.contractOptions.undeclaredWork,
      value: "pracy na czarno",
    },
    {
      label: translations.contractOptions.other,
      value: "other",
      placeholder: translations.contractOptions.otherPlaceholder,
    },
  ];
};

export const getdataInputsWage = (
  translations: WageInputLabels,
): InputData[] => {
  return [
    {
      label: translations.workStart,
      name: "workStart",
      type: InputType.DATE,
      required: true,
    },
    {
      label: translations.workEnd,
      name: "workEnd",
      type: InputType.DATE,
      required: true,
    },
    {
      label: translations.hours,
      name: "hours",
      placeholder: "100",
      type: InputType.NUMBER,
      required: true,
    },
    {
      label: translations.money,
      name: "money",
      placeholder: "100",
      type: InputType.NUMBER,
      required: true,
    },
  ];
};
