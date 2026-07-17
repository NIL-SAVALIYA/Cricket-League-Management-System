import express from "express";
import authRoutes from "./routes/auth.routes.js";
// new import needed for role of user's....
import roleRoutes from "./routes/role.routes.js";
// new import needed for user.controller.js,user.routes.js,user.service.js....
import userRoutes from "./routes/user.routes.js";
//new import for team management CRUD
import teamRoutes from "./routes/team.routes.js";
//other import for player management CRUD
import playerRoutes from "./routes/player.routes.js";
//other import for match management CRUD
import matchRoutes  from  "./routes/match.routes.js";
//other import for tournament management
import tournamentRoutes from "./routes/tournament.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Cricket League Management System is running........."
    });

});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/tournaments", tournamentRoutes);

export default app;