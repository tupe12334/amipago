import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { GroupUncheckedCreateInput } from './GroupUncheckedCreateInput';

export class GroupCreateArg {
  data: GroupUncheckedCreateInput;
}
