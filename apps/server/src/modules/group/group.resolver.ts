import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupCreateArgsDto } from './dtos';
import { GroupService } from './group.service';
import { GroupDto } from './models';

@Resolver(() => GroupDto)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => GroupDto, { nullable: true })
  async findFirst(): Promise<GroupDto | null> {
    return this.groupService.findFirst();
  }

  @Mutation(() => GroupDto)
  async create(@Args('args') args: GroupCreateArgsDto): Promise<GroupDto> {
    return this.groupService.create(args);
  }
}
