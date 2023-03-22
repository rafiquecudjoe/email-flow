import { Module } from "@nestjs/common";
import { EmailService } from "src/helpers/email-helper.service";
import { CommentEmailGenerator } from "../utils/comment.email-generator";
import { QueueProducersModule } from "./queue.producers.module";
import { SendEmailQueueProcessor } from "./send-email.queue";


@Module({
    imports: [QueueProducersModule],
    providers: [CommentEmailGenerator, EmailService, SendEmailQueueProcessor],
    exports: [CommentEmailGenerator, SendEmailQueueProcessor, EmailService,],
})

export class QueueProcessorsModule{}