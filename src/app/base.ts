import type { Logger } from "winston"

import { Hono } from "hono"
import { requestId } from "hono/request-id"

import { logger } from "@/app/logger"

type AppEnv = {
  Variables: {
    logger: Logger
  }
}

export function createApp() {
  return new Hono<AppEnv>({ strict: false })
}

export function bootstrapApp() {
  const app = createApp()

  app.use(requestId())

  app.use("*", async (ctx, next) => {
    ctx.set("logger", logger)
    await next()
  })

  app.notFound(ctx => {
    return ctx.text("400 Not Found")
  })

  app.onError((err, ctx) => {
    ctx.var.logger.error("uncaught exception", {
      error: err.message,
      stack: err.stack,
    })
    return ctx.text("500 Internal Server Error")
  })

  return app
}
