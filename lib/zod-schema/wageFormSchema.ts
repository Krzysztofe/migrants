import { z } from "zod";
const optionalText = z.string().trim().optional();

const textValidation = z
  .string()
  .trim()
  .min(2, { message: "Min. 2 litery" })
  .max(200, { message: "Maks. 200 liter" });

const numberValidation = z
  .string()
  .trim()
  .min(1, { message: "To pole jest wymagane" })
  .refine((value) => /^\d+$/.test(value), {
    message: "Dozwolone są wyłącznie liczby caukowite",
  })
  .refine((value) => /^[1-9]\d*$/.test(value), {
    message: "Liczba nie może zaczynać się od zera",
  })
  .refine((value) => Number(value) > 0, {
    message: "Wartość musi być większa od 0",
  })
  .refine((value) => value.length <= 6, {
    message: "Maksymalnie 6 cyfr",
  });

const emailValidation = z
  .string()
  .trim()
  .pipe(
    z.union([
      z.literal(""),
      z.email({
        error: "Podaj prawidłowy adres e-mail",
      }),
    ]),
  );

const bankAccountValidation = z
  .string()
  .trim()
  .min(1, { message: "Numer konta bankowego jest wymagany" })
  .regex(/^\d{26}$/, {
    message: "Numer konta musi zawierać dokładnie 26 cyfr",
  });

const dateValidation = z.iso.date({
  error: "Podaj datę",
});

const optionalDate = z.union([z.literal(""), dateValidation]).optional();

export const wageFormSchema = z
  .object({
    // header
    place: textValidation,
    date: dateValidation,

    // user
    name: textValidation,
    surname: textValidation,
    phone: optionalText,
    email: emailValidation,
    userCity: textValidation,
    userStreet: optionalText,
    userHouseNomber: optionalText,
    userFlatNomber: optionalText,
    userPostCode: optionalText,
    contactType: textValidation,
    accountNumber: bankAccountValidation,

    // company
    companyName: textValidation,
    companyCity: textValidation,
    companyStreet: optionalText,
    companyHouseNomber: optionalText,
    companyFlatNomber: optionalText,
    companyPostCode: optionalText,

    // contract
    contractType: textValidation,
    contractStartDate: dateValidation,

    // work numbers
    workStart: dateValidation,
    workEnd: dateValidation,
    hours: numberValidation,
    money: numberValidation,
  })
  .superRefine((data, ctx) => {
    if (data.workStart && data.workEnd && data.workEnd < data.workStart) {
      ctx.addIssue({
        code: "custom",
        path: ["workEnd"],
        message:
          "Data zakończenia nie może być wcześniejsza niż data rozpoczęcia",
      });
    }
  });

export type WageFormSchema = z.infer<typeof wageFormSchema>;
