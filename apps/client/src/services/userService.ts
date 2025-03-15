import {
  saveUserData,
  getUserGlobalId,
  updateUserSettings,
} from "./indexedDbService";
import { CreateUserInput } from "../models/StorageUser";

// Ensure the user object exists in localStorage, create one if missing
export const ensureUserId = async (): Promise<string> => {
  let globalId = await getUserGlobalId();
  if (!globalId) {
    // Generate a new UUID using the built-in crypto API
    const newId = crypto.randomUUID();
    const newUser: CreateUserInput = {
      id: newId,
      createdAt: new Date(),
    };
    await saveUserData(newUser);
    globalId = newId;
  }
  return globalId;
};

// Update user's theme in localStorage
export const updateUserTheme = async (
  theme: "light" | "dark" | "system"
): Promise<void> => {
  await updateUserSettings({ theme });
};

// Update user's language in localStorage
export const updateUserLanguage = async (
  language: "he" | "en"
): Promise<void> => {
  await updateUserSettings({ language });
};
