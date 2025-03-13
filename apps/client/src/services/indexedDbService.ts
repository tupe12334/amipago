import { StorageGroupSchema } from "../models/StorageGroup";
import { z } from "zod";

// Database configuration
const DB_NAME = "amipagoDb";
const DB_VERSION = 1;
const GROUPS_STORE = "groups";

// Initialize the database
export const initDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject("Database error: " + (event.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object store for groups if it doesn't exist
      if (!db.objectStoreNames.contains(GROUPS_STORE)) {
        db.createObjectStore(GROUPS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};

// Store a group in IndexedDB
export const saveGroup = async (
  groupData: z.infer<typeof StorageGroupSchema>
): Promise<number> => {
  const db = await initDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([GROUPS_STORE], "readwrite");
    const store = transaction.objectStore(GROUPS_STORE);

    // Add data to the store
    const request = store.add(groupData);

    request.onsuccess = (event) => {
      // Return the generated ID
      resolve(request.result as number);
    };

    request.onerror = () => {
      reject("Error saving group: " + request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Get all groups from IndexedDB
export const getAllGroups = async (): Promise<
  z.infer<typeof StorageGroupSchema>[]
> => {
  const db = await initDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([GROUPS_STORE], "readonly");
    const store = transaction.objectStore(GROUPS_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject("Error retrieving groups: " + request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Retrieves a group by its ID from IndexedDB
 */
export const getGroupById = async (
  id: string
): Promise<z.infer<typeof StorageGroupSchema> | null> => {
  try {
    const db = await initDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([GROUPS_STORE], "readonly");
      const store = transaction.objectStore(GROUPS_STORE);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject("Error retrieving group: " + request.error);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Error fetching group from IndexedDB:", error);
    throw error;
  }
};
