import { Meal, TMealsRepository } from "@/repositories/meals-repository"

export class RegisterMealService {
  constructor(private mealsRepository: TMealsRepository) {}

  async register(data: Meal) {
    await this.mealsRepository.registerMeal(data)
  }
}
