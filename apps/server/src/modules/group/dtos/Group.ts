import { z } from 'zod';

const GroupSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  members: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type Group = z.infer<typeof GroupSchema>;
