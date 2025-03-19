import { z } from "zod";
import { GroupTypeEnum } from "../../../models/GroupType";

export const GroupSettingsInputSchema = z.object({
  name: z.string().nonempty("שדה זה הוא חובה"),
  description: z.string().optional(),
  type: GroupTypeEnum,
});

export type GroupSettingsInput = z.infer<typeof GroupSettingsInputSchema>;
