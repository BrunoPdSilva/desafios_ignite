import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", table => {
    table.uuid("id").primary()
    table.uuid("consumer_id")
    table.uuid("consumer_session_id").notNullable()
    table.string("name").notNullable()
    table.string("description").notNullable()
    table.boolean("in_diet").defaultTo(false).notNullable()
    table.string("date").notNullable()
    table.string("time").notNullable()

    table
      .foreign("consumer_session_id")
      .references("session_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    table
      .foreign("consumer_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals")
}
