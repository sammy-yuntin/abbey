import { Request, Response } from "express";
import { ContactService, UserService } from "../../services";
import { ApiResponse, SchemaValidation } from "../../libs";

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    /* const { error } = SchemaValidation.registrationSchema(req.body);
    if (error) {
      return ApiResponse.AuthenticationError(
        res,
        error.details[0].context.label === "confirm"
          ? "Passwords do not match"
          : error.details[0].context.label
      );
    } */

    const contact: any = await ContactService.add(req.body, res);
    return contact;
  } catch (error) {
    // Logger.error(error.message)
    return ApiResponse.InternalServerError(
      res,
      "Server Error: Something went wrong"
    );
  }
};

export default create;
