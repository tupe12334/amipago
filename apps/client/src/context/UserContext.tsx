import React, {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { StorageUser } from "../models/StorageUser";
import { getUserData } from "../services/indexedDbService";
import {
  ensureUserId,
  updateUserName as updateName,
  updateUserLanguage,
  updateUserTheme,
} from "../services/userService";

// Define the context type
interface UserContextType {
  userId: string | null;
  userData: StorageUser | null;
  isLoading: boolean;
  error: Error | null;
  updateTheme: (theme: "light" | "dark" | "system") => Promise<void>;
  updateLanguage: (language: "he" | "en") => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
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
  updateUserName: async () => {},
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
        if (data.id) {
          setUserId(data.id);
        }
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

  useLayoutEffect(() => {
    const initializeUser = async () => {
      try {
        // Ensure the user has a globally unique ID, creating one if needed
        const id = await ensureUserId();
        setUserId(id);

        // Get full user data
        await refreshUserData();
      } catch (err) {
        console.error("Failed to initialize user ID:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to initialize user ID")
        );
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

  const updateUserName = async (name: string) => {
    await updateName(name);
    await refreshUserData();
  };

  const value = {
    userId,
    userData,
    isLoading,
    error,
    updateTheme,
    updateLanguage,
    updateUserName,
    refreshUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
