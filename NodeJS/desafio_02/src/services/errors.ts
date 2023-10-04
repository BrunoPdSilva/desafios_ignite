export class UsersNotFoundError extends Error {
  constructor() {
    super("Nenhum usuário cadastrado.")
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("Usuário não encontrado.")
  }
}

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Este e-mail já existe.")
  }
}

export class MealNotFoundError extends Error {
  constructor() {
    super("Nenhuma refeição registrada com esse ID.")
  }
}

export class MealsNotFoundError extends Error {
  constructor() {
    super("Nenhuma refeição registrada com esse ID.")
  }
}

export class MealNotUpdated extends Error {
  constructor() {
    super("Nenhuma refeição atualizada.")
  }
}
