import { Logger, ApiResponse } from "../libs";
import { Response, Request, NextFunction } from "express";
import { Tools } from "../utils";

async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        const token = Tools.checkToken(req);
        if (!token || token === null) {
            return ApiResponse.AuthorizationError(
                res,
                "No token in Header. Authorization denied!",
                { badToken: true }
            );
        }

        res.locals.user = Tools.verifyToken(token);
        next();
    } catch (error) {
        Logger.error(`${error.message}`);
        return ApiResponse.AuthorizationError(
            res,
            error.message && "Invalid token or token expired",
            { badToken: true }
        );
    }
}

export default authentication;
