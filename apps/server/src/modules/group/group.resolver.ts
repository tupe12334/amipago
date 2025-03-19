import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './models';
import { GroupCreateArg } from './dtos';

@Resolver('Group')
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => Group, { nullable: true })
  async findFirst(): Promise<Group | null> {
    return this.groupService.findFirst();
  }

  @Mutation(() => Group)
  async create(@Args() args: GroupCreateArg): Promise<Group> {
    return this.groupService.create(args);
  }
}
