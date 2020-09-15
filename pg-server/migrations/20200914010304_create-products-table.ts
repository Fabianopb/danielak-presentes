import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name').notNullable();
    table.integer('featuredImageIndex').defaultTo(0).notNullable();
    table.string('storeLink');
    table.text('description').defaultTo('').notNullable();
    table.uuid('categoryId').notNullable();
    table.integer('currentPrice').notNullable();
    table.integer('discountPrice');
    table.jsonb('tags').defaultTo([]).notNullable();
    table.integer('productionTime').notNullable();
    table.integer('minAmount').notNullable();
    table.integer('width').notNullable();
    table.integer('height').notNullable();
    table.integer('depth').notNullable();
    table.integer('weight').notNullable();
    table.boolean('isVisible').defaultTo(true).notNullable();
    table.boolean('isFeatured').defaultTo(false).notNullable();
    table.jsonb('images').defaultTo([]).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('products');
}
