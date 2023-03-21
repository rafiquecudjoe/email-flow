import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommentsModule } from './apis/comments/comments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';
import { CommentNotifier } from './helpers/comment.notifier';
import { QueueProcessorsModule } from './queues/queue.processors.module';
import { QueueProducersModule } from './queues/queue.producers.module';
import { CommentEmailGenerator } from './utils/comment.email-generator';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: config.redisHost,
        port: +config.redisPort
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
    EventEmitterModule.forRoot({}),
    QueueProcessorsModule,
    CommentsModule,
    QueueProducersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommentNotifier, CommentEmailGenerator],
})
export class AppModule { }
