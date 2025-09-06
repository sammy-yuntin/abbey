import { UploadControllers } from "../controllers";
import { Router } from "express";
import { MulterMiddleWare } from "../middlewares";
import authentication from "../middlewares/authentication";

const { upload } = MulterMiddleWare;

const { imageUpload } = UploadControllers;
const router = Router();

router.post("/image", authentication, upload.single("thumbnail"), imageUpload);

export default router;
