import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

const CreateGroupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  members: z.array(z.string().cuid()).optional(),
});

export type CreateGroup = z.infer<typeof CreateGroupSchema>;
export class CreateGroupDto extends createZodDto(CreateGroupSchema) {}
