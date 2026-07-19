import { z } from "zod";

export const createBallSchema = z.object({
    inningsId: z.number().int().positive(),
    batsmanId: z.number().int().positive(),
    nonStrikerId: z.number().int().positive(),
    bowlerId: z.number().int().positive(),

    batRuns: z.number().int().min(0).max(6).default(0),

    extraRuns: z.number().int().min(0).max(7).default(0),

    extraType: z
        .enum([
            "BYE",
            "LEG_BYE",
            "WIDE",
            "NO_BALL"
        ])
        .nullable()
        .default(null),

    isWicket: z.boolean().default(false),

    wicketType: z
        .enum([
            "BOWLED",
            "CAUGHT",
            "LBW",
            "RUN_OUT",
            "STUMPED",
            "HIT_WICKET",
            "OBSTRUCTING_FIELD",
            "HIT_BALL_TWICE",
            "TIMED_OUT",
            "RETIRED_OUT"
        ])
        .nullable()
        .default(null),

    dismissedPlayerId: z.number().int().positive().nullable().default(null),

    newBatsmanId: z.number().int().positive().nullable().default(null),

    fielderId: z.number().int().positive().nullable().default(null),

    commentary: z.string().trim().max(500).default("")
}).superRefine((data, ctx) => {

    if (data.extraRuns > 0 && !data.extraType) {
        ctx.addIssue({
            code: "custom",
            path: ["extraType"],
            message: "extraType is required."
        });
    }

    if (data.isWicket && !data.wicketType) {
        ctx.addIssue({
            code: "custom",
            path: ["wicketType"],
            message: "wicketType is required."
        });
    }

    if (
        data.isWicket &&
        !["RETIRED_OUT", "TIMED_OUT"].includes(data.wicketType) &&
        !data.dismissedPlayerId
    ) {
        ctx.addIssue({
            code: "custom",
            path: ["dismissedPlayerId"],
            message: "dismissedPlayerId is required."
        });
    }

    if (
        data.isWicket &&
        !["RETIRED_OUT", "TIMED_OUT"].includes(data.wicketType) &&
        !data.newBatsmanId
    ) {
        ctx.addIssue({
            code: "custom",
            path: ["newBatsmanId"],
            message: "newBatsmanId is required."
        });
    }
});