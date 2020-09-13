import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name');
    table.integer('featuredImageIndex');
    table.string('storeLink');
    table.string('description');
    table.uuid('categoryId');
    table.integer('currentPrice');
    table.integer('discountPrice');
    table.jsonb('tags');
    table.integer('productionTime');
    table.integer('minAmount');
    table.integer('width');
    table.integer('height');
    table.integer('depth');
    table.integer('weight');
    table.boolean('isVisible');
    table.boolean('isFeatured');
    table.jsonb('images');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('products');
}
