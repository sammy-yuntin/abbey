import { Request, Response } from "express";
import { UserService } from "../../services";
import { ApiResponse, SchemaValidation } from "../../libs";

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { error } = SchemaValidation.registrationSchema(req.body);
        if (error) {
            return ApiResponse.AuthenticationError(
                res,
                error.details[0].context.label === "confirm"
                    ? "Passwords do not match"
                    : error.details[0].context.label
            );
        }
        const user = await UserService.register(req.body, res);
        return ApiResponse.Success(res, user, 201);
    } catch (error) {
    // Logger.error(error.message)
        return ApiResponse.InternalServerError(
            res,
            "Server Error: Something went wrong"
        );
    }
};

export default registerUser;
