import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateGroup } from './dtos';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateGroup) {
    throw new Error('Not implemented');
    // return this.prismaService.group.create({
    //   data: {
    //     name: data.name,
    //     members: {
    //       set: data.members || [],
    //     },
    //     createdBy: '', // This should be set from the authenticated user context
    //   },
    // });
  }
}
