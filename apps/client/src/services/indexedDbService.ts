import { StorageGroupSchema } from "../models/StorageGroup";
import { StorageExpenseSchema } from "../models/StorageExpense";
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
const DB_VERSION = 2;
const GROUPS_STORE = "groups";
const EXPENSES_STORE = "expenses";

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
