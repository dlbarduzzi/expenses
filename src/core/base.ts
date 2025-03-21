import type { Schema } from "hono"
import type { Logger } from "winston"

import { ZodError } from "zod"
import { requestId } from "hono/request-id"
import { OpenAPIHono } from "@hono/zod-openapi"
import { apiReference } from "@scalar/hono-api-reference"

import { logger } from "./logger"
import packageJSON from "../../package.json"

import {
  StatusNotFoundCode,
  StatusNotFoundText,
  StatusUnprocessableEntityCode,
  StatusUnprocessableEntityText,
  StatusInternalServerErrorCode,
  StatusInternalServerErrorText,
} from "./status"

type AppEnv = {
  Variables: {
    logger: Logger
  }
}

type AppOpenAPIHono = OpenAPIHono<AppEnv, Schema>

export function newApp() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
    defaultHook: (result, ctx) => {
      if (!result.success) {
        const isZodError = result.error instanceof ZodError
        return ctx.json({
          ok: false,
          error: StatusUnprocessableEntityText,
          fields: isZodError
            ? result.error.flatten().fieldErrors
            : undefined,
          message: !isZodError
            ? "Failed to process request because of invalid data"
            : undefined,
        }, StatusUnprocessableEntityCode)
      }
    },
  })
}

export function bootstrap(app: AppOpenAPIHono) {
  app.use(requestId())

  app.use("*", async (ctx, next) => {
    ctx.set("logger", logger)
    await next()
  })

  app.notFound(ctx => {
    return ctx.json({
      ok: false,
      error: StatusNotFoundText,
      message: "The resource you are looking for does not exist",
    }, StatusNotFoundCode)
  })

  app.onError((err, ctx) => {
    ctx.var.logger.error("uncaught exception", {
      error: err.message,
      stack: err.stack,
    })
    return ctx.json({
      ok: false,
      error: StatusInternalServerErrorText,
      message: "Something went wrong while processing your request",
    }, StatusInternalServerErrorCode)
  })
}

export function document(app: AppOpenAPIHono) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Expenses API",
      version: packageJSON.version,
    },
  })
  app.get("/reference", apiReference({
    url: "/doc",
    theme: "kepler",
    layout: "classic",
    darkMode: true,
  }))
}
