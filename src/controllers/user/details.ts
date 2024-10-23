import { Response } from "express";
import { ApiResponse, Logger } from "../../libs";
import { UserService } from "../../services";

const details = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.query;

    const user = id
      ? await UserService.findUser(id, res)
      : await UserService.findUser(res.locals.user.id, res);

    return user;
  } catch (error) {
    Logger.error(error.message);
    return ApiResponse.InternalServerError(
      res,
      "Server Error: Something went wrong"
    );
  }
};

export default details;
