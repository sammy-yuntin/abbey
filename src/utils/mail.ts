import nodemailer from "nodemailer";
import { MailInterface } from "../interfaces";
import { Logger } from "../libs";
import { mailConfig } from "../config";

export default class MailService {
    private static instance: MailService;
    private transporter: nodemailer.Transporter;

    private constructor() {}
    //INTSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE CONNECTION FOR LIVE
    async createConnection() {
    // this.transporter = nodemailer.createTransport({
    //     host: env.SMTP_HOST,
    //     port: parseInt(env.SMTP_PORT),
    //     auth: {
    //         user: env.SMTP_USERNAME,
    //         pass: env.SMTP_PASSWORD,
    //     },
    // });
        this.transporter = mailConfig();
    }
    //SEND MAIL
    async sendMail(options: MailInterface) {
        {
            /** Kindly change the address and name value to your app usecase  */
        }
        return await this.transporter
            .sendMail({
                from: { address: "no-reply@framework.site", name: "Framework" },
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html
            })
            .then((info) => {
                Logger.info("Mail sent successfully!!");
                return info;
            })
            .catch((err) => Logger.error(err.message));
    }
    //VERIFY CONNECTION
    async verifyConnection() {
        return this.transporter.verify();
    }
    //CREATE TRANSPOTER
    getTransporter() {
        return this.transporter;
    }
}
