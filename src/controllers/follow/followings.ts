import { ApiResponse, Logger } from "../../libs/index";
import { FollowService } from "../../services/index";

const followings = async (req, res) => {
  try {
    const { followingId } = req.query;

    const follow = await FollowService.followings(followingId, res);
    return follow;
  } catch (error) {
    Logger.error(`error: ${error.message}`);
    ApiResponse.InternalServerError(res, "ServerError");
  }
};
export default followings;
