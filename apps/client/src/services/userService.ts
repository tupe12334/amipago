import { v4 as uuidv4 } from "uuid";
import { getUserGlobalId, getUserData, saveUserData, updateUserSettings } from "./indexedDbService";
import { CreateUserSchema } from "../models/StorageUser";

/**
 * Ensures the user has a unique ID, generating and saving one if it doesn't exist
 * This ID will never change once generated
 */
export const ensureUserId = async (): Promise<string> => {
  try {
    // Try to get existing user global ID first
    const globalId = await getUserGlobalId();
    
    // If user already has a global ID, return it
    if (globalId) {
      console.log("Retrieved existing user ID:", globalId);
      return globalId;
    }
    
    // Generate a new globally unique user ID
    const newUserId = generateGloballyUniqueId();
    
    // Create user data with zod validation
    const userData = CreateUserSchema.parse({
      id: newUserId,
      createdAt: new Date()
    });
    
    // Save the new user data
    await saveUserData(userData);
    
    console.log("New globally unique user ID generated:", newUserId);
    return newUserId;
  } catch (error) {
    console.error("Error ensuring user ID:", error);
    // Fallback to generating an ID without saving it
    return generateGloballyUniqueId();
  }
};

/**
 * Generate a globally unique ID using UUID v4
 * UUIDs are designed to be globally unique across space and time
 */
const generateGloballyUniqueId = (): string => {
  // UUID v4 generates a random UUID with extremely low collision probability
  return uuidv4();
};

/**
 * Update user theme preference
 */
export const updateUserTheme = async (theme: "light" | "dark" | "system"): Promise<void> => {
  await updateUserSettings({ theme });
};

/**
 * Update user language preference
 */
export const updateUserLanguage = async (language: "he" | "en"): Promise<void> => {
  await updateUserSettings({ language });
};
