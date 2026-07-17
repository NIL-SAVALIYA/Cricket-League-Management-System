import { z } from "zod";

export const createTournamentSchema = z.object({

    name: z
        .string()
        .min(3, "Tournament name must be at least 3 characters.")
        .max(100),

    description: z
        .string()
        .optional(),

    format: z.enum([
        "LEAGUE",
        "KNOCKOUT",
        "ROUND_ROBIN",
        "HYBRID"
    ]),

    startDate: z.string().datetime(),

    endDate: z.string().datetime(),

    status: z.enum([
        "UPCOMING",
        "LIVE",
        "COMPLETED",
        "CANCELLED"
    ]).optional()

}).refine(

    (data) => new Date(data.endDate) > new Date(data.startDate),

    {

        message: "End date must be after start date.",

        path: ["endDate"]

    }

);

export const updateTournamentSchema = z.object({

    name: z.string().min(3).max(100).optional(),

    description: z.string().optional(),

    format: z.enum([
        "LEAGUE",
        "KNOCKOUT",
        "ROUND_ROBIN",
        "HYBRID"
    ]).optional(),

    startDate: z.string().datetime().optional(),

    endDate: z.string().datetime().optional(),

    status: z.enum([
        "UPCOMING",
        "LIVE",
        "COMPLETED",
        "CANCELLED"
    ]).optional()

});