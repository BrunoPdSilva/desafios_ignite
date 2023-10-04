import { FastifyRequest, FastifyReply } from "fastify"
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository"
import { DeleteUserService } from "@/services/users/delete-user-service"
import { UserNotFoundError } from "@/services/errors"
import { z } from "zod"

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(req.params)

    const usersRepository = new KnexUsersRepository()
    const deleteService = new DeleteUserService(usersRepository)

    await deleteService.delete(id)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ error: "ID inválido.", issues: error.format() })
    }

    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }

  return res.status(204).send()
}
