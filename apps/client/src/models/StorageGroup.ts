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
});
export type StorageGroup = z.infer<typeof StorageGroupSchema>;
