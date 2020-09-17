/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import Category from '../server/models/category';
import Message from '../server/models/message';
import Product from '../server/models/product';

import { Category as CategoryT, Message as MessageT } from '../pg-server/types';

import { insertCategory } from '../pg-server/categories/handlers';
import { insertMessage } from '../pg-server/messages/handlers';
import { insertProduct } from '../pg-server/products/handlers';

import { db } from '../pg-server/config';

export default async () => {
  try {
    console.log('\n\n---=== CATEGORIES MIGRATION ===---');
    console.log('Checking if categories have to be migrated...');
    const pgCategories = await db<CategoryT>('categories').select();
    console.log(`${pgCategories.length} categories found in Postgres!`);
    if (pgCategories.length) {
      console.log('categories table is already populated, skipping migration...');
    } else {
      console.log('Fetching categories from MongoDB...');
      const mongoCategories = await Category.find({});
      console.log(`${mongoCategories.length} categories found in MongoDB!`);
      const categoriesPromises = mongoCategories.map(({ name, description, removed }: any) =>
        insertCategory({ name, description, removed }),
      );
      console.log('Inserting categories in Postgres...');
      await Promise.all(categoriesPromises);
      console.log('Categories inserted!');
    }

    console.log('\n\n---=== PRODUCTS MIGRATION ===---');
    console.log('Checking if products have to be migrated...');
    const pgProducts = await db('products').select();
    console.log(`${pgProducts.length} products found in Postgres!`);
    if (pgProducts.length) {
      console.log('products table is already populated, skipping migration...');
    } else {
      console.log('Fetching products from MongoDB...');
      const mongoProducts = await Product.find({});
      console.log(`${mongoProducts.length} products found in MongoDB!`);
      const mongoCategories = await Category.find({});
      const latestPgCategories = await db<CategoryT>('categories').select();
      const productsPromises = mongoProducts.map((product: any) => {
        const {
          name,
          featuredImageIndex,
          storeLink,
          description,
          currentPrice,
          discountPrice,
          tags,
          productionTime,
          minAmount,
          width,
          height,
          depth,
          weight,
          isFeatured,
          isVisible,
          image,
        } = product;
        const mongoCatName = mongoCategories.find((cat: any) => cat._id.equals(product.category))!
          .name;
        const categoryId = latestPgCategories.find(cat => cat.name === mongoCatName)!.id;
        const images = image.map(({ large, small }: any) => ({ large, small }));
        return insertProduct({
          name,
          featuredImageIndex,
          storeLink,
          description,
          currentPrice,
          discountPrice,
          tags: JSON.stringify(tags),
          productionTime,
          minAmount,
          width,
          height,
          depth,
          weight,
          isFeatured,
          isVisible,
          images: JSON.stringify(images),
          categoryId,
        } as any);
      });
      console.log('Inserting products in Postgres...');
      await Promise.all(productsPromises);
      console.log('Products inserted!');
    }

    console.log('\n\n---=== MESSAGES MIGRATION ===---');
    console.log('Checking if messages have to be migrated...');
    const pgMessages = await db<MessageT>('messages').select();
    console.log(`${pgMessages.length} messages found in Postgres!`);
    if (pgMessages.length) {
      console.log('messages table is already populated, skipping migration...');
    } else {
      console.log('Fetching messages from MongoDB...');
      const mongoMessages: MessageT[] = await Message.find({});
      console.log(`${mongoMessages.length} messages found in MongoDB!`);
      const messagesPromises = mongoMessages.map(({ text, isNew, isAnswered }) =>
        insertMessage({ text: JSON.stringify(text), isNew, isAnswered } as any),
      );
      console.log('Inserting messages in Postgres...');
      await Promise.all(messagesPromises);
      console.log('messages inserted!');
    }

    console.log('\n\n---=== WOOT! MIGRATION CONCLUDED! :) ===---');
  } catch (error) {
    console.log(error);
    db.destroy();
  }
};
