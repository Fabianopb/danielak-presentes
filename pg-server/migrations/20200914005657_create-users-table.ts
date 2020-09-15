import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('users', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('email').unique().notNullable();
    table.string('salt').notNullable();
    table.string('hash').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
