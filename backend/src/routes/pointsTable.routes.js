import express from "express";

import {
    initializePointsTable,
    getPointsTable
} from "../controllers/pointsTable.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post( "/:tournamentId/initialize", authenticate, initializePointsTable);

router.get("/:tournamentId",authenticate,getPointsTable);

export default router;