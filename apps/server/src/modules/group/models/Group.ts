import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Group {
  @Field((type) => String)
  id: string;
  @Field((type) => String)
  name: string;
}
