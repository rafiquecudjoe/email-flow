import { Module } from "@nestjs/common";
import { CommentEmailGenerator } from "../utils/comment.email-generator";
import { QueueProducersModule } from "./queue.producers.module";


@Module({
    imports: [QueueProducersModule],
    providers:[CommentEmailGenerator]
})

export class QueueProcessorsModule{}