import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { SendEmailData } from "../helpers/entities/send-email.entity";
import { EmailService } from "../helpers/email-helper.service";
import { logError, logInfoMessage } from "../utils/logger";

export type EmailJob = SendEmailData
export const createEmailJob = (data:EmailJob):EmailJob => data

@Processor('sendEmail')
export class SendEmailQueueProcessor{
    constructor(private readonly emailService: EmailService) { }
    
    @Process()
    async processEmail(job: Job<any>) {
        console.log("hhjhjhjhjh")
        logInfoMessage('==> Processing send email');
        try {
            await this.emailService.send(job.data) 
            logInfoMessage(`<== Done processing ${JSON.stringify(job)}`)
            return true
        } catch (error) {
            logError(`An error occurred in send email queue processor:: ${job}==> ${error}`)
        }
    }
}