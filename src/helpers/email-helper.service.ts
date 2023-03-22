import { Injectable } from "@nestjs/common";
import Mail from "nodemailer/lib/mailer";
import * as nodemailer from 'nodemailer'
import { config } from "src/config/config";
import { SendEmailData } from "./entities/send-email.entity";

@Injectable()
export class EmailService {
    private transport: Mail;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: config.nodeMailerHost,
            port: config.nodeMailerPort

        })
    }

    async send(data: SendEmailData) {

        return this.transport.sendMail({
            from: data.from,
            to: data.to,
            subject: data.subject,
            html: data.body
        })
    }
}