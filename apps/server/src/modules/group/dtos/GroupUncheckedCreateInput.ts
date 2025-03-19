import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GroupUncheckedCreateInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});
export type GroupUncheckedCreateInput = z.infer<
  typeof GroupUncheckedCreateInputSchema
>;
export class GroupUncheckedCreateInputDto extends createZodDto(
  GroupUncheckedCreateInputSchema,
) {}
