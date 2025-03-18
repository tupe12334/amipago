import { z } from "zod";
import { v4 } from "uuid";
import { CurrenciesSchema } from "./Currencies";

export const StorageExpenseSchema = z.object({
  id: z.string().default(v4()),
  amount: z.number().positive(),
  description: z.string().optional(),
  date: z.date(),
  currency: CurrenciesSchema,
  groupId: z.string().optional(),
  payer: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export type StorageExpense = z.infer<typeof StorageExpenseSchema>;
