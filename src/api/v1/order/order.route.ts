import { Router } from "express";

import OrderController from "./order.controller";
import { verifyAuthToken } from "@/services/jwt.service";
import { validate } from "@/services/validator.service";
import { validateAddToCart, validateChangeOrderStatusSchema, validateDecreaseProductQty, validateDeleteOrderFromProductSchema, validateDeleteOrderFromStoreSchema, validateGetOrderListSchema, validateGetOrderSchema, validateIncreaseProductQty, validateToggleProductSchema, validateToggleStoreSchema } from "./order.validator";

const router = Router();

router.get("/", verifyAuthToken, OrderController.getUserCart);
router.post("/add", verifyAuthToken, validateAddToCart(), validate, OrderController.addToCart);

router.post("/checkout", verifyAuthToken, OrderController.checkoutOrder);

router.post("/qty/increase", verifyAuthToken, validateIncreaseProductQty(), validate, OrderController.increaseProductQty);
router.post("/qty/decrease", verifyAuthToken, validateDecreaseProductQty(), validate, OrderController.decreaseProductQty);
router.get("/qty/:product_id", verifyAuthToken, OrderController.getProductQty);

router.post("/product/toggle_selected", verifyAuthToken, validateToggleProductSchema(), validate, OrderController.toggleProductSelected);
router.delete("/product/:product_id", verifyAuthToken, validateDeleteOrderFromProductSchema(), validate, OrderController.deleteOrderFromProduct);

router.post("/store/toggle_selected", verifyAuthToken, validateToggleStoreSchema(), validate, OrderController.toggleStoreSelected);
router.delete("/store/:store_id", verifyAuthToken, validateDeleteOrderFromStoreSchema(), validate, OrderController.deleteOrderFromStore);

router.get("/details", verifyAuthToken, validateGetOrderListSchema(), validate, OrderController.getUserOrderList);
router.get("/details/:order_id", verifyAuthToken, validateGetOrderSchema(), validate, OrderController.getUserOrderDetails);

router.get("/store/details", verifyAuthToken, validateGetOrderListSchema(), validate, OrderController.getStoreOrderList);
router.get("/store/details/:order_id", verifyAuthToken, validateGetOrderSchema(), validate, OrderController.getStoreOrderDetails);
router.put("/store/details/:order_id", verifyAuthToken, validateChangeOrderStatusSchema(), validate, OrderController.changeOrderStatus);

export default router;