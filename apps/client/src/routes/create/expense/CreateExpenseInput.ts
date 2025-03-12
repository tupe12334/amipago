import { z } from "zod";
import { CurrenciesSchema } from "../../../models/Currencies";

export const CreateExpenseInputSchema = z.object({
  amount: z.number().positive("סכום חייב להיות חיובי"),
  description: z.string().optional(),
  date: z.date().default(() => new Date()),
  currency: CurrenciesSchema,
});
