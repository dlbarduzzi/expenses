import { createLogger, format, transports } from "winston"
import { envs } from "@/envs"

export const logger = createLogger({
  level: envs.LOG_LEVEL,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
})
