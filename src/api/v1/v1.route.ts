import { Router } from "express";
import { default as statusRouter } from "./status/status.route";

const router = Router();

router.use("/status", statusRouter);

export default router;