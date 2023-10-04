import { FastifyReply, FastifyRequest } from "fastify"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { FetchUsersService } from "@/services/users/fetch-users-service"
import { UsersNotFoundError } from "@/services/errors"

export async function fetchUsers(_: FastifyRequest, res: FastifyReply) {
  try {
    const usersRepository = new KnexUsersRepository()
    const fetchUsersService = new FetchUsersService(usersRepository)
    const users = await fetchUsersService.fetchUsers()

    return { users }
  } catch (error) {
    if (error instanceof UsersNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
