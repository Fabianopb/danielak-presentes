/* eslint-disable no-console */
import Category from '../server/models/category';
import Message from '../server/models/message';

import { Category as CategoryT } from '../pg-server/categories/types';
import { Message as MessageT } from '../pg-server/messages/types';

import { insertCategory } from '../pg-server/categories/handlers';
import { insertMessage } from '../pg-server/messages/handlers';

import { getDb } from '../pg-server/config';

export default async () => {
  console.log('---=== CATEGORIES MIGRATION ===---');
  console.log('Checking if categories have to be migrated...');
  const pgCategories = await getDb()<CategoryT>('categories').select();
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
    const messagesPromises = mongoMessages.map(({ text, isNew, isAnswered }) =>
      insertMessage({
        text,
        isNew,
        isAnswered,
      }),
    );
    console.log('Inserting messages in Postgres...');
    await Promise.all(messagesPromises);
    console.log('messages inserted!');
  }
};
