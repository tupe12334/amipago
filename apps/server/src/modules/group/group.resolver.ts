import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './models';

@Resolver('Group')
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => Group, { nullable: true })
  async findFirst(): Promise<Group | null> {
    return this.groupService.findFirst();
  }

  //   @Mutation(() => GroupDto)
  //   async create(@Args('args') args: GroupCreateArg): Promise<GroupDto> {
  //     return this.groupService.create(args);
  //   }
}
