import { Controller, Post } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  create() {
    return this.service.create();
  }
}
