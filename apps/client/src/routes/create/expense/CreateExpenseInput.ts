import { z } from "zod";
import { CurrenciesSchema } from "../../../models/Currencies";
import i18next from "i18next";

export const CreateExpenseInputSchema = z.object({
  amount: z.coerce
    .number()
    .positive(i18next.t("expense.validation.positiveAmount"))
    .min(0.01, i18next.t("expense.validation.minAmount")),
  description: z.string().optional(),
  date: z.coerce
    .date({
      errorMap: () => ({
        message: i18next.t("expense.validation.invalidDate"),
      }),
    })
    .default(() => new Date()),
  currency: CurrenciesSchema,
  groupId: z.string().optional(),
});

export type CreateExpenseInput = z.infer<typeof CreateExpenseInputSchema>;
