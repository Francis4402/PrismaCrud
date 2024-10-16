import { z } from "zod"


export const todoSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
    description: z.string().max(500, "Description must be 500 character of less").optional(),
    isComplete: z.boolean().default(false),
})
