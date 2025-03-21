import { newApp } from "@/core/base"

import * as routes from "./routes"
import * as handlers from "./handlers"

export const users = newApp().openapi(routes.signUp, handlers.signUp)
