import { Router } from "express";

import AddressController from "./address.controller";
import { validateCreateUserAddress } from "./address.validator";
import { validate } from "@/services/validator.service";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router();

router.post("/new", verifyAuthToken, validateCreateUserAddress(), validate, AddressController.createUserAddress);

export default router;