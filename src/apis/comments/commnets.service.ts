import { HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { logError } from "../../utils/logger";
import { generateErrorResponse, generateSuccessResponse } from "../../utils/util";
import { CommentDto } from "./dtos/comments.dto";
import { CommentEvents, NewCommentEvent } from "./entities/comments.entities";



@Injectable()
export class CommentsService {
    constructor(private readonly eventEmitter: EventEmitter2){ }
    async addComment(dto: CommentDto): Promise<any> {
        try {
            // First we validate and save our comment inside a database
            // We'll skip that part inside this exemple.

            // Then we emit the event that a new comment has been added
            // note that we use emitAsync to avoid blocking the thread
            this.eventEmitter.emitAsync(
                CommentEvents.newComment,
                new NewCommentEvent(dto),
            );

            return generateSuccessResponse({
                message: ' New comment added successfully',
                statusCode: HttpStatus.CREATED
            })  
        } catch (error) {
            logError(`${JSON.stringify(dto)} ==> ${error}`);
            return generateErrorResponse(error);
        }

    }
}
