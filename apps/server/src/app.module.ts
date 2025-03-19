import { Module } from '@nestjs/common';
import { GroupModule } from './modules/group/group.module';
import { PrismaModule } from 'nestjs-prisma';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [GroupModule, PrismaModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
