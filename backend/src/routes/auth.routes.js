import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

//new added for login api or login user also in import login added in controller..
router.post("/login", login );


     

// new import add for authenticate user by getProfile by Id  profile added in :-
// import { register, login, profile } from "../controllers/auth.controller.js":


router.get("/profile", authenticate, profile);

export default router; 