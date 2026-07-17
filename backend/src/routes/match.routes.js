import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/match.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Match Routes
|--------------------------------------------------------------------------
*/

// Create Match
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    create
);

// Get All Matches
router.get(
    "/",
    authenticate,
    getAll
);

// Get Match By ID
router.get(
    "/:id",
    authenticate,
    getOne
);

// Update Match
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    update
);

// Delete Match
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    remove
);

export default router;