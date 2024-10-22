import { Request, Response } from "express";
import { ApiResponse, SchemaValidation } from "../../libs";
import { UserService } from "../../services";

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { error } = SchemaValidation.loginSchema(req.body);
    if (error) {
      return ApiResponse.AuthenticationError(
        res,
        error.details[0].context.label
      );
    }
    const user = await UserService.login(req.body, res);
    return ApiResponse.Success(res, user);
  } catch (error) {
    // Logger.error(error.message)
    return ApiResponse.InternalServerError(
      res,
      "Server Error: Something went wrong"
    );
  }
};

export default login;
