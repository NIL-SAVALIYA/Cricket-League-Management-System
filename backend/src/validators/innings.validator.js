import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Innings Schema
|--------------------------------------------------------------------------
*/

export const createInningsSchema = z.object({

    matchId: z
        .string()
        .uuid("Invalid Match ID."),

    battingTeamId: z
        .string()
        .uuid("Invalid Batting Team ID."),

    bowlingTeamId: z
        .string()
        .uuid("Invalid Bowling Team ID."),

    inningsNumber: z
        .number()
        .int()
        .min(1)
        .max(2)

});

/*
|--------------------------------------------------------------------------
| Update Innings Schema
|--------------------------------------------------------------------------
*/

export const updateInningsSchema = z.object({

    totalRuns: z
        .number()
        .int()
        .min(0)
        .optional(),

    wickets: z
        .number()
        .int()
        .min(0)
        .max(10)
        .optional(),

    overs: z
        .number()
        .min(0)
        .optional(),

    status: z
        .enum([
            "LIVE",
            "COMPLETED"
        ])
        .optional()

});