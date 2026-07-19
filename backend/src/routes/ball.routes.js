import { Router } from "express";

import { createBall } from "../controllers/ball.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "SCORER"),
    createBall
);

export default router;