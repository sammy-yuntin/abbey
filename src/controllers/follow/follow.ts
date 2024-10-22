import { Logger } from "../../libs/index";
import { FollowService } from "../../services/index";

const follow = async (req, res) => {
  try {
    const { followingId } = req.params;

    const follow = await FollowService.follow(req.body, followingId, res);
    return follow;
  } catch (error) {
    Logger.error(`error: ${error.message}`);
  }
};
export default follow;
