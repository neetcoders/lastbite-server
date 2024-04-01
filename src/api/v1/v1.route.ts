import { Router } from "express";

import { default as statusRouter } from "./status/status.route";
import { default as userRouter } from "./user/user.route";
import { default as storeRouter } from "./store/store.route";

const router = Router();

router.use("/status", statusRouter);
router.use("/users", userRouter);
router.use("/store", storeRouter);

export default router;