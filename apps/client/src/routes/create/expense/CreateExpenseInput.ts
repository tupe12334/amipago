import { z } from "zod";
import { CurrenciesSchema } from "../../../models/Currencies";

export const CreateExpenseInputSchema = z.object({
  amount: z.coerce
    .number()
    .positive("הסכום חייב להיות חיובי")
    .min(0.01, "הסכום חייב להיות לפחות 0.01"),
  description: z.string().optional(),
  date: z.coerce
    .date({
      errorMap: () => ({ message: "תאריך לא תקין" }),
    })
    .default(() => new Date()),
  currency: CurrenciesSchema,
});

export type CreateExpenseInput = z.infer<typeof CreateExpenseInputSchema>;
