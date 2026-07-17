import { Router } from "express";

import {
    register,
    getAll,
    getOne,
    remove,
    getTournamentTeams,
    getTeamTournaments
} from "../controllers/tournament-team.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Tournament Team Routes
|--------------------------------------------------------------------------
*/

// Register Team in Tournament
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    register
);

// Get All Registrations
router.get(
    "/",
    authenticate,
    getAll
);

// Get Registration By ID
router.get(
    "/:id",
    authenticate,
    getOne
);

// Remove Team From Tournament
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "ORGANIZER"),
    remove
);

// Get All Teams of a Tournament
router.get(
    "/tournament/:tournamentId",
    authenticate,
    getTournamentTeams
);

// Get All Tournaments of a Team
router.get(
    "/team/:teamId",
    authenticate,
    getTeamTournaments
);

export default router;