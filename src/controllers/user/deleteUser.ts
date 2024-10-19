import { Response } from "express";
import { UserService } from "../../services";
import { ApiResponse } from "../../libs";

const deleteUser = async (_, res: Response): Promise<Response> => {
    try {
        const deletedUser = await UserService.deleteUser(res.locals.user.id, res);
        return ApiResponse.Success(res, deletedUser);
    } catch (error) {
    // Logger.error(error.message)
        return ApiResponse.InternalServerError(
            res,
            "Server Error: Something went wrong"
        );
    }
};

export default deleteUser;
