import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../lib/knex"
import { randomUUID } from "node:crypto"

export async function meals(app: FastifyInstance) {
  app.get("/", async () => {
    const meals = await knex("meals").select("*")

    return { meals }
  })

  app.post("/", async (req, res) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      in_diet: z.boolean(),
    })

    const body = bodySchema.parse(req.body)

    let { sessionID, userID } = req.cookies

    if (!sessionID) {
      sessionID = randomUUID()

      res.cookie("sessionID", sessionID, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex("meals").insert({
      id: randomUUID(),
      consumer_id: userID,
      consumer_session_id: sessionID,
      name: body.name,
      date: body.date,
      time: body.time,
      description: body.description,
      in_diet: body.in_diet,
    })

    res.status(201).send()
  })
}
