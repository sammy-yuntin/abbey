import nodemailer from "nodemailer";
import env from "./env";

function mailConfig() {
    return nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT),
        auth: {
            user: env.SMTP_USERNAME,
            pass: env.SMTP_PASSWORD
        }
    });
}

export default mailConfig;
