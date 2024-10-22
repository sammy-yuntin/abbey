import { StatusCode } from "../interfaces/index";
import { Response, Router } from "express";

const router = Router();

router.get("/", (_, res: Response) => {
  res.sendStatus(StatusCode.OK);
});

export default router;
