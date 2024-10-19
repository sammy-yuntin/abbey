import { Request, Response } from "express";
import { UserService } from "../../services";
import { ApiResponse } from "../../libs";

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await UserService.updateUser(
            res.locals.user.id,
            req.body,
            res
        );
        return ApiResponse.Success(res, user);
    } catch (error) {
    // Logger.error(error.message)
        return ApiResponse.InternalServerError(
            res,
            "Server Error: Something went wrong"
        );
    }
};

export default updateUser;
