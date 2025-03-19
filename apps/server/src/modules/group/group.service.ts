import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GroupCreateArgs } from './dtos';
import { Group } from './models';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(): Promise<Group | null> {
    return this.prismaService.group.findFirst();
  }

  async create(args: GroupCreateArgs): Promise<Group> {
    return this.prismaService.group.create(args);
  }
}
