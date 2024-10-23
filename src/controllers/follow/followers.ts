import { ApiResponse, Logger } from "../../libs/index";
import { FollowService } from "../../services/index";

const followers = async (req, res) => {
  try {
    const { followId } = req.query;

    const follow = await FollowService.followers(followId, res);
    return follow;
  } catch (error) {
    Logger.error(`error: ${error.message}`);
    ApiResponse.InternalServerError(res, "ServerError");
  }
};
export default followers;
