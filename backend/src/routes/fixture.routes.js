import { Router } from "express";

import { generateFixtures } from "../controllers/fixture.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Fixture Routes
|--------------------------------------------------------------------------
*/

// Generate Fixtures
router.post(
    "/generate/:tournamentId",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    generateFixtures
);

export default router;