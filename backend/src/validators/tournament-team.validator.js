import { z } from "zod";

export const registerTeamSchema = z.object({
    tournamentId: z
        .string()
        .uuid("Tournament ID must be a valid UUID."),

    teamId: z
        .string()
        .uuid("Team ID must be a valid UUID.")
});

export const updateTournamentTeamSchema = z.object({
    tournamentId: z
        .string()
        .uuid()
        .optional(),

    teamId: z
        .string()
        .uuid()
        .optional()
});