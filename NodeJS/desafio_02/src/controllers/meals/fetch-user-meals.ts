import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository"
import { MealsNotFoundError } from "@/services/errors"
import { FetchMealsService } from "@/services/meals/fetch-meal-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchUserMeals(req: FastifyRequest, res: FastifyReply) {
  try {
    const { sessionID = "", userID = "" } = req.cookies

    const mealsRepository = new KnexMealsRepository()
    const fetchMealsService = new FetchMealsService(mealsRepository)

    const meals = await fetchMealsService.fetchMeals(sessionID, userID)

    return { meals }
  } catch (error) {
    if (error instanceof MealsNotFoundError) {
      res.status(404).send({ error: error.message })
    }

    throw error
  }
}
