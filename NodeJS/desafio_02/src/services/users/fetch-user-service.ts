import { TUsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../errors"

export class FetchUserService {
  constructor(private usersRepository: TUsersRepository) {}

  async getUserByID(id: string) {
    const user = await this.usersRepository.findUserByID(id)

    if (!user) throw new UserNotFoundError()

    return user
  }
}
