import { Router } from "express";
import UserRoutes from "./user";
import ContactRoutes from "./contact";
import followRoutes from "./follow";
import postRoutes from "./post";
import UploadRoutes from "./fileUpload";

import HealthCheck from "./healthcheck";
import { Authentication } from "../middlewares";

const router = Router();

router.use("/user", UserRoutes);
router.use("/contact", ContactRoutes);
router.use("/follow", followRoutes);
router.use("/post", postRoutes);
router.use("/healthcheck", HealthCheck);
router.use("/upload", Authentication,UploadRoutes);

export default router;
