import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
