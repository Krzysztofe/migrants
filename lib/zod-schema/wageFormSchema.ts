import { z } from "zod";

export const wageFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(200, { message: "Maks. 200 liter" }),
  surname: z.string().trim().max(3000, { message: "Maks. 3000 liter" }),
  phone: z.string().trim().nonempty({ message: "Podaj kateogorię formularza" }),
  email: z.string().trim().max(3000, { message: "Maks. 3000 liter" }),
  accountNumber: z.string().trim().max(3000, { message: "Maks. 3000 liter" }),

  companyName: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(200, { message: "Maks. 200 liter" }),
  companyCity: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(200, { message: "Maks. 200 liter" }),
});

export type WageFormSchema = z.infer<typeof wageFormSchema>;
