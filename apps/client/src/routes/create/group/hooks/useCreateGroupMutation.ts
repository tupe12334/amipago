import { useState } from "react";
import { CreateGroupInput } from "../CreateGroupInput";

export const useCreateGroupMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async (data: CreateGroupInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call to create group
      console.log("Creating group with data:", data);

      // Validate that name is not empty
      if (!data.name || data.name.trim() === "") {
        throw new Error("שם הקבוצה הוא שדה חובה");
      }

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return success
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "אירעה שגיאה בעת יצירת הקבוצה"
      );
      return false;
    }
  };

  return { createGroup, loading, error };
};
