import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categories', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.boolean('removed').defaultTo(false).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('categories');
}
