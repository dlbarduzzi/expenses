import { users } from "@/apis/users"
import { newApp, bootstrap, document } from "@/core/base"

const app = newApp()

bootstrap(app)
document(app)

app.route("/api/v1/users", users)

export { app }
