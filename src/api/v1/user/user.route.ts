import { Router } from "express";

import UserController from "./user.controller";
import { validateLogin, validateRegister } from "./user.validator";
import { validate } from "@/services/validator.service";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router();

router.post("/register", validateRegister(), validate, UserController.registerUser);
router.post("/login", validateLogin(), validate, UserController.loginUser);
router.get("/me", verifyAuthToken, UserController.getCurrentUser);

export default router;