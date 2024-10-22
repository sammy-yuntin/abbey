import { Logger } from "../../libs/index";
import { FollowService } from "../../services/index";

const follow = async (req, res) => {
  try {
    const { followingId } = req.params;

    return await FollowService.unfollow(req.body, followingId, res);
  } catch (error) {
    Logger.error(`error: ${error.message}`);
  }
};
export default follow;
