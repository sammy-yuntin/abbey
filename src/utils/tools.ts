/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config";
import bcrypt from "bcryptjs";
import { ParsedQs } from "qs";
import { totp } from "otplib";
// import { OtpRepo } from "../repositories";
// import { ResponseType } from "../interfaces";
import MailService from "./mail";

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
}
export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
export function generateToken(id: string, time: string) {
    return jwt.sign({ id }, env.SECRET_KEY, { expiresIn: time });
}

export function checkToken(req: JwtPayload) {
    if (
        req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

export function verifyToken(token: string) {
    return jwt.verify(token, env.SECRET_KEY);
}

export function generateName(req) {
    let filename = "";
    if (req.query === undefined) {
        filename = req.body.businessName;
    } else {
        filename = req.query.type;
    }

    return filename;
}

export function queryBuilder(
    arr: Array<string>,
    value: string | ParsedQs | string[] | ParsedQs[],
    obj: object = {}
) {
    return arr.map((item: string) => {
        obj[item] = value;
    });
}

export function generateOtp(secret: string) {
    totp.options = { digits: 6 };
    return totp.generate(secret);
}

// export async function verifyOtp(user: string, otp: number){
//     const currentDate = new Date();
//     const existingOtp: ResponseType = await OtpRepo.findOne(user, otp);
//     if(!existingOtp || existingOtp.dataValues.expiration < currentDate){
//         return null;
//     }

//     return existingOtp.dataValues.id;
// }

export function tokenExpiration() {
    const tokenExpiration: any = new Date();
    return tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 10);
}

export async function sendMail(to: string, subject: string, html: any) {
    const mailService = MailService.getInstance();
    return await mailService.sendMail({
        to,
        subject,
        html
    });
}
