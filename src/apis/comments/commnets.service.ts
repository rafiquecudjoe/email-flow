import { HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { logError } from "../../utils/logger";
import { generateErrorResponse, generateSuccessResponse } from "../../utils/util";
import { CommentsValidator } from "./comments.validator";
import { CommentDto } from "./dtos/comments.dto";
import { CommentEvents, NewCommentEvent } from "./entities/comments.entities";



@Injectable()
export class CommentsService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly commentsValidator:CommentsValidator
    ) { }
    async addComment(dto: CommentDto): Promise<any> {
        try {
      
            await this.commentsValidator.validateAddCommentsDto(dto)

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
