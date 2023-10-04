import { TUsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../errors"

export class DeleteUserService {
  constructor(private usersRepository: TUsersRepository) {}

  async delete(id: string) {
    const user = await this.usersRepository.findUserByID(id)

    if (!user) throw new UserNotFoundError()

    await this.usersRepository.deleteUserByID(id)
  }
}
