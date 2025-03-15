import { z } from "zod";
import { GroupTypeEnum } from "./GroupType";
import { v4 } from "uuid";

export const StorageGroupSchema = z.object({
  id: z.string().default(v4()),
  password: z.string().default(v4()),
  name: z.string(),
  description: z.string(),
  type: GroupTypeEnum,
  createdAt: z.date().default(() => new Date()),
  lastActivity: z.date().optional(),
  userId: z.string().optional(), // User ID of the group creator
  members: z.array(z.string()).optional(), // Array of user IDs who are members
});
export type StorageGroup = z.infer<typeof StorageGroupSchema>;
