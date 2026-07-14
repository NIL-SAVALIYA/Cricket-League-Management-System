import { z } from "zod";

export const registerSchema = z.object( {


        firstName: z
                .string()
                .trim()
                .min(2, "First name must be at least 2 characters."),

        lastName: z
                .string()
                .trim()
                .min(2,"Last name must be at least 2 characters."),

        email:    z
                .email("Invalid email address")
                .trim(),

        password:  z
                .string()
                .min(8,"Password must be at least 8 characters"),

        role:  z.enum([
                "ADMIN",
                "ORGANIZER",
                "TEAM_MANAGER",
                "VIEWER"

        ])

});