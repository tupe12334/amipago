import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { StorageUserSchema } from "../models/StorageUser";
import { saveUserData } from "./localStorageService";

export const createUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  const userData = StorageUserSchema.parse({
    id: userCredential.user.uid,
    name,
    createdAt: new Date(),
    settings: {
      language: "he",
      theme: "system",
      notifications: true,
    },
  });

  await saveUserData(userData);
  return userCredential.user;
};

export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
