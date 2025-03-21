import type { Schema } from "hono"
import type { Logger } from "winston"
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"

export type AppEnv = {
  Variables: {
    logger: Logger
  }
}

export type AppOpenAPIHono = OpenAPIHono<AppEnv, Schema>
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>
