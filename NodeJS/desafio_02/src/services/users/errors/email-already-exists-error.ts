class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Este e-mail já existe.")
  }
}
