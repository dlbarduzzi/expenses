import { z } from "@hono/zod-openapi"

export const signUpSchema = z.object({
  email: z
    .string({ message: "Email is required " })
    .trim()
    .min(1, "Email is required")
    .email("Not a valid email"),
})
