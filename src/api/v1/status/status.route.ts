import { Router } from "express";
import StatusController from "./status.controller";

const router = Router();

router.get("/", StatusController.checkServerStatus);
router.get("/db", StatusController.checkDatabaseStatus);

export default router;