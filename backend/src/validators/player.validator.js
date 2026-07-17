import { z } from "zod";

export const createPlayerSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),

    dateOfBirth: z.string().optional(),

    jerseyNumber: z.number().int().positive().optional(),

    playerType: z.enum([
        "BATSMAN",
        "BOWLER",
        "ALL_ROUNDER",
        "WICKET_KEEPER"
    ]),

    battingStyle: z.enum([
        "RIGHT_HAND",
        "LEFT_HAND"
    ]).optional(),

    bowlingStyle: z.enum([
        "RIGHT_ARM_FAST",
        "LEFT_ARM_FAST",
        "RIGHT_ARM_MEDIUM",
        "LEFT_ARM_MEDIUM",
        "RIGHT_ARM_SPIN",
        "LEFT_ARM_SPIN"
    ]).optional(),

    isCaptain: z.boolean().optional(),

    isViceCaptain: z.boolean().optional(),

    teamId: z.string().uuid()
});

export const updatePlayerSchema = createPlayerSchema.partial();