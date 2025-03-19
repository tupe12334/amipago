import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GroupUncheckedCreateInput {
  @Field()
  id?: string;
  @Field()
  name: string;
}
