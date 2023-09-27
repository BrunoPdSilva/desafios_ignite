import { Knex, knex as knexSetup } from "knex"
import { env } from "../env"

export const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
    extension: "ts",
  },
}

export const knex = knexSetup(knexConfig)
 