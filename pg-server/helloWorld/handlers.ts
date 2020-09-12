import Knex from 'knex';
import knexfile from '../knexfile';
import { Example } from './types';

export const selectAllExamples = async () => {
  const db = await Knex(knexfile.development);
  return db<Example>('hello_world').select();
};
