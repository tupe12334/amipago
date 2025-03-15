import { useState } from "react";
import { CreateGroupInput } from "../CreateGroupInput";
import { StorageGroupSchema } from "../../../../models/StorageGroup";
import {
  saveGroup,
  getUserGlobalId,
} from "../../../../services/indexedDbService";

export const useCreateGroupMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async (data: CreateGroupInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Get current user ID
      const userId = await getUserGlobalId();

      // Validate that name is not empty
      if (!data.name || data.name.trim() === "") {
        throw new Error("שם הקבוצה הוא שדה חובה");
      }

      // Add additional data to the group object
      const groupData = {
        ...data,
        userId, // Add the user ID of the creator
        members: userId ? [userId] : [], // Initialize members array with creator
      };

      // Parse and validate the group data
      const group = StorageGroupSchema.parse(groupData);

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
