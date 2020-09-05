import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
