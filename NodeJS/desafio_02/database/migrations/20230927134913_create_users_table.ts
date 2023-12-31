import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", table => {
    table.uuid("id").primary()
    table.uuid("session_id").after("id").index()
    table.string("name").notNullable()
    table.string("email").notNullable()
    table.string("created_at").defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users")
}
