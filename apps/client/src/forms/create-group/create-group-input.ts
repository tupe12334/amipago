import { z } from "zod";

export const CreateGroupInputSchema = z.object({
  name: z.string().nonempty("שדה זה הוא חובה, יש להזין שם קבוצה"),
});
export type CreateGroupInput = z.infer<typeof CreateGroupInputSchema>;
