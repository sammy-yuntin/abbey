import { ApiResponse } from "../libs/index";
import { PostRepo } from "../repositories/index";
import { Response } from "express";

class PostService {
  async post(payload: any, res: Response): Promise<object> {
    payload.userId = res.locals.user.id;

    const post = await PostRepo.create(payload);

    return ApiResponse.Success(
      res,
      {
        message: `posted successfully`,
        details: post
      },
      201
    );
  }
  async edit(payload: any, id, res: Response): Promise<object> {
    const post = await PostRepo.edit(payload, id);

    return ApiResponse.Success(
      res,
      {
        message: `post edited successfully`,
        details: post
      },
      201
    );
  }

  async delete(postId, res: Response): Promise<object> {
    const post: any = await PostRepo.findOne(postId);

    await PostRepo.remove(postId);

    return ApiResponse.Success(
      res,
      {
        message: `Post deleted Successfully`,
        details: post
      },
      200
    );
  }

  async allPosts(id, res) {
    const posts = await PostRepo.findAll(id);

    return ApiResponse.Success(res, {
      message: "all posts fetched",
      details: posts
    });
  }
}
export default new PostService();
