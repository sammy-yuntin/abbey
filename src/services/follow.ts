import { ApiResponse } from "../libs/index";
import { FollowRepo, UserRepo } from "../repositories/index";
import { Response } from "express";

class FollowService {
  async follow(payload: any, followingId, res: Response): Promise<object> {
    const user: any = await UserRepo.findOne(followingId);
    if (user === null)
      return ApiResponse.NotFoundError(res, "User does not exist");

    const followed = await FollowRepo.findExistingFollow(
      res.locals.user.id,
      followingId
    );

    if (followed)
      return ApiResponse.AuthorizationError(
        res,
        `you were following ${user.username} already`
      );

    payload.followingId = followingId;
    payload.userId = res.locals.user.id;
    payload.username = user.username;

    const follow = await FollowRepo.create(payload);

    return ApiResponse.Success(
      res,
      {
        message: `You're now following ${user?.username}`,
        details: follow
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

  async followings(followingId, res: Response): Promise<object> {
    const followings = await FollowRepo.findAllFollowings(followingId);

    return ApiResponse.Success(
      res,
      {
        message: `You're following ${followings.count} people`,
        details: followings
      },
      200
    );
  }
  async followers(followId, res: Response): Promise<object> {
    const followers = await FollowRepo.findAllFollowers(followId);

    return ApiResponse.Success(
      res,
      {
        message: `You have ${followers.count} followers`,
        details: followers
      },
      200
    );
  }
}
export default new FollowService();
