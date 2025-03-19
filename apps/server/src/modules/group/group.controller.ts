import { Body, Controller, Post } from '@nestjs/common';
import { GroupCreateArg } from './dtos';
import { GroupService } from './group.service';
import { Group } from './models';

@Controller('group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  create(@Body() createGroupArgsDto: GroupCreateArg): Promise<Group> {
    return this.service.create(createGroupArgsDto);
  }
}
