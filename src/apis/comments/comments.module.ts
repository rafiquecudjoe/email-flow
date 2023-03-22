import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsValidator } from './comments.validator';
import { CommentsService } from './commnets.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService,CommentsValidator],
})
export class CommentsModule {}
