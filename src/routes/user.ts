import { Router } from "express";
import { UserControllers } from "../controllers";
import { Authentication } from "../middlewares";

const router = Router();

const { register, login, details, findAllUsers, updateUser, deleteUser } =
  UserControllers;

router.post("/register", register);
router.post("/login", login);
router.get("/all", findAllUsers);
router.get("/details", Authentication, details);
router.patch("/", Authentication, updateUser);
router.delete("/", Authentication, deleteUser);

export default router;
