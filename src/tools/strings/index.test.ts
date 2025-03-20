import { describe, expect, it } from "vitest"
import { capitalize, lowercase } from "./index"

describe("strings.index", () => {
  describe("lowercase", () => {
    it("should lowercase word", () => {
      expect(lowercase("Hello")).toBe("hello")
      expect(lowercase("WoRld")).toBe("world")
    })
  })
  describe("capitalize", () => {
    it("should capitalize word", () => {
      expect(capitalize("hello")).toBe("Hello")
      expect(capitalize("woRld")).toBe("WoRld")
    })
  })
})
