import { useState } from "react";
import { CreateGroupInput } from "../CreateGroupInput";
import { StorageGroupSchema } from "../../../../models/StorageGroup";
import {
  saveGroup,
  getUserGlobalId,
  getUserData,
} from "../../../../services/indexedDbService";

export const useCreateGroupMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async (data: CreateGroupInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Get current user ID and data
      const [userId, userData] = await Promise.all([
        getUserGlobalId(),
        getUserData(),
      ]);

      // Validate that name is not empty
      if (!data.name || data.name.trim() === "") {
        throw new Error("שם הקבוצה הוא שדה חובה");
      }

      // Updated: add the current user as a member
      const groupData = {
        ...data,
        userId, // Add the user ID of the creator
        members:
          userId && userData
            ? [
                {
                  id: userId,
                  name: userData.name || "משתמש", // Fallback name if missing
                },
              ]
            : [], // Initialize members array with creator data
      };

      // Parse and validate the group data
      const group = StorageGroupSchema.parse(groupData);

      // Save group to IndexedDB
      const groupId = await saveGroup(group);
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
