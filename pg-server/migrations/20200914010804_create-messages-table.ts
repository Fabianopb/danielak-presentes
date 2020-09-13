import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.jsonb('text');
    table.boolean('isNew');
    table.boolean('isAnswered');
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('messages');
}
