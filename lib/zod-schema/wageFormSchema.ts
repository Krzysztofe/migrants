import { z } from "zod";

const textValidation = z
  .string()
  .trim()
  .min(2, { message: "Min. 2 litery" })
  .max(200, { message: "Maks. 200 liter" });

export const wageFormSchema = z.object({
  name: textValidation,
  surname: textValidation,
  phone: textValidation,
  email: textValidation,
  userCity: textValidation,
  userStreet: textValidation,
  userHouseNomber: textValidation,
  userFlatNomber: textValidation,
  userPostCode: textValidation,

  accountNumber: z.string().trim().max(3000, { message: "Maks. 3000 liter" }),

  companyName: textValidation,
  companyCity: textValidation,
});

export type WageFormSchema = z.infer<typeof wageFormSchema>;
