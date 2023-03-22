import { HttpStatus } from "@nestjs/common"
import * as joi from "joi"
import { resolve } from "path"
import { JoiValidator } from "src/utils/joi.validator"
import { throwError } from "src/utils/util"
import { CommentDto } from "./dtos/comments.dto"


export class CommentsValidator {

    async validateAddCommentsDto(dto: CommentDto): Promise<any> {

        const joiSchema = joi.object({
            text: joi.string().required()
        }).strict()

        const joiValidationResults = JoiValidator.validate(joiSchema, dto)
        if (joiValidationResults) throwError(joiValidationResults, HttpStatus.BAD_REQUEST)

        return 'passed'


    }
}