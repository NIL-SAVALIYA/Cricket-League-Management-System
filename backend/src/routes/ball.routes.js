import { Router } from "express";

import { createBall } from "../controllers/ball.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router({
    mergeParams: true
});

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "SCORER"),
    createBall
);

export default router;