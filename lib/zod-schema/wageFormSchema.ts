import { z } from "zod";

type WageErrors = {
  required: string;
  minLength: string;
  maxLength: string;
  onlyIntegers: string;
  noLeadingZero: string;
  greaterThanZero: string;
  maxDigits: string;
  invalidEmail: string;
  bankAccountRequired: string;
  bankAccountLength: string;
  invalidDate: string;
  endDateBeforeStart: string;
  postCode: string;
};

export const getWageFormSchema = (errors: WageErrors) => {
  const optionalText = z.string().trim().optional();

  const textValidation = z
    .string()
    .trim()
    .min(2, { message: errors.minLength })
    .max(200, { message: errors.maxLength });

  const numberValidation = z
    .string()
    .trim()
    .min(1, { message: errors.required })
    .refine((value) => /^\d+$/.test(value), {
      message: errors.onlyIntegers,
    })
    .refine((value) => /^[1-9]\d*$/.test(value), {
      message: errors.noLeadingZero,
    })
    .refine((value) => Number(value) > 0, {
      message: errors.greaterThanZero,
    })
    .refine((value) => value.length <= 6, {
      message: errors.maxDigits,
    });

  const emailValidation = z
    .string()
    .trim()
    .pipe(
      z.union([
        z.literal(""),
        z.email({
          error: errors.invalidEmail,
        }),
      ]),
    );

  const bankAccountValidation = z
    .string()
    .trim()
    .min(1, { message: errors.bankAccountRequired })
    .regex(/^\d{26}$/, {
      message: errors.bankAccountLength,
    });

  const dateValidation = z.iso.date({
    error: errors.invalidDate,
  });

  const postCodeVaidation = z
    .string()
    .regex(/^\d{2}-\d{3}$/, { message: errors.postCode });

  return z
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
      // userPostCode: optionalText,
      userPostCode: postCodeVaidation,

      contactType: textValidation,
      accountNumber: bankAccountValidation,

      // company
      companyName: textValidation,
      companyCity: textValidation,
      companyStreet: optionalText,
      companyHouseNomber: optionalText,
      companyFlatNomber: optionalText,
      companyPostCode: postCodeVaidation,

      // contract
      contractType: textValidation,
      contractStartDate: dateValidation,

      // work
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
          message: errors.endDateBeforeStart,
        });
      }
    });
};

export type WageFormSchema = z.infer<ReturnType<typeof getWageFormSchema>>;
