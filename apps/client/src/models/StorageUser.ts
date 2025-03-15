import { z } from "zod";

/**
 * Schema for user data stored in IndexedDB
 */
export const StorageUserSchema = z.object({
  id: z.string().uuid({ message: "מזהה המשתמש חייב להיות מסוג UUID חוקי" }),
  userId: z
    .string()
    .uuid({ message: "מזהה המשתמש הגלובלי חייב להיות מסוג UUID חוקי" })
    .optional(),
  createdAt: z.date(),
  lastActive: z.date().optional(),
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
  createdAt: z.date(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
