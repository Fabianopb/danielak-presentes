/* eslint-disable no-console */
import Category from '../server/models/category';
import { Category as CategoryT } from '../pg-server/categories/types';
import { insertCategory } from '../pg-server/categories/handlers';
import { getDb } from '../pg-server/config';

export default async () => {
  console.log('Checking if categories have to be migrated...');
  const pgCategories = await getDb()<Category>('categories').select();
  console.log(`${pgCategories.length} categories found in Postgres!`);
  if (pgCategories.length) {
    console.log('categories table is already populated, skipping migration...');
  } else {
    console.log('Fetching categories from MongoDB...');
    const mongoCategories: CategoryT[] = await Category.find({});
    console.log(`${mongoCategories.length} categories found in MongoDB!`);
    const categoriesPromises = mongoCategories.map(({ name, description, removed }) =>
      insertCategory({
        name,
        description,
        removed,
      }),
    );
    console.log('Inserting categories in Postgres...');
    await Promise.all(categoriesPromises);
    console.log('Categories inserted!');
  }
};
