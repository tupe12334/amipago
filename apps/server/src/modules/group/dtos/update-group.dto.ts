import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

const UpdateGroupSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  members: z.array(z.string().cuid()).optional(),
});

export type UpdateGroup = z.infer<typeof UpdateGroupSchema>;
export const UpdateGroupDto = createZodDto(UpdateGroupSchema);
