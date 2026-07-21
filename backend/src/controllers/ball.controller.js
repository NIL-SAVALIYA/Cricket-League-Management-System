
import { createBallSchema } from "../validators/ball.validator.js";
import { createBallService } from "../services/ball.service.js";


export async function createBall(req, res, next) {
    try {

        console.log("========== BALL API ==========");
        console.log("Params:", req.params);
        console.log("Body:", req.body);

        const data = createBallSchema.parse({
            ...req.body,
            inningsId: req.params.inningsId
        });

        console.log("Validated:", data);

        const result = await createBallService(data);

        return res.status(201).json({
            success: true,
            message: result.message,
            data: result
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
}