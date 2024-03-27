import { Router } from "express";
import StatusController from "./status.controller";

const router = Router();

router.get("/", StatusController.checkServerStatus);

export default router;