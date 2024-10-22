import { Router } from "express";
import { ContactControllers } from "./../controllers/index";
import authentication from "../middlewares/authentication";

const { create, update, contacts } = ContactControllers;
const router = Router();

router.post("/new", authentication, create);

export default router;
