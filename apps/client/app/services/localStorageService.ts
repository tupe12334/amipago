import { z } from "zod";
import { StorageUserSchema, CreateUserInput } from "../models/StorageUser";

const USER_ID_KEY = "user";

export const getUserData = async (): Promise<z.infer<
  typeof StorageUserSchema
> | null> => {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (!stored) {
      return null;
    }
    const userData = JSON.parse(stored);
    const updatedUserData = { ...userData, lastActive: new Date() };
    localStorage.setItem(USER_ID_KEY, JSON.stringify(updatedUserData));
    return updatedUserData;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
};

export const saveUserData = async (
  userData: CreateUserInput
): Promise<void> => {
  try {
    const validUserData = StorageUserSchema.parse(userData);
    localStorage.setItem(USER_ID_KEY, JSON.stringify(validUserData));
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const updateUserSettings = async (
  settings: Partial<z.infer<typeof StorageUserSchema>["settings"]>
): Promise<void> => {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) {
      const userData = JSON.parse(stored);
      const updatedUserData = {
        ...userData,
        settings: { ...(userData.settings || {}), ...settings },
        lastActive: new Date(),
      };
      localStorage.setItem(USER_ID_KEY, JSON.stringify(updatedUserData));
    }
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
};

export const getUserGlobalId = async (): Promise<string | null> => {
  try {
    const userData = await getUserData();
    if (userData && userData.id && userData.id !== USER_ID_KEY) {
      return userData.id;
    }
    if (userData && userData.id) {
      return userData.id;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user global ID:", error);
    throw error;
  }
};
