import { FastifyReply, FastifyRequest } from "fastify"
import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { RegisterMealService } from "@/services/meals/register-meal-service"
import { randomUUID } from "crypto"
import { z } from "zod"

export async function registerMeal(req: FastifyRequest, res: FastifyReply) {
  try {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      in_diet: z.boolean(),
    })

    const data = bodySchema.parse(req.body)

    const consumer_id = req.cookies.userID
    let { sessionID } = req.cookies

    if (!sessionID) {
      sessionID = randomUUID()
      const maxAge = 1000 * 60 * 60 * 24 * 7 // 7 days
      res.cookie("sessionID", sessionID, { path: "/", maxAge })
    }

    const mealsRepository = new KnexMealsRepository()
    const registerMealService = new RegisterMealService(mealsRepository)

    await registerMealService.register({
      id: randomUUID(),
      consumer_id,
      consumer_session_id: sessionID,
      ...data,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        error: "Informe os dados da refeição corretamente.",
        issues: error.format(),
      })
    }

    throw error
  }

  res.status(201).send()
}
