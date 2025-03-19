import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { saveUserData } from "./localStorageService";
import { StorageUserSchema } from "../models/StorageUser";

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

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
