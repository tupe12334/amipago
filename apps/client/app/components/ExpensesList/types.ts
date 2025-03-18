export type ExpenseDto = {
  id: string;
  description?: string;
  payer: string;
  date: Date;
  amount: number;
  currency: string;
};