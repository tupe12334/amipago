import { useState } from "react";
import { CreateGroupInput } from "../CreateGroupInput";
import { StorageGroupSchema } from "../../../../models/StorageGroup";
import { saveGroup } from "../../../../services/indexedDbService";

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

      // Parse and validate the group data
      const group = StorageGroupSchema.parse(data);

      // Save group to IndexedDB
      const groupId = await saveGroup(group);
      console.log("Group saved with ID:", groupId);

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
