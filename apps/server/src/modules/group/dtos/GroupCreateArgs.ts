import { ArgsType, Field } from '@nestjs/graphql';
import { GroupUncheckedCreateInput } from './GroupUncheckedCreateInput';

@ArgsType()
export class GroupCreateArg {
  @Field(() => GroupUncheckedCreateInput)
  data: GroupUncheckedCreateInput;
}
