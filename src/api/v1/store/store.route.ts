import { Router } from "express";

import StoreController from "./store.controller";
import { validateRegister } from "./store.validator";
import { validate } from "@/services/validator.service";

const router = Router();

router.post("/register", validateRegister(), validate, StoreController.registerStore);
router.post("/login", validateRegister(), validate, StoreController.loginStore);

export default router;