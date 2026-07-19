import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/innings.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Innings Routes
|--------------------------------------------------------------------------
*/

// Create Innings
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    create
);

// Get All Innings
router.get(
    "/",
    authenticate,
    getAll
);

// Get Innings By ID
router.get(
    "/:id",
    authenticate,
    getOne
);

// Update Innings
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    update
);

// Delete Innings
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    remove
);

export default router;