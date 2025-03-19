import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dtos';

@Controller('group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.service.create(createGroupDto);
  }
}
