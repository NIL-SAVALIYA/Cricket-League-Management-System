import { Router } from "express";

import { getLiveScore } from "../controllers/liveScore.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/:matchId/live-score",
    authenticate,
    getLiveScore
);

export default router;