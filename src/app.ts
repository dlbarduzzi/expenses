import type { Logger } from "winston"

import { Hono } from "hono"
import { requestId } from "hono/request-id"

import { logger } from "@/app/logger"

type AppEnv = {
  Variables: {
    logger: Logger
  }
}

const app = new Hono<AppEnv>()

app.use(requestId())

app.use("*", async (ctx, next) => {
  ctx.set("logger", logger)
  await next()
})

app.get("/", (c) => {
  c.var.logger.info("hello hono")
  return c.text("Hello Hono!")
})

export { app }
