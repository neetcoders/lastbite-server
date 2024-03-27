import { Router } from "express";
import { default as v1Router } from "./v1/v1.route";

const router = Router();

router.use("/api/v1", v1Router);

export default router;