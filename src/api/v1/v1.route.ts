import { Router } from "express";

import { default as statusRouter } from "./status/status.route";
import { default as userRouter } from "./user/user.route";
import { default as storeRouter } from "./store/store.route";
import { default as productRouter } from "./product/product.route";

const router = Router();

router.use("/status", statusRouter);
router.use("/users", userRouter);
router.use("/store", storeRouter);
router.use("/product", productRouter);

export default router;