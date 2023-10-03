export type User = {
  id: string
  session_id?: string
  name: string
  email: string
  created_at?: string
}

export type TUsersRepository = {
  deleteUserByID(id: string): Promise<void>
  findUserByID(id: string): Promise<User | null>
  fetchUsers(): Promise<User[] | null>
  createUser(data: User): Promise<void>
}
