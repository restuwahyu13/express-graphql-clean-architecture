import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('teachers', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unsigned().unique().notNullable()
    table.string('name').notNullable()
    table.string('field_of_study').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('teachers')
}
