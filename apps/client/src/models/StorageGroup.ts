import { z } from "zod";
import { GroupTypeEnum } from "./GroupType";
import { v4 } from "uuid";

// Define a member schema for users in groups
export const GroupMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const StorageGroupSchema = z.object({
  id: z.string().default(v4()),
  password: z.string().default(v4()),
  name: z.string(),
  description: z.string(),
  type: GroupTypeEnum,
  createdAt: z.date().default(() => new Date()),
  lastActivity: z.date().optional(),
  userId: z.string().optional(), // User ID of the group creator
  members: z.array(GroupMemberSchema).optional(), // Array of member objects with id and name
});
export type StorageGroup = z.infer<typeof StorageGroupSchema>;
export type GroupMember = z.infer<typeof GroupMemberSchema>;
