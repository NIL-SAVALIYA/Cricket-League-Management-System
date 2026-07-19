import { createBallService } from "../services/ball.service.js";
import { createBallSchema } from "../validators/ball.validator.js";

export async function createBall(req, res, next) {
    try {
        const data = createBallSchema.parse({
            ...req.body,
            inningsId: Number(req.params.inningsId)
        });

        const result = await createBallService(data);

        return res.status(201).json({
            success: true,
            message: result.message,
            data: result
        });

    } catch (error) {
        next(error);
    }
}