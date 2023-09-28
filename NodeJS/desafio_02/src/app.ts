import fastify from "fastify"
import fastifyCookie from "@fastify/cookie"
import { users } from "./routes/users"
import { meals } from "./routes/meals"

export const app = fastify()

app.addHook("preHandler", async req => {
  console.log(`[${req.method}]: ${req.url}`)
})

app.register(fastifyCookie)
app.register(users, { prefix: "users" })
app.register(meals, { prefix: "meals" })
