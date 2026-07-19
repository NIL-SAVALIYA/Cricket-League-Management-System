import { getLiveScoreService } from "../services/liveScore.service.js";

export async function getLiveScore(req, res, next) {
    try {
        const { matchId } = req.params;

        if (!matchId) {
            return res.status(400).json({
                success: false,
                message: "Match ID is required."
            });
        }

        const result = await getLiveScoreService(matchId);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
}