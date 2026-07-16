import { z } from "zod";

export const createTeamSchema = z.object({
    name: z
        .string()
        .min(3, "Team name must be at least 3 characters.")
        .max(100),

    shortName: z
        .string()
        .min(2, "Short name must be at least 2 characters.")
        .max(10),

    city: z
        .string()
        .min(2, "City is required."),

    description: z
        .string()
        .optional(),

    logoUrl: z
        .string()
        .url("Logo URL must be valid.")
        .optional(),

    managerId: z
        .string()
        .uuid("Manager ID must be a valid UUID.")
        .optional()
});

export const updateTeamSchema = createTeamSchema.partial();