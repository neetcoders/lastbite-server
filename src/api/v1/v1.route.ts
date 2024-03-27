import { Router } from "express";

import { default as statusRouter } from "./status/status.route";
import { default as userRouter } from "./user/user.route";

const router = Router();

router.use("/status", statusRouter);
router.use("/users", userRouter);

export default router;