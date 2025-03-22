import { z } from "@hono/zod-openapi"

import {
  hasNumber,
  hasSpecialChar,
  hasLowercaseChar,
  hasUppercaseChar,
} from "@/tools/strings"

const passwordMinChars = 8
const passwordMaxChars = 72

export const signUpSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Not a valid email"),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(1, "Password is required")
    .min(passwordMinChars, {
      message: `Password must be at least ${passwordMinChars} characters long`,
    })
    .max(passwordMaxChars, {
      message: `Password must be at most ${passwordMaxChars} characters long`,
    }),
}).superRefine((input, ctx) => {
  if (!hasNumber(input.password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 number",
    })
  }
  if (!hasLowercaseChar(input.password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 lowercase character",
    })
  }
  if (!hasUppercaseChar(input.password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 uppercase character",
    })
  }
  if (!hasSpecialChar(input.password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 special character",
    })
  }
})
