import { getDb } from '../config';
import { Product, ProductPayload } from './types';

const table = 'products';

export const selectAllProducts = async () => {
  const db = getDb();
  return db<Product>(table).select();
};

export const insertProduct = async (payload: ProductPayload) => {
  const db = getDb();
  await db<Product>(table).insert(payload);
};

export const updateProduct = async (id: string, payload: ProductPayload) => {
  const db = getDb();
  await db<Product>(table).where('id', id).update(payload);
};

export const deleteProduct = async (id: string) => {
  const db = getDb();
  await db<Product>(table).where('id', id).delete();
};
