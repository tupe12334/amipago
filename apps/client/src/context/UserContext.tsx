import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ensureUserId, updateUserTheme, updateUserLanguage } from "../services/userService";
import { getUserData } from "../services/indexedDbService";
import { StorageUser } from "../models/StorageUser";

// Define the context type
interface UserContextType {
  userId: string | null;
  userData: StorageUser | null;
  isLoading: boolean;
  error: Error | null;
  updateTheme: (theme: "light" | "dark" | "system") => Promise<void>;
  updateLanguage: (language: "he" | "en") => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  userId: null,
  userData: null,
  isLoading: true,
  error: null,
  updateTheme: async () => {},
  updateLanguage: async () => {},
  refreshUserData: async () => {},
});

// Custom hook for using the user context
export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<StorageUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshUserData = async () => {
    try {
      const data = await getUserData();
      if (data) {
        setUserData(data);
        if (data.userId) {
          setUserId(data.userId);
        }
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Ensure the user has a globally unique ID, creating one if needed
        const id = await ensureUserId();
        setUserId(id);
        
        // Get full user data
        await refreshUserData();

        // Store the ID in localStorage as a backup
        try {
          localStorage.setItem("amipago-user-id", id);
        } catch (storageErr) {
          console.warn("Could not store user ID in localStorage:", storageErr);
        }
      } catch (err) {
        console.error("Failed to initialize user ID:", err);
        
        // Try to recover ID from localStorage if available
        try {
          const localId = localStorage.getItem("amipago-user-id");
          if (localId) {
            console.log("Recovered user ID from localStorage:", localId);
            setUserId(localId);
          } else {
            setError(err instanceof Error ? err : new Error("Failed to initialize user ID"));
          }
        } catch (localErr) {
          setError(err instanceof Error ? err : new Error("Failed to initialize user ID"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const updateTheme = async (theme: "light" | "dark" | "system") => {
    await updateUserTheme(theme);
    await refreshUserData();
  };

  const updateLanguage = async (language: "he" | "en") => {
    await updateUserLanguage(language);
    await refreshUserData();
  };

  const value = {
    userId,
    userData,
    isLoading,
    error,
    updateTheme,
    updateLanguage,
    refreshUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
