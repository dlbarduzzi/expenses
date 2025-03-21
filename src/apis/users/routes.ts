import { signUpSchema } from "./schemas"
import { createRoute, z } from "@hono/zod-openapi"

import {
  StatusCreatedCode,
  StatusUnprocessableEntityCode,
  StatusUnprocessableEntityText,
} from "@/core/status"

export const signUp = createRoute({
  path: "/sign-up",
  method: "post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: signUpSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    [StatusCreatedCode]: {
      content: {
        "application/json": {
          schema: z.object({
            ok: z.literal(true),
          }),
        },
      },
      description: "The newly created user",
    },
    [StatusUnprocessableEntityCode]: {
      content: {
        "application/json": {
          schema: z.object({
            ok: z.literal(false),
            error: z.literal(StatusUnprocessableEntityText),
            fields: z.object({
              email: z.array(z.string()).nullish(),
              password: z.array(z.string()).nullish(),
            }),
          }),
        },
      },
      description: "Invalid input error",
    },
  },
})

export type SignUp = typeof signUp
