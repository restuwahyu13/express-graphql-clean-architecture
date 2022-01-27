import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unsigned().unique().notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.enum('role', ['teacher', 'student', 'admin']).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('users')
}
