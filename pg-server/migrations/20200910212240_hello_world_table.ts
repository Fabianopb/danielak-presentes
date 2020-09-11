import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('hello_world', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name');
    table.integer('age');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('hello_world');
}
