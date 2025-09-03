/*eslint-disable @typescript-eslint/no-explicit-any*/
import { Request, Response } from "express";
import { PostService } from "../../services";
import { ApiResponse, Logger } from "../../libs";

const myPosts = async (req: Request, res: Response): Promise<any> => {
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

        const posts = await PostService.allPosts(res.locals.user.id, res);
        return posts;
    } catch (error) {
        Logger.error(error.message);
        return ApiResponse.InternalServerError(
            res,
            "Server Error: Something went wrong"
        );
    }
};

export default myPosts;
