import { TUsersRepository, User } from "@/repositories/users-repository"

export class CreateUserService {
  constructor(private usersRepository: TUsersRepository) {}

  async create(data: User) {
    await this.usersRepository.createUser(data)
  }
}
