import { PostControllers } from "../controllers";
import { Router } from "express";
import { Authentication } from "../middlewares";

const { makePost, deletePost } = PostControllers;
const router = Router();

router.post("/", Authentication, makePost);
router.delete("/", Authentication, deletePost);

export default router;
