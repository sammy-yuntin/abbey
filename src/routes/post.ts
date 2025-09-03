import { PostControllers } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";
import authentication from "../middlewares/authentication";

const { makePost, deletePost, myPosts } = PostControllers;
const router = Router();

router.post("/", Authentication, makePost);
router.get("/me", authentication, myPosts);
router.delete("/", Authentication, deletePost);

export default router;
