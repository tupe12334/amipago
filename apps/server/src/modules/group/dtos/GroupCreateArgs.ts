import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GroupCreateArgsSchema = z.object({});

export type GroupCreateArgs = z.infer<typeof GroupCreateArgsSchema>;
export class GroupCreateArgsDto extends createZodDto(GroupCreateArgsSchema) {}
