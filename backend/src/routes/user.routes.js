import { Router } from "express";

import {
    getAll,
    getOne,
    update,
    remove
} from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

// Only ADMIN can manage users

router.get("/", authenticate, authorize("ADMIN"), getAll);

router.get("/:id", authenticate, authorize("ADMIN"), getOne);

router.put("/:id", authenticate, authorize("ADMIN"), update);

router.delete("/:id", authenticate, authorize("ADMIN"), remove);

export default router;