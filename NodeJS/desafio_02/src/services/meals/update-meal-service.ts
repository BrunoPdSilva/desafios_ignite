import { Meal, TMealsRepository } from "@/repositories/meals-repository"
import { MealNotFoundError, MealNotUpdated } from "../errors"

export class UpdateMealService {
  constructor(private mealsRepository: TMealsRepository) {}

  async update(id: string, data: Partial<Meal>) {
    const meal = await this.mealsRepository.findMealByID(id)

    if (!meal) throw new MealNotFoundError()

    const updatedRows = await this.mealsRepository.updateMeal(id, data)

    if (updatedRows === 0) throw new MealNotUpdated()
  }
}
