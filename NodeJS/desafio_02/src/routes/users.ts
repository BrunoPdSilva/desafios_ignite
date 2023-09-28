import { FastifyInstance } from "fastify"
import { randomUUID } from "node:crypto"
import { knex } from "../lib/knex"
import { z } from "zod"

export async function users(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    try {
      const users = await knex("users").select("*")

      return { users }
    } catch (error) {
      console.log(`Erro: ${error}`)
      res.status(500).send("Ocorreu um erro ao processar a solicitação.")
    }
  })

  app.get("/:id", async (req, res) => {
    try {
      const paramsSchema = z.object({ id: z.string().uuid() })
      const { id } = paramsSchema.parse(req.params)
      const user = await knex("users").where("id", id).first()

      if (!user) {
        return res.status(404).send("Usuário não encontrado")
      }

      return { user }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send("ID inválido.")
      }

      res.status(500).send("Ocorreu um erro ao processar a solicitação.")
    }
  })

  app.post("/", async (req, res) => {
    try {
      const bodySchema = z.object({ name: z.string(), email: z.string() })
      const { name, email } = bodySchema.parse(req.body)
      const userID = randomUUID()
      let { sessionID } = req.cookies

      if (!sessionID) {
        sessionID = randomUUID()
        res.cookie("sessionID", sessionID, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Days
        })
      }

      await knex("users").insert({
        id: userID,
        name,
        email,
        session_id: sessionID,
      })

      res.cookie("userID", userID, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      })

      res.status(201).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send("Informe name e email corretamente.")
      }
      res.status(500).send("Ocorreu um erro ao processar a solicitação.")
    }
  })

  app.delete("/:id", async (req, res) => {
    try {
      const paramsSchema = z.object({ id: z.string().uuid() })
      const { id } = paramsSchema.parse(req.params)

      const user = await knex("users").where("id", id).first()

      if (!user) {
        return res.status(404).send("Usuário não encontrado")
      }

      await knex("users").where("id", id).del()

      res.status(204).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send("ID inválido.")
      }

      res.status(500).send("Ocorreu um erro ao processar a solicitação.")
    }
  })
}
