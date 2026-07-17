import { z } from "zod";

export const createMatchSchema = z.object({
    teamAId: z.string().uuid(),

    teamBId: z.string().uuid(),

    venue: z.string().min(3),

    matchDate: z.string().datetime(),

    tossWinnerId: z.string().uuid().optional(),

    tossDecision: z.enum([
        "BAT",
        "BOWL"
    ]).optional(),

    status: z.enum([
        "UPCOMING",
        "LIVE",
        "COMPLETED",
        "CANCELLED"
    ]).optional()

}).refine(
    (data) => data.teamAId !== data.teamBId,
    {
        message: "Team A and Team B cannot be the same.",
        path: ["teamBId"]
    }
);

export const updateMatchSchema = z.object({

    teamAId: z.string().uuid().optional(),

    teamBId: z.string().uuid().optional(),

    venue: z.string().min(3).optional(),

    matchDate: z.string().datetime().optional(),

    tossWinnerId: z.string().uuid().optional(),

    tossDecision: z.enum([
        "BAT",
        "BOWL"
    ]).optional(),

    status: z.enum([
        "UPCOMING",
        "LIVE",
        "COMPLETED",
        "CANCELLED"
    ]).optional()

});