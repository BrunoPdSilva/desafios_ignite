import { knex } from "@/lib/knex"
import { Meal, TMealsRepository } from "../meals-repository"

export class KnexMealsRepository implements TMealsRepository {
  async registerMeal(data: Meal) {
    await knex("meals").insert(data)
  }

  async findMealByID(id: string) {
    const meal = await knex("meals").where("id", id).first()
    return meal ? meal : null
  }

  async fetchMealsByUserID(id: string, sessionID: string) {
    const meals = await knex("meals").where(function (this: any) {
      this.where("consumer_id", id).orWhere("consumer_session_id", sessionID)
    })

    return meals.length > 0 ? meals : null
  }

  async fetchMealsBySessionID(id: string) {
    const meals = await knex("meals").where("consumer_session_id", id)
    return meals.length > 0 ? meals : null
  }

  async updateMeal(id: string, data: Partial<Meal>) {
    const updatedRows = await knex("meals").where("id", id).update(data)
    return updatedRows
  }

  async deleteMeal(id: string) {
    await knex("meals").where("id", id).del()
  }
}
