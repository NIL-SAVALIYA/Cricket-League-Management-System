import express from "express";
import authRoutes from "./routes/auth.routes.js";
// new import needed for role of user's....
import roleRoutes from "./routes/role.routes.js";
// new import needed for user.controller.js,user.routes.js,user.service.js....
import userRoutes from "./routes/user.routes.js";

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

export default app;