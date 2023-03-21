import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CommentsService } from "./commnets.service";
import { CommentDto } from "./dtos/comments.dto";


@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }
    
    @Post()
    async addComment(@Body() payload: CommentDto,@Res() res:Response) {
        const { status, ...responseData } = await this.commentsService.addComment(payload)
        return res.status(status).send(responseData)
    }
}