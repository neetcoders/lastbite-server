import { Router } from "express";

import UserController from "./user.controller";
import { validateRegister } from "./user.validator";
import { validate } from "@/services/validator.service";

const router = Router();

router.post("/register", validateRegister(), validate, UserController.registerUser);

export default router;