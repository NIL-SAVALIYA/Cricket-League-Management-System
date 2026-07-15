import express from "express";
import authRoutes from "./routes/auth.routes.js";
// new import nedded for role of user's....
import roleRoutes from "./routes/role.routes.js";

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

export default app;