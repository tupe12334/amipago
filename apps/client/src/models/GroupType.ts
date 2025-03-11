import { z } from "zod";

export const GroupTypeEnum = z.enum([
  "GENERAL",
  "HOUSEHOLD",
  "WORK",
  "FRIENDS",
]);

export const GroupTypeHebrewLabel = {
  GENERAL: "כללי",
  HOUSEHOLD: "משק בית",
  WORK: "עבודה",
  FRIENDS: "חברים",
};

export type GroupType = z.infer<typeof GroupTypeEnum>;
