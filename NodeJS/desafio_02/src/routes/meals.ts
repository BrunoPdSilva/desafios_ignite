import { FastifyInstance } from "fastify"
import { knex } from "../lib/knex"
import { checkSessionID } from "../middleware/check-session-id"
import { registerMeal } from "@/controllers/meals/register-meal"
import { deleteMeal } from "@/controllers/meals/delete-meal"
import { fetchMealByID } from "@/controllers/meals/fetch-meal-by-id"
import { fetchUserMeals } from "@/controllers/meals/fetch-user-meals"
import { updateMeal } from "@/controllers/meals/update-meal"

export async function meals(app: FastifyInstance) {
  app.get("/debug", { preHandler: checkSessionID }, async (_, res) => {
    try {
      const meals = await knex("meals").select("*")
      return { meals }
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  })

  app.get("/", { preHandler: checkSessionID }, fetchUserMeals)

  app.get("/:id", { preHandler: checkSessionID }, fetchMealByID)

  app.post("/", registerMeal)

  app.put("/:id", updateMeal)

  app.delete("/:id", { preHandler: checkSessionID }, deleteMeal)
}
