import { bootstrapApp } from "@/app/base"

const app = bootstrapApp()

app.get("/", ctx => {
  return ctx.text("Hello Hono!")
})

export { app }
