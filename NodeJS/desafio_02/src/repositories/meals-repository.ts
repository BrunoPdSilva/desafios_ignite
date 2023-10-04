export type Meal = {
  id: string
  consumer_id?: string
  consumer_session_id: string
  name: string
  description: string
  in_diet: boolean
  date: string
  time: string
}

export type TMealsRepository = {
  findMealByID(id: string): Promise<Meal | null>
  fetchMealsByUserID(id: string, sessionID: string): Promise<Meal[] | null>
  fetchMealsBySessionID(id: string): Promise<Meal[] | null>
  registerMeal(data: Meal): Promise<void>
  updateMeal(id: string, data: Partial<Meal>): Promise<number>
  deleteMeal(id: string): Promise<void>
}
