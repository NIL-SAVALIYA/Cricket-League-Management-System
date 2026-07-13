import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {

    res.status(200).json({
        
        "success": true,
        "message": "Backend is healthy",
        "timestamp": "2026-07-13T11:40:25.000Z",
        "version": "1.0.0"

    });
});

export default app;