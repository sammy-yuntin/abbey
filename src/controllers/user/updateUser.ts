import { Request, Response } from "express";
import { UserService } from "../../services";
import { ApiResponse, Logger } from "../../libs";

const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserService.updateUser(
      res.locals.user.id,
      req.body,
      res
    );
    return user;
  } catch (error) {
    Logger.error(error.message);
    return ApiResponse.InternalServerError(
      res,
      "Server Error: Something went wrong"
    );
  }
};

export default updateUser;
