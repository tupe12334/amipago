import { z } from "zod";

export const GroupTypeEnum = z.enum([
  "GENERAL",
  "HOUSEHOLD",
  "WORK",
  "FRIENDS",
  "TRIP", // added trip option for travel groups
]);

export const GroupTypeHebrewLabel = {
  GENERAL: "כללי",
  HOUSEHOLD: "משק בית",
  WORK: "עבודה",
  FRIENDS: "חברים",
  TRIP: "טיול", // added Hebrew label for trip option
};

export type GroupType = z.infer<typeof GroupTypeEnum>;
