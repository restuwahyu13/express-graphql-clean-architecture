import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('class', (table: Knex.TableBuilder) => {
    table.increments('id').primary().unsigned().unique().notNullable()
    table.integer('teacher_id').references('id').inTable('teachers').unsigned().notNullable()
    table.integer('student_id').references('id').inTable('students').unsigned().notNullable()
    table.string('room_name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('class')
}
