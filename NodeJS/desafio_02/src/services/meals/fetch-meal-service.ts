import { TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError, MealsNotFoundError } from "../errors"

export class FetchMealsService {
  constructor(private mealsRepository: TMealsRepository) {}

  async fetchMealByID(id: string) {
    const meal = await this.mealsRepository.findMealByID(id)
    if (!meal) throw new MealNotFoundError()
    return meal
  }

  async fetchMeals(sessionID: string, id: string) {
    if (id) {
      const meals = await this.mealsRepository.fetchMealsByUserID(id, sessionID)
      if (!meals) throw new MealsNotFoundError()
      return meals
    }

    const meals = await this.mealsRepository.fetchMealsBySessionID(sessionID)
    if (!meals) throw new MealsNotFoundError()
    return meals
  }

  async fetchMealsByUserID(id: string, sessionID: string) {
    const meals = await this.mealsRepository.fetchMealsByUserID(id, sessionID)
    if (!meals) throw new MealsNotFoundError()
    return meals
  }

  async fetchMealsBySessionID(id: string) {
    const meals = await this.mealsRepository.fetchMealsBySessionID(id)
    if (!meals) throw new MealsNotFoundError()
    return meals
  }
}
