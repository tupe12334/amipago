import { v4 } from "uuid";
import { z } from "zod";

/**
 * Schema for user data stored in IndexedDB
 */
export const StorageUserSchema = z.object({
  id: z
    .string()
    .uuid({ message: "מזהה המשתמש חייב להיות מסוג UUID חוקי" })
    .default(() => v4()),
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  createdAt: z.union([z.string(), z.date()]).default(() => new Date()),
  lastActive: z
    .union([z.string(), z.date()])
    .default(() => new Date())
    .optional(),
  settings: z
    .object({
      theme: z.enum(["light", "dark", "system"]).default("system"),
      language: z.enum(["he", "en"]).default("he"),
      notifications: z.boolean().default(true),
    })
    .optional(),
});

export type StorageUser = z.infer<typeof StorageUserSchema>;

/**
 * Schema for creating a new user
 */
export const CreateUserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.union([z.string(), z.date()]),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
