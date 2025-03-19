import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GroupCreateArgsDto } from './dtos';
import { GroupService } from './group.service';
import { GroupDto } from './models';

@Resolver(() => GroupDto)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => GroupDto)
  async create(@Args('args') args: GroupCreateArgsDto): Promise<GroupDto> {
    return this.groupService.create(args);
  }
}
