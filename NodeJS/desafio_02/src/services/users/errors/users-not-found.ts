export class UsersNotFoundError extends Error {
  constructor() {
    super("Nenhum usuário cadastrado.")
  }
}
