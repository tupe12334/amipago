import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Group } from './models';
import { GroupCreateArg } from './dtos';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(): Promise<Group | null> {
    return this.prismaService.group.findFirst();
  }

  async create(args: GroupCreateArg): Promise<Group> {
    return this.prismaService.group.create(args);
  }
}
