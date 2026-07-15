import { z } from "zod";

export const roleSchema = z.object({

    name: z.string().min(2).max(50),

    description: z.string().min(3).max(255)

});