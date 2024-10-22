import { Request, Response } from "express";
import { PostService } from "../../services";
import { ApiResponse, Logger } from "../../libs";

const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postId } = req.params;

    const deletePost = await PostService.delete(postId, res);
    return deletePost;
  } catch (error) {
    Logger.error(error.message);
    return ApiResponse.InternalServerError(
      res,
      "Server Error: Something went wrong"
    );
  }
};

export default deletePost;
