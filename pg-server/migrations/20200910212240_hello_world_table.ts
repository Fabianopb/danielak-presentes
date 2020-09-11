import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('hello_world', table => {
    table.uuid('id').primary();
    table.string('name');
    table.integer('age');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('hello_world');
}
