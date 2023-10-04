import { TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError } from "../errors"

export class DeleteMealService {
  constructor(private mealsRepository: TMealsRepository) {}

  async delete(id: string) {
    const meal = this.mealsRepository.findMealByID(id)

    if (!meal) throw new MealNotFoundError()

    await this.mealsRepository.deleteMeal(id)
  }
}
