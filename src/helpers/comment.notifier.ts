import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Queue } from "bull";
import { CommentEvents, NewCommentEvent } from "../apis/comments/entities/comments.entities";
import { createEmailJob } from "../queues/send-email.queue";
import { CommentEmailGenerator } from "../utils/comment.email-generator";


@Injectable()
export class CommentNotifier {
    constructor(
        @InjectQueue('sendEmail') private readonly sendEmailQueue: Queue,
        private readonly emailGenerator: CommentEmailGenerator
    ) { }

    @OnEvent(CommentEvents.newComment)
    async onNewEvent(data: NewCommentEvent) {
        const body = this.emailGenerator.generateCommentEmail(data.comment)
        return  await this.sendEmailQueue.add(
            createEmailJob({
                subject: "You have received a new comment",
                from: 'rasgalazy5@gmail.com',
                to: 'rafiqueacudjoe@gmail.com',
                body
            })
        )
    }
}