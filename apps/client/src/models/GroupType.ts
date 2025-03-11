import { z } from "zod";

export const GroupTypeEnum = z.enum(["HOUSEHOLD", "WORK", "FRIENDS"]);

export type GroupType = z.infer<typeof GroupTypeEnum>;
