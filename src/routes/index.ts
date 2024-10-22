import { Router } from "express";
import UserRoutes from "./user";
import ContactRoutes from "./contact";
import followRoutes from "./follow";

import HealthCheck from "./healthcheck";

const router = Router();

router.use("/user", UserRoutes);
router.use("/contact", ContactRoutes);
router.use("/follow", followRoutes);
router.use("/healthcheck", HealthCheck);

export default router;
