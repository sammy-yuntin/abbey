import { UploadControllers } from "../controllers";
import { Router } from "express";
import { MulterMiddleWare } from "../middlewares";

const { upload } = MulterMiddleWare;

const { imageUpload } = UploadControllers;
const router = Router();

router.post("/image", upload.single("thumbnail"), imageUpload);

export default router;
