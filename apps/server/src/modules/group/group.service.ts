import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateGroup, GroupCreateArgs } from './dtos';
import { GroupDto } from './models';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: GroupCreateArgs): Promise<GroupDto> {
    return this.prismaService.group.create(args);
  }
}
