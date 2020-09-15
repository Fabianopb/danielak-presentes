import { getDb } from '../config';
import { Category } from './types';

const table = 'categories';

export const selectAllCategories = async () => {
  const db = getDb();
  return db<Category>(table).select();
};

export const insertCategory = async (payload: Category) => {
  const db = getDb();
  await db<Category>(table).insert(payload);
};

export const updateCategory = async (id: string, payload: Category) => {
  const db = getDb();
  await db<Category>(table).where('id', id).update(payload);
};

export const deleteCategory = async (id: string) => {
  const db = getDb();
  await db<Category>(table).where('id', id).delete();
};
