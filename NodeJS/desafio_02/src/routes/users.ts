import { FastifyInstance } from "fastify"
import { randomUUID } from "node:crypto"
import { knex } from "../lib/knex"
import { z } from "zod"

export async function users(app: FastifyInstance) {
  app.get("/", async () => {
    const users = await knex("users").select("*")

    return { users }
  })

  app.get("/:id", async req => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)
    const user = await knex("users").select("*").where("id", id)

    return { user }
  })

  app.post("/", async (req, res) => {
    const bodySchema = z.object({ name: z.string(), email: z.string() })
    const { name, email } = bodySchema.parse(req.body)

    let sessionID = req.cookies.sessionID

    if (!sessionID) {
      sessionID = randomUUID()
      res.cookie("sessionID", sessionID, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 30 Days
      })
    }

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionID,
    })

    res.status(201).send()
  })

  app.delete("/:id", async (req, res) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    await knex("users").where("id", id).del()

    res.status(204).send()
  })
}
