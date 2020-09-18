import { db } from '../config';
import { Product, ProductPayload } from '../types';
import { serializePayload } from '../utils';

const table = 'products';

export const selectAllProducts = async () => {
  return db<Product>(table).select();
};

export const selectProductById = async (id: string) => {
  return db<Product>(table).where({ id }).first();
};

export const insertProduct = async (payload: ProductPayload) => {
  const serializedPayload = serializePayload(payload);
  await db<Product>(table).insert(serializedPayload);
};

export const updateProduct = async (id: string, payload: ProductPayload) => {
  const serializedPayload = serializePayload(payload);
  await db<Product>(table).where('id', id).update(serializedPayload);
};

export const deleteProduct = async (id: string) => {
  await db<Product>(table).where('id', id).delete();
};
