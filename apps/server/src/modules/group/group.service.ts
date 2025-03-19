import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}
  async create() {}
}
