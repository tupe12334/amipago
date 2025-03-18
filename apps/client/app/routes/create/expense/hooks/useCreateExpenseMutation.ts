import { useState } from "react";
import { CreateExpenseInput } from "../CreateExpenseInput";
import { saveExpense } from "../../../../services/indexedDbService";
import { StorageExpenseSchema } from "../../../../models/StorageExpense";

export const useCreateExpenseMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createExpense = async (input: CreateExpenseInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Convert the form input to a valid expense object
      const expenseData = {
        ...input,
        // Make sure amount is a number (in case it's a string from form input)
        amount:
          typeof input.amount === "string"
            ? parseFloat(input.amount)
            : input.amount,
        // Add timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Validate with zod schema
      const validExpense = StorageExpenseSchema.parse(expenseData);

      // Save to IndexedDB
      const expenseId = await saveExpense(validExpense);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unknown error occurred while saving expense";
      console.error("Failed to create expense:", err);
      setError(err instanceof Error ? err : new Error(errorMessage));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createExpense,
    loading,
    error,
  };
};
