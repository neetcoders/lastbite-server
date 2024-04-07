import { Router } from "express";

import { default as statusRouter } from "./status/status.route";
import { default as userRouter } from "./user/user.route";
import { default as storeRouter } from "./store/store.route";
import { default as productRouter } from "./product/product.route";
import { default as addressRouter } from "./address/address.route";
import { default as orderRouter } from "./order/order.route";
import { default as uploadRouter } from "./upload/upload.route";

const router = Router();

router.use("/status", statusRouter);
router.use("/users", userRouter);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/address", addressRouter);
router.use("/order", orderRouter);
router.use("/upload", uploadRouter);

export default router;