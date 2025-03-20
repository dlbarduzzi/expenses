import { serve } from "@hono/node-server"

import { app } from "./app"
import { envs } from "./envs"
import { logger } from "@/app/logger"

serve({
  fetch: app.fetch,
  port: envs.APP_PORT,
}, (info) => {
  logger.info("server started", { port: info.port })
})
