import { TUsersRepository } from "@/repositories/users-repository"
import { UsersNotFoundError } from "../errors"

export class FetchUsersService {
  constructor(private usersRepository: TUsersRepository) {}

  async fetchUsers() {
    const users = await this.usersRepository.fetchUsers()

    if (!users) throw new UsersNotFoundError()

    return users
  }
}
