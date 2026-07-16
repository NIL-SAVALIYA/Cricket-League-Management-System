import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/team.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

// Only ADMIN and ORGANIZER can create/update/delete teams
router.post("/", authenticate, authorize("ADMIN", "ORGANIZER"), create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getOne);

router.put("/:id", authenticate, authorize("ADMIN", "ORGANIZER"), update);

router.delete("/:id", authenticate, authorize("ADMIN"), remove);

export default router;