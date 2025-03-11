import { z } from "zod";
import { GroupTypeEnum } from "../../models/GroupType";

export const CreateGroupInputSchema = z.object({
  name: z.string().nonempty("שדה זה הוא חובה, יש להזין שם קבוצה"),
  description: z.string().optional(),
  type: GroupTypeEnum,
});
export type CreateGroupInput = z.infer<typeof CreateGroupInputSchema>;
