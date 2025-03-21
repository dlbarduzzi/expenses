import { newApp, bootstrap, document } from "@/core/base"

const app = newApp()

bootstrap(app)
document(app)

app.get("/", ctx => {
  return ctx.text("Hello Hono!")
})

export { app }
