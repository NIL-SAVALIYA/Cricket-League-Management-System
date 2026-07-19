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
//add for tournament-team model
import tournamentTeamRoutes from "./routes/tournament-team.routes.js";
//add for fixture  of match in tournament
import fixtureRoutes from "./routes/fixture.routes.js";
//add for inning.routes.js
import inningsRoutes from "./routes/innings.routes.js";
//add for ball.routes.js
import ballRoutes from "./routes/ball.routes.js";
//add for inning.routes.js
import liveScoreRoutes from "./routes/liveScore.routes.js";


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
app.use("/api/v1/tournament-teams", tournamentTeamRoutes);
app.use("/api/v1/fixtures", fixtureRoutes);
app.use("/api/v1/innings", inningsRoutes);
app.use("/api/innings/:inningsId/balls", ballRoutes);
app.use("/api/matches", liveScoreRoutes);

export default app;