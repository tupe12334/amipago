import { z } from "zod";

export const CreateGroupInputSchema = z.object({
  name: z.string().nonempty(),
});
export type CreateGroupInput = z.infer<typeof CreateGroupInputSchema>;
