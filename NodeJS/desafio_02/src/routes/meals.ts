import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../lib/knex"
import { randomUUID } from "node:crypto"

export async function meals(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    try {
      const meals = await knex("meals").select("*")
      return { meals }
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  })

  app.get("/:id", async (req, res) => {
    try {
      const paramsSchema = z.object({ id: z.string().uuid() })
      const { id } = paramsSchema.parse(req.params)

      const meal = await knex("meals")
        .where(function (this: any) {
          this.where("id", id).orWhere("consumer_id", id)
        })
        .first()

      if (!meal) {
        return res.status(404).send("Nenhuma refeição encontrada com esse ID.")
      }

      return { meal }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).send("ID inválido.")
      }
      res.status(500).send("Ocorreu um erro ao processar a solicitação.")
    }
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

  app.delete("/:id", async (req, res) => {
    try {
      const paramsSchema = z.object({ id: z.string().uuid() })
      const { id } = paramsSchema.parse(req.params)

      const meal = await knex("meals").where("id", id).first()

      if (!meal) {
        return res
          .status(404)
          .send("Não foi encontrado nenhuma refeição com esse ID.")
      }

      await knex("meals").where("id", id).del()

      return res.status(204).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send("ID inválido.")
      }
      return res.status(500).send("Ocorreu um erro ao processar a solicitação")
    }
  })
}
