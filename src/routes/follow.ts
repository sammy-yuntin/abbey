import authentication from "../middlewares/authentication";
import { Router } from "express";
import { followControllers } from "../controllers/index";

const { follow, unfollow, followings, followers } = followControllers;
const router = Router();

router
  .post("/:followingId", authentication, follow)
  .delete("/:followingId", authentication, unfollow);
router.get("/followings", authentication, followings);
router.get("/followers", authentication, followers);

export default router;
