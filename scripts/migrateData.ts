/* eslint-disable no-console */
import Category from '../server/models/category';
import Message from '../server/models/message';
import Product from '../server/models/product';

import { Category as CategoryT } from '../pg-server/categories/types';
import { Message as MessageT } from '../pg-server/messages/types';
import { Product as ProductT } from '../pg-server/products/types';

import { insertCategory } from '../pg-server/categories/handlers';
import { insertMessage } from '../pg-server/messages/handlers';
import { insertProduct } from '../pg-server/products/handlers';

import { getDb } from '../pg-server/config';

export default async () => {
  console.log('---=== CATEGORIES MIGRATION ===---');
  console.log('Checking if categories have to be migrated...');
  const pgCategories = await getDb()<CategoryT>('categories').select();
  console.log(`${pgCategories.length} categories found in Postgres!`);
  console.log('Fetching categories from MongoDB...');
  const mongoCategories: CategoryT[] = await Category.find({});
  console.log(`${mongoCategories.length} categories found in MongoDB!`);
  if (pgCategories.length) {
    console.log('categories table is already populated, skipping migration...');
  } else {
    const categoriesPromises = mongoCategories.map(category => {
      const { id, createdAt, ...payload } = category;
      return insertCategory(payload);
    });
    console.log('Inserting categories in Postgres...');
    await Promise.all(categoriesPromises);
    console.log('Categories inserted!');
  }

  console.log('---=== PRODUCTS MIGRATION ===---');
  console.log('Checking if products have to be migrated...');
  const pgProducts = await getDb()<ProductT>('products').select();
  console.log(`${pgProducts.length} products found in Postgres!`);
  if (pgProducts.length) {
    console.log('products table is already populated, skipping migration...');
  } else {
    console.log('Fetching products from MongoDB...');
    const mongoProducts: ProductT[] = await Product.find({});
    console.log(`${mongoProducts.length} products found in MongoDB!`);
    const productsPromises = mongoProducts.map(product => {
      const { id, createdAt, name, categoryId: mongoCatId, ...payload } = product;
      const categoryId = (pgCategories.find(cat => cat.name === name) || { id: 'id-not-found' }).id;
      return insertProduct({ ...payload, name, categoryId });
    });
    console.log('Inserting products in Postgres...');
    await Promise.all(productsPromises);
    console.log('Products inserted!');
  }

  console.log('---=== MESSAGES MIGRATION ===---');
  console.log('Checking if messages have to be migrated...');
  const pgMessages = await getDb()<MessageT>('messages').select();
  console.log(`${pgMessages.length} messages found in Postgres!`);
  if (pgMessages.length) {
    console.log('messages table is already populated, skipping migration...');
  } else {
    console.log('Fetching messages from MongoDB...');
    const mongoMessages: MessageT[] = await Message.find({});
    console.log(`${mongoMessages.length} messages found in MongoDB!`);
    const messagesPromises = mongoMessages.map(message => {
      const { id, createdAt, ...payload } = message;
      return insertMessage(payload);
    });
    console.log('Inserting messages in Postgres...');
    await Promise.all(messagesPromises);
    console.log('messages inserted!');
  }
};
