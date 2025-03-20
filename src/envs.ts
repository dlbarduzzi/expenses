import { z } from "zod"
import { config } from "dotenv"
import { expand } from "dotenv-expand"

expand(config())

const envSchema = z.object({
  NODE_ENV: z.enum(["test", "development", "production"]),
  APP_PORT: z.coerce.number(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
})

// eslint-disable-next-line node/no-process-env
const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  console.error("❌ Invalid environment variables ❌")
  console.error(JSON.stringify(envParsed.error.flatten().fieldErrors, null, 2))
  // eslint-disable-next-line node/no-process-exit
  process.exit(1)
}

export const envs = envParsed.data
