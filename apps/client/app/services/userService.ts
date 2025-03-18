import { v4 as uuidv4 } from "uuid";
import { getUserData, saveUserData } from "./localStorageService";

// Ensure the user object exists in localStorage, create one if missing
export const ensureUserId = async (): Promise<string> => {
  const user = await getUserData();
  if (user?.id) {
    return user.id;
  }

  const newUserId = uuidv4();
  await saveUserData({ id: newUserId });
  return newUserId;
};

// Update user's theme in localStorage
export const updateUserTheme = async (
  theme: "light" | "dark" | "system"
): Promise<void> => {
  const user = await getUserData();
  await saveUserData({ ...user, theme });
};

// Update user's language in localStorage
export const updateUserLanguage = async (
  language: "he" | "en"
): Promise<void> => {
  const user = await getUserData();
  await saveUserData({ ...user, language });
};

// Update user's name in localStorage
export const updateUserName = async (name: string): Promise<void> => {
  const user = await getUserData();
  await saveUserData({ ...user, name });
};
