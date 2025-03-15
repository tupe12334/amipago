import { StorageGroupSchema } from "../models/StorageGroup";
import { StorageExpenseSchema } from "../models/StorageExpense";
import { StorageUserSchema, CreateUserInput } from "../models/StorageUser";
import { z } from "zod";
import { openDB, DBSchema } from "idb";

// Define the database schema
interface AmipagoDBSchema extends DBSchema {
  groups: {
    key: number;
    value: z.infer<typeof StorageGroupSchema>;
    indexes: {};
  };
  expenses: {
    key: number;
    value: z.infer<typeof StorageExpenseSchema>;
    indexes: { "by-group": string };
  };
}

// Database configuration
const DB_NAME = "amipagoDb";
const DB_VERSION = 3; // Increased version to handle schema migration
const GROUPS_STORE = "groups";
const EXPENSES_STORE = "expenses";
const USER_STORE = "user";
const USER_ID_KEY = "current-user"; // This is the key used to identify the current user entry

// Initialize the database with idb
const dbPromise = openDB<AmipagoDBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    // Create object store for groups if it doesn't exist
    if (!db.objectStoreNames.contains(GROUPS_STORE)) {
      db.createObjectStore(GROUPS_STORE, {
        keyPath: "id",
        autoIncrement: true,
      });
    }

    // Create object store for expenses with index by group
    if (!db.objectStoreNames.contains(EXPENSES_STORE)) {
      const expensesStore = db.createObjectStore(EXPENSES_STORE, {
        keyPath: "id",
        autoIncrement: true,
      });
      expensesStore.createIndex("by-group", "groupId");
    }
  },
});

// Store a group in IndexedDB
export const saveGroup = async (
  groupData: z.infer<typeof StorageGroupSchema>
): Promise<number> => {
  try {
    const db = await dbPromise;
    return await db.add(GROUPS_STORE, groupData);
  } catch (error) {
    console.error("Error saving group:", error);
    throw error;
  }
};

// Get all groups from IndexedDB
export const getAllGroups = async (): Promise<
  z.infer<typeof StorageGroupSchema>[]
> => {
  try {
    const db = await dbPromise;
    return await db.getAll(GROUPS_STORE);
  } catch (error) {
    console.error("Error retrieving groups:", error);
    throw error;
  }
};

/**
 * Retrieves a group by its ID from IndexedDB
 */
export const getGroupById = async (
  id: string
): Promise<z.infer<typeof StorageGroupSchema> | null> => {
  try {
    const db = await dbPromise;
    return await db.get(GROUPS_STORE, id);
  } catch (error) {
    console.error("Error fetching group from IndexedDB:", error);
    throw error;
  }
};

/**
 * Update group's last activity timestamp
 */
export const updateGroupLastActivity = async (id: string): Promise<void> => {
  try {
    const db = await dbPromise;
    const group = await db.get(GROUPS_STORE, id);
    if (group) {
      group.lastActivity = new Date();
      await db.put(GROUPS_STORE, group);
    }
  } catch (error) {
    console.error("Error updating group activity:", error);
    throw error;
  }
};

/**
 * Save an expense to IndexedDB
 */
export const saveExpense = async (
  expenseData: z.infer<typeof StorageExpenseSchema>
): Promise<number> => {
  try {
    const db = await dbPromise;

    // Update the group's last activity if the expense is associated with a group
    if (expenseData.groupId) {
      await updateGroupLastActivity(expenseData.groupId);
    }

    return await db.add(EXPENSES_STORE, expenseData);
  } catch (error) {
    console.error("Error saving expense:", error);
    throw error;
  }
};

/**
 * Get all expenses for a specific group
 */
export const getExpensesByGroupId = async (
  groupId: string
): Promise<z.infer<typeof StorageExpenseSchema>[]> => {
  try {
    const db = await dbPromise;
    const index = db.transaction(EXPENSES_STORE).store.index("by-group");
    return await index.getAll(groupId);
  } catch (error) {
    console.error("Error fetching expenses by group:", error);
    throw error;
  }
};

/**
 * Get all expenses
 */
export const getAllExpenses = async (): Promise<
  z.infer<typeof StorageExpenseSchema>[]
> => {
  try {
    const db = await dbPromise;
    return await db.getAll(EXPENSES_STORE);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    throw error;
  }
};

/**
 * Get user data from localStorage
 * Returns the current user data
 */
export const getUserData = async (): Promise<z.infer<
  typeof StorageUserSchema
> | null> => {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (!stored) {
      return null;
    }
    // Parse stored JSON and update lastActive timestamp
    const userData = JSON.parse(stored);
    const updatedUserData = { ...userData, lastActive: new Date() };
    localStorage.setItem(USER_ID_KEY, JSON.stringify(updatedUserData));
    return updatedUserData;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
};

/**
 * Save user data to localStorage
 * The userData.id is the actual unique user ID
 * We use a fixed storage key (USER_ID_KEY) to ensure we're always
 * accessing and updating the same record
 */
export const saveUserData = async (
  userData: CreateUserInput
): Promise<void> => {
  try {
    // Validate with zod schema before saving
    const validUserData = StorageUserSchema.parse({
      id: USER_ID_KEY, // Use fixed key for storage
      userId: userData.id, // Store the actual globally unique ID as userId
      createdAt: userData.createdAt,
      lastActive: new Date(),
    });
    localStorage.setItem(USER_ID_KEY, JSON.stringify(validUserData));
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

/**
 * Get only the user's globally unique ID
 */
export const getUserGlobalId = async (): Promise<string | null> => {
  try {
    const userData = await getUserData();
    // If using the old format where id was stored directly
    if (userData && userData.id && userData.id !== USER_ID_KEY) {
      return userData.id;
    }
    // For the new format where userId contains the actual global ID
    if (userData && userData.userId) {
      return userData.userId;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user global ID:", error);
    throw error;
  }
};

/**
 * Update user settings in localStorage
 */
export const updateUserSettings = async (
  settings: Partial<z.infer<typeof StorageUserSchema>["settings"]>
): Promise<void> => {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) {
      const userData = JSON.parse(stored);
      const updatedUserData = {
        ...userData,
        settings: {
          ...(userData.settings || {}),
          ...settings,
        },
        lastActive: new Date(),
      };
      localStorage.setItem(USER_ID_KEY, JSON.stringify(updatedUserData));
    }
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
};
