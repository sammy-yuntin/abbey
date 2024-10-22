import authentication from "@middlewares/authentication";
import { Router } from "express";
import { followControllers } from "../controllers/index";

const { follow, unfollow } = followControllers;
const router = Router();

router
  .post("/:followingId", authentication, follow)
  .delete("/:followingId", authentication, unfollow);

export default router;
