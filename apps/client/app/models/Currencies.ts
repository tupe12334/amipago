import { getCurrencyFaName } from "currency-fa";
import { z } from "zod";

export const CurrenciesSchema = z
  .enum(["ILS", "USD"])
  .describe("Currencies by ISO 4217");
export type Currencies = z.infer<typeof CurrenciesSchema>;

export const getCurrencyIcon = (currency: Currencies): string => {
  return getCurrencyFaName(currency) || "money";
};
