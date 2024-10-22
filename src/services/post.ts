import { ApiResponse } from "../libs/index";
import { FollowRepo, UserRepo } from "../repositories/index";
import { Response } from "express";

class PostService {
  async post(payload: any, res: Response): Promise<object> {
    payload.userId = res.locals.user.id;

    const post = await FollowRepo.create(payload);

    return ApiResponse.Success(
      res,
      {
        message: `posted successfully`,
        details: post
      },
      201
    );
  }

  async unfollow(payload: any, followingId, res: Response): Promise<object> {
    payload.followingId = followingId;
    payload.userId = res.locals.user.id;

    const secondParty: any = await UserRepo.findOne(followingId);

    await FollowRepo.remove(payload);

    return ApiResponse.Success(
      res,
      {
        message: `You've unfollowed ${secondParty?.username}`,
        details: secondParty
      },
      200
    );
  }
}
export default new PostService();
