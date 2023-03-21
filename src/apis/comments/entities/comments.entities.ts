import { CommentDto } from "../dtos/comments.dto";

export enum CommentEvents {
    newComment = 'comments.new'
}

export class NewCommentEvent {
    constructor(public comment: CommentDto) { } 
}