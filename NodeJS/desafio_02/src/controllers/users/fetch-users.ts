import { FastifyReply, FastifyRequest } from "fastify"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { UsersNotFoundError } from "@/services/users/errors/users-not-found"

export async function fetchUsers(_: FastifyRequest, res: FastifyReply) {
  try {
    const usersRepository = new KnexUsersRepository()
    const users = await usersRepository.fetchUsers()

    return { users }
  } catch (error) {
    if (error instanceof UsersNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
