import { Router } from "express";

import AddressController from "./address.controller";
import { validateCreateUserAddress, validateUpdateUserAddress, valudateSetUserActiveAddress } from "./address.validator";
import { validate } from "@/services/validator.service";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router();

router.post("/new", verifyAuthToken, validateCreateUserAddress(), validate, AddressController.createUserAddress);
router.get("/all", verifyAuthToken, AddressController.getAllUserAddress);
router.get("/:address_id", verifyAuthToken, AddressController.getUserAddress);
router.put("/active", verifyAuthToken, valudateSetUserActiveAddress(), validate, AddressController.setActiveAddress);
router.put("/:address_id", verifyAuthToken, validateUpdateUserAddress(), validate, AddressController.updateUserAddress);
router.delete("/:address_id", verifyAuthToken, AddressController.deleteUserAddress);

export default router;