import { Knex } from "knex"

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string
      session_id?: string
      name: string
      email: string
      created_at: string
    }
    meals: {
      id: string
      consumer_id?: string
      consumer_session_id: string
      name: string
      description: string
      in_diet: boolean
      date: string
      time: string
    }
  }
}
