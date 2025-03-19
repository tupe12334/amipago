import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { GroupUncheckedCreateInputSchema } from './GroupUncheckedCreateInput';

export const GroupCreateArgsSchema = z.object({
  data: GroupUncheckedCreateInputSchema,
});

export type GroupCreateArgs = z.infer<typeof GroupCreateArgsSchema>;
export class GroupCreateArgsDto extends createZodDto(GroupCreateArgsSchema) {}
