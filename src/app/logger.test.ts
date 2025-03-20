import { describe, expect, it } from "vitest"

import { Logger } from "winston"
import { logger } from "./logger"

describe("app.logger", () => {
  it("should return an instance of winston logger", async () => {
    expect(logger).toBeInstanceOf(Logger)
  })
})
