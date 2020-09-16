import { db } from '../config';
import { Category, CategoryPayload } from './types';

const table = 'categories';

export const selectAllCategories = async () => {
  return db<Category>(table).select();
};

export const insertCategory = async (payload: CategoryPayload) => {
  await db<Category>(table).insert(payload);
};

export const updateCategory = async (id: string, payload: CategoryPayload) => {
  await db<Category>(table).where('id', id).update(payload);
};

export const deleteCategory = async (id: string) => {
  await db<Category>(table).where('id', id).delete();
};
