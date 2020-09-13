import { Example } from './types';
import { getDb } from '../config';

export const selectAllExamples = async () => {
  const db = await getDb();
  return db<Example>('hello_world').select();
};
