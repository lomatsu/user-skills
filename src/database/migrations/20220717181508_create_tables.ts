import { Knex } from "knex";
import { tableName } from "../helps";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName.USER, function (table) {
    table.increments("id", { primaryKey: true })
    table.string("login", 12).notNullable()
    table.string("password", 100).notNullable()
    table.date("last_login_date").nullable()
    table.timestamps(true, true)
  })

	await knex.schema.createTable(tableName.SKILL, function (table) {
    table.increments("id", { primaryKey: true })
    table.string("name", 100).notNullable()
    table.string("version", 10).nullable()
    table.string("description", 255).notNullable()
    table.string("image_url", 255).nullable()
    table.timestamps(true, true)
  })


  await knex.schema.createTable(tableName.USER_SKILL, function(table) {
    table.increments("id", {primaryKey: true})
    table.integer("knowledge_level", 100).notNullable()
    table.integer("user_id", 100).notNullable()
    table.integer("skill_id", 100).notNullable()
    table.timestamps(true, true)
    table
      .foreign(
        "user_id", `${tableName.USER_SKILL}_${tableName.USER}`
      )
      .references("id").inTable(tableName.USER)
    table
    .foreign(
      "skill_id", `${tableName.USER_SKILL}_${tableName.SKILL}`
    )
    .references("id").inTable(tableName.SKILL)
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName.USER_SKILL);
  await knex.schema.dropTable(tableName.USER);
  await knex.schema.dropTable(tableName.SKILL);
}

