import { knex } from "@/lib/knex"
import { TUsersRepository, User } from "../users-repository"

export class KnexUsersRepository implements TUsersRepository {
  async deleteUserByID(id: string) {
    await knex("users").where("id", id).del()
  }

  async findUserByID(id: string) {
    const user = await knex("users").where("id", id).first()
    return user ? user : null
  }

  async fetchUsers() {
    const users = await knex("users").select("*")
    return users.length > 0 ? users : null
  }

  async createUser({ id, name, email, session_id }: User) {
    await knex("users").insert({ id, name, email, session_id })
  }
}
