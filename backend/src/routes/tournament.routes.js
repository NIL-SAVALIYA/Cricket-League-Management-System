import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/tournament.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Tournament Routes
|--------------------------------------------------------------------------
*/

// Create Tournament
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    create
);

// Get All Tournaments
router.get(
    "/",
    authenticate,
    getAll
);

// Get Tournament By ID
router.get(
    "/:id",
    authenticate,
    getOne
);

// Update Tournament
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    update
);

// Delete Tournament
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    remove
);

export default router;