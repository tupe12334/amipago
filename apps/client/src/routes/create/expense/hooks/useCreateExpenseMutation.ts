import { useState } from "react";
import { CreateExpenseInput } from "../CreateExpenseInput";

// This is a mock implementation since we don't have the actual GraphQL setup
// Replace this with your actual GraphQL mutation implementation
export const useCreateExpenseMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createExpense = async (input: CreateExpenseInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Mock a server request with a timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Log the expense data with group information if present
      if (input.groupId) {
        console.log(`Creating expense for group ${input.groupId}:`, input);
      } else {
        console.log("Creating expense without a group:", input);
      }

      // Here you would save the expense to your database
      // For now we'll just simulate a successful save

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
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
