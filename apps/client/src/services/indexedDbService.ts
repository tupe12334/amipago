import { StorageGroupSchema } from "../models/StorageGroup";
import { z } from "zod";
import { openDB, DBSchema } from "idb";

// Define the database schema
interface AmipagoDBSchema extends DBSchema {
  groups: {
    key: number;
    value: z.infer<typeof StorageGroupSchema>;
    indexes: {};
  };
}

// Database configuration
const DB_NAME = "amipagoDb";
const DB_VERSION = 1;
const GROUPS_STORE = "groups";

// Initialize the database with idb
const dbPromise = openDB<AmipagoDBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Create object store for groups if it doesn't exist
    if (!db.objectStoreNames.contains(GROUPS_STORE)) {
      db.createObjectStore(GROUPS_STORE, {
        keyPath: "id",
        autoIncrement: true,
      });
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
