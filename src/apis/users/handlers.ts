import type { SignUp } from "./routes"
import type { AppRouteHandler } from "@/core/types"

import { signUpSchema } from "./schemas"

import {
  StatusCreatedCode,
  StatusUnprocessableEntityCode,
  StatusUnprocessableEntityText,
} from "@/core/status"

export const signUp: AppRouteHandler<SignUp> = async ctx => {
  const body = await ctx.req.json()
  const parsed = signUpSchema.safeParse(body)
  if (!parsed.success) {
    return ctx.json({
      ok: false,
      error: StatusUnprocessableEntityText,
      fields: parsed.error.flatten().fieldErrors,
    }, StatusUnprocessableEntityCode)
  }

  return ctx.json({ ok: true }, StatusCreatedCode)
}
