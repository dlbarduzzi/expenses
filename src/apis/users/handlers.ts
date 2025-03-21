import type { SignUp } from "./routes"
import type { AppRouteHandler } from "@/core/types"

import { StatusCreatedCode } from "@/core/status"

export const signUp: AppRouteHandler<SignUp> = async ctx => {
  return ctx.json({ ok: true }, StatusCreatedCode)
}
